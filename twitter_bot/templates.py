"""
FALAk Twitter Bot - Tweet Templates

These templates ensure tweets are:
- Grounded in real data (not AI-generated slop)
- Aligned with FALAk's educational voice
- Accessible and jargon-free
"""

# =============================================================================
# NASA APOD (Astronomy Picture of the Day)
# =============================================================================

APOD_TEMPLATES = [
    "📷 NASA Astronomy Picture of the Day\n\n\"{title}\"\n\n{explanation_short}\n\n🔗 {url}",
    
    "🌌 Today's cosmic view: {title}\n\n{explanation_short}\n\n📸 Credit: NASA/APOD\n🔗 {url}",
    
    "✨ {title}\n\n{explanation_short}\n\nSpace reveals something new every day. 🔗 {url}",
]

# =============================================================================
# NEAR-EARTH OBJECTS (Asteroids)
# =============================================================================

NEO_TEMPLATES = [
    "☄️ Asteroid Alert\n\n{name} is passing Earth today\n📏 Size: ~{diameter}m\n📍 Distance: {distance} km\n\nNo danger - just a cosmic neighbor passing by.\n\n#SpaceAwareness",
    
    "🌍 Today's cosmic flyby: {name}\n\nDiameter: ~{diameter}m\nClosest approach: {distance} km from Earth\n\nNear-Earth objects remind us space is dynamic.\n\n#Asteroids",
]

# =============================================================================
# LAUNCHES
# =============================================================================

LAUNCH_TEMPLATES = [
    "🚀 Upcoming Launch\n\n{mission_name}\n📅 {date}\n🏢 {provider}\n📍 {location}\n\nWatch: {stream_url}\n\n#SpaceLaunch",
    
    "🔴 Launch Alert: {mission_name}\n\n{provider} • {date}\nLocation: {location}\n\n{description_short}\n\n🔗 {stream_url}",
]

# =============================================================================
# EDUCATIONAL CONTENT (Links to FALAk Framework)
# =============================================================================

EDUCATIONAL_TEMPLATES = [
    "🎓 Space Education\n\n{question}\n\n{answer}\n\nLearn more in our Education Framework: {link}",
    
    "❓ {question}\n\n{answer}\n\nThis is part of FALAk's mission: making space education accessible to everyone.\n\n#SpaceEducation",
]

# Educational content library (grounded in Framework 001)
EDUCATIONAL_CONTENT = [
    {
        "question": "Why do rockets have stages?",
        "answer": "Dropping dead weight saves fuel. Single-stage-to-orbit is extremely hard because carrying empty tanks costs energy. Staging is unavoidable physics.",
        "section": "Section 2.6"
    },
    {
        "question": "Where does space begin?",
        "answer": "Space begins where aerodynamic flight ends and orbital mechanics dominate. The practical boundary is ~100km (Kármán Line). It's defined by physics, not distance.",
        "section": "Section 1.1"
    },
    {
        "question": "Why can't planes fly to space?",
        "answer": "Planes need air for lift and engines. As altitude increases, air thins until wings stop working. Rockets carry their own oxidizer and work in vacuum.",
        "section": "Section 2.2"
    },
    {
        "question": "Why do astronauts 'float' in space?",
        "answer": "They're not weightless - they're in continuous free-fall around Earth. Gravity never turns off. 'Floating' is actually constant falling.",
        "section": "Section 1.4"
    },
    {
        "question": "Why is space called 'hostile by default'?",
        "answer": "No air (no lift, no breathing), extreme temperatures, radiation, no repair or rescue. Errors are irreversible. Space engineering is unforgiving.",
        "section": "Section 1.3"
    },
    {
        "question": "What's the hardest part of launching a rocket?",
        "answer": "The launch itself. Vibration, acceleration, and heating during ascent make it the most failure-prone phase. That's why engines are verified before release.",
        "section": "Section 2.8"
    },
    {
        "question": "Is orbit about height or speed?",
        "answer": "Speed. Getting to orbit means going sideways fast enough to 'miss' Earth as you fall. Orbit is an energy problem, not an altitude problem.",
        "section": "Section 2.9"
    },
    {
        "question": "Why are rockets mostly fuel?",
        "answer": "Fuel dominates mass. Payload is a tiny fraction. To lift more, you need more fuel, which adds weight, requiring more fuel. Rockets scale poorly.",
        "section": "Section 2.5"
    },
]

# =============================================================================
# FALAK UPDATES
# =============================================================================

FALAK_UPDATE_TEMPLATES = [
    "🏆 FALAk Update\n\n{update}\n\nWe're building pathways into space - one step at a time.\n\n#FALAkSpace #SpaceEducation",
]

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def truncate_text(text: str, max_length: int = 100) -> str:
    """Truncate text to fit tweet limits, ending at a complete sentence if possible."""
    if len(text) <= max_length:
        return text
    
    # Try to cut at a sentence boundary
    truncated = text[:max_length]
    last_period = truncated.rfind('.')
    
    if last_period > max_length // 2:
        return text[:last_period + 1]
    
    return truncated.rsplit(' ', 1)[0] + "..."


def format_distance(km: float) -> str:
    """Format large distances for readability."""
    if km >= 1_000_000:
        return f"{km / 1_000_000:.1f} million"
    elif km >= 1_000:
        return f"{km / 1_000:.0f}K"
    return f"{km:.0f}"
