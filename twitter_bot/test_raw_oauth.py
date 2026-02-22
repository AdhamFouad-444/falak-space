import requests
from requests_oauthlib import OAuth1
import os
from dotenv import load_dotenv

load_dotenv()

# Keys from .env
CONSUMER_KEY = os.getenv("TWITTER_API_KEY")
CONSUMER_SECRET = os.getenv("TWITTER_API_SECRET")
ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.getenv("TWITTER_ACCESS_SECRET")

def test_raw():
    print(f"Testing raw OAuth1... (Key: {CONSUMER_KEY[:5]}...)")
    url = "https://api.twitter.com/1.1/account/verify_credentials.json"
    auth = OAuth1(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    
    try:
        response = requests.get(url, auth=auth)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_raw()
