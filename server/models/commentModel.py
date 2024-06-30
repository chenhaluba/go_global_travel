from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.sqlDB import Base


class Comment(Base):
    __tablename__ = "comments"

    id=Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey('jobs.id'))
    comment = Column(String(250))

    job = relationship("Job", back_populates="comments")
