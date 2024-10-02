import polars as pl
import sqlite3 as sql
import random

from datetime import datetime, timedelta


def load_csv(path: str):
    return pl.read_csv(path).drop_nulls()


def preprocess_students(sdf: pl.DataFrame) -> pl.DataFrame:
    current_time = datetime.now().isoformat()
    return sdf.rename(
        {"Nº Sócio": "id", "Nome do Aluno": "name", "Ano/Turma": "class"}
    ).with_columns(
        pl.lit(current_time).alias("created_at"),
        pl.lit(current_time).alias("updated_at"),
        pl.lit(None).alias("deleted_at"),
        pl.lit(1).alias("agent_kind"),
        pl.col("class").str.replace("º", ""),
    )


def convert_to_iso(datetime_str: str) -> str:
    # Split the date and time part
    date_part, time_of_day = datetime_str.split("-")

    # Parse the date part (DD/MM/YYYY)
    day, month, year = map(int, date_part.split("/"))
    date = datetime(year, month, day)

    # Generate a random time based on the time of day (Morning/Afternoon)
    if time_of_day.lower() == "manhã":
        # Random time between 8:00 and 12:00
        hour = random.randint(8, 11)
        minute = random.randint(0, 59)
    elif time_of_day.lower() == "tarde":
        # Random time between 12:00 and 15:30
        hour = random.randint(12, 15)
        if hour == 15:
            minute = random.randint(0, 30)
        else:
            minute = random.randint(0, 59)
    else:
        raise ValueError("Invalid time of day. Use 'Manhã' or 'Tarde'.")

    # Combine date and time
    final_datetime = date + timedelta(hours=hour, minutes=minute)

    # Convert to ISO format
    return final_datetime.isoformat()


def activity_str_to_int(act: str) -> int:
    match act:
        case "Computadores":
            return 1
        case "Trabalho Individual":
            return 2
        case "Trabalho de grupo":
            return 3
        case "Espaço Lúdico":
            return 4


def preprocess_records(rdf: pl.DataFrame) -> pl.DataFrame:
    rdf = (
        rdf.drop("Ano/Turma", "Nome ")
        .rename({"N.º Aluno ": "agent_id", "Espaço": "activity"})
        .with_columns(
            pl.concat_str(["Dia", "Turno"], separator="-").alias("time"),
            pl.lit(None).alias("deleted_at"),
        )
        .drop("Dia", "Turno")
    )

    return rdf.with_columns(
        pl.col("time")
        .map_elements(convert_to_iso, return_dtype=str)
        .alias("created_at"),
        pl.col("time")
        .map_elements(convert_to_iso, return_dtype=str)
        .alias("updated_at"),
        pl.col("activity").map_elements(activity_str_to_int, return_dtype=int),
    ).drop("time")


if __name__ == "__main__":
    students = preprocess_students(load_csv("./data/alunos.csv"))
    print(students)
    records = preprocess_records(load_csv("./data/registos.csv"))
    print(records)

    con = sql.connect(
        "../libraryHub-24-25.db", detect_types=sql.PARSE_DECLTYPES | sql.PARSE_COLNAMES
    )
    cur = con.cursor()
    res = cur.executemany(
        """
        INSERT INTO agents(
            id,
            name,
            class,
            created_at,
            updated_at,
            deleted_at,
            agent_kind
        ) VALUES(?, ?, ?, ?, ?, ?, ?)
        """,
        students.iter_rows(),
    )
    print(res.rowcount)

    res = cur.executemany(
        """
        INSERT INTO records(
            agent_id,
            activity,
            created_at,
            updated_at,
            deleted_at
        ) VALUES(?, ?, ?, ?, ?)
        """,
        records.iter_rows(),
    )
    print(res.rowcount)

    con.commit()
