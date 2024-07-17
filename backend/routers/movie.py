from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.movie import Movie, MovieCreate
from crud.movie import get_movie, create_movie
from database import get_db

router = APIRouter()


@router.post("/movies/", response_model=Movie)
def create_new_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    return create_movie(db=db, movie=movie)


@router.get("/movies/{movie_id}", response_model=Movie)
def read_movie(movie_id: int, db: Session = Depends(get_db)):
    db_movie = get_movie(db, movie_id)
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie
