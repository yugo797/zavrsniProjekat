from pydantic import BaseModel


class LocationBase(BaseModel):
    city: str
    state: str
    country: str


class LocationCreate(LocationBase):
    pass


class Location(LocationBase):
    id: int

    class Config:
        orm_mode = True
