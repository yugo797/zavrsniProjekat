from sqlalchemy.orm import Session
from ..models.user import User
from ..schemas.user import UserCreate
# from ..auth import get_password_hash


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate):
    if get_user_by_email(db, user.email):
        raise ValueError("Email already registered")
     
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = User(email=user.email, hashed_password=fake_hashed_password)
    # hashed_password = get_password_hash(user.password)
    # db_user = User(email=user.email,
    #                hashed_password=hashed_password, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
