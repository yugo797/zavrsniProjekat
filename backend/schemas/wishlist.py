from pydantic import BaseModel
from typing import List

class WishlistBase(BaseModel):
    user_id: int

class WishlistCreate(WishlistBase):
    movie_ids: List[int]

class Wishlist(WishlistBase):
    id: int
    movie_ids: List[int]

    class Config:
        orm_mode = True
