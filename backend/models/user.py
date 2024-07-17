from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(16), index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(100))

    tickets = relationship("Ticket", back_populates="user")
    wishlist = relationship("Wishlist", back_populates="user")
