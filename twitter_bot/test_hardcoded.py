import tweepy

# Hardcoded from cat output to bypass .env parsing
API_KEY="xtYeiz3TD8m4SH00aAkf5zpAV"
API_SECRET="Qu5pvXI241n09Co3BuqomRaPHRP0STvSAAmTt1IYoS5te6cAwN"
ACCESS_TOKEN="2018675728405909504-RMNAF0u2NF92nr8DI1ErytvDu2qlWr"
ACCESS_SECRET="7l1MYXnLjd6Kpr8F7slQEc8Gcy4rQVsCYNxo3Cotv78Z3"

print("Testing HARDCODED credentials...")
try:
    client = tweepy.Client(
        consumer_key=API_KEY,
        consumer_secret=API_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_SECRET
    )
    me = client.get_me()
    print(f"✅ Success! Logged in as: @{me.data.username}")
except Exception as e:
    print(f"❌ Failed: {e}")
