from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str
    is_admin: bool = False


class UserUpdate(UserBase):
    password: str = None
    is_admin: bool = None


class User(UserBase):
    id: int
    is_admin: bool

    class Config:
        orm_mode = True
