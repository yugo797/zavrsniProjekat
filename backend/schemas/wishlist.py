from pydantic import BaseModel


class WishlistBase(BaseModel):
    user_id: int
    movie_id: int


class WishlistCreate(WishlistBase):
    pass


class WishlistUpdate(WishlistBase):
    pass


class Wishlist(WishlistBase):
    id: int

    class Config:
        orm_mode = True
