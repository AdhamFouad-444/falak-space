"""
FALAk Twitter Bot - Content Fetcher

Fetches real data from NASA APIs and generates tweet drafts.
This script does NOT post - it only prepares content for human review.
"""
import json
import random
import requests
from datetime import datetime, timedelta
from typing import Optional

import config
import templates


def fetch_apod() -> Optional[dict]:
    """
    Fetch NASA Astronomy Picture of the Day.
    Returns tweet-ready content or None on failure.
    """
    url = f"{config.NASA_BASE_URL}/planetary/apod"
    params = {"api_key": config.NASA_API_KEY}
    
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # Only handle images (not videos)
        if data.get("media_type") != "image":
            print(f"⚠️ APOD is a video today, skipping: {data.get('url')}")
            return None
        
        # Format tweet
        template = random.choice(templates.APOD_TEMPLATES)
        explanation_short = templates.truncate_text(data.get("explanation", ""), 120)
        
        tweet_text = template.format(
            title=data.get("title", "Untitled"),
            explanation_short=explanation_short,
            url=data.get("hdurl") or data.get("url"),
        )
        
        return {
            "type": "apod",
            "text": tweet_text,
            "media_url": data.get("hdurl") or data.get("url"),
            "source": "NASA APOD",
            "date": data.get("date"),
            "approved": False,  # Requires human approval
            "created_at": datetime.now().isoformat(),
        }
        
    except requests.RequestException as e:
        print(f"❌ Error fetching APOD: {e}")
        return None


def fetch_neo() -> Optional[dict]:
    """
    Fetch Near-Earth Objects (asteroids) passing close to Earth today.
    Returns tweet-ready content or None if no notable objects.
    """
    today = datetime.now().strftime("%Y-%m-%d")
    url = f"{config.NASA_BASE_URL}/neo/rest/v1/feed"
    params = {
        "api_key": config.NASA_API_KEY,
        "start_date": today,
        "end_date": today,
    }
    
    try:
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()
        
        # Get today's asteroids
        neos = data.get("near_earth_objects", {}).get(today, [])
        
        if not neos:
            print("ℹ️ No near-Earth objects today")
            return None
        
        # Find the most notable (largest or closest)
        notable = max(neos, key=lambda x: float(
            x.get("estimated_diameter", {}).get("meters", {}).get("estimated_diameter_max", 0)
        ))
        
        # Extract data
        diameter = notable.get("estimated_diameter", {}).get("meters", {})
        avg_diameter = (
            diameter.get("estimated_diameter_min", 0) + 
            diameter.get("estimated_diameter_max", 0)
        ) / 2
        
        close_approach = notable.get("close_approach_data", [{}])[0]
        distance_km = float(close_approach.get("miss_distance", {}).get("kilometers", 0))
        
        # Skip if too small or too far
        if avg_diameter < 50 or distance_km > 10_000_000:
            print(f"ℹ️ NEO too small or far: {notable.get('name')} ({avg_diameter:.0f}m, {distance_km:.0f}km)")
            return None
        
        # Format tweet
        template = random.choice(templates.NEO_TEMPLATES)
        tweet_text = template.format(
            name=notable.get("name", "Unknown"),
            diameter=f"{avg_diameter:.0f}",
            distance=templates.format_distance(distance_km),
        )
        
        return {
            "type": "neo",
            "text": tweet_text,
            "source": "NASA NeoWs",
            "asteroid_name": notable.get("name"),
            "approved": False,
            "created_at": datetime.now().isoformat(),
        }
        
    except requests.RequestException as e:
        print(f"❌ Error fetching NEO data: {e}")
        return None


def fetch_upcoming_launches() -> Optional[dict]:
    """
    Fetch upcoming rocket launches from Launch Library 2 API.
    Returns tweet-ready content or None.
    """
    url = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/"
    params = {"limit": 5}
    
    try:
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()
        
        launches = data.get("results", [])
        if not launches:
            print("ℹ️ No upcoming launches found")
            return None
        
        # Get the next launch
        next_launch = launches[0]
        
        # Parse launch date
        launch_date = next_launch.get("net", "TBD")
        if launch_date != "TBD":
            try:
                dt = datetime.fromisoformat(launch_date.replace("Z", "+00:00"))
                launch_date = dt.strftime("%b %d, %Y @ %H:%M UTC")
            except:
                pass
        
        # Get provider/rocket info
        provider = "Unknown"
        if next_launch.get("launch_service_provider"):
            provider = next_launch["launch_service_provider"].get("name", "Unknown")
        
        location = "Unknown"
        if next_launch.get("pad", {}).get("location"):
            location = next_launch["pad"]["location"].get("name", "Unknown")
        
        # Video/stream URL
        stream_url = ""
        for vid in next_launch.get("vidURLs", []):
            if vid:
                stream_url = vid.get("url", "")
                break
        if not stream_url:
            stream_url = "Check provider for livestream"
        
        # Format tweet
        template = random.choice(templates.LAUNCH_TEMPLATES)
        tweet_text = template.format(
            mission_name=next_launch.get("name", "Unknown Mission"),
            date=launch_date,
            provider=provider,
            location=location,
            stream_url=stream_url,
            description_short=templates.truncate_text(
                next_launch.get("mission", {}).get("description", ""), 80
            ) if next_launch.get("mission") else "",
        )
        
        return {
            "type": "launch",
            "text": tweet_text,
            "source": "Launch Library 2",
            "mission_name": next_launch.get("name"),
            "approved": False,
            "created_at": datetime.now().isoformat(),
        }
        
    except requests.RequestException as e:
        print(f"❌ Error fetching launches: {e}")
        return None


def generate_educational_tweet() -> dict:
    """
    Generate an educational tweet from FALAk's curriculum.
    This uses pre-written, human-verified content (not AI-generated).
    """
    # Pick a random educational topic
    content = random.choice(templates.EDUCATIONAL_CONTENT)
    template = random.choice(templates.EDUCATIONAL_TEMPLATES)
    
    tweet_text = template.format(
        question=content["question"],
        answer=content["answer"],
        link="https://falak-space.vercel.app/#",
    )
    
    return {
        "type": "educational",
        "text": tweet_text,
        "source": f"FALAk Framework 001 - {content['section']}",
        "approved": False,
        "created_at": datetime.now().isoformat(),
    }


def load_pending_tweets() -> list:
    """Load existing pending tweets from file."""
    try:
        with open(config.PENDING_TWEETS_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_pending_tweets(tweets: list):
    """Save pending tweets to file for review."""
    with open(config.PENDING_TWEETS_FILE, "w") as f:
        json.dump(tweets, f, indent=2)
    print(f"✅ Saved {len(tweets)} tweets to {config.PENDING_TWEETS_FILE}")


def main():
    """Main function to fetch content and generate tweet drafts."""
    print("=" * 50)
    print("🚀 FALAk Twitter Bot - Content Fetcher")
    print("=" * 50)
    print()
    
    # Load existing pending tweets
    pending = load_pending_tweets()
    new_tweets = []
    
    # Fetch from each enabled source
    if config.SOURCES.get("apod"):
        print("📷 Fetching NASA APOD...")
        apod = fetch_apod()
        if apod:
            new_tweets.append(apod)
            print(f"   ✅ Generated APOD tweet")
    
    if config.SOURCES.get("neo"):
        print("☄️ Fetching Near-Earth Objects...")
        neo = fetch_neo()
        if neo:
            new_tweets.append(neo)
            print(f"   ✅ Generated NEO tweet")
    
    if config.SOURCES.get("launches"):
        print("🚀 Fetching upcoming launches...")
        launch = fetch_upcoming_launches()
        if launch:
            new_tweets.append(launch)
            print(f"   ✅ Generated launch tweet")
    
    if config.SOURCES.get("educational"):
        print("🎓 Generating educational content...")
        edu = generate_educational_tweet()
        new_tweets.append(edu)
        print(f"   ✅ Generated educational tweet")
    
    # Add new tweets to pending
    pending.extend(new_tweets)
    save_pending_tweets(pending)
    
    # Summary
    print()
    print("=" * 50)
    print(f"📝 Generated {len(new_tweets)} new tweets")
    print(f"📋 Total pending: {len(pending)}")
    print()
    print("Next steps:")
    print(f"  1. Review tweets in: {config.PENDING_TWEETS_FILE}")
    print('  2. Set "approved": true for tweets you want to post')
    print("  3. Run: python post_tweets.py")
    print("=" * 50)


if __name__ == "__main__":
    main()
