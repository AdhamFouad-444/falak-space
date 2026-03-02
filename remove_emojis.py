import os
import re

replacements = {
    '⚡': 'Zap',
    '🌡️': 'Thermometer',
    '🧭': 'Compass',
    '🧠': 'Brain',
    '🛰️': 'Satellite',
    '🔥': 'Flame',
    '⚠️': '',
    '🚀': '',
    '💀': 'AlertTriangle',
    '☢️': 'Radio',
    '💥': 'Crosshair',
    '⌨️': 'Keyboard',
    '✈️': 'Plane'
}

def clean_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for emoji, replacement in replacements.items():
        new_content = new_content.replace(emoji, replacement)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)

for root, _, files in os.walk('/Users/driver444/Desktop/FALAk Space /simlab/src/modules'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            clean_file(os.path.join(root, file))

for root, _, files in os.walk('/Users/driver444/Desktop/FALAk Space /simlab/src/components/Simulations'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            clean_file(os.path.join(root, file))

print("Cleaned emojis")
