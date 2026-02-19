
import time
import schedule
import fetch_news
import logging
from datetime import datetime
import os

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("news_bot.log"),
        logging.StreamHandler()
    ]
)

def job():
    logging.info("⏰ Starting scheduled news fetch...")
    try:
        # fetch_news.main() writes to "news_data.json" in the current directory.
        # Since we want it in the repo root, we ensures paths are correct if needed,
        # but fetch_news.py line 310 uses "news_data.json" which is in the root 
        # because fetch_news.py is usually run from the root or handled via relative paths.
        fetch_news.main()
        logging.info("✅ News update completed successfully.")
    except Exception as e:
        logging.error(f"❌ Error during news fetch: {e}")

def main():
    logging.info("🚀 FALAk News Bot Runner Started")
    logging.info("   - Schedule: Every 6 hours")
    
    # Run once on startup to ensure fresh data
    job()
    
    # Schedule every 6 hours
    schedule.every(6).hours.do(job)
    
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    main()
