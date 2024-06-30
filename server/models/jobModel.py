from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship
from db.sqlDB import Base


class Job(Base):
    __tablename__ = "jobs"

    id=Column(Integer, primary_key=True, index=True)
    start_time = Column(Date)
    completion_time = Column(Date)
    job_name = Column(String(100))
    category = Column(String(100))
    description = Column(String(250))
    responsible_person = Column(String(100))
    responsible_person_email = Column(String(250))
    status = Column(String(100))
    comments = relationship("Comment", back_populates="job")
    resolution_comment = Column(String(250), nullable=True)

  