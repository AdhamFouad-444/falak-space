"""Direct Twitter API v1.1 test using requests-oauthlib"""
from requests_oauthlib import OAuth1Session
from config import *

# Create OAuth1 session
twitter = OAuth1Session(
    TWITTER_API_KEY,
    client_secret=TWITTER_API_SECRET,
    resource_owner_key=TWITTER_ACCESS_TOKEN,
    resource_owner_secret=TWITTER_ACCESS_SECRET,
)

# Test by verifying credentials
url = "https://api.twitter.com/1.1/account/verify_credentials.json"
response = twitter.get(url)

print(f"Status Code: {response.status_code}")
if response.status_code == 200:
    data = response.json()
    print(f"✅ Authenticated as: @{data['screen_name']}")
    print(f"Account ID: {data['id']}")
else:
    print(f"❌ Error: {response.text}")
    
# If auth works, try posting
if response.status_code == 200:
    print("\nTrying to post a test tweet...")
    post_url = "https://api.twitter.com/2/tweets"
    tweet_data = {"text": "🚀 Testing FALAk Twitter Bot - This is a test post!"}
    
    post_response = twitter.post(post_url, json=tweet_data)
    print(f"Post Status: {post_response.status_code}")
    if post_response.status_code == 201:
        print("✅ Tweet posted successfully!")
        print(post_response.json())
    else:
        print(f"❌ Post failed: {post_response.text}")
