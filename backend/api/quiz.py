import sqlite3
from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel

from api.session import create_session, get_session

router = APIRouter()

# =====================================================
# Database
# =====================================================

BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE = BASE_DIR / "oracle.db"

# =====================================================
# GET RANDOM MOVIE
# =====================================================

@router.get("/oracle/{hero}")
def get_movie(hero: str):

    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM movies
        WHERE hero = ?
        ORDER BY RANDOM()
        LIMIT 1
        """,
        (hero,)
    )

    movie = cursor.fetchone()

    conn.close()

    if movie is None:
        return {
            "error": "No movies found."
        }

    # ----------------------------------------
    # Oracle Clues
    # ----------------------------------------

    clues = []

    # ⭐⭐⭐⭐⭐
    if movie["genres"]:
        clues.append(
            f"🎭 Genre: {movie['genres']}"
        )

    # ⭐⭐⭐⭐
    if movie["director"]:
        clues.append(
            f"🎬 Director: {movie['director']}"
        )

    # ⭐⭐⭐
    if movie["cast"]:
        clues.append(
            f"🌟 Cast: {movie['cast']}"
        )

    # ⭐⭐
    if movie["overview"]:
        clues.append(
            f"📖 {movie['overview']}"
        )

    session_id = create_session(movie)

    return {
        "sessionId": session_id,
        "hero": movie["hero"],
        "clues": clues
    }

# =====================================================
# Guess Request Model
# =====================================================

class GuessRequest(BaseModel):
    sessionId: str
    guess: str

# =====================================================
# Check Guess
# =====================================================

@router.post("/oracle/guess")
def check_guess(data: GuessRequest):

    movie = get_session(data.sessionId)

    if movie is None:
        return {
            "correct": False,
            "message": "Session expired."
        }

    user_guess = data.guess.strip().lower()
    actual_movie = movie["title"].strip().lower()

    if user_guess == actual_movie:
        return {
            "correct": True,
            "hero": movie["hero"],
            "message": "Excellent. You have chosen wisely."
        }

    return {
        "correct": False,
        "hero": movie["hero"],
        "answer": movie["title"],
        "message": "The Oracle remembers another name..."
    }