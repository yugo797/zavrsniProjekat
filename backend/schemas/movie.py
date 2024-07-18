from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from .category import Category


class MovieBase(BaseModel):
    title: str
    description: str
    duration: int
    release_date: date
    rating: float


class MovieCreate(MovieBase):
    categories: List[int] = []


class MovieUpdate(MovieBase):
    title: str | None = None
    description: str | None = None


class Movie(MovieBase):
    id: int
    categories: List[Category] = []

    class Config:
        orm_mode = True
