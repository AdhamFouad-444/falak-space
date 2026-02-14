"""
Post a single specific tweet by its scheduled_for date.
Usage: python post_single.py "2026-02-13T09:30:00"
"""
import json
import sys
from datetime import datetime

try:
    import tweepy
except ImportError:
    print("❌ Error: tweepy not installed")
    sys.exit(1)

import config

def main():
    target_schedule = sys.argv[1] if len(sys.argv) > 1 else None
    if not target_schedule:
        print("❌ Usage: python post_single.py <scheduled_for>")
        sys.exit(1)

    # Load pending tweets
    with open(config.PENDING_TWEETS_FILE, "r") as f:
        pending = json.load(f)

    # Find the target tweet
    target = None
    target_idx = None
    for i, t in enumerate(pending):
        if t.get("scheduled_for") == target_schedule:
            target = t
            target_idx = i
            break

    if not target:
        print(f"❌ No tweet found with scheduled_for = {target_schedule}")
        sys.exit(1)

    print(f"📋 Found tweet: [{target['type']}]")
    print(f"   \"{target['text'][:80]}...\"")
    print()

    # Connect to Twitter
    print("🔑 Connecting to Twitter...")
    client = tweepy.Client(
        consumer_key=config.TWITTER_API_KEY,
        consumer_secret=config.TWITTER_API_SECRET,
        access_token=config.TWITTER_ACCESS_TOKEN,
        access_token_secret=config.TWITTER_ACCESS_SECRET,
    )

    # Post
    text = target["text"]
    if len(text) > config.MAX_TWEET_LENGTH:
        text = text[:config.MAX_TWEET_LENGTH - 3] + "..."

    print(f"📤 Posting...")
    try:
        response = client.create_tweet(text=text)
        tweet_id = response.data["id"]
        posted_at = datetime.now().isoformat()
        print(f"   ✅ Posted! Tweet ID: {tweet_id}")

        # Update pending: remove the posted tweet
        pending.pop(target_idx)
        with open(config.PENDING_TWEETS_FILE, "w") as f:
            json.dump(pending, f, indent=2)

        # Update posted log
        try:
            with open(config.POSTED_LOG_FILE, "r") as f:
                posted = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            posted = []

        target["tweet_id"] = tweet_id
        target["posted_at"] = posted_at
        posted.append(target)
        with open(config.POSTED_LOG_FILE, "w") as f:
            json.dump(posted, f, indent=2)

        print(f"   📁 Logs updated.")
    except Exception as e:
        print(f"   ❌ Failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
