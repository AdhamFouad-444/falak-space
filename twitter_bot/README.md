# FALAk Twitter Bot 🚀

A grounded, educational Twitter bot for FALAk Space that posts real space data from NASA APIs.

## Philosophy

> **Real data, not AI slop.** Posts are factual, sourced, and aligned with FALAk's educational mission.

## Features

- 🛰️ **NASA APOD** - Daily astronomy picture with educational context
- 🚀 **Launch Alerts** - Upcoming rocket launches from SpaceX and others
- ☄️ **Near-Earth Objects** - Asteroid flyby alerts
- 🎓 **Educational Content** - Links to FALAk's curriculum

## Setup

### 1. Get API Keys (FREE)

**NASA API Key:**
1. Go to https://api.nasa.gov/
2. Sign up (instant, free)
3. Copy your API key

**Twitter/X API (Free Tier):**
1. Go to https://developer.twitter.com/
2. Apply for developer access
3. Create a project and app
4. Generate API keys and tokens

### 2. Configure

```bash
cd twitter_bot
cp .env.example .env
# Edit .env with your API keys
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Test (Fetch Only)

```bash
python fetch_content.py
# This fetches NASA data and generates tweets WITHOUT posting
```

### 5. Review Content

Check `pending_tweets.json` for generated tweets. Edit or approve as needed.

### 6. Post Approved Tweets

```bash
python post_tweets.py
# Only posts tweets marked as "approved" in pending_tweets.json
```

## Project Structure

```
twitter_bot/
├── config.py           # Bot configuration
├── fetch_content.py    # Fetches data from NASA APIs
├── post_tweets.py      # Posts approved tweets to Twitter
├── templates.py        # Tweet templates (FALAk voice)
├── pending_tweets.json # Queue for human review
├── requirements.txt    # Python dependencies
└── .env.example        # API key template
```

## Human-in-the-Loop

The bot does NOT auto-post. The workflow is:

1. **Fetch** → Script generates tweet drafts
2. **Review** → Human reviews `pending_tweets.json`
3. **Approve** → Mark tweets as `"approved": true`
4. **Post** → Run posting script

This ensures quality and prevents errors.

## Free Tier Limits

| Service | Limit | Our Usage |
|---------|-------|-----------|
| NASA APIs | 1000/hour | ~10/day |
| Twitter Free | ~50 posts/day | 2-5/day |

---

**Built with ❤️ for FALAk Space Education Initiative**
