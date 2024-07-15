from pydantic import BaseModel
from datetime import date


class MovieBase(BaseModel):
    title: str
    description: str
    duration: int
    release_date: date
    rating: float


class MovieCreate(MovieBase):
    pass


class Movie(MovieBase):
    id: int

    class Config:
        orm_mode = True
