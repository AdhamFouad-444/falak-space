import json
import os
from datetime import datetime, timedelta

# Path to pending_tweets.json
PENDING_FILE = "pending_tweets.json"

def main():
    if not os.path.exists(PENDING_FILE):
        print("❌ Error: pending_tweets.json not found")
        return

    with open(PENDING_FILE, "r") as f:
        pending = json.load(f)

    # We start Week 2 today (Monday, Feb 16)
    # Week 2: Feb 16-20
    # Week 3: Feb 23-27
    # Week 4: Mar 2-6
    
    start_dates = {
        "Week 2": datetime(2026, 2, 16),
        "Week 3": datetime(2026, 2, 23),
        "Week 4": datetime(2026, 3, 2)
    }

    # Helper to map Pillar to Day of Week (approximate mapping based on previous plan)
    # Pillars: A(Mon), B(Tue), C(Wed), D(Thu), E(Fri)
    pillar_map = {
        "Pillar A": 0, # Monday
        "Pillar B": 1, # Tuesday
        "Pillar C": 2, # Wednesday
        "Pillar D": 3, # Thursday
        "Pillar E": 4  # Friday
    }

    count_updated = 0

    for tweet in pending:
        source = tweet.get("source", "")
        tweet_type = tweet.get("type", "")
        
        if "Content Plan" not in source and "Week" not in tweet_type:
            continue
            
        # Format usually: "Week 2 - Pillar E (Signals)"
        try:
            # Handle both formats if any
            parts = tweet_type.split(" - ")
            if len(parts) < 2:
                continue
                
            week_part = parts[0].strip() # "Week 2"
            pillar_part = parts[1].split(" (")[0].strip() # "Pillar E"
            
            if week_part in start_dates and pillar_part in pillar_map:
                base_date = start_dates[week_part]
                day_offset = pillar_map[pillar_part]
                
                new_date = base_date + timedelta(days=day_offset)
                
                # Determine time (9:30 AM or 6:30 PM)
                time_uk = tweet.get("post_time_uk", "9:30 AM")
                if "9:30" in time_uk:
                    hour, minute = 9, 30
                else:
                    hour, minute = 18, 30
                    
                target_dt = new_date.replace(hour=hour, minute=minute)
                old_date = tweet.get("scheduled_for", "NONE")
                tweet["scheduled_for"] = target_dt.isoformat()
                tweet["approved"] = True
                print(f"✅ Updated {tweet_type}: {old_date} -> {tweet['scheduled_for']}")
                count_updated += 1
            else:
                print(f"⚠️ Skipped {tweet_type}: Week or Pillar not in map")
        except Exception as e:
            print(f"❌ Error processing {tweet_type}: {e}")
            continue

    # Sort by scheduled_for
    pending.sort(key=lambda x: x.get("scheduled_for", "9999"))

    with open(PENDING_FILE, "w") as f:
        json.dump(pending, f, indent=2)

    print(f"✅ Re-aligned {count_updated} tweets in the content plan.")
    print(f"📅 Start of Week 2: Feb 16 (Today)")

if __name__ == "__main__":
    main()
