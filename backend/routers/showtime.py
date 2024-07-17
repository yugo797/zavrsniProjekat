from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.showtime import Showtime, ShowtimeCreate
from crud.showtime import get_showtime, create_showtime
from database import get_db

router = APIRouter()


@router.post("/showtimes/", response_model=Showtime)
def create_new_showtime(showtime: ShowtimeCreate, db: Session = Depends(get_db)):
    return create_showtime(db=db, showtime=showtime)


@router.get("/showtimes/{showtime_id}", response_model=Showtime)
def read_showtime(showtime_id: int, db: Session = Depends(get_db)):
    db_showtime = get_showtime(db, showtime_id)
    if db_showtime is None:
        raise HTTPException(status_code=404, detail="Showtime not found")
    return db_showtime
