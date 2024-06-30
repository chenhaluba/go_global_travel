from pydantic import BaseModel
from datetime import date
from typing import Optional


class JobSchema(BaseModel):
    start_time : date
    completion_time : date
    job_name : str
    category : str
    description : str
    responsible_person : str
    responsible_person_email : str
    status : str
    comments: Optional[str] = None 
    resolution_comment : Optional[str] = None

class JobStatusSChema(BaseModel):
    status : str
    resolution_comment: str


