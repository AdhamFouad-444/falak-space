
import time
import schedule
import fetch_content
import post_tweets
import config
from datetime import datetime

def job():
    print(f"\n⏰ Running Auto-Poster at {datetime.now()}")
    
    # 1. Fetch new content
    print("📥 Fetching content...")
    fetch_content.main()
    
    # 2. Auto-approve if enabled
    if config.AUTO_APPROVE:
        print("✅ Auto-approving new tweets...")
        pending = post_tweets.load_pending_tweets()
        approved_count = 0
        for tweet in pending:
            if not tweet.get("approved"):
                tweet["approved"] = True
                approved_count += 1
        post_tweets.save_pending_tweets(pending)
        print(f"   Approved {approved_count} tweets.")
    
    # 3. Post approved tweets
    print("📤 Posting tweets...")
    
    client, api = post_tweets.get_twitter_conn()
    pending = post_tweets.load_pending_tweets()
    posted_log = post_tweets.load_posted_log()
    
    due = [t for t in pending if t.get("approved")]
    still_pending = [t for t in pending if not t.get("approved")]
    
    for tweet in due:
        print(f"   Posting: {tweet['type']}...")
        result = post_tweets.post_tweet(client, api, tweet)
        
        if result["success"]:
            print(f"   ✅ Posted! ID: {result['tweet_id']}")
            tweet["tweet_id"] = result["tweet_id"]
            tweet["posted_at"] = result["posted_at"]
            posted_log.append(tweet)
        else:
            print(f"   ❌ Failed: {result['error']}")
            # Keep in pending
            still_pending.append(tweet)
            
    post_tweets.save_pending_tweets(still_pending)
    post_tweets.save_posted_log(posted_log)
    print("💤 Job done. Sleeping...")

def main():
    print("🚀 FALAk Auto-Bot Started")
    print("   - Auto-Approve: " + str(config.AUTO_APPROVE))
    print("   - Schedule: Every 4 hours")
    
    # Run once on startup
    job()
    
    # Schedule every 4 hours
    schedule.every(4).hours.do(job)
    
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    main()
