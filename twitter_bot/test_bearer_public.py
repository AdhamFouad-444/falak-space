import requests
import os
from dotenv import load_dotenv

load_dotenv()
BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

def test_public_lookup(username):
    print(f"Testing public lookup for @{username}...")
    url = f"https://api.twitter.com/2/users/by/username/{username}"
    headers = {"Authorization": f"Bearer {BEARER_TOKEN}"}
    
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("✅ Bearer token is VALID for public data!")
        print(response.json())
    else:
        print(f"❌ Failed: {response.text}")

if __name__ == "__main__":
    # Try looking up a known account (e.g. Twitter or FALAk if known)
    test_public_lookup("Twitter")
