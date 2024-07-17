from sqlalchemy.orm import Session
from models.ticket import Ticket
from schemas.ticket import TicketCreate


def get_ticket(db: Session, ticket_id: int):
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()


def get_tickets_by_user(db: Session, user_id: int):
    return db.query(Ticket).filter(Ticket.user_id == user_id).all()


def create_ticket(db: Session, ticket: TicketCreate):
    db_ticket = Ticket(**ticket.dict())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def update_ticket(db: Session, ticket_id: int, ticket: TicketCreate):
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if db_ticket:
        for key, value in ticket.dict(exclude_unset=True).items():
            setattr(db_ticket, key, value)
        db.commit()
        db.refresh(db_ticket)
    return db_ticket


def delete_ticket(db: Session, ticket_id: int):
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if db_ticket:
        db.delete(db_ticket)
        db.commit()
    return db_ticket


def get_all_tickets(db: Session):
    return db.query(Ticket).all()
