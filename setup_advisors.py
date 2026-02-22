
import os

html_content = ""
with open("advisors.html", "r") as f:
    html_content = f.read()

# 1. Replace Hero
hero_start_marker = '<div class="hero-text">'
hero_end_marker = '<!-- Banner Image Removed by User Request -->'

new_hero = """
            <div class="hero-text">
                <h1 id="hero-title" style="margin-bottom: 20px;">Academic Advisors</h1>
                <p id="hero-desc">Supporting FALAk's integrity and educational standards.</p>
            </div>

            <div class="hero-cta" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                <a href="index.html" class="btn btn-secondary">← Return to Home</a>
            </div>
"""

# Find hero section content to replace
# We want to keep the logo stuff at top of hero, just replace text and buttons
# The Hero text block starts at line ~2049
# The Hero CTA ends at line ~2070
# Easier to find "hero-text" div and replace until end of hero-cta

hero_split = html_content.split('<div class="hero-text">')
if len(hero_split) > 1:
    pre_hero = hero_split[0]
    # Now find where to resume. After hero-cta.
    # Look for </section> of hero
    post_hero_split = hero_split[1].split('</section>', 1)
    if len(post_hero_split) > 1:
        # Reconstruct Hero
        # But we need to keep the Logo container which is in pre_hero?
        # Yes, pre_hero contains logo container.
        
        # We need to construct the new inner content
        # Note: post_hero_split[0] contains the old text and cta
        # post_hero_split[1] contains the rest of file including </section> is consumed? split removes delimiter? 
        # split(sep, 1) returns [before, after]. specific sep is removed.
        # So we need to add </section> back.
        
        pass

# Simpler approach: Replace from <section id="vision" ... to <footer
# And assume Hero is just manually replaced or left as is for now? 
# User wants "Academic Advisors" header.

# Let's do the big chunk removal first (Vision -> Join)
vision_marker = '<section id="vision"'
footer_marker = '<footer'

if vision_marker in html_content and footer_marker in html_content:
    parts = html_content.split(vision_marker)
    pre_vision = parts[0]
    
    # post_vision_part starts with style="padding...
    # We search for footer in the SECOND part
    footer_parts = parts[1].split(footer_marker)
    # footer_parts[-1] is likely the footer content? No.
    # split by footer marker. The footer marker is at the end.
    # There might be multiple footers? No.
    
    # Let's search for the LAST occurrence of footer_marker in the file to be safe?
    # Or just use the Split.
    
    # Re-read file logic
    start_idx = html_content.find(vision_marker)
    end_idx = html_content.find(footer_marker)
    
    if start_idx != -1 and end_idx != -1:
        new_content = pre_vision[:start_idx] + """
        <section id="advisors" style="padding: 100px 48px; text-align: center;">
            <div class="section-header">
                <div class="section-tag">Governance</div>
                <h2>Scientific Integrity</h2>
                <p class="section-desc">FALAk's educational framework is reviewed by leading academics to ensure accuracy and pedagogical value.</p>
            </div>

            <div class="team-grid" style="max-width: 1000px; margin: 0 auto;">
                <!-- Dr. Rob Purdy -->
                <div class="team-card">
                    <div style="width: 120px; height: 120px; margin: 0 auto 20px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <span style="font-size: 3rem;">🎓</span>
                    </div>
                    <div class="team-name">Dr. Rob Purdy</div>
                    <div class="team-role">Academic Advisor</div>
                    <p class="team-bio">
                        Head of Physics at the University of Leeds. Supporting FALAk's educational integrity and curriculum structure.
                    </p>
                </div>

                <!-- Placeholder 1 -->
                 <div class="team-card" style="opacity: 0.5; border-style: dashed;">
                    <div style="width: 120px; height: 120px; margin: 0 auto 20px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 2rem; color: rgba(255,255,255,0.2);">?</span>
                    </div>
                    <div class="team-name">Future Advisor</div>
                    <div class="team-role">Call for participation</div>
                    <p class="team-bio">
                        We are actively seeking advisors in Aerospace Engineering and Planetary Science.
                    </p>
                </div>

                <!-- Placeholder 2 -->
                 <div class="team-card" style="opacity: 0.5; border-style: dashed;">
                    <div style="width: 120px; height: 120px; margin: 0 auto 20px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 2rem; color: rgba(255,255,255,0.2);">?</span>
                    </div>
                    <div class="team-name">Future Advisor</div>
                    <div class="team-role">Call for participation</div>
                    <p class="team-bio">
                        Join our board to help shape the next generation of space education.
                    </p>
                </div>
            </div>
        </section>
        """ + html_content[end_idx:]
        
        # Now replace Hero Text within new_content
        # Hero text is in the 'pre_vision' part of original, which is preserved.
        
        target_hero = '<h1 id="hero-title">LEARN HOW SPACE WORKS — FROM FUNDAMENTALS TO REAL SYSTEMS.</h1>'
        replacement_hero = '<h1 id="hero-title">Academic Advisors</h1>'
        new_content = new_content.replace(target_hero, replacement_hero)
        
        target_desc = '<p id="hero-desc">FALAk is a platform designed to help anyone understand space through structured\n                    frameworks, simulation, and AI-assisted learning.</p>'
        # Note: newline and indent might kill match.
        # Use simple string replacement on generic unique substrings if exact match fails
        
        # Let's search for "hero-desc" properties
        import re
        new_content = re.sub(r'<h1 id="hero-title">.*?</h1>', '<h1 id="hero-title">Academic Advisors</h1>', new_content, flags=re.DOTALL)
        new_content = re.sub(r'<p id="hero-desc">.*?</p>', '<p id="hero-desc">Supporting FALAk\'s integrity and educational standards.</p>', new_content, flags=re.DOTALL)
        
        # Replace buttons
        # Regex for hero-cta content
        new_content = re.sub(r'<div class="hero-cta".*?</div>', 
                             '<div class="hero-cta" style="display: flex; justify-content: center; margin-top: 30px;"><a href="index.html" class="btn btn-secondary">← Return to Home</a></div>', 
                             new_content, flags=re.DOTALL)

        with open("advisors.html", "w") as f:
            f.write(new_content)
        print("Successfully updated advisors.html")
    else:
        print("Could not find start/end markers")
else:
    print("Markers not found")
