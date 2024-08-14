# from sqlalchemy.orm import Session
# from models.wishlist import Wishlist, WishlistMovie
# from models.movie import Movie
# from schemas.wishlist import WishlistCreate


# def get_wishlist(db: Session, wishlist_id: int):
#     return db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()


# def get_wishlist_by_user(db: Session, user_id: int):
#     # wishlist = db.query(Wishlist).filter(Wishlist.user_id == user_id).first()
#     # if wishlist is None:
#     #     return []
#     # return wishlist
#     return db.query(Wishlist).filter(Wishlist.user_id == user_id).all()


# def create_wishlist(db: Session, wishlist: WishlistCreate, user):
#     db_wishlist = Wishlist(
#         user_id=user
#     )
#     db.add(db_wishlist)
#     db.commit()
#     db.refresh(db_wishlist)

#     # Dodavanje filmova u listu želja
#     for movie_id in wishlist.movie_ids:
#         db_movie_wishlist = WishlistMovie(
#             movie_id=movie_id, wishlist_id=db_wishlist.id)
#         db.add(db_movie_wishlist)
#         db.commit()
#         db.refresh(db_movie_wishlist)

#     return db_wishlist


# def update_wishlist(db: Session, wishlist_id: int, wishlist: WishlistCreate):
#     db_wishlist = db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()
#     if db_wishlist:
#         db_wishlist.user_id = wishlist.user_id
#         if wishlist.movie_ids:
#             db_wishlist.movies = db.query(Movie).filter(
#                 Movie.id.in_(wishlist.movie_ids)).all()
#         db.commit()
#         db.refresh(db_wishlist)
#     return db_wishlist


# def delete_wishlist(db: Session, wishlist_id: int):
#     db_wishlist = db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()
#     if db_wishlist:
#         db.delete(db_wishlist)
#         db.commit()
#     return db_wishlist


# def get_all_wishlists(db: Session):
#     return db.query(Wishlist).all()

from sqlalchemy.orm import Session
from models.wishlist import Wishlist
from models.movie import Movie
from schemas.wishlist import WishlistCreate, WishlistUpdate


def get_wishlist(db: Session, wishlist_id: int):
    return db.query(Wishlist).filter(Wishlist.id == wishlist_id).first()
    
def get_all_wishlists(db: Session):
    return db.query(Wishlist).all()

# def get_wishlists(db: Session, skip: int = 0, limit: int = 10):
#     return db.query(Wishlist).offset(skip).limit(limit).all()


def get_wishlists_by_user(db: Session, user_id: int):
    return db.query(Wishlist).filter(Wishlist.user_id == user_id).all()


def create_wishlist(db: Session, wishlist: WishlistCreate):
    db_wishlist = Wishlist(user_id=wishlist.user_id)
    db.add(db_wishlist)
    db.commit()
    db.refresh(db_wishlist)
    for movie_id in wishlist.movie_ids:
        db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
        if db_movie:
            db_wishlist.movies.append(db_movie)
    db.commit()
    db.refresh(db_wishlist)
    return db_wishlist


def update_wishlist(db: Session, wishlist_id: int, wishlist: WishlistUpdate):
    db_wishlist = get_wishlist(db, wishlist_id)
    if db_wishlist:
        db_wishlist.user_id = wishlist.user_id
        db_wishlist.movies = []
        for movie_id in wishlist.movie_ids:
            db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
            if db_movie:
                db_wishlist.movies.append(db_movie)
        db.commit()
        db.refresh(db_wishlist)
    return db_wishlist


def delete_wishlist(db: Session, wishlist_id: int):
    db_wishlist = get_wishlist(db, wishlist_id)
    if db_wishlist:
        db.delete(db_wishlist)
        db.commit()
    return db_wishlist
