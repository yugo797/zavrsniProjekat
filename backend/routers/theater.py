from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.theater import Theater, TheaterCreate
from ..crud.theater import get_theater, create_theater
from ..database import get_db

router = APIRouter()


@router.post("/theaters/", response_model=Theater)
def create_new_theater(theater: TheaterCreate, db: Session = Depends(get_db)):
    return create_theater(db=db, theater=theater)


@router.get("/theaters/{theater_id}", response_model=Theater)
def read_theater(theater_id: int, db: Session = Depends(get_db)):
    db_theater = get_theater(db, theater_id)
    if db_theater is None:
        raise HTTPException(status_code=404, detail="Theater not found")
    return db_theater
