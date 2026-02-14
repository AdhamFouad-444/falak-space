import json
import re
from datetime import datetime

def parse_tweets(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Split by Tweet X
    tweet_blocks = re.split(r'\*\*Tweet \d+\*\*', content)[1:]
    
    parsed_tweets = []
    for i, block in enumerate(tweet_blocks, 1):
        # Extract Pillar
        pillar_match = re.search(r'- \*\*Pillar:\*\* (.*)', block)
        pillar = pillar_match.group(1).strip() if pillar_match else "Unknown"
        
        # Extract Time
        time_match = re.search(r'- \*\*Time:\*\* (.*)', block)
        post_time = time_match.group(1).strip() if time_match else "Unknown"
        
        # Extract Content
        # Content can span multiple lines until the next "- **Reply Strategy:**"
        content_match = re.search(r'- \*\*Content:\*\* (.*?)(?=- \*\*Reply Strategy:\*\*|$)', block, re.DOTALL)
        tweet_text = content_match.group(1).strip() if content_match else "No content"
        
        # Extract Reply Strategy
        reply_match = re.search(r'- \*\*Reply Strategy:\*\* (.*)', block)
        reply_strategy = reply_match.group(1).strip() if reply_match else "No strategy"
        
        # Infer week (1-10: Week 1, 11-20: Week 2, 21-30: Week 3, 31-40: Week 4)
        week = (i - 1) // 10 + 1
        
        parsed_tweets.append({
            "type": f"Week {week} - Pillar {pillar}",
            "text": tweet_text,
            "source": f"Content Plan - Week {week}",
            "post_time_uk": post_time,
            "reply_strategy": reply_strategy,
            "approved": False,
            "created_at": datetime.now().isoformat()
        })
    
    return parsed_tweets

def main():
    content_plan_path = "/Users/driver444/.gemini/antigravity/brain/c9dc56d8-7bf6-4849-a2e1-00ab1c7734a7/twitter_content_plan.md"
    pending_file_path = "/Users/driver444/Desktop/FALAk Space /twitter_bot/pending_tweets.json"
    
    new_tweets = parse_tweets(content_plan_path)
    
    # Load existing
    try:
        with open(pending_file_path, 'r') as f:
            existing = json.load(f)
    except:
        existing = []
    
    # Prepend or append? User said "Go ahead" after I asked if I should add them.
    # I'll append them.
    existing.extend(new_tweets)
    
    with open(pending_file_path, 'w') as f:
        json.dump(existing, f, indent=2)
    
    print(f"Successfully added {len(new_tweets)} tweets to pending_tweets.json")

if __name__ == "__main__":
    main()
