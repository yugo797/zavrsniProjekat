# from fastapi import FastAPI

# app = FastAPI()


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


from fastapi import FastAPI
from .routers import user, movie, theater, showtime, seat, ticket, payment

app = FastAPI()

app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(movie.router, prefix="/movies", tags=["movies"])
app.include_router(theater.router, prefix="/theaters", tags=["theaters"])
app.include_router(showtime.router, prefix="/showtimes", tags=["showtimes"])
app.include_router(seat.router, prefix="/seats", tags=["seats"])
app.include_router(ticket.router, prefix="/tickets", tags=["tickets"])
app.include_router(payment.router, prefix="/payments", tags=["payments"])
