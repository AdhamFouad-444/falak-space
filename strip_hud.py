import os
import re

def strip_motion_hud(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Remove import of MotionHUD
    content = re.sub(r"import\s+MotionHUD\s+from\s+[^;]+;\n?", "", content)
    
    # Remove <MotionHUD />
    content = re.sub(r"<\s*MotionHUD\s*/?>\n?", "", content)
    
    # Optionally, also remove UnifiedSimulationLayout if it exists? We will do that manually for AnimationEngine.
    
    with open(filepath, 'w') as f:
        f.write(content)

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                strip_motion_hud(filepath)

walk_dir('simlab/src/modules')
walk_dir('simlab/src/components')
print("Done stripping MotionHUD.")
