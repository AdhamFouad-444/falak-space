# IMPLEMENTATION PLAN: FALAk Education Framework 001

## 1. Overview
This plan outlines the technical execution for integrating "Education Framework 001" into the FALAk web platform. The goal is to transform the static written framework into an interactive, "Simulation-Led" learning experience.

## 2. Core Philosophy Alignment
*   **Simulation-Led:** Lessons should not be walls of text. Where possible (Sections 1.5, 2.9), the existing `simulation.js` engine should be the primary teaching tool.
*   **AI-Enabled:** The architecture must support AI agents (like me) acting as tutors to "adapt explanation depth" (Section 5.3).

## 3. Data Structure (The "Curriculum Engine")
We will create a `curriculum.js` file to act as the database.
```javascript
const framework001 = [
    {
        id: "1.0",
        title: "What is Space",
        sections: [
            { id: "1.1", title: "Definition", content: "Space begins where aerodynamic flight ends...", interactive: null },
            { id: "1.4", title: "Motion Beyond Earth", content: "Gravity never turns off...", interactive: "gravity-well-sim" }
        ]
    },
    // ...
]
```

## 4. Execution Components

### Phase 1: The "Mission Log" (Lesson Viewer)
*   **Task:** Create a new page `mission-log.html` (or single-page view in `index.html`) to display lessons.
*   **Design:** Split-screen interface.
    *   **Left Panel:** "Flight Manual" (The educational content from Framework 001).
    *   **Right Panel:** "viewport" (Visuals, Animations, or the Simulation Canvas).
*   **Tech:** Vanilla JS to dynamically load content from `curriculum.js`.

### Phase 2: Simulation Mapping
We need to upgrade `simulation.js` to accept "Mission Parameters" so it can teach different lessons.
*   **Lesson 1.5 (Orbits):** Configure sim with infinite fuel but high gravity to show "falling".
*   **Lesson 2.1 (The Launch Problem):** Configure sim with atmosphere drag (new feature needed) to show why "up is hard".
*   **Lesson 2.9 (Launch Profile):** The current "Launch Pad" sim fits here perfectly.

### Phase 3: The "AI Flight Director" (Section 5.3)
*   **Task:** Add a "Chat/Query" interface in the Lesson Viewer.
*   **Function:** Allow the user to ask "Why did I crash?" The AI (simulated or real API) analyzes the `simulation.js` telemetry logs (`rocket.vel`, `rocket.pos`) and explains the physics failure.

## 5. Step-by-Step Instructions for Executive Agent ("Claude")

1.  **Create `curriculum.js`**:
    *   Initialize the file.
    *   Convert `EDUCATION_FRAMEWORK_001.md` into the JSON structure designed above.
    *   *Constraint:* Ensure all learning outcomes are preserved.

2.  **Build the `MissionViewer` Component**:
    *   Create a JS class in `script.js` that renders the Lesson Layout.
    *   Implement "Next/Prev" navigation between Framework sections.

3.  **Upgrade `simulation.js`**:
    *   Add a `loadScenario(config)` method.
    *   Implement `config.drag` (Atmosphere density).
    *   Implement `config.gravity` (Variable gravity).
    *   *Goal:* Support the diverse physics scenarios needed for Sections 1 & 2.

4.  **Integration**:
    *   Link the "Explore Our Path" button on homepage to the `MissionViewer` starting at Section 1.1.
    *   Replace the static "Features" section on homepage with a dynamic "Curriculum Preview".

## 6. Success Metrics
*   User can navigate from Section 1.1 to 7.0 sequentially.
*   Simulation adapts behavior based on the active lesson.
*   "Learning Outcomes" are visible for each section.
