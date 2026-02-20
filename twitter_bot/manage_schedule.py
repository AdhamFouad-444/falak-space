
"""
FALAk Twitter Bot - Schedule Manager
Assigns dates to pending tweets based on a start date.
"""
import json
import os
from datetime import datetime, timedelta
import config

def load_pending():
    if not os.path.exists(config.PENDING_TWEETS_FILE):
        return []
    with open(config.PENDING_TWEETS_FILE, 'r') as f:
        return json.load(f)

def save_pending(tweets):
    with open(config.PENDING_TWEETS_FILE, 'w') as f:
        json.dump(tweets, f, indent=2)

def set_schedule(start_date_str):
    """
    Sets schedule for tweets. 
    Assumes 10 tweets per week (2 per weekday).
    Week 1: Tweets 1-10
    Week 2: Tweets 11-20
    etc.
    """
    tweets = load_pending()
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    
    # Filter only content plan tweets (ignore launches/apod for now if needed, or include them)
    # The prompt implies we are scheduling the "Content Plan".
    # Content plan tweets have "type": "Week X - ..."
    
    content_tweets = [t for t in tweets if "Week" in t.get("type", "")]
    other_tweets = [t for t in tweets if "Week" not in t.get("type", "")]
    
    print(f"Found {len(content_tweets)} content plan tweets.")
    
    # Sort content tweets by Week/Pillar to ensure correct order?
    # They are likely already ordered by ingestion.
    
    current_date = start_date
    tweets_per_day = 2
    day_count = 0
    
    posts_today = 0
    
    for i, tweet in enumerate(content_tweets):
        # Calculate day offset
        # We want to post Mon-Fri (5 days/week).
        # But start_date might be Tuesday.
        
        # If we just march forward 2 tweets per day:
        # Day 0: Tweet 1, 2
        # Day 1: Tweet 3, 4
        # ...
        
        # Check if current_date is weekend?
        # If we strictly want Mon-Fri, we need logic.
        # Let's simplify: Just post every day? No "business-minded". Mon-Fri is better.
        
        while current_date.weekday() >= 5: # 5=Sat, 6=Sun
            current_date += timedelta(days=1)
            
        # Times: 9:30 AM and 6:30 PM
        if posts_today == 0:
            time_str = "09:30:00"
        else:
            time_str = "18:30:00"
            
        # Combine date and time
        scheduled_dt = datetime.strptime(f"{current_date.strftime('%Y-%m-%d')} {time_str}", "%Y-%m-%d %H:%M:%S")
        
        tweet["scheduled_for"] = scheduled_dt.isoformat()
        tweet["approved"] = True
        
        posts_today += 1
        
        if posts_today >= tweets_per_day:
            posts_today = 0
            current_date += timedelta(days=1)
            
    # Combine back
    all_tweets = other_tweets + content_tweets # Note: this changes order in file, but logic is fine.
    # Actually simpler to just update the 'content_tweets' in place in the original list?
    # But filtering separated them.
    # Let's reconstruct preserving order if possible, or just append.
    # Re-merging effectively:
    
    # Update original list objects
    # Note: `content_tweets` contains references to dicts in `tweets` list? 
    # Yes, typical Python behavior for list of dicts.
    # So `tweets` is already updated.
    
    save_pending(tweets)
    print("Schedule updated and all tweets approved.")

if __name__ == "__main__":
    # Default start date: Today (2026-02-10)
    set_schedule("2026-02-23")
