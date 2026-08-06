from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, Float, Text


class Base(DeclarativeBase):
    pass


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    year = Column(Integer)

    genres = Column(String)

    hero = Column(String)

    director = Column(String)

    cast = Column(Text)

    overview = Column(Text)

    language = Column(String)

    runtime = Column(Integer)

    rating = Column(Float)

    poster = Column(String)

    difficulty = Column(String)