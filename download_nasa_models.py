import os
import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ASSETS_FILE = "/Users/driver444/Desktop/FALAk Space /nasa_glb_assets.txt"
DEST_DIR = "/Users/driver444/Desktop/FALAk Space /simlab/public/models/nasa"
BASE_URL = "https://raw.githubusercontent.com/nasa/NASA-3D-Resources/master/"

def download_file(path_info):
    # Parse path and construct full URL
    path = path_info.strip().replace('"path": ', '').strip('",')
    # Handle the fact that spaces and parentheses in URL need to be encoded
    from urllib.parse import quote
    url_path = quote(path)
    url = BASE_URL + url_path
    
    # Extract filename
    filename = os.path.basename(path)
    # create category folder
    category = os.path.dirname(path).replace("3D Models/", "")
    save_dir = os.path.join(DEST_DIR, category)
    os.makedirs(save_dir, exist_ok=True)
    
    save_path = os.path.join(save_dir, filename)
    
    if os.path.exists(save_path):
        print(f"Already exists: {filename}")
        return True
    
    print(f"Downloading: {filename}...")
    try:
        urllib.request.urlretrieve(url, save_path)
        print(f"Success: {filename}")
        return True
    except Exception as e:
        print(f"Failed: {filename} - {e}")
        return False

def main():
    os.makedirs(DEST_DIR, exist_ok=True)
    paths = []
    with open(ASSETS_FILE, 'r') as f:
        for line in f:
            if '"path":' in line:
                paths.append(line)
    
    print(f"Found {len(paths)} models to download.")
    
    # Use ThreadPoolExecutor to download multiple files in parallel
    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(download_file, paths))
        
    print(f"Downloaded {sum(results)} out of {len(paths)} models.")

if __name__ == "__main__":
    main()
