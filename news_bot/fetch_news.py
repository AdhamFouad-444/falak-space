"""
FALAk News Bot — Automated Space News Fetcher

Fetches real space news from RSS feeds and finds thumbnail images
via NASA Images API. Outputs news_data.json for the landing page.

All sources are free and require no API keys.
"""

import json
import html as html_module
import re
import xml.etree.ElementTree as ET
from datetime import datetime
from typing import Optional
import requests


# ── RSS Feed Sources ──────────────────────────────────────────────
RSS_FEEDS = [
    {
        "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss",
        "source": "NASA",
        "priority": 1,
    },
    {
        "url": "https://spacenews.com/feed/",
        "source": "SpaceNews",
        "priority": 2,
    },
]

# NASA Images API (free, no key)
NASA_IMAGES_API = "https://images-api.nasa.gov/search"

# Fallback image when no thumbnail is found
FALLBACK_IMAGE = "https://images-assets.nasa.gov/image/PIA25969/PIA25969~thumb.jpg"

# Number of articles to include in the output
MAX_ARTICLES = 4

# MENA-related keywords for tagging
MENA_KEYWORDS = {
    "uae": "🇦🇪 UAE",
    "emirates": "🇦🇪 UAE",
    "hope probe": "🇦🇪 UAE",
    "mars mission": "🇦🇪 UAE",
    "mohammed bin rashid": "🇦🇪 UAE",
    "saudi": "🇸🇦 KSA",
    "ksa": "🇸🇦 KSA",
    "neom": "🇸🇦 KSA",
    "egypt": "🇪🇬 Egypt",
    "egyptian": "🇪🇬 Egypt",
    "african space": "🇪🇬 Egypt",
    "turkey": "🇹🇷 Turkey",
    "turkish": "🇹🇷 Turkey",
    "israel": "🇮🇱 Israel",
    "iran": "🇮🇷 Iran",
    "qatar": "🇶🇦 Qatar",
    "bahrain": "🇧🇭 Bahrain",
    "oman": "🇴🇲 Oman",
    "morocco": "🇲🇦 Morocco",
    "tunisia": "🇹🇳 Tunisia",
    "algeria": "🇩🇿 Algeria",
    "iraq": "🇮🇶 Iraq",
    "jordan": "🇯🇴 Jordan",
    "kuwait": "🇰🇼 Kuwait",
}


def fetch_rss_feed(url: str, source: str) -> list[dict]:
    """Fetch and parse an RSS feed, returning article dicts."""
    articles = []
    try:
        resp = requests.get(url, timeout=15, headers={
            "User-Agent": "FALAk-News-Bot/1.0 (https://falakplatforms.co.uk)"
        })
        resp.raise_for_status()

        # Parse XML — handle namespaces gracefully
        root = ET.fromstring(resp.text)

        # Standard RSS 2.0: channel > item
        channel = root.find("channel")
        if channel is None:
            return articles

        items = channel.findall("item")
        for item in items[:15]:  # Check up to 15 items
            title_el = item.find("title")
            desc_el = item.find("description")
            link_el = item.find("link")
            pub_date_el = item.find("pubDate")

            if title_el is None or link_el is None:
                continue

            title = title_el.text.strip() if title_el.text else ""
            link = link_el.text.strip() if link_el.text else ""
            description = ""
            if desc_el is not None and desc_el.text:
                # Strip HTML tags from description
                description = re.sub(r"<[^>]+>", "", desc_el.text).strip()
                # Decode HTML entities (&amp; &#160; etc.)
                description = html_module.unescape(description)
                # Limit description length
                if len(description) > 200:
                    description = description[:197] + "..."

            pub_date = ""
            if pub_date_el is not None and pub_date_el.text:
                pub_date = pub_date_el.text.strip()

            # Try to extract image from media:content or enclosure
            image_url = None
            # Check enclosure (common in RSS for images)
            enclosure = item.find("enclosure")
            if enclosure is not None:
                enc_type = enclosure.get("type", "")
                if "image" in enc_type:
                    image_url = enclosure.get("url")

            # Check media:content namespace
            for ns_prefix in [
                "{http://search.yahoo.com/mrss/}",
                "{http://search.yahoo.com/mrss}",
            ]:
                media = item.find(f"{ns_prefix}content")
                if media is not None:
                    medium = media.get("medium", "")
                    if medium == "image" or "image" in media.get("type", ""):
                        image_url = media.get("url")
                        break
                # Also check media:thumbnail
                thumb = item.find(f"{ns_prefix}thumbnail")
                if thumb is not None:
                    image_url = thumb.get("url")
                    break

            # Detect MENA region tag
            region = detect_mena_region(title, description)

            articles.append({
                "title": title,
                "summary": description,
                "link": link,
                "source": source,
                "date": pub_date,
                "image": image_url,
                "region": region,
            })

    except requests.RequestException as e:
        print(f"⚠️  Failed to fetch {source} RSS: {e}")
    except ET.ParseError as e:
        print(f"⚠️  Failed to parse {source} RSS XML: {e}")

    return articles


def detect_mena_region(title: str, description: str) -> Optional[str]:
    """Check if article relates to a MENA country."""
    text = f"{title} {description}".lower()
    for keyword, region in MENA_KEYWORDS.items():
        if keyword in text:
            return region
    return None


def find_nasa_image(query: str) -> Optional[str]:
    """
    Search NASA Images API for a relevant thumbnail.
    Free, no API key required.
    """
    try:
        # Extract key space terms from title for better search
        search_terms = re.sub(
            r"\b(the|a|an|and|or|to|in|of|for|with|on|at|by|from|is|are|was|were|has|have|had)\b",
            "",
            query.lower(),
        )
        search_terms = " ".join(search_terms.split()[:4])  # Use first 4 keywords

        resp = requests.get(
            NASA_IMAGES_API,
            params={
                "q": search_terms,
                "media_type": "image",
                "page_size": 1,
            },
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()

        items = data.get("collection", {}).get("items", [])
        if items:
            links = items[0].get("links", [])
            for link in links:
                if link.get("rel") == "preview":
                    return link.get("href")

    except (requests.RequestException, ValueError, KeyError) as e:
        print(f"⚠️  NASA Images API error for '{query}': {e}")

    return None


def fetch_all_news() -> list[dict]:
    """Fetch from all RSS sources, prioritise MENA, add images."""
    all_articles = []

    for feed in RSS_FEEDS:
        articles = fetch_rss_feed(feed["url"], feed["source"])
        for art in articles:
            art["_priority"] = feed["priority"]
        all_articles.extend(articles)

    if not all_articles:
        print("❌  No articles fetched from any source.")
        return []

    # Sort: MENA articles first, then by priority
    mena_articles = [a for a in all_articles if a["region"]]
    global_articles = [a for a in all_articles if not a["region"]]

    # Pick up to 2 MENA articles + fill rest with global
    selected = mena_articles[:2]
    remaining = MAX_ARTICLES - len(selected)
    selected.extend(global_articles[:remaining])

    # If we still need more, fill from all
    if len(selected) < MAX_ARTICLES:
        used_titles = {a["title"] for a in selected}
        for art in all_articles:
            if art["title"] not in used_titles:
                selected.append(art)
                if len(selected) >= MAX_ARTICLES:
                    break

    # Add images for articles without one
    for article in selected:
        if not article.get("image"):
            print(f"🔍  Searching NASA images for: {article['title'][:50]}...")
            article["image"] = find_nasa_image(article["title"]) or FALLBACK_IMAGE

        # Add a region tag for global articles
        if not article.get("region"):
            article["region"] = "Global 🌍"

        # Clean up internal fields
        article.pop("_priority", None)

    print(f"✅  Selected {len(selected)} articles:")
    for art in selected:
        print(f"   [{art['region']}] {art['title'][:60]}")

    return selected


def format_date_readable(date_str: str) -> str:
    """Convert RSS date string to a readable format."""
    if not date_str:
        return datetime.now().strftime("%b %d, %Y")
    try:
        # Standard RSS date: "Thu, 13 Feb 2026 10:00:00 +0000"
        # Strip timezone info for simpler parsing
        clean = re.sub(r"[+-]\d{4}$", "", date_str).strip()
        dt = datetime.strptime(clean, "%a, %d %b %Y %H:%M:%S")
        return dt.strftime("%b %d, %Y")
    except ValueError:
        pass
    try:
        dt = datetime.strptime(date_str[:16].strip(), "%Y-%m-%dT%H:%M")
        return dt.strftime("%b %d, %Y")
    except ValueError:
        pass
    return date_str[:20]


def main():
    """Main entry point: fetch news and write JSON."""
    print("🚀  FALAk News Bot — Fetching space news...")
    print(f"    Time: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}")
    print()

    articles = fetch_all_news()
    if not articles:
        print("❌  No articles to write. Keeping existing news_data.json.")
        return

    # Format output
    output = {
        "last_updated": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "articles": [],
    }

    for art in articles:
        output["articles"].append({
            "title": art["title"],
            "summary": art["summary"],
            "source": art["source"],
            "region": art["region"],
            "date": format_date_readable(art.get("date", "")),
            "image": art["image"],
            "link": art["link"],
        })

    # Write to repo root (same level as index.html)
    output_path = "news_data.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\n📄  Written {len(output['articles'])} articles to {output_path}")
    print(f"    Last updated: {output['last_updated']}")


if __name__ == "__main__":
    main()
