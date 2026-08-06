from pathlib import Path
import pandas as pd
import sqlite3
import ast

# =====================================================
# Locate project folders automatically
# =====================================================

BASE_DIR = Path(__file__).resolve().parent.parent

MOVIES_CSV = BASE_DIR / "datasets" / "tmdb_5000_movies.csv"
CREDITS_CSV = BASE_DIR / "datasets" / "tmdb_5000_credits.csv"
DATABASE = BASE_DIR / "oracle.db"

# =====================================================
# Read CSV Files
# =====================================================

print("📖 Reading datasets...")

movies = pd.read_csv(MOVIES_CSV)
credits = pd.read_csv(CREDITS_CSV)

print("✅ Datasets Loaded")

# =====================================================
# Merge Datasets
# =====================================================

movies = movies.merge(
    credits,
    on="title"
)

print(f"🎬 Total Movies Found : {len(movies)}")
print(movies.columns.tolist())

# =====================================================
# Connect SQLite
# =====================================================

conn = sqlite3.connect(DATABASE)

cursor = conn.cursor()

# =====================================================
# Helper Functions
# =====================================================

def extract_genres(text):

    try:

        genres = ast.literal_eval(text)

        return ", ".join(
            genre["name"]
            for genre in genres
        )

    except:

        return ""


def extract_cast(text):

    try:

        actors = ast.literal_eval(text)

        return ", ".join(
            actor["name"]
            for actor in actors[:5]
        )

    except:

        return ""


def extract_director(text):

    try:

        crew = ast.literal_eval(text)

        for person in crew:

            if person["job"] == "Director":

                return person["name"]

    except:

        pass

    return ""


def assign_hero(genres):

    genres = genres.lower()

    if "war" in genres:

        return "Achilles"

    if "action" in genres:

        return "Achilles"

    if "history" in genres:

        return "Agamemnon"

    if "adventure" in genres:

        return "Odysseus"

    if "fantasy" in genres:

        return "Zeus"

    if "romance" in genres:

        return "Helen"

    if "mystery" in genres:

        return "Athena"

    if "crime" in genres:

        return "Athena"

    return "Oracle"


def difficulty(vote):

    try:

        vote = float(vote)

        if vote >= 8.3:

            return "Easy"

        elif vote >= 7:

            return "Medium"

        elif vote >= 6:

            return "Hard"

        else:

            return "Oracle"

    except:

        return "Medium"

# =====================================================
# Insert Movies
# =====================================================

print("🚀 Importing Movies...\n")

count = 0

for _, row in movies.iterrows():

    genres = extract_genres(row["genres"])

    hero = assign_hero(genres)

    director = extract_director(row["crew"])

    cast = extract_cast(row["cast"])

    year = None

    if pd.notna(row["release_date"]):

        try:

            year = int(str(row["release_date"])[:4])

        except:

            pass

    cursor.execute(
        """
        INSERT INTO movies(
            title,
            year,
            genres,
            hero,
            director,
            cast,
            overview,
            language,
            runtime,
            rating,
            poster,
            difficulty
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        """,
        (
            row["title"],
            year,
            genres,
            hero,
            director,
            cast,
            row["overview"],
            row["original_language"],
            row["runtime"],
            row["vote_average"],
            "",
            difficulty(row["vote_average"])
        )
    )

    count += 1

    if count % 500 == 0:

        print(f"✅ Imported {count} movies...")

conn.commit()

conn.close()

print("\n===================================")
print(f"🏛️ Oracle Database Ready!")
print(f"🎬 Total Imported : {count}")
print("===================================")