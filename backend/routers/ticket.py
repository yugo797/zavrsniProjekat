from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.ticket import Ticket, TicketCreate
from crud.ticket import get_ticket, create_ticket
from database import get_db

router = APIRouter()


@router.post("/tickets/", response_model=Ticket)
def create_new_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    return create_ticket(db=db, ticket=ticket)


@router.get("/tickets/{ticket_id}", response_model=Ticket)
def read_ticket(ticket_id: int, db: Session = Depends(get_db)):
    db_ticket = get_ticket(db, ticket_id)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket
