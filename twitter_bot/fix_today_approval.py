import json
import os
from datetime import datetime

# Path to pending_tweets.json
PENDING_FILE = "pending_tweets.json"

def main():
    if not os.path.exists(PENDING_FILE):
        print("❌ Error: pending_tweets.json not found")
        return

    with open(PENDING_FILE, "r") as f:
        pending = json.load(f)

    today_str = datetime.now().strftime("%Y-%m-%d")

    count_approved = 0
    count_reset = 0

    for tweet in pending:
        is_today = False
        
        # Check if created today or scheduled for today
        created = tweet.get("created_at", "")
        scheduled = tweet.get("scheduled_for", "")
        
        if today_str in created or today_str in scheduled:
            is_today = True

        if is_today:
            tweet["approved"] = True
            count_approved += 1
        else:
            tweet["approved"] = False
            count_reset += 1

    with open(PENDING_FILE, "w") as f:
        json.dump(pending, f, indent=2)

    print(f"✅ Approved {count_approved} tweets for today.")
    print(f"🔄 Reset {count_reset} other tweets to unapproved.")

if __name__ == "__main__":
    main()
