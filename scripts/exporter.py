import polars as pl
import sqlite3 as sql

AGENT_KIND_LABELS = [
    "Aluno",
    "Professor",
    "Assistente",
]

ACTIVITY_LABELS = [
    "Computadores Trabalho",
    "Trabalho individual",
    "Trabalho de grupo",
    "Espaço Lúdico",
    "Expulsão da sala de aula",
    "Requisição de livros",
    "Realização de testes",
    "Computadores Jogos",
    "Espaço Lúdico Telemóvel",
]

DATE_THRESHOLD = "2025-01-01T00:00:00.000000"  # This is used in the SQL query
MORNING_THRESHOLD_HOUR = 12

if __name__ == "__main__":
    # Connect to the SQLite database
    con = sql.connect(
        "libraryHub-24-25.db", detect_types=sql.PARSE_DECLTYPES | sql.PARSE_COLNAMES
    )
    cur = con.cursor()

    # import agents table
    cur.execute("SELECT id, name, agent_kind, class FROM agents")
    agents = cur.fetchall()
    # Create a DataFrame from the fetched data
    agents_df = pl.DataFrame(
        agents, orient="row", schema=["id", "name", "kind", "class"]
    )
    print(agents_df)

    cur.execute(
        f"""
        SELECT
            id, agent_id, activity, created_at
        FROM records
        WHERE
            deleted_at IS NULL AND
            created_at > '{DATE_THRESHOLD}'
        ORDER BY id
        """
    )
    records = cur.fetchall()
    # Create a DataFrame from the fetched data
    records_df = pl.DataFrame(
        records,
        orient="row",
        schema=["id", "agent_id", "activity", "created_at"],
    )

    # join the agents and records DataFrames on agent_id
    joined_df = records_df.join(
        agents_df, left_on="agent_id", right_on="id", how="inner"
    )

    # replace the activity values with the corresponding labels
    activity_map = {i: label for i, label in enumerate(ACTIVITY_LABELS, start=1)}

    joined_df = joined_df.with_columns(pl.col("activity").replace_strict(activity_map))

    # replace the agent_kind values with the corresponding labels
    agent_kind_map = {i: label for i, label in enumerate(AGENT_KIND_LABELS, start=1)}
    joined_df = joined_df.with_columns(pl.col("kind").replace_strict(agent_kind_map))
    print(joined_df)

    # Format string to parse the input datetime with high precision and timezone
    parse_format_string = "%Y-%m-%d %H:%M:%S%.f%:z"
    # Format strings for the final output date and time columns without microseconds
    output_date_format_string = "%Y-%m-%d"
    output_time_format_string = "%H:%M:%S"

    try:
        # 1. Parse the datetime with high precision initially
        joined_df = joined_df.with_columns(
            pl.col("created_at")
            .str.strptime(
                pl.Datetime(time_unit="us", time_zone="UTC"),
                format=parse_format_string,
                strict=False,
            )
            .alias("created_at_dt")  # Intermediate high-precision datetime column
        )
        print("\n--- DataFrame after Initial Datetime Parsing ---")
        print(joined_df.select(["created_at", "created_at_dt"]).head())
        print(
            "Parsed Datetime column dtype:", joined_df.get_column("created_at_dt").dtype
        )

        # 2. Create the 'time_of_day' column using the hour from the high-precision datetime
        joined_df = joined_df.with_columns(
            pl.when(pl.col("created_at_dt").dt.hour() < MORNING_THRESHOLD_HOUR)
            .then(pl.lit("Manhã"))
            .otherwise(pl.lit("Tarde"))
            .alias("time_of_day")
        )
        print("\n--- DataFrame with Time of Day Column ---")
        print(joined_df.select(["created_at_dt", "time_of_day"]).head())

        # 3. Create the final 'date' and 'time' columns by formatting the parsed datetime
        joined_df = joined_df.with_columns(
            [
                pl.col("created_at_dt")
                .dt.strftime(output_date_format_string)
                .alias("date"),
                pl.col("created_at_dt")
                .dt.strftime(output_time_format_string)
                .alias("time"),
            ]
        )
        print("\n--- DataFrame with Separate Date and Time Columns ---")
        print(joined_df.select(["created_at_dt", "date", "time"]).head())
        print("Final Date column dtype:", joined_df.get_column("date").dtype)
        print("Final Time column dtype:", joined_df.get_column("time").dtype)

        print("\n--- Final DataFrame ---")
        # 4. Drop the original 'created_at' and the intermediate 'created_at_dt' columns
        joined_df = joined_df.drop("created_at", "created_at_dt", "agent_id")

        print(joined_df.head())
        print("Final DataFrame dtype:", joined_df.dtypes)
        joined_df.write_csv("dados_estatistica.csv")

    except Exception as e:
        # If error persists, it might be a row not matching the format string
        print(f"\nError parsing 'created_at' column: {e}")
        print(f"Attempted using format string: '{parse_format_string}'")
        print("Sample 'created_at' values that might be causing issues:")
        # Show the original created_at column for debugging
        print(records_df.head(10).select("created_at"))
