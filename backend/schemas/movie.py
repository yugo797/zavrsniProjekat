from pydantic import BaseModel

class MovieBase(BaseModel):
    title: str
    description: str
    year: int

class MovieCreate(MovieBase):
    pass  

class MovieUpdate(MovieBase):
    title: str | None = None
    description: str | None = None
    year: int | None = None

class Movie(MovieBase):
    id: int

    class Config:
        orm_mode = True
