from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.wishlist import Wishlist, WishlistCreate, WishlistUpdate
from crud.wishlist import get_wishlist, create_wishlist, get_wishlist_by_user
from schemas.user import User
from database import get_db
from dependencies import get_current_user
from typing import List

router = APIRouter()


@router.post("/", response_model=Wishlist)
def create_new_wishlist(wishlist: WishlistCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_wishlist(db=db, wishlist=wishlist, user=current_user.id)


@router.get("/{wishlist_id}", response_model=Wishlist)
def read_wishlist(wishlist_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_wishlist = get_wishlist(db, wishlist_id)
    if db_wishlist is None:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    return db_wishlist


@router.get("/", response_model=List[Wishlist])
def read_user_wishlists(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_wishlist_by_user(db, user_id=current_user.id)


@router.put("/{wishlist_id}", response_model=Wishlist)
def update_existing_wishlist(wishlist_id: int, wishlist: WishlistUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_wishlist = get_wishlist(db, wishlist_id)
    if db_wishlist is None:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    if db_wishlist.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this wishlist")
    return update_wishlist(db=db, wishlist=wishlist, wishlist_id=wishlist_id)


@router.delete("/{wishlist_id}", response_model=Wishlist)
def delete_existing_wishlist_item(wishlist_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_wishlist = delete_wishlist_item(db, wishlist_id)
    if db_wishlist is None:
        raise HTTPException(status_code=404, detail="Wishlist not found")
    if db_wishlist.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this wishlist")
    return db_wishlist

@router.get("/all", response_model=List[Wishlist])
def read_all_wishlists(db: Session = Depends(get_db)):
    return get_all_wishlists(db)