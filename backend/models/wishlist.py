from sqlalchemy import Column, Integer, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base


wishlist_movie_association = Table(
    'wishlist_movie_association',
    Base.metadata,
    Column('wishlist_id', Integer, ForeignKey('wishlists.id')),
    Column('movie_id', Integer, ForeignKey('movies.id'))
)

class Wishlist(Base):
    __tablename__ = 'wishlists'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship("User", back_populates="wishlist")
    movies = relationship("Movie", secondary=wishlist_movie_association, back_populates="wishlists")
