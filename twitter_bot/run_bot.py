
"""
FALAk Twitter Bot - Background Runner
Continuously checks for due tweets and posts them.
"""
import time
import sys
from datetime import datetime
import config
from post_tweets import load_pending_tweets, save_pending_tweets, load_posted_log, save_posted_log, get_twitter_conn, post_tweet

def run_loop():
    print("🚀 FALAk Bot Runner Started")
    print(f"Waiting for tweets... (Check interval: 60s)")
    
    client, api = get_twitter_conn()
    
    while True:
        try:
            pending = load_pending_tweets()
            now = datetime.now()
            
            due_tweets = []
            
            for tweet in pending:
                if not tweet.get("approved"):
                    continue
                
                # Check schedule
                scheduled_str = tweet.get("scheduled_for")
                if not scheduled_str:
                    continue
                
                scheduled_dt = datetime.fromisoformat(scheduled_str)
                
                if now >= scheduled_dt:
                    due_tweets.append(tweet)
            
            if due_tweets:
                print(f"Found {len(due_tweets)} due tweets.")
                posted_log = load_posted_log()
                still_pending = [t for t in pending if t not in due_tweets]
                
                for tweet in due_tweets:
                    print(f"📤 Posting: {tweet.get('type')}...")
                    result = post_tweet(client, api, tweet)
                    
                    if result["success"]:
                        print(f"   ✅ Posted! ID: {result['tweet_id']}")
                        tweet["tweet_id"] = result["tweet_id"]
                        tweet["posted_at"] = result["posted_at"]
                        posted_log.append(tweet)
                    else:
                        print(f"   ❌ Failed: {result['error']}")
                        tweet["last_error"] = result["error"]
                        # Re-schedule or keep pending? 
                        # For now, keep in pending but maybe increment retry count?
                        # Or just leave it to retry next loop (DANGEROUS if error is permanent).
                        # Let's un-approve it to prevent infinite loop.
                        tweet["approved"] = False
                        still_pending.append(tweet)

                save_pending_tweets(still_pending)
                save_posted_log(posted_log)
                
            else:
                # No tweets due
                pass
                
        except Exception as e:
            print(f"Error in loop: {e}")
            
        time.sleep(60)

if __name__ == "__main__":
    if "--once" in sys.argv:
        # Single run mode (for cron/GitHub Actions)
        print("🚀 FALAk Bot Runner (Single Run Mode)")
        client, api = get_twitter_conn()
        try:
            pending = load_pending_tweets()
            now = datetime.now()
            due_tweets = []
            
            for tweet in pending:
                if not tweet.get("approved"): continue
                scheduled_str = tweet.get("scheduled_for")
                if not scheduled_str: continue
                scheduled_dt = datetime.fromisoformat(scheduled_str)
                if now >= scheduled_dt:
                    due_tweets.append(tweet)
            
            if due_tweets:
                print(f"Found {len(due_tweets)} due tweets.")
                posted_log = load_posted_log()
                still_pending = [t for t in pending if t not in due_tweets]
                
                for tweet in due_tweets:
                    print(f"📤 Posting: {tweet.get('type')}...")
                    result = post_tweet(client, api, tweet)
                    if result["success"]:
                        print(f"   ✅ Posted! ID: {result['tweet_id']}")
                        tweet["tweet_id"] = result["tweet_id"]
                        tweet["posted_at"] = result["posted_at"]
                        posted_log.append(tweet)
                    else:
                        print(f"   ❌ Failed: {result['error']}")
                        tweet["last_error"] = result["error"]
                        tweet["approved"] = False
                        still_pending.append(tweet)
                
                save_pending_tweets(still_pending)
                save_posted_log(posted_log)
            else:
                print("No tweets due.")
                
        except Exception as e:
            print(f"Error in single run: {e}")
            sys.exit(1)
    else:
        # Default infinite loop mode
        run_loop()
