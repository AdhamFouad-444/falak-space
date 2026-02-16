import requests
import json
import link_utils

def check_launches():
    url = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/"
    params = {"limit": 5}
    
    try:
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()
        
        print(f"🚀 Analyzing {len(data.get('results', []))} Upcoming Launches...\n")

        for launch in data.get("results", []):
            print(f"Mission: {launch.get('name')}")
            
            # 1. Test Orbit Extraction
            orbit = "Unknown"
            if launch.get("mission") and launch["mission"].get("orbit"):
                 orbit = launch["mission"]["orbit"].get("abbrev", "Unknown")
            print(f"  Orbit: {orbit}")

            # 2. Test Pad Extraction
            pad = "Unknown"
            if launch.get("pad"):
                pad = launch["pad"].get("name", "Unknown")
            print(f"  Pad:   {pad}")

            # 3. Test Link Generation
            links = link_utils.generate_launch_links(launch)
            print(f"  Link Source: {links['source']}")
            print(f"  Stream URL:  {links['stream']}")
            print(f"  Tracking:    {links['tracking']}")
            print("-" * 50)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_launches()
