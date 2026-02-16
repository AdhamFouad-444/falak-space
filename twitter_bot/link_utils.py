"""
FALAk Twitter Bot - Link Utilities

Helper functions to ensure every tweet has a valid, high-fidelity link.
"""

def generate_launch_links(launch_data: dict) -> dict:
    """
    Generate a hierarchy of links for a launch.
    Returns a dict with 'primary', 'tracking', and 'stream' keys.
    """
    links = {
        "stream": None,
        "tracking": None,
        "source": "Unknown"
    }

    # 1. Try to get a direct video stream from the API
    vid_urls = launch_data.get("vidURLs", [])
    if vid_urls:
        # Prefer YouTube, but take the first valid one
        for vid in vid_urls:
            url = vid.get("url", "")
            if "youtube.com" in url or "youtu.be" in url:
                links["stream"] = url
                links["source"] = "Direct Stream"
                break
        
        # If no YouTube, take the first one
        if not links["stream"] and vid_urls:
            links["stream"] = vid_urls[0].get("url")
            links["source"] = "Direct Stream"

    # 2. Generate a Space Launch Now tracking link (Always valid if we have a slug)
    slug = launch_data.get("slug")
    if slug:
        links["tracking"] = f"https://spacelaunchnow.me/launch/{slug}"
        
        # If we still have no stream, the tracking link becomes the primary call to action
        if not links["stream"]:
             links["stream"] = links["tracking"]
             links["source"] = "Space Launch Now (Tracking)"

    # 3. Fallback: Official Provider Channels (Hardcoded Backup)
    if not links["stream"]:
        provider = launch_data.get("launch_service_provider", {}).get("name", "").lower()
        if "spacex" in provider:
            links["stream"] = "https://www.youtube.com/spacex"
        elif "rocket lab" in provider:
             links["stream"] = "https://www.youtube.com/rocketlab"
        elif "nasa" in provider:
             links["stream"] = "https://www.youtube.com/nasa"
        elif "blue origin" in provider:
             links["stream"] = "https://www.youtube.com/blueorigin"
        elif "ula" in provider:
             links["stream"] = "https://www.youtube.com/ulalaunch"
        else:
            # Absolute last resort
            links["stream"] = "https://spacelaunchnow.me/launches/"
        
        links["source"] = "Official Channel (Fallback)"

    return links
