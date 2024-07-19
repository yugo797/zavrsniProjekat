from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    tickets = relationship("Ticket", back_populates="user")
    wishlist = relationship("Wishlist", uselist=False, back_populates="user")

