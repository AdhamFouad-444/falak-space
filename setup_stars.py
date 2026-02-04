import shutil
import os

source = "/Users/driver444/.gemini/antigravity/brain/fdb62300-902b-4761-99ca-c3b1d4018af7/deep_space_stars_1770081862543.png"
dest = "deep_space.png"

try:
    if os.path.exists(source):
        shutil.copy2(source, dest)
        print(f"Successfully copied {source} to {dest}")
    else:
        print(f"Source file not found: {source}")
except Exception as e:
    print(f"Error copying file: {e}")
