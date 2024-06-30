from sqlalchemy import Column, Integer, String, Date, ForeignKey
from db.sqlDB import Base


class History(Base):
    __tablename__ = "history"

    id=Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey('jobs.id'))
    start_time = Column(Date)
    completion_time = Column(Date)
    job_name = Column(String(100))
    category = Column(String(100))
    description = Column(String(250))
    responsible_person = Column(String(100))
    responsible_person_email = Column(String(250))
    status = Column(String(100))
    comments = Column(String(5000), nullable=True)
    resolution_comment = Column(String(250), nullable=True)


  