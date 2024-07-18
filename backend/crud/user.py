from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate, UserUpdate
from auth import get_password_hash


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate):
    if get_user_by_email(db, user.email):
        raise ValueError("Email already registered")

    # fake_hashed_password = user.password + "notreallyhashed"
    # db_user = User(name=user.name, email=user.email, hashed_password=fake_hashed_password,
    #                is_admin=user.is_admin if user.is_admin is not None else False)
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email,
                   hashed_password=hashed_password, name=user.name, is_admin=user.is_admin if user.is_admin is not None else False)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update(
    self, db: Session, db_obj: User, obj_in: UserUpdate
) -> User:
    if obj_in.password:
        hashed_password = get_password_hash(user.password)
        db_obj.password = fake_hashed_password
    if obj_in.name:
        db_obj.name = obj_in.name
    if obj_in.email:
        db_obj.email = obj_in.email
    if obj_in.is_admin is not None:
        db_obj.is_admin = obj_in.is_admin
    db.commit()
    db.refresh(db_obj)
    return db_obj
