import sys
import tweepy
from config import *

def test_bearer():
    print("Testing with Bearer Token...")
    try:
        client = tweepy.Client(bearer_token=TWITTER_BEARER_TOKEN)
        me = client.get_me()
        print(f"✅ Success! (Bearer) Logged in as: @{me.data.username}")
    except Exception as e:
        print(f"❌ Failed (Bearer): {e}")

def test_oauth():
    print("\nTesting with OAuth 1.0a (User Auth)...")
    try:
        client = tweepy.Client(
            consumer_key=TWITTER_API_KEY,
            consumer_secret=TWITTER_API_SECRET,
            access_token=TWITTER_ACCESS_TOKEN,
            access_token_secret=TWITTER_ACCESS_SECRET
        )
        me = client.get_me()
        print(f"✅ Success! (OAuth 1.0a) Logged in as: @{me.data.username}")
    except Exception as e:
        print(f"❌ Failed (OAuth 1.0a): {e}")

if __name__ == "__main__":
    print(f"DEBUG: TWITTER_API_KEY is {'set' if TWITTER_API_KEY else 'NONE'}")
    print(f"DEBUG: TWITTER_API_SECRET is {'set' if TWITTER_API_SECRET else 'NONE'}")
    print(f"DEBUG: TWITTER_ACCESS_TOKEN is {'set' if TWITTER_ACCESS_TOKEN else 'NONE'}")
    print(f"DEBUG: TWITTER_ACCESS_SECRET is {'set' if TWITTER_ACCESS_SECRET else 'NONE'}")
    print(f"DEBUG: TWITTER_BEARER_TOKEN is {'set' if TWITTER_BEARER_TOKEN else 'NONE'}")

    if "--bearer" in sys.argv:
        test_bearer()
    elif "--oauth" in sys.argv:
        test_oauth()
    else:
        test_bearer()
        test_oauth()
