from pydantic import BaseModel, EmailStr


class EmailSchema(BaseModel):
    subject: str
    message: str
    sender_email: EmailStr
    receiver_email: EmailStr
