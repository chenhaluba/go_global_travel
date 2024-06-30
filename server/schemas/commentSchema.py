from pydantic import BaseModel

class CommentSchema(BaseModel):
    job_id : int
    comment : str
