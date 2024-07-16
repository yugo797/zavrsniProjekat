from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.seat import Seat, SeatCreate
from ..crud.seat import get_seat, create_seat
from ..database import get_db

router = APIRouter()


@router.post("/seats/", response_model=Seat)
def create_new_seat(seat: SeatCreate, db: Session = Depends(get_db)):
    return create_seat(db=db, seat=seat)


@router.get("/seats/{seat_id}", response_model=Seat)
def read_seat(seat_id: int, db: Session = Depends(get_db)):
    db_seat = get_seat(db, seat_id)
    if db_seat is None:
        raise HTTPException(status_code=404, detail="Seat not found")
    return db_seat
