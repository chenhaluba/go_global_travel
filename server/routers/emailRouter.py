from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import status
from schemas.EmailSchema import EmailSchema
from services import emailService

router = APIRouter(tags=["email"])


 # send email by schema
@router.post('/send-email', status_code=status.HTTP_200_OK)
async def send_email_handler(email: EmailSchema):
    success = emailService.send_email(email.subject, email.message, email.sender_email, email.receiver_email)
    if success:
        return {'message': 'Email sent successfully'}
    else:
        raise HTTPException(status_code=500, detail='Failed to send email')
