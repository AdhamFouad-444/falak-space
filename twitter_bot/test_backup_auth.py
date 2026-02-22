"""Test Twitter API authentication with keys from .env_backup"""
import tweepy

# Keys from .env_backup
TWITTER_API_KEY="xtYeiz3TD8m4SH00aAkf5zpAV"
TWITTER_API_SECRET="Qu5pvXI241n09Co3BuqomRaPHRP0STvSAAmTt1IYoS5te6cAwN"
TWITTER_ACCESS_TOKEN="2018675728405909504-RMNAF0u2NF92nr8DI1ErytvDu2qlWr"
TWITTER_ACCESS_SECRET="7l1MYXnLjd6Kpr8F7slQEc8Gcy4rQVsCYNxo3Cotv78Z3"

print("Testing Twitter API credentials from .env_backup...")

try:
    # OAuth 1.0a Client (V2)
    client = tweepy.Client(
        consumer_key=TWITTER_API_KEY,
        consumer_secret=TWITTER_API_SECRET,
        access_token=TWITTER_ACCESS_TOKEN,
        access_token_secret=TWITTER_ACCESS_SECRET,
    )
    
    # Try to get authenticated user info
    me = client.get_me()
    if me.data:
        print(f"\n✅ Authentication successful!")
        print(f"Logged in as: @{me.data.username}")
    else:
        print("\n❌ Authentication failed: me.data is None")
    
except Exception as e:
    print(f"\n❌ Authentication failed:")
    print(f"Error: {e}")
