/* ============================================
   FALAk - Curriculum Engine
   Education Framework 001: From Earth to Space
   ============================================ */

const FALAK_CURRICULUM = {
    id: "framework-001",
    title: "From Earth to Space",
    subtitle: "Systems, Constraints, and Limits",
    sections: [
        {
            id: "1",
            title: "What is Space",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`, // Globe
            lessons: [
                {
                    id: "1.1",
                    title: "Definition of Space",
                    content: "Space is not emptiness. Space begins where aerodynamic flight ends and orbital mechanics dominate. The practical boundary is ~100 km (the Kármán Line).",
                    learningOutcome: "Understand that space is defined by physics, not distance.",
                    simulation: null
                },
                {
                    id: "1.2",
                    title: "Earth's Atmospheric Layers",
                    content: "Troposphere (0–12 km) → Stratosphere (12–50 km) → Mesosphere (50–85 km) → Thermosphere (85–500+ km) → Exosphere (≈500–10,000 km).",
                    learningOutcome: "Know which technologies operate in which layers and why.",
                    simulation: "atmosphere-layers"
                },
                {
                    id: "1.3",
                    title: "Why Space Is Hostile",
                    content: "No air means no lift and no breathing. Extreme temperatures swing from scorching to freezing. Radiation exposure is constant. No repair or rescue is possible. Errors are irreversible.",
                    learningOutcome: "Understand why space engineering is unforgiving.",
                    simulation: null
                },
                {
                    id: "1.4",
                    title: "Motion Beyond Earth",
                    content: "Gravity never turns off. Objects in orbit are in continuous free-fall. 'Floating' is just falling sideways fast enough to miss the ground.",
                    learningOutcome: "Correctly explain why objects stay in orbit.",
                    simulation: "gravity-orbit"
                },
                {
                    id: "1.5",
                    title: "Understanding Orbits",
                    content: "Orbits can be circular or elliptical. Altitude is related to energy. Higher orbits are slower; lower orbits decay faster. Orbit is an energy problem, not a height problem.",
                    learningOutcome: "Understand orbit as an energy problem, not height.",
                    simulation: "orbit-energy"
                }
            ]
        },
        {
            id: "2",
            title: "How We Get There",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5s-2 2.5-4 5c-1.5 1.8-2 3.5-2 5.5C6 16.3 8.7 19 12 19s6-2.7 6-6c0-2-0.5-3.7-2-5.5-2-2.5-4-5-4-5zM12 21c-1.1 0-2 .9-2 2h4c0-1.1-.9-2-2-2z"/></svg>`, // Rocket
            lessons: [
                {
                    id: "2.1",
                    title: "The Launch Problem",
                    content: "Earth's gravity pulls everything down. The atmosphere causes drag and heating. Wings stop working well below space.",
                    learningOutcome: "Understand why normal flight cannot reach space.",
                    simulation: "drag-demo"
                },
                {
                    id: "2.2",
                    title: "Why Rockets, Not Planes",
                    content: "Rockets carry their own oxidizer. Thrust works in vacuum. Newton's Third Law: for every action, there is an equal and opposite reaction.",
                    learningOutcome: "Understand why rockets are required.",
                    simulation: null
                },
                {
                    id: "2.3",
                    title: "The Rocket as a System",
                    content: "A rocket is not just an engine. It's an integrated system: Propulsion, Structure, Fuel & Oxidizer, Guidance & Control, Avionics, Payload.",
                    learningOutcome: "See rockets as integrated systems, not engines.",
                    simulation: null
                },
                {
                    id: "2.5",
                    title: "The Mass Problem",
                    content: "Fuel dominates the rocket's mass. Payload is only a small fraction. Structural limits grow rapidly with size.",
                    learningOutcome: "Understand why rockets scale poorly.",
                    simulation: "mass-ratio"
                },
                {
                    id: "2.6",
                    title: "Staging",
                    content: "Dropping dead weight improves efficiency. Multi-stage rockets discard empty tanks. Single-stage-to-orbit is extremely difficult.",
                    learningOutcome: "Understand why staging is unavoidable.",
                    simulation: "staging-demo"
                },
                {
                    id: "2.9",
                    title: "Launch Profile",
                    content: "Launch starts vertical to escape dense atmosphere. Gradual pitch-over converts vertical speed to horizontal. Orbital insertion is about sideways speed, not altitude.",
                    learningOutcome: "Understand that orbit is about speed, not altitude.",
                    simulation: "launch-pad"
                }
            ]
        },
        {
            id: "3",
            title: "Launch Operations",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`, // Operations/Control
            lessons: [
                {
                    id: "3.1",
                    title: "What a Launch Sequence Is",
                    content: "A launch is a controlled transition between system states: Safe → Conditioned → Fueled → Armed → Ignition → Liftoff.",
                    learningOutcome: "Understand launch as a system state machine.",
                    simulation: null
                },
                {
                    id: "3.2",
                    title: "Ground Systems",
                    content: "Launch is mostly a ground operation. Systems include: propellant handling, purge/pressurization, flame trench, power/data/telemetry, range safety.",
                    learningOutcome: "Understand that launch is mostly a ground operation.",
                    simulation: null
                },
                {
                    id: "3.5",
                    title: "Terminal Count",
                    content: "Go/No-Go polls verify all systems. Hold points allow for issue resolution. Critical events are automated because humans are too slow.",
                    learningOutcome: "Understand why humans hand control to software.",
                    simulation: null
                },
                {
                    id: "3.7",
                    title: "Abort Philosophy",
                    content: "Before commit: holds are possible. After commit: safety logic takes over. Public safety is the top priority.",
                    learningOutcome: "Understand why abort rules exist.",
                    simulation: null
                }
            ]
        },
        {
            id: "4",
            title: "Operating in Space",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 19h20L12 2zm0 3.8L18.4 17H5.6L12 5.8zM11 10h2v4h-2zm0 5h2v2h-2z"/></svg>`, // Satellite/Warning (placeholder, better satellite pending)
            lessons: [
                {
                    id: "4.1",
                    title: "Spacecraft Systems",
                    content: "After launch, spacecraft must manage: Power generation, Communication links, Thermal control, Orientation and attitude.",
                    learningOutcome: "Understand that launch is only the beginning.",
                    simulation: null
                },
                {
                    id: "4.2",
                    title: "Space as a Constraint",
                    content: "Radiation damages electronics. Thermal cycling stresses materials. Vacuum causes outgassing and lubricant loss.",
                    learningOutcome: "Understand why space continuously degrades systems.",
                    simulation: null
                },
                {
                    id: "4.3",
                    title: "Failure & Risk",
                    content: "Single-point failures can end missions. Cascading failures are common. Redundancy is essential but adds mass.",
                    learningOutcome: "Understand why space systems are conservative.",
                    simulation: null
                }
            ]
        },
        {
            id: "5",
            title: "Simulation & AI",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>`, // Screen/Sim
            lessons: [
                {
                    id: "5.1",
                    title: "Why Simulations Are Used",
                    content: "Simulations allow safe experimentation. They enable visualization of invisible forces. They help explore trade-offs before building.",
                    learningOutcome: "Understand simulation as a learning tool.",
                    simulation: null
                },
                {
                    id: "5.2",
                    title: "Limits of Simulation",
                    content: "All simulations have assumptions. Variables are always missing. There is always a gap between simulation and reality.",
                    learningOutcome: "Simulation ≠ validation.",
                    simulation: null
                },
                {
                    id: "5.3",
                    title: "AI's Role in Learning",
                    content: "AI adapts explanation depth. AI personalizes visuals. AI adjusts pacing. AI does NOT invent physics, validate designs, or replace reasoning.",
                    learningOutcome: "Same system, different explanation layers.",
                    simulation: null
                }
            ]
        },
        {
            id: "6",
            title: "Extreme Systems",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`, // Planet
            lessons: [
                {
                    id: "6.1",
                    title: "Why Hypotheticals Exist",
                    content: "Hypothetical systems stretch our understanding of constraints. They reveal the hard limits of physics.",
                    learningOutcome: "Imagination bounded by physics.",
                    simulation: null
                },
                {
                    id: "6.3",
                    title: "Advanced Propulsion",
                    content: "Light sails use photon pressure. Nuclear concepts offer high specific impulse. All are constrained by energy, mass, and time.",
                    learningOutcome: "Understand future propulsion possibilities.",
                    simulation: null
                },
                {
                    id: "6.5",
                    title: "Long-Term Possibilities",
                    content: "Some things might become possible. Some things will remain impossible. Physics sets the ultimate boundaries.",
                    learningOutcome: "Imagination does not override physics.",
                    simulation: null
                }
            ]
        },
        {
            id: "7",
            title: "Boundaries & Ethics",
            icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`, // Shield/Ethics
            lessons: [
                {
                    id: "7.1",
                    title: "Educational Boundaries",
                    content: "This framework is educational only. No building. No launching. No certification. No operational training.",
                    learningOutcome: "Understand the scope and limits of this program.",
                    simulation: null
                }
            ]
        }
    ]
};

// Curriculum Navigation Helper
class CurriculumNavigator {
    constructor(curriculum) {
        this.curriculum = curriculum;
        this.currentSectionIndex = 0;
        this.currentLessonIndex = 0;
    }

    getCurrentSection() {
        return this.curriculum.sections[this.currentSectionIndex];
    }

    getCurrentLesson() {
        const section = this.getCurrentSection();
        return section ? section.lessons[this.currentLessonIndex] : null;
    }

    nextLesson() {
        const section = this.getCurrentSection();
        if (this.currentLessonIndex < section.lessons.length - 1) {
            this.currentLessonIndex++;
        } else if (this.currentSectionIndex < this.curriculum.sections.length - 1) {
            this.currentSectionIndex++;
            this.currentLessonIndex = 0;
        }
        return this.getCurrentLesson();
    }

    prevLesson() {
        if (this.currentLessonIndex > 0) {
            this.currentLessonIndex--;
        } else if (this.currentSectionIndex > 0) {
            this.currentSectionIndex--;
            const section = this.getCurrentSection();
            this.currentLessonIndex = section.lessons.length - 1;
        }
        return this.getCurrentLesson();
    }

    goToLesson(sectionId, lessonId) {
        const sectionIdx = this.curriculum.sections.findIndex(s => s.id === sectionId);
        if (sectionIdx !== -1) {
            this.currentSectionIndex = sectionIdx;
            const section = this.getCurrentSection();
            const lessonIdx = section.lessons.findIndex(l => l.id === lessonId);
            if (lessonIdx !== -1) {
                this.currentLessonIndex = lessonIdx;
            }
        }
        return this.getCurrentLesson();
    }

    getProgress() {
        let total = 0;
        let current = 0;
        this.curriculum.sections.forEach((section, sIdx) => {
            section.lessons.forEach((lesson, lIdx) => {
                total++;
                if (sIdx < this.currentSectionIndex ||
                    (sIdx === this.currentSectionIndex && lIdx <= this.currentLessonIndex)) {
                    current++;
                }
            });
        });
        return { current, total, percent: Math.round((current / total) * 100) };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FALAK_CURRICULUM, CurriculumNavigator };
}
