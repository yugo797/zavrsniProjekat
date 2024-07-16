from sqlalchemy.orm import Session
from ..models.wishlist import Wishlist  
from ..schemas.wishlist import WishlistCreate  


def get_wishlist(db: Session, wishlist_id: int):
    return db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()


def get_wishlist_by_user(db: Session, user_id: int):
    return db.query(Wishlist).filter(Wishlist.user_id == user_id).all()


def create_wishlist(db: Session, wishlist: WishlistCreate):
    db_wishlist = Wishlist(**wishlist.dict())
    db.add(db_wishlist)
    db.commit()
    db.refresh(db_wishlist)
    return db_wishlist


def delete_wishlist_item(db: Session, wishlist_id: int):
    db_wishlist = db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()
    if db_wishlist:
        db.delete(db_wishlist)
        db.commit()
    return db_wishlist


def get_all_wishlists(db: Session):
    return db.query(Wishlist).all()
