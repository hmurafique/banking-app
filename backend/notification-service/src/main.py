from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "notification-service"}

@app.post("/notify/email")
def send_email_notification(email: str, subject: str, message: str):
    # 🚨 In real project, integrate with SendGrid / SES / SMTP
    return {
        "to": email,
        "subject": subject,
        "message": message,
        "status": "sent (dummy)"
    }

@app.post("/notify/sms")
def send_sms_notification(phone: str, message: str):
    # 🚨 In real project, integrate with Twilio / Nexmo
    return {
        "to": phone,
        "message": message,
        "status": "sent (dummy)"
    }
