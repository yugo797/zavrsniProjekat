# from sqlalchemy.orm import Session
# from models.movie import Category
# from schemas.category import CategoryCreate


# def get_category(db: Session, category_id: int):
#     return db.query(Category).filter(Category.id == category_id).first()


# def create_category(db: Session, movie: CategoryCreate):
#     db_movie = Category(**movie.dict())
#     db.add(db_movie)
#     db.commit()
#     db.refresh(db_movie)
#     return db_movie
