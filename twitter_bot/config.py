"""
FALAk Twitter Bot - Configuration
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# NASA API
NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")
NASA_BASE_URL = "https://api.nasa.gov"

# Twitter/X API
TWITTER_API_KEY = os.getenv("TWITTER_API_KEY")
TWITTER_API_SECRET = os.getenv("TWITTER_API_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_SECRET = os.getenv("TWITTER_ACCESS_SECRET")
TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

# Bot Settings
BOT_NAME = "FALAk Space"
MAX_TWEET_LENGTH = 280
POSTS_PER_DAY = 3

# Content Sources (enabled by default)
SOURCES = {
    "apod": True,           # NASA Astronomy Picture of the Day
    "neo": True,            # Near-Earth Objects
    "launches": True,       # Upcoming launches
    "educational": True,    # FALAk educational content
}

# Files
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PENDING_TWEETS_FILE = os.path.join(BASE_DIR, "pending_tweets.json")
POSTED_LOG_FILE = os.path.join(BASE_DIR, "posted_tweets.json")

# FALAk Links
FALAK_WEBSITE = "https://falakplatforms.co.uk"
FALAK_EDUCATION = "./EDUCATION_FRAMEWORK_001.md"
