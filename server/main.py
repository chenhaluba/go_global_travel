from fastapi import FastAPI
from models.jobModel import Base
from db.sqlDB import engine
from routers import jobsRouter, jobsHistoryRouter, emailRouter
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app= FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  #frontend URL
     "http://192.168.1.9:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(jobsRouter.router)
app.include_router(jobsHistoryRouter.router)
app.include_router(emailRouter.router)

