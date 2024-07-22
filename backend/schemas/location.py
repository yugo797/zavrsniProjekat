from pydantic import BaseModel


class LocationBase(BaseModel):
    city: str = "Podgorica"
    country: str = "Crna Gora"
    place = str = None


class LocationCreate(LocationBase):
    pass


class Location(LocationBase):
    id: int

    class Config:
        orm_mode = True
