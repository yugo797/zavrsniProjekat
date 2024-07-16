from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.wishlist import Wishlist, WishlistCreate
from ..crud.wishlist import get_wishlist, create_wishlist
from ..database import get_db
from ..dependencies import get_current_user

router = APIRouter()


@router.post("/wishlists/", response_model=Wishlist)
def create_new_wishlist(wishlist: WishlistCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_wishlist(db=db, wishlist=wishlist)


@router.get("/wishlists/{wishlist_id}", response_model=Wishlist)
def read_wishlist(wishlist_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_wishlist = get_wishlist(db, wishlist_id)
    if db_wishlist is None:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    return db_wishlist
