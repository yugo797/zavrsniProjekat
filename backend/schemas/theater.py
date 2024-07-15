from pydantic import BaseModel


class TheaterBase(BaseModel):
    name: str
    location_id: int


class TheaterCreate(TheaterBase):
    pass


class Theater(TheaterBase):
    id: int

    class Config:
        orm_mode = True
