import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(subject, message, sender_email, receiver_email):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587 
    
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    password = 'ibvl huzo yvzc rgki'
    
    msg.attach(MIMEText(message, 'plain'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        
        server.login(sender_email, password)

        server.sendmail(sender_email, receiver_email, msg.as_string())
        print('Email sent successfully!')
        return True
    except Exception as e:
        print(f'Error sending email: {e}')
        return False
    finally:
        server.quit()
