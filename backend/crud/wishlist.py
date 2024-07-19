from sqlalchemy.orm import Session
from ..models.wishlist import Wishlist, wishlist_movie_association, Movie  
from ..schemas.wishlist import WishlistCreate

def get_wishlist(db: Session, wishlist_id: int):
    return db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()

def get_wishlist_by_user(db: Session, user_id: int):
    return db.query(Wishlist).filter(Wishlist.user_id == user_id).first()

def create_wishlist(db: Session, wishlist: WishlistCreate):
    db_wishlist = Wishlist(user_id=wishlist.user_id)
    db.add(db_wishlist)
    db.commit()
    db.refresh(db_wishlist)
    
    # Dodavanje filmova u listu želja
    if wishlist.movie_ids:
        movies = db.query(Movie).filter(Movie.id.in_(wishlist.movie_ids)).all()
        db_wishlist.movies.extend(movies)
        db.commit()

    return db_wishlist

def update_wishlist(db: Session, wishlist_id: int, wishlist: WishlistCreate):
    db_wishlist = db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()
    if db_wishlist:
        db_wishlist.user_id = wishlist.user_id
        if wishlist.movie_ids:
            db_wishlist.movies = db.query(Movie).filter(Movie.id.in_(wishlist.movie_ids)).all()
        db.commit()
        db.refresh(db_wishlist)
    return db_wishlist

def delete_wishlist(db: Session, wishlist_id: int):
    db_wishlist = db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()
    if db_wishlist:
        db.delete(db_wishlist)
        db.commit()
    return db_wishlist

def get_all_wishlists(db: Session):
    return db.query(Wishlist).all()
