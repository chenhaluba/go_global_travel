from pydantic import BaseModel
from datetime import date
from typing import Optional


class HistorySchema(BaseModel):
    job_id : int
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
