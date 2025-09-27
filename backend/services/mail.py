# services/mail.py
import os
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from sib_api_v3_sdk.configuration import Configuration
from sib_api_v3_sdk.models.send_smtp_email import SendSmtpEmail
import requests

def send_contract_email(contract):
    """Send contract email to vendor using Brevo API"""
    
    configuration = Configuration()
    api_key = os.getenv('SAP')
    
    if not api_key:
        print("❌ BREVO_API_KEY environment variable not set")
        return False
    
    configuration.api_key['api-key'] = api_key
    
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )
    
    try:
        # Create email object
        send_email = SendSmtpEmail(
            to=[{
                "email": contract.vendor_email, 
                "name": "Vendor"
            }],
            sender={
                "email": os.getenv('SENDER_EMAIL', 'noreply@yourcompany.com'),
                "name": os.getenv('COMPANY_NAME', 'Your Company')
            },
            subject="New Vendor Contract Request",
            html_content=f"""
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Contract Request</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #2c3e50;">New Contract Request</h2>
                            
                            <p>Dear Vendor,</p>
                            
                            <p>We have a new contract request for the following services:</p>
                            
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <h3 style="margin-top: 0; color: #495057;">Required Services:</h3>
                                <ul style="margin-bottom: 0;">
                                    {''.join(f'<li style="margin-bottom: 5px;">{need}</li>' for need in contract.needs)}
                                </ul>
                            </div>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="{os.getenv('FRONTEND_URL', 'https://yourapp.com')}/contract-response?id={contract.id}" 
                                   style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                    Review & Respond to Contract
                                </a>
                            </div>
                            
                            <p>Please review the requirements and respond at your earliest convenience.</p>
                            
                            <p>Best regards,<br>
                            {os.getenv('COMPANY_NAME', 'Your Company')}</p>
                            
                            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                            <p style="font-size: 12px; color: #666;">
                                Contract ID: {contract.id}<br>
                                This is an automated message. Please do not reply directly to this email.
                            </p>
                        </div>
                    </body>
                </html>
            """,
            # Optional: Add plain text version
            text_content=f"""
                New Contract Request
                
                Dear Vendor,
                
                We have a new contract request for the following services:
                
                {chr(10).join(f'- {need}' for need in contract.needs)}
                
                Please visit: {os.getenv('FRONTEND_URL', 'https://yourapp.com')}/contract-response?id={contract.id}
                
                Contract ID: {contract.id}
                
                Best regards,
                {os.getenv('COMPANY_NAME', 'Your Company')}
            """
        )
        
        # Send the email
        response = api_instance.send_transac_email(send_email)
        print(f" Email sent successfully. Message ID: {response.message_id}, {response}")
        return True
        
    except ApiException as e:
        print(f" Brevo API error: {e}")
        print(f"Status code: {e.status}")
        print(f"Reason: {e.reason}")
        print(f"Body: {e.body}")
        return False
        
    except Exception as e:
        print(f"Unexpected error sending email: {e}")
        return False

def send_contract_email_v2(contract):
    """Alternative implementation with manual header setting"""
    try:
        import requests
        
        api_key = os.getenv('SAP')
        if not api_key:
            print("❌ BREVO_API_KEY environment variable not set")
            return False
            
        url = "https://api.brevo.com/v3/smtp/email"
        
        headers = {
            'api-key': api_key,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        payload = {
            'to': [{'email': contract.vendor_email, 'name': 'Vendor'}],
            'sender': {
                'email': os.getenv('SENDER_EMAIL', 'noreply@yourcompany.com'),
                'name': os.getenv('COMPANY_NAME', 'Your Company')
            },
            'subject': 'New Vendor Contract Request',
            'htmlContent': f"""
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Contract Request</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2>New Contract Request</h2>
                        <p>Dear Vendor,</p>
                        <p>We have a new contract request for the following services:</p>
                        <ul>
                            {''.join(f'<li>{need}</li>' for need in contract.needs)}
                        </ul>
                        <p>
                            <a href="{os.getenv('FRONTEND_URL', 'https://yourapp.com')}/contract-response?id={contract.id}" 
                               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none;">
                                Review & Respond
                            </a>
                        </p>
                        <p>Best regards,<br>{os.getenv('COMPANY_NAME', 'Your Company')}</p>
                        <p><small>Contract ID: {contract.id}</small></p>
                    </body>
                </html>
            """,
            'textContent': f"""
                New Contract Request
                
                Dear Vendor,
                
                We have a new contract request for the following services:
                {chr(10).join(f'- {need}' for need in contract.needs)}
                
                Please visit: {os.getenv('FRONTEND_URL', 'https://yourapp.com')}/contract-response?id={contract.id}
                
                Contract ID: {contract.id}
                
                Best regards,
                {os.getenv('COMPANY_NAME', 'Your Company')}
            """
        }
        
        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code == 201:
            result = response.json()
            print(f" Email sent successfully via direct API. Message ID: {result.get('messageId')}")
            return True
        else:
            print(f" Direct API error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f" Error with direct API method: {e}")
        return False

# Use this as the main function - it combines both methods
def send_contract_email_robust(contract):
    """Try SDK first, fallback to direct API call"""
    
    # First try the SDK method
    if send_contract_email(contract):
        return True
    
    print("SDK method failed, trying direct API...")
    
    # Fallback to direct API call
    return send_contract_email_v2(contract)

def send_certificate_email(certificate):
    """Send certificate email to user using Brevo SDK"""
    configuration = Configuration()
    api_key = os.getenv('SAP')
    if not api_key:
        print("❌ BREVO_API_KEY environment variable not set")
        return False
    configuration.api_key['api-key'] = api_key
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

    try:
        to_email = certificate.get("email") or certificate.get("user_email") or certificate.get("user").get("email")
    except Exception:
        to_email = None

    if not to_email:
        print("❌ Certificate recipient email not provided")
        return False

    title = certificate.get("title", "Certificate")
    description = certificate.get("description", "")
    issued = certificate.get("issued_date", "")
    cert_id = str(certificate.get("id") or certificate.get("_id") or "")

    html_content = f"""
        <html><body>
        <h2>You've received a certificate: {title}</h2>
        <p>{description}</p>
        <p>Issued: {issued}</p>
        <p>Certificate ID: {cert_id}</p>
        <p>Please download your certificate from the portal.</p>
        </body></html>
    """

    send_email = SendSmtpEmail(
        to=[{"email": to_email, "name": certificate.get("name", "") or ""}],
        sender={
            "email": os.getenv('SENDER_EMAIL', 'noreply@yourcompany.com'),
            "name": os.getenv('COMPANY_NAME', 'Your Company')
        },
        subject=f"Your Certificate: {title}",
        html_content=html_content,
        text_content=f"You have been issued a certificate ({title}). Certificate ID: {cert_id}"
    )

    try:
        response = api_instance.send_transac_email(send_email)
        print(f" Certificate email sent. Message ID: {getattr(response, 'message_id', None)}")
        return True
    except ApiException as e:
        print(f" Brevo API error (certificate): {e}")
        return False
    except Exception as e:
        print(f" Unexpected error sending certificate email: {e}")
        return False

def send_certificate_email_v2(certificate):
    """Fallback direct HTTP method for certificate emails"""
    api_key = os.getenv('SAP')
    if not api_key:
        print("❌ BREVO_API_KEY environment variable not set")
        return False

    url = "https://api.brevo.com/v3/smtp/email"
    try:
        to_email = certificate.get("email") or certificate.get("user_email") or certificate.get("user").get("email")
    except Exception:
        to_email = None
    if not to_email:
        print("❌ Certificate recipient email not provided")
        return False

    title = certificate.get("title", "Certificate")
    description = certificate.get("description", "")
    issued = certificate.get("issued_date", "")
    cert_id = str(certificate.get("id") or certificate.get("_id") or "")

    payload = {
        'to': [{'email': to_email, 'name': certificate.get("name", "")}],
        'sender': {
            'email': os.getenv('SENDER_EMAIL', 'noreply@yourcompany.com'),
            'name': os.getenv('COMPANY_NAME', 'Your Company')
        },
        'subject': f'Your Certificate: {title}',
        'htmlContent': f"""
            <html><body>
            <h2>You've received a certificate: {title}</h2>
            <p>{description}</p>
            <p>Issued: {issued}</p>
            <p>Certificate ID: {cert_id}</p>
            </body></html>
        """,
        'textContent': f"You have been issued a certificate ({title}). Certificate ID: {cert_id}"
    }

    headers = {
        'api-key': api_key,
        'Content-Type': 'application/json'
    }

    resp = requests.post(url, headers=headers, json=payload)
    if resp.status_code in (200, 201):
        print(" Certificate email sent via direct API")
        return True
    else:
        print(f" Direct API error sending certificate email: {resp.status_code} {resp.text}")
        return False

def send_certificate_email_robust(certificate):
    """Try SDK first, fallback to direct API"""
    try:
        if send_certificate_email(certificate):
            return True
    except Exception as e:
        print(f"sdk send failed: {e}")
    print("SDK method failed for certificate, trying direct API...")
    return send_certificate_email_v2(certificate)