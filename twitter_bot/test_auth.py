"""Test Twitter API authentication"""
import tweepy
from config import *

print("Testing Twitter API credentials...")
print(f"API Key: {TWITTER_API_KEY[:10]}...")
print(f"Access Token: {TWITTER_ACCESS_TOKEN[:20]}...")

try:
    # OAuth 1.0a Client
    client = tweepy.Client(
        consumer_key=TWITTER_API_KEY,
        consumer_secret=TWITTER_API_SECRET,
        access_token=TWITTER_ACCESS_TOKEN,
        access_token_secret=TWITTER_ACCESS_SECRET,
    )
    
    # Try to get authenticated user info
    me = client.get_me()
    print(f"\n✅ Authentication successful!")
    print(f"Logged in as: @{me.data.username}")
    
except tweepy.TweepyException as e:
    print(f"\n❌ Authentication failed:")
    print(f"Error: {e}")
