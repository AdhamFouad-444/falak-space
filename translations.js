/* ============================================
   FALAk - Translation Engine & Dictionary
   ============================================ */

const TRANSLATIONS = {
    en: {
        // Nav
        "nav-journey": "Learning Path",
        "nav-features": "Features",
        "nav-join": "Join",
        "nav-cta": "Follow Progress",

        // Hero
        "hero-title": "LEARN HOW SPACE WORKS — FROM FUNDAMENTALS TO REAL SYSTEMS.",
        "hero-desc": "FALAk is a platform designed to help anyone understand space through structured frameworks, simulation, and AI-assisted learning.",
        "hero-btn-primary": "Explore the Platform",
        "hero-btn-solar": "Launch Solar System 🪐",

        // Vision / Intro
        "intro-tag": "Our Vision",
        "intro-title": "Beyond Boundaries",
        "intro-p1": "We focus on building clear learning paths that help people understand space environments, systems, and operations.",
        "intro-p2": "We begin with fundamentals, systems thinking, and exploration — creating a foundation for understanding complex space capabilities.",

        // SimLab Section
        "sim-tag": "Interactive Learning",
        "sim-title": "Learning Through Structured Exploration",
        "sim-desc": "FALAk focuses on helping learners understand how space systems work before attempting to build them.",
        "sim-note": "Simulation tools are introduced later as part of a staged learning approach.",

        // Education Header
        "edu-tag": "Learning Journey",
        "edu-title": "Your Path to the Stars",
        "fw-label": "Framework 001",
        "fw-subtitle": "From first principles to applied systems",
        "fw-desc": "Framework 001 is the foundation of how FALAk structures learning about space.",

        // Stats
        "stat-1-val": "Global Interest",
        "stat-1-lbl": "From learners & educators",
        "stat-2-val": "Guided",
        "stat-2-lbl": "By subject matter experts",
        "stat-3-lbl": "Learning Stages",
        "stat-4-val": "UAE",
        "stat-4-lbl": "Abu Dhabi",

        // Features
        "feat-tag": "Why FALAk",
        "feat-title": "Education Built for Space",
        "feat-1-h": "Adaptive Learning",
        "feat-1-p": "Personalized curriculum that adapts to your pace, background, and goals.",
        "feat-2-h": "Built for MENA",
        "feat-2-p": "Content in Arabic and English. Designed for learners across the region.",
        "feat-3-h": "Accessible Learning",
        "feat-3-p": "A platform built for everyone. Designed to make space education accessible to all backgrounds.",
        "feat-4-h": "Skill-Focused",
        "feat-4-p": "Developing relevant skills for the future space sector. Grounded in reality.",

        // CTA
        "cta-tag": "Start Learning",
        "cta-title": "Space education limits, removed.",
        "cta-desc": "FALAk is a dedicated platform for space education.<br>We are constantly expanding our curriculum to cover more advanced topics.",
        "cta-btn": "Follow Our Progress",

        // Footer
        "footer-copy": "© 2026 FALAk · Abu Dhabi, UAE · Opening Pathways Into Space",

        // UI / Dynamic (New)
        "ui-section-prefix": "Section",
        "ui-lesson-label": "Lessons",
        "ui-close": "Close",
        "ui-prev": "Previous",
        "ui-next": "Next",
        "ui-outcome": "Learning Outcome",
        "ui-lesson-n": "Lesson",
        "ui-of": "of",

        // Digital Twin (Artemis)
        "twin-tag": "Mission Architecture",
        "twin-title": "Artemis II Crew",
        "twin-desc": "The most powerful rocket NASA has ever built. Designed to loft the Orion spacecraft on a trans-lunar trajectory, enabling sustained presence on the Moon.",
        "twin-stat1-lbl": "Max Thrust",
        "twin-stat1-val": "8.8M lbs",
        "twin-stat2-lbl": "Max Payload (LEO)",
        "twin-stat2-val": "27 metric tons",

        // Stack Header
        "artemis-stack-title": "Artemis II Vehicle Stack",
        "artemis-stack-desc": "Breaking down the super-heavy lift launch vehicle designed to return humans to the Moon",

        // Solar System
        "solar-tag": "Visualization",
        "solar-title": "Solar System Journey",
        "solar-desc": "Explore the planets of our solar system",

        // Misc
        "pm-btn": "Start Learning",
        "footer-copy": "© 2026 FALAk · Abu Dhabi, UAE · Opening Pathways Into Space",

        // Nav (new)
        "nav-news": "News",
        "nav-community": "Community",
        "nav-beta": "Academy",
        "beta-badge": "BETA",

        // News Section
        "news-tag": "Space News",
        "news-title": "What's Happening in Space",
        "news-desc": "Space developments from the MENA region and beyond, with educational context.",
        "news-loading": "Loading latest space news...",
        "news-error": "Latest news is being synchronized. Please check back in a moment.",
        "news-1-h": "Hope Probe Continues Extended Science Phase",
        "news-1-p": "The UAE's Emirates Mars Mission extends its observation campaign, providing new atmospheric data on Mars' upper atmosphere and seasonal dust storms.",
        "news-1-src": "UAE Space Agency",
        "news-2-h": "Saudi Astronaut Program Expands Training",
        "news-2-p": "The Saudi Space Commission announces a new cohort of astronaut candidates, building on the success of the Ax-2 mission to the ISS.",
        "news-2-src": "Saudi Space Commission",
        "news-3-h": "Egypt's Domestically Assembled Satellite Nears Completion",
        "news-3-p": "EgSA's next-generation Earth observation satellite enters final integration and testing, marking a significant step for African space capability.",
        "news-3-src": "Egyptian Space Agency",
        "news-4-h": "Artemis III Crew Selection and Timeline Update",
        "news-4-p": "NASA confirms the next phase of the Artemis program, with updated crew assignments and a refined timeline for the first crewed lunar landing since Apollo.",
        "news-4-src": "NASA",

        // Launch Systems Section (New)
        "launch-tag": "Launch Systems",
        "launch-title": "The First High-Performance Launch Vehicle",
        "launch-desc": "Engineered for precision. Explore the anatomical breakdown of our orbital-class launch vehicle.",
        "sim-btn-dev": "Currently in Development",

        // Resources Section
        "resources-tag": "Resources",
        "resources-title": "Curated Space Knowledge",
        "resources-desc": "Trusted sources to deepen your understanding of space systems.",
        "res-type-data": "Data Portal",
        "res-type-edu": "Education",
        "res-type-video": "Video",
        "res-type-research": "Research",
        "res-type-course": "Course",
        "res-type-tool": "Interactive Tool",
        "res-1-h": "NASA Open Data",
        "res-1-p": "Access NASA's public datasets — missions, imagery, telemetry, and more.",
        "res-2-h": "ESA Education",
        "res-2-p": "Learning resources from the European Space Agency for all levels.",
        "res-3-h": "Everyday Astronaut",
        "res-3-p": "Deep-dive engineering breakdowns of rockets and space systems.",
        "res-4-h": "arXiv Space",
        "res-4-p": "Open-access preprints in astrophysics, cosmology, and space science.",
        "res-5-h": "MIT OpenCourseWare",
        "res-5-p": "Full MIT OpenCourseWare on orbital mechanics — lectures, problem sets.",
        "res-6-h": "NASA Eyes",
        "res-6-p": "3D visualization of the solar system, missions, and Earth from space.",

        // Community Section
        "community-tag": "Community",
        "community-title": "Connect With Space Learners",
        "community-desc": "Join learners, educators, and space enthusiasts from across the MENA region and beyond.",
        "community-feat-1": "Discussion Forums",
        "community-feat-2": "Peer Learning",
        "community-feat-3": "Mentorship",
        "community-feat-4": "Multilingual",
        "community-badge": " Coming Soon — Join our Discord community (Launching Soon)",

        // Planet Modal
        "pm-title": "Planet",
        "pm-level": "Level",
        "pm-desc-placeholder": "Description",

        // Challenges Section
        "challenges-tag": "Challenges",
        "challenges-title": "Monthly Space Challenges",
        "challenges-desc": "Put your knowledge to the test with real engineering problems.",
        "challenge-soon-lbl": "Coming Soon",
        "ch-diff-1": "Intermediate",
        "ch-diff-2": "Advanced",
        "ch-diff-3": "Intermediate",
        "ch-1-h": "Hohmann Transfer Budget",
        "ch-1-p": "Calculate the delta-v budget for a Hohmann transfer from LEO to GEO orbit.",
        "ch-1-cat": "Orbital Mechanics",
        "ch-2-h": "CubeSat Thermal Design",
        "ch-2-p": "Design a passive thermal control system for a 3U CubeSat in Low Earth Orbit.",
        "ch-2-cat": "Spacecraft Systems",
        "ch-3-h": "Mars Transfer Mass Ratio",
        "ch-3-p": "Estimate the total mass ratio for a 3-stage launch vehicle to reach Mars transfer orbit.",
        "ch-3-cat": "Propulsion",

        // About Section
        "nav-about": "About",
        "about-tag": "Who We Are",
        "about-title": "Building the Infrastructure for Space Learning",
        "about-mission-h": "Our Mission",
        "about-mission-p": "FALAk exists to build structured, interactive learning environments for understanding space systems. We believe meaningful participation in space begins with clarity — not just information, but structured understanding.",
        "about-story-h": "Our Story",
        "about-story-p": "FALAk was founded by a group of University of Leeds students across Business, Physics with Astrophysics, and Mathematics. We recognised a gap between curiosity about space and structured understanding of how space systems actually work.",
        "team-tag": "The Team",
        "team-title": "Meet the Founders",
        "team-adham-name": "Adham Fouad",
        "team-adham-role": "Founder & Product Lead",
        "team-adham-bio": "International Business & Marketing undergraduate focused on building scalable learning infrastructure and ecosystem partnerships.",
        "team-senith-name": "Senith Mendis",
        "team-senith-role": "Co-Founder & Scientific Director",
        "team-senith-bio": "Undergraduate in Physics with Astrophysics, responsible for scientific accuracy and systems integrity across the framework.",
        "team-laxshan-name": "Laxshan Rajaratnam",
        "team-laxshan-role": "Founding Contributor",
        "team-laxshan-bio": "Mathematics undergraduate supporting quantitative modelling and systems structure within the learning architecture.",
        "footer-locations": "Based in Abu Dhabi & Leeds",
        "footer-loc-desc": "FALAk operates with a long-term focus on strengthening technical learning pathways across the MENA region."
    },
    ar: {
        // Nav
        "nav-journey": "مسار التعلم",
        "nav-features": "المميزات",
        "nav-join": "انضم إلينا",
        "nav-cta": "تابع التقدم",

        // Hero
        "hero-title": "إتقان هندسة الفضاء",
        "hero-desc": "أكاديمية فلك تبني الجيل القادم لتعليم الفضاء. انتقل من الكتب التقليدية إلى المحاكاة عالية الدقة وأنظمة الطيران التفاعلية.",
        "hero-btn-primary": "استكشف الإطار",
        "hero-btn-solar": "إطلاق النظام الشمسي 🪐",


        // Vision / Intro
        "intro-tag": "رؤيتنا",
        "intro-title": "بناء الإنترنت المداري",
        "intro-p1": "يتحول اقتصاد الفضاء من الاستكشاف إلى البنية التحتية.",
        "intro-p2": "توفر فلك البنية الرقمية لتدريب الجيل القادم من مهندسي الفضاء ومخططي المهام.",

        // SimLab Section
        "sim-tag": "تعلم تفاعلي",
        "sim-title": "التعلم عبر الاستكشاف المنظم",
        "sim-desc": "تركز فلك على مساعدة المتعلمين على فهم كيفية عمل الأنظمة الفضائية قبل محاولة بنائها.",
        "sim-note": "سيتم تقديم أدوات المحاكاة لاحقًا كجزء من نهج تعليمي مرحلي.",

        // Education Header
        "edu-tag": "رحلة التعلم",
        "edu-title": "مسارك نحو النجوم",
        "fw-label": "إطار العمل 001",
        "fw-subtitle": "من المبادئ الأولى إلى النظم الفضائية التطبيقية",
        "fw-desc": "إطار العمل 001 هو الأساس الذي تنظم به فلك تعليم الفضاء.",

        // Stats
        "stat-1-val": "اهتمام مبكر",
        "stat-1-lbl": "من الطلاب والمعلمين",
        "stat-2-val": "توجيه",
        "stat-2-lbl": "بواسطة خبراء متخصصين",
        "stat-3-lbl": "مراحل للتعلم",
        "stat-4-val": "الإمارات",
        "stat-4-lbl": "أبوظبي",

        // Features
        "feat-tag": "لماذا فلك",
        "feat-title": "قدرات المهام الحرجة",
        "feat-1-h": "مساعد طيران ذكي",
        "feat-1-p": "يتكيف مساعدك الذكي مع مستواك ويجيب على الاستفسارات الفنية في الوقت الفعلي.",
        "feat-2-h": "سيادة إقليمية",
        "feat-2-p": "دعم عربي أصلي لتطوير قطاع الطيران والفضاء محلياً.",
        "feat-3-h": "بقيادة المجتمع",
        "feat-3-p": "تعلم جنبًا إلى جنب مع أقرانك. تواصل مع مرشدين من قطاع الفضاء.",
        "feat-4-h": "محاكاة صناعية",
        "feat-4-p": "تدرب على نفس محركات الفيزياء المستخدمة في تخطيط المهام الحقيقية.",

        // CTA
        "cta-tag": "ابدأ التدريب",
        "cta-title": "ابدأ تدريبك",
        "cta-desc": "عصر الفضاء الجديد يتطلب نوعًا جديدًا من التعليم.<br>ابدأ رحلتك مع فلك.",
        "cta-btn": "ابدأ التسلسل",

        // Footer
        "footer-copy": "© 2026 فلك · أبوظبي، الإمارات · فتح مسارات نحو الفضاء",

        // UI / Dynamic (New)
        "ui-section-prefix": "القسم",
        "ui-lesson-label": "دروس",
        "ui-close": "إغلاق",
        "ui-prev": "السابق",
        "ui-next": "التالي",
        "ui-outcome": "مخرجات التعلم",
        "ui-lesson-n": "الدرس",
        "ui-of": "من",

        // Digital Twin (Artemis)
        "twin-tag": "هندسة المهمة",
        "twin-title": "طاقم أرتميس الثاني",
        "twin-desc": "أقوى صاروخ بنته ناسا على الإطلاق. صُمم لإطلاق مركبة أوريون في مسار إلى القمر، مما يمهد لوجود مستدام.",
        "twin-stat1-lbl": "أقصى دفع",
        "twin-stat1-val": "٨.٨ مليون رطل",
        "twin-stat2-lbl": "أقصى حمولة (مدار أرضي منخفض)",
        "twin-stat2-val": "٢٧ طن متري",

        // Stack Header
        "artemis-stack-title": "نظام إطلاق أرتميس ٢",
        "artemis-stack-desc": "تحليل لصاروخ الإطلاق فائق الثقل المصمم لإعادة البشر إلى القمر.",

        // Solar System
        "solar-tag": "تصور مرئي",
        "solar-title": "رحلة النظام الشمسي",
        "solar-desc": "استكشف كواكب نظامنا الشمسي",

        // Misc
        "pm-btn": "ابدأ التعلم",
        "footer-copy": "© ٢٠٢٦ فلك · أبوظبي، الإمارات · نمهد الطريق نحو الفضاء",

        // Nav (new)
        "nav-news": "أخبار",
        "nav-community": "المجتمع",
        "nav-beta": "الأكاديمية",
        "beta-badge": "تجريبي",

        // News Section
        "news-tag": "أخبار الفضاء",
        "news-title": "ما يحدث في الفضاء",
        "news-desc": "تطورات الفضاء من منطقة الشرق الأوسط وشمال أفريقيا والعالم، مع سياق تعليمي.",
        "news-loading": "جاري تحميل آخر أخبار الفضاء...",
        "news-error": "يتم مزامنة آخر الأخبار حالياً. يرجى المحاولة بعد قليل.",
        "news-1-h": "مسبار الأمل يواصل مرحلة العلوم الموسعة",
        "news-1-p": "مهمة الإمارات لاستكشاف المريخ تمدد حملة الرصد، وتوفر بيانات جوية جديدة عن الغلاف الجوي العلوي للمريخ والعواصف الترابية الموسمية.",
        "news-1-src": "وكالة الإمارات للفضاء",
        "news-2-h": "البرنامج السعودي لرواد الفضاء يتوسع",
        "news-2-p": "هيئة الفضاء السعودية تعلن عن دفعة جديدة من المرشحين لرواد الفضاء، بناءً على نجاح مهمة Ax-2 إلى محطة الفضاء الدولية.",
        "news-2-src": "هيئة الفضاء السعودية",
        "news-3-h": "القمر الصناعي المصري المحلي يقترب من الاكتمال",
        "news-3-p": "القمر الصناعي المصري الجديد لرصد الأرض يدخل مرحلة التكامل والاختبار النهائي، مما يمثل خطوة مهمة للقدرات الفضائية الأفريقية.",
        "news-3-src": "وكالة الفضاء المصرية",
        "news-4-h": "تحديث طاقم وجدول أرتميس الثالث",
        "news-4-p": "ناسا تؤكد المرحلة التالية من برنامج أرتميس، مع تعيينات محدثة للطاقم وجدول زمني محسن لأول هبوط بشري على القمر منذ أبولو.",
        "news-4-src": "ناسا",

        // Launch Systems Section (New)
        "launch-tag": "أنظمة الإطلاق",
        "launch-title": "أول مركبة إطلاق عالية الأداء",
        "launch-desc": "مصممة بدقة. استكشف التحليل الهيكلي لمركبة الإطلاق ذات التصنيف المداري.",
        "sim-btn-dev": "تحت التطوير حالياً",

        // Resources Section
        "resources-tag": "الموارد",
        "resources-title": "معرفة فضائية منتقاة",
        "resources-desc": "مصادر موثوقة لتعميق فهمك لأنظمة الفضاء.",
        "res-type-data": "بوابة بيانات",
        "res-type-edu": "تعليم",
        "res-type-video": "فيديو",
        "res-type-research": "بحث علمي",
        "res-type-course": "دورة",
        "res-type-tool": "أداة تفاعلية",
        "res-1-h": "بيانات ناسا المفتوحة",
        "res-1-p": "الوصول إلى مجموعات بيانات ناسا العامة — مهمات، صور، قياسات عن بُعد، والمزيد.",
        "res-2-h": "تعليم وكالة الفضاء الأوروبية",
        "res-2-p": "موارد تعليمية من وكالة الفضاء الأوروبية لجميع المستويات.",
        "res-3-h": "إيفري داي أسترونوت",
        "res-3-p": "تحليلات هندسية معمقة للصواريخ وأنظمة الفضاء.",
        "res-4-h": "أركسيف فضاء",
        "res-4-p": "مسودات بحثية مفتوحة الوصول في الفيزياء الفلكية وعلم الكون وعلوم الفضاء.",
        "res-5-h": "دورات MIT المفتوحة",
        "res-5-p": "دورة MIT المفتوحة الكاملة في ميكانيكا المدارات — محاضرات ومسائل.",
        "res-6-h": "عيون ناسا",
        "res-6-p": "تصور ثلاثي الأبعاد للنظام الشمسي والمهمات والأرض من الفضاء.",

        // Community Section
        "community-tag": "المجتمع",
        "community-title": "تواصل مع متعلمي الفضاء",
        "community-desc": "انضم إلى المتعلمين والمعلمين وعشاق الفضاء من أنحاء المنطقة والعالم.",
        "community-feat-1": "منتديات نقاش",
        "community-feat-2": "تعلم الأقران",
        "community-feat-3": "إرشاد",
        "community-feat-4": "متعدد اللغات",
        "community-badge": "قريباً — انضم إلى مجتمع ديسكورد (قريباً)",

        // Planet Modal
        "pm-title": "الكوكب",
        "pm-level": "المستوى",
        "pm-desc-placeholder": "الوصف",

        // Challenges Section
        "challenges-tag": "التحديات",
        "challenges-title": "تحديات فضائية شهرية",
        "challenges-desc": "اختبر معرفتك بمسائل هندسية حقيقية.",
        "challenge-soon-lbl": "قريبًا",
        "ch-diff-1": "متوسط",
        "ch-diff-2": "متقدم",
        "ch-diff-3": "متوسط",
        "ch-1-h": "ميزانية نقل هوهمان",
        "ch-1-p": "احسب ميزانية دلتا-في لنقل هوهمان من المدار الأرضي المنخفض إلى المدار الثابت.",
        "ch-1-cat": "ميكانيكا المدارات",
        "ch-2-h": "تصميم حراري لقمر مكعب",
        "ch-2-p": "صمم نظام تحكم حراري سلبي لقمر مكعب 3U في المدار الأرضي المنخفض.",
        "ch-2-cat": "أنظمة المركبات الفضائية",
        "ch-3-h": "نسبة كتلة نقل المريخ",
        "ch-3-p": "قدّر نسبة الكتلة الإجمالية لمركبة إطلاق ثلاثية المراحل للوصول إلى مدار نقل المريخ.",
        "ch-3-cat": "الدفع",

        // About Section
        "nav-about": "من نحن",
        "about-tag": "من نحن",
        "about-title": "من طلاب، للطلاب",
        "about-mission-h": "مهمتنا",
        "about-mission-p": "بناء بنية تحتية تعليمية منظمة قائمة على المبادئ الأولى، تتجاوز \"التعليم الترفيهي\" السطحي وتعد المتعلمين لتعقيد أنظمة الفضاء الحقيقية.",
        "about-story-h": "قصتنا",
        "about-story-p": "بدأت فلك كمحادثة بين ثلاثة طلاب في ليدز لاحظوا أنه بينما يتزايد الاهتمام بالفضاء، فإن عمق التعليم المتاح لم يواكب ذلك. قمنا ببناء فلك لسد هذه الفجوة.",
        "team-tag": "الفريق",
        "team-title": "مؤسسو فلك",
        "team-adham-name": "أدهم فؤاد",
        "team-adham-role": "المؤسس وقائد المنتج",
        "team-adham-bio": "طالب جامعي في الأعمال الدولية والتسويق، يركز على بناء بنية تحتية تعليمية قابلة للتوسع وشراكات في النظام البيئي.",
        "team-senith-name": "سينيث مينديس",
        "team-senith-role": "شريك مؤسس والمدير العلمي",
        "team-senith-bio": "طالب جامعي في الفيزياء والفيزياء الفلكية، مسؤول عن الدقة العلمية وسلامة الأنظمة عبر الإطار.",
        "team-laxshan-name": "لاكشان راجاراتنام",
        "team-laxshan-role": "مساهم مؤسس",
        "team-laxshan-bio": "طالب رياضيات يدعم النمذجة الكمية وهيكلة الأنظمة ضمن البنية التعليمية.",
        "footer-locations": "مقرنا في أبوظبي وليدز",
        "footer-loc-desc": "تعمل فلك بتركيز طويل الأمد على تعزيز مسارات التعلم التقني عبر منطقة الشرق الأوسط وشمال إفريقيا."
    }
};

const CURRICULUM_AR = {
    sections: [
        {
            id: "1",
            title: "ما هو الفضاء",
            subtitle: "فهم البيئة التي نعمل فيها",
            lessons: [
                {
                    title: "تعريف الفضاء",
                    content: "الفضاء ليس فراغًا. يبدأ الفضاء حيث ينتهي الطيران الديناميكي الهوائي وتسيطر ميكانيكا المدارات.",
                    learningOutcome: "فهم أن الفضاء يحدده الفيزياء، وليس المسافة."
                },
                {
                    title: "طبقات الغلاف الجوي",
                    content: "التروبوسفير ← الستراتوسفير ← الميزوسفير ← الثيرموسفير ← الإكزوسفير.",
                    learningOutcome: "معرفة التقنيات التي تعمل في كل طبقة ولماذا."
                },
                {
                    title: "لماذا الفضاء معادٍ",
                    content: "لا هواء يعني لا رفع ولا تنفس. درجات حرارة متطرفة وإشعاع مستمر.",
                    learningOutcome: "فهم سبب كون هندسة الفضاء لا ترحم."
                },
                {
                    title: "الحركة خارج الأرض",
                    content: "الجاذبية لا تتوقف أبدًا. الأجسام في المدار في حالة سقوط حر مستمر.",
                    learningOutcome: "شرح سبب بقاء الأجسام في المدار بشكل صحيح."
                },
                {
                    title: "فهم المدارات",
                    content: "المدار مشكلة طاقة، وليست مشكلة ارتفاع.",
                    learningOutcome: "فهم المدار كمشكلة طاقة، وليست مشكلة ارتفاع."
                }
            ]
        },
        {
            id: "2",
            title: "كيف نصل إلى هناك",
            subtitle: "الطاقة، الدفع، والقيود",
            lessons: [
                {
                    title: "مشكلة الإطلاق",
                    content: "جاذبية الأرض تسحب كل شيء لأسفل. الغلاف الجوي يسبب السحب والحرارة.",
                    learningOutcome: "فهم سبب عدم قدرة الطيران العادي على الوصول إلى الفضاء."
                },
                {
                    title: "لماذا الصواريخ؟",
                    content: "الصواريخ تحمل المؤكسد الخاص بها. الدفع يعمل في الفراغ.",
                    learningOutcome: "فهم سبب الحاجة إلى الصواريخ."
                },
                {
                    title: "صاروخ كنظام",
                    content: "الدفع، الهيكل، الوقود، التوجيه، والحمولة.",
                    learningOutcome: "رؤية الصواريخ كنظم متكاملة، وليست محركات فقط."
                },
                {
                    title: "مشكلة الكتلة",
                    content: "الوقود يسيطر على كتلة الصاروخ. الحمولة جزء صغير جدًا.",
                    learningOutcome: "فهم سبب ضعف قابلية توسع الصواريخ."
                },
                {
                    title: "فصل المراحل",
                    content: "إسقاط الوزن الميت يحسن الكفاءة.",
                    learningOutcome: "فهم سبب كون المراحل المتعددة أمرًا لا مفر منه."
                },
                {
                    title: "ملف الإطلاق",
                    content: "الإطلاق يبدأ عموديًا ثم يميل تدريجيًا.",
                    learningOutcome: "فهم أن المدار يتعلق بالسرعة، وليس الارتفاع."
                }
            ]
        },
        {
            id: "3",
            title: "عمليات الإطلاق",
            subtitle: "حيث تلتقي النظرية بالمخاطر",
            lessons: [
                {
                    title: "تسلسل الإطلاق",
                    content: "انتقال منضبط بين حالات النظام: آمن ← مسلح ← إشعال ← انطلاق.",
                    learningOutcome: "فهم الإطلاق كآلة حالات للنظام."
                },
                {
                    title: "الأنظمة الأرضية",
                    content: "الإطلاق هو عملية أرضية في الغالب.",
                    learningOutcome: "فهم أن الإطلاق هو عملية أرضية في الغالب."
                },
                {
                    title: "العد التنازلي",
                    content: "استطلاعات القرار تتحقق من جميع الأنظمة.",
                    learningOutcome: "فهم سبب تسليم البشر التحكم للبرمجيات."
                },
                {
                    title: "فلسفة الإلغاء",
                    content: "السلامة العامة هي الأولوية القصوى.",
                    learningOutcome: "فهم سبب وجود قواعد إلغاء الإطلاق."
                }
            ]
        },
        {
            id: "4",
            title: "العمل في الفضاء",
            subtitle: "النجاة في فراغ الفضاء",
            lessons: [
                {
                    title: "أنظمة المركبات",
                    content: "توليد الطاقة، الاتصالات، التحكم الحراري، والتوجيه.",
                    learningOutcome: "فهم أن الإطلاق هو مجرد البداية."
                },
                {
                    title: "الفضاء كقيد",
                    content: "الإشعاع يدمر الإلكترونيات. الفراغ يسبب تطاير الغازات.",
                    learningOutcome: "فهم سبب تدهور الأنظمة باستمرار في الفضاء."
                },
                {
                    title: "الفشل والمخاطر",
                    content: "نقاط الفشل الفردية يمكن أن تنهي المهام.",
                    learningOutcome: "فهم سبب كون الأنظمة الفضائية محافظة."
                }
            ]
        },
        {
            id: "5",
            title: "المحاكاة والذكاء الاصطناعي",
            subtitle: "ساحات الاختبار الافتراضية",
            lessons: [
                {
                    title: "لماذا نستخدم المحاكاة",
                    content: "تسمح بالتجريب الآمن وتصور القوى غير المرئية.",
                    learningOutcome: "فهم المحاكاة كأداة للتعلم."
                },
                {
                    title: "حدود المحاكاة",
                    content: "المحاكاة ≠ التحقق. دائمًا هناك فجوة عن الواقع.",
                    learningOutcome: "المحاكاة ≠ التحقق."
                },
                {
                    title: "دور الذكاء الاصطناعي",
                    content: "يخصص العمق والوتيرة، لكنه لا يخترع الفيزياء.",
                    learningOutcome: "نفس النظام، بطبقات شرح مختلفة."
                }
            ]
        },
        {
            id: "6",
            title: "أنظمة متطرفة",
            subtitle: "دفع الفيزياء إلى الحدود القصوى",
            lessons: [
                {
                    title: "لماذا الافتراضيات",
                    content: "تكشف الحدود الصعبة للفيزياء.",
                    learningOutcome: "الخيال مقيد بالفيزياء."
                },
                {
                    title: "دفع متقدم",
                    content: "الأشرعة الضوئية، والمفاهيم النووية.",
                    learningOutcome: "فهم احتمالات الدفع المستقبلية."
                },
                {
                    title: "احتمالات طويلة المدى",
                    content: "الفيزياء تضع الحدود النهائية.",
                    learningOutcome: "الخيال لا يتجاوز الفيزياء."
                }
            ]
        },
        {
            id: "7",
            title: "الحدود والأخلاق",
            subtitle: "استكشاف مسؤول",
            lessons: [
                {
                    title: "حدود تعليمية",
                    content: "هذا الإطار تعليمي فقط. لا بناء، لا إطلاق.",
                    learningOutcome: "فهم نطاق وحدود هذا البرنامج."
                }
            ]
        }
    ]
};

class TranslationManager {
    constructor() {
        this.currentLang = localStorage.getItem('falak-lang') || 'en';
        this.toggleBtn = null;
        this.init();
    }

    init() {
        this.toggleBtn = document.getElementById('lang-toggle');
        if (this.toggleBtn) {
            this.toggleBtn.onclick = () => this.toggleLanguage();
            this.updateToggleText();
        }

        // Initial apply
        this.applyLanguage(this.currentLang);
    }

    t(key) {
        if (TRANSLATIONS[this.currentLang] && TRANSLATIONS[this.currentLang][key]) {
            return TRANSLATIONS[this.currentLang][key];
        }
        // Fallback to EN
        return TRANSLATIONS['en'] ? TRANSLATIONS['en'][key] : key;
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('falak-lang', this.currentLang);
        this.applyLanguage(this.currentLang);
        this.updateToggleText();
    }

    updateToggleText() {
        if (this.toggleBtn) {
            this.toggleBtn.textContent = this.currentLang === 'en' ? 'AR' : 'EN';
        }
    }

    applyLanguage(lang) {
        const doc = document.documentElement;
        const body = document.body;

        doc.lang = lang;
        doc.dir = lang === 'ar' ? 'rtl' : 'ltr';

        if (lang === 'ar') {
            body.classList.add('rtl');
            body.classList.remove('ltr');
        } else {
            body.classList.add('ltr');
            body.classList.remove('rtl');
        }

        // Apply string translations via IDs (Legacy)
        const strings = TRANSLATIONS[lang];
        for (const [id, text] of Object.entries(strings)) {
            const el = document.getElementById(id);
            if (el) el.innerHTML = text;
        }

        // Apply string translations via data-i18n (Modern)
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const rawKey = el.getAttribute('data-i18n');
            if (!rawKey) return;
            const key = rawKey.trim();
            if (strings[key]) {
                el.innerHTML = strings[key];
            }
        });

        // Re-render Curriculum if it exists
        if (typeof initCurriculumUI === 'function') {
            initCurriculumUI();
        }

        // Re-render Lesson Modal if open
        if (typeof renderLesson === 'function' && document.getElementById('lesson-modal') && document.getElementById('lesson-modal').style.display === 'block') {
            renderLesson();
        }
    }

    getCurriculumData(originalData) {
        if (this.currentLang === 'en') return originalData;

        // Merge AR titles/content into the structure
        // Deep copy structure to avoid mutating original
        const combined = JSON.parse(JSON.stringify(originalData));

        combined.sections.forEach((sec, idx) => {
            if (CURRICULUM_AR.sections[idx]) {
                sec.title = CURRICULUM_AR.sections[idx].title;
                // We'll also inject the subtitle logic in `initCurriculumUI` by looking up localized subtitles
            }
            sec.lessons.forEach((less, lIdx) => {
                if (CURRICULUM_AR.sections[idx].lessons[lIdx]) {
                    less.title = CURRICULUM_AR.sections[idx].lessons[lIdx].title;
                    less.content = CURRICULUM_AR.sections[idx].lessons[lIdx].content;
                    if (CURRICULUM_AR.sections[idx].lessons[lIdx].learningOutcome) {
                        less.learningOutcome = CURRICULUM_AR.sections[idx].lessons[lIdx].learningOutcome;
                    }
                }
            });
        });

        return combined;
    }

    getLocalizedSubtitles() {
        if (this.currentLang === 'en') return null; // Use default

        const map = {};
        CURRICULUM_AR.sections.forEach(sec => {
            map[sec.id] = sec.subtitle;
        });
        return map;
    }
}

// Global instance
// Global instance
// ============================================
// Planet Content Dictionary
// ============================================
const PLANET_CONTENT = {
    en: {
        sun: {
            title: "The Sun",
            level: "Star",
            desc: "The heart of our system. 99.86% of the solar system's mass. The source of energy that drives space weather and climates across all planets.",
            stats: [
                { label: "Type", value: "Yellow Dwarf Star" },
                { label: "Surface Temp", value: "5,500°C" },
                { label: "Mass", value: "333,000 x Earth" },
                { label: "Composition", value: "Hydrogen / Helium" }
            ]
        },
        mercury: {
            title: "Mercury",
            level: "Inner System",
            desc: "The closest planet to the Sun. It experiences extreme temperature variations and has a unique orbital resonance.",
            stats: [
                { label: "Type", value: "Terrestrial" },
                { label: "Day Length", value: "59 Earth Days" },
                { label: "Gravity", value: "3.7 m/s²" },
                { label: "Year", value: "88 Earth Days" }
            ]
        },
        venus: {
            title: "Venus",
            level: "Hostile Environments",
            desc: "Earth's toxic twin. A runaway greenhouse effect creates crushing surface pressures and lead-melting temperatures.",
            stats: [
                { label: "Type", value: "Terrestrial" },
                { label: "Temp", value: "462°C (Avg)" },
                { label: "Gravity", value: "8.87 m/s²" },
                { label: "Atmosphere", value: "CO₂ (Thick)" }
            ]
        },
        earth: {
            title: "Earth",
            level: "Home Base",
            desc: "The only known world to harbor life. A dynamic system of water, plate tectonics, and a protective magnetosphere.",
            stats: [
                { label: "Type", value: "Terrestrial" },
                { label: "Population", value: "~8 Billion" },
                { label: "Gravity", value: "9.8 m/s²" },
                { label: "Atmosphere", value: "N₂ / O₂" }
            ]
        },
        mars: {
            title: "Mars",
            level: "The Frontier",
            desc: "Percentage of Earth's gravity. The primary target for future human exploration, with evidence of ancient water.",
            stats: [
                { label: "Type", value: "Terrestrial" },
                { label: "Gravity", value: "3.7 m/s²" },
                { label: "Day Length", value: "24h 37m" },
                { label: "Atmosphere", value: "Thin CO₂" }
            ]
        },
        jupiter: {
            title: "Jupiter",
            level: "Gas Giant Physics",
            desc: "The King of Planets. A massive gravity well protecting the inner system, with a mini solar system of 90+ moons.",
            stats: [
                { label: "Type", value: "Gas Giant" },
                { label: "Mass", value: "318 x Earth" },
                { label: "Gravity", value: "24.79 m/s²" },
                { label: "Day Length", value: "9.9 Hours" }
            ]
        },
        saturn: {
            title: "Saturn",
            level: "Orbital Mechanics",
            desc: "The Jewel of the Solar System. Known for its complex ring system and potential life-harboring moons like Enceladus.",
            stats: [
                { label: "Type", value: "Gas Giant" },
                { label: "Rings", value: "7 Main Groups" },
                { label: "Gravity", value: "10.4 m/s²" },
                { label: "Year", value: "29 Earth Years" }
            ]
        },
        uranus: {
            title: "Uranus",
            level: "Ice Giants",
            desc: "The Sideways Planet. It rotates on its side, likely due to a massive ancient collision. Cold and mysterious.",
            stats: [
                { label: "Type", value: "Ice Giant" },
                { label: "Tilt", value: "98 Degrees" },
                { label: "Temp", value: "-224°C" },
                { label: "Year", value: "84 Earth Years" }
            ]
        },
        neptune: {
            title: "Neptune",
            level: "Outer Limits",
            desc: "The Windy Giant. Features the fastest winds in the solar system and a deep blue atmosphere of methane.",
            stats: [
                { label: "Type", value: "Ice Giant" },
                { label: "Winds", value: "2,100 km/h" },
                { label: "Gravity", value: "11.15 m/s²" },
                { label: "Year", value: "165 Earth Years" }
            ]
        }
    },
    ar: {
        sun: {
            title: "الشمس",
            level: "النجم",
            desc: "قلب نظامنا الشمسي. تشكل ٩٩.٨٦٪ من كتلة النظام الشمسي. مصدر الطاقة الذي يحرك الطقس والمناخ عبر جميع الكواكب.",
            stats: [
                { label: "النوع", value: "نجم قزم أصفر" },
                { label: "حرارة السطح", value: "٥,٥٠٠° مئوية" },
                { label: "الكتلة", value: "٣٣٣,٠٠٠ ضعف الأرض" },
                { label: "التركيب", value: "هيدروجين / هيليوم" }
            ]
        },
        mercury: {
            title: "عطارد",
            level: "النظام الداخلي",
            desc: "أقرب كوكب للشمس. يشهد تقلبات حرارية شديدة وله رنين مداري فريد.",
            stats: [
                { label: "النوع", value: "كوكب صخري" },
                { label: "طول اليوم", value: "٥٩ يوم أرضي" },
                { label: "الجاذبية", value: "٣.٧ م/ث²" },
                { label: "السنة", value: "٨٨ يوم أرضي" }
            ]
        },
        venus: {
            title: "الزهرة",
            level: "بيئات معادية",
            desc: "توأم الأرض السام. ظاهرة الاحتباس الحراري الجامح تخلق ضغطًا ساحقًا ودرجات حرارة تذيب الرصاص.",
            stats: [
                { label: "النوع", value: "كوكب صخري" },
                { label: "الحرارة", value: "٤٦٢° مئوية (المتوسط)" },
                { label: "الجاذبية", value: "٨.٨٧ م/ث²" },
                { label: "الغلاف الجوي", value: "ثاني أكسيد الكربون (كثيف)" }
            ]
        },
        earth: {
            title: "الأرض",
            level: "القاعدة الرئيسية",
            desc: "العالم الوحيد المعروف باحتوائه على الحياة. نظام ديناميكي من المياه، والصفائح التكتونية، وغلاف مغناطيسي واقٍ.",
            stats: [
                { label: "النوع", value: "كوكب صخري" },
                { label: "السكان", value: "~٨ مليار" },
                { label: "الجاذبية", value: "٩.٨ م/ث²" },
                { label: "الغلاف الجوي", value: "نيتروجين / أكسجين" }
            ]
        },
        mars: {
            title: "المريخ",
            level: "الحدود الجديدة",
            desc: "جاذبيته ثلث جاذبية الأرض. الهدف الرئيسي للاستكشاف البشري المستقبلي، مع وجود أدلة على مياه قديمة.",
            stats: [
                { label: "النوع", value: "كوكب صخري" },
                { label: "الجاذبية", value: "٣.٧ م/ث² (٣٨٪)" },
                { label: "طول اليوم", value: "٢٤ ساعة و ٣٧ دقيقة" },
                { label: "الغلاف الجوي", value: "ثاني أكسيد الكربون رقيق" }
            ]
        },
        jupiter: {
            title: "المشتري",
            level: "فيزياء العمالقة الغازية",
            desc: "ملك الكواكب. بئر جاذبية هائل يحمي النظام الداخلي، مع نظام شمسي مصغر يضم أكثر من ٩٠ قمراً.",
            stats: [
                { label: "النوع", value: "عملاق غازي" },
                { label: "الكتلة", value: "٣١٨ ضعف الأرض" },
                { label: "الجاذبية", value: "٢٤.٧٩ م/ث²" },
                { label: "طول اليوم", value: "٩.٩ ساعات" }
            ]
        },
        saturn: {
            title: "زحل",
            level: "الميكانيكا المدارية",
            desc: "جوهرة النظام الشمسي. معروف بنظامه الحلقي المعقد وأقمار قد تحتضن الحياة مثل إنسيلادوس.",
            stats: [
                { label: "النوع", value: "عملاق غازي" },
                { label: "الحلقات", value: "٧ مجموعات رئيسية" },
                { label: "الجاذبية", value: "١٠.٤ م/ث²" },
                { label: "السنة", value: "٢٩ سنة أرضية" }
            ]
        },
        uranus: {
            title: "أورانوس",
            level: "العمالقة الجليدية",
            desc: "الكوكب الجانبي. يدور على جانبه، ربما بسبب اصطدام قديم هائل. بارد وغامض.",
            stats: [
                { label: "النوع", value: "عملاق جليدي" },
                { label: "الميل", value: "٩٨ درجة" },
                { label: "الحرارة", value: "-٢٢٤° مئوية" },
                { label: "السنة", value: "٨٤ سنة أرضية" }
            ]
        },
        neptune: {
            title: "نبتون",
            level: "الحدود الخارجية",
            desc: "العملاق العاصف. يتميز بأسرع رياح في النظام الشمسي وغلاف جوي أزرق عميق من الميثان.",
            stats: [
                { label: "النوع", value: "عملاق جليدي" },
                { label: "الرياح", value: "٢,١٠٠ كم/ساعة" },
                { label: "الجاذبية", value: "١١.١٥ م/ث²" },
                { label: "السنة", value: "١٦٥ سنة أرضية" }
            ]
        }
    }
};

window.appTranslator = null;
document.addEventListener('DOMContentLoaded', () => {
    window.appTranslator = new TranslationManager();
    // Force immediate update if DOM is already ready or just to be safe
    window.appTranslator.init();
});
