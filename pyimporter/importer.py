import polars as pl
import sqlite3 as sql


def load_csv(path: str):
    return pl.read_csv(path).drop_nulls()


def preprocess_students(sdf: pl.DataFrame) -> pl.DataFrame:
    sdf = sdf.drop("Nº Sócio")
    sdf = sdf.with_columns((pl.col("Ano/Turma").str.replace("º", "")))
    return sdf


if __name__ == "__main__":
    students = preprocess_students(load_csv("./data/alunos.csv"))
    print(students)

    # print(records)

    con = sql.connect("../libraryHub-24-25.db")
