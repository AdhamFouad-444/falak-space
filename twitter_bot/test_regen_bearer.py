import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("TWITTER_API_KEY")
API_SECRET = os.getenv("TWITTER_API_SECRET")

def generate_bearer():
    print("Attempting to generate Bearer token from API Key/Secret...")
    auth_str = f"{API_KEY}:{API_SECRET}"
    encoded_auth = base64.b64encode(auth_str.encode()).decode()
    
    url = "https://api.twitter.com/oauth2/token"
    headers = {
        "Authorization": f"Basic {encoded_auth}",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
    data = {"grant_type": "client_credentials"}
    
    response = requests.post(url, headers=headers, data=data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print("✅ API Key/Secret are VALID!")
        print(response.json())
    else:
        print(f"❌ Failed: {response.text}")

if __name__ == "__main__":
    generate_bearer()
