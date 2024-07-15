from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base


class Wishlist(Base):
    __tablename__ = 'wishlists'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    movie_id = Column(Integer, ForeignKey('movies.id'))

    user = relationship("User", back_populates="wishlist")
    movie = relationship("Movie", back_populates="wishlist")
