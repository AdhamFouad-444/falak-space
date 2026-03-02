"""
FALAk Twitter Bot - Tweet Poster

Posts approved tweets from pending_tweets.json to Twitter.
Only tweets marked as "approved": true will be posted.
"""
import json
import sys
from datetime import datetime

try:
    import tweepy
except ImportError:
    print("❌ Error: tweepy not installed")
    print("   Run: pip install tweepy")
    sys.exit(1)

import config


def get_twitter_conn():
    """Create and return authenticated Twitter connections for v1.1 and v2."""
    if not all([
        config.TWITTER_API_KEY,
        config.TWITTER_API_SECRET,
        config.TWITTER_ACCESS_TOKEN,
        config.TWITTER_ACCESS_SECRET,
    ]):
        print("❌ Error: Twitter API credentials not configured")
        sys.exit(1)
    
    # v2 Client (for posting)
    client = tweepy.Client(
        consumer_key=config.TWITTER_API_KEY,
        consumer_secret=config.TWITTER_API_SECRET,
        access_token=config.TWITTER_ACCESS_TOKEN,
        access_token_secret=config.TWITTER_ACCESS_SECRET,
    )
    
    # v1.1 API (for media upload)
    auth = tweepy.OAuth1UserHandler(
        config.TWITTER_API_KEY,
        config.TWITTER_API_SECRET,
        config.TWITTER_ACCESS_TOKEN,
        config.TWITTER_ACCESS_SECRET,
    )
    api = tweepy.API(auth)
    
    return client, api


def load_pending_tweets() -> list:
    """Load pending tweets from file."""
    try:
        with open(config.PENDING_TWEETS_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ No pending tweets file found: {config.PENDING_TWEETS_FILE}")
        print("   Run 'python fetch_content.py' first")
        return []
    except json.JSONDecodeError:
        print(f"❌ Error reading {config.PENDING_TWEETS_FILE}")
        return []


def save_pending_tweets(tweets: list):
    """Save updated pending tweets."""
    with open(config.PENDING_TWEETS_FILE, "w") as f:
        json.dump(tweets, f, indent=2)


def load_posted_log() -> list:
    """Load history of posted tweets."""
    try:
        with open(config.POSTED_LOG_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_posted_log(tweets: list):
    """Save posted tweets log."""
    with open(config.POSTED_LOG_FILE, "w") as f:
        json.dump(tweets, f, indent=2)


def post_tweet(client: tweepy.Client, api: tweepy.API, tweet_data: dict) -> dict:
    """
    Post a single tweet or a thread to Twitter, with optional media on the first tweet.
    Returns response or error information.
    """
    text_content = tweet_data.get("text", "")
    media_path = tweet_data.get("media_path")
    
    # Normalize to a list to support both single tweets and threads
    tweets_to_post = text_content if isinstance(text_content, list) else [text_content]
    
    try:
        media_ids = []
        if media_path:
            # Upload media via v1.1 API
            media = api.media_upload(filename=media_path)
            media_ids = [media.media_id]
        
        posted_ids = []
        previous_tweet_id = None
        
        for i, text in enumerate(tweets_to_post):
            # Ensure tweet is within limits
            if len(text) > config.MAX_TWEET_LENGTH:
                text = text[:config.MAX_TWEET_LENGTH - 3] + "..."
            
            # Post first tweet with media (if any)
            if i == 0 and media_ids:
                response = client.create_tweet(text=text, media_ids=media_ids)
            # Post subsequent tweets in the thread
            elif previous_tweet_id:
                response = client.create_tweet(text=text, in_reply_to_tweet_id=previous_tweet_id)
            # Post a regular text tweet
            else:
                response = client.create_tweet(text=text)
                
            current_id = response.data["id"]
            posted_ids.append(current_id)
            previous_tweet_id = current_id
            
            # Small delay between thread tweets to be safe
            import time
            if i < len(tweets_to_post) - 1:
                time.sleep(1)
            
        return {
            "success": True,
            "tweet_id": posted_ids[0], # Return the ID of the head of the thread
            "thread_ids": posted_ids,
            "posted_at": datetime.now().isoformat(),
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
        }


def main():
    """Post all approved tweets."""
    print("=" * 50)
    print("🚀 FALAk Twitter Bot - Tweet Poster")
    print("=" * 50)
    print()
    
    # Load pending tweets
    pending = load_pending_tweets()
    if not pending:
        print("ℹ️ No pending tweets")
        return
    
    # Filter approved tweets
    approved = [t for t in pending if t.get("approved")]
    not_approved = [t for t in pending if not t.get("approved")]
    
    if not approved:
        print(f"ℹ️ No approved tweets found ({len(pending)} pending)")
        print()
        print("To approve tweets:")
        print(f'  1. Open {config.PENDING_TWEETS_FILE}')
        print('  2. Set "approved": true for tweets to post')
        print("  3. Run this script again")
        return
    
    print(f"📋 Found {len(approved)} approved tweets")
    print()
    
    # Confirm before posting
    print("Tweets to post:")
    for i, tweet in enumerate(approved, 1):
        preview = tweet["text"][:60] + "..." if len(tweet["text"]) > 60 else tweet["text"]
        print(f"  {i}. [{tweet['type']}] {preview}")
    
    print()
    confirm = input("Post these tweets? (y/n): ").strip().lower()
    
    if confirm != "y":
        print("❌ Cancelled")
        return
    
    # Initialize Twitter client
    print()
    print("🔑 Connecting to Twitter...")
    client, api = get_twitter_conn()
    
    # Post each approved tweet
    posted_log = load_posted_log()
    posted_count = 0
    
    for tweet in approved:
        print(f"📤 Posting: {tweet['type']}...")
        result = post_tweet(client, api, tweet)
        
        if result["success"]:
            print(f"   ✅ Posted! Tweet ID: {result['tweet_id']}")
            tweet["tweet_id"] = result["tweet_id"]
            tweet["posted_at"] = result["posted_at"]
            posted_log.append(tweet)
            posted_count += 1
        else:
            print(f"   ❌ Failed: {result['error']}")
            tweet["last_error"] = result["error"]
            not_approved.append(tweet)  # Keep for retry
    
    # Update files
    save_pending_tweets(not_approved)  # Only keep non-posted
    save_posted_log(posted_log)
    
    print()
    print("=" * 50)
    print(f"✅ Posted {posted_count}/{len(approved)} tweets")
    print(f"📋 Remaining pending: {len(not_approved)}")
    print("=" * 50)


if __name__ == "__main__":
    main()
