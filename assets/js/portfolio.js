const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');

const PREFERENCE_KEY = 'portfolio-preferences-v3';

const audiencePresets = Object.freeze({
  hiring: {
    eyebrow: 'For hiring teams',
    notePrefix: 'Hiring focus',
    contact: 'Building the right team?<br />Let’s talk fit.',
  },
  engineering: {
    eyebrow: 'For engineering teams',
    notePrefix: 'Technical focus',
    contact: 'Want to compare notes?<br />Let’s talk systems.',
  },
  product: {
    eyebrow: 'For founders & product leaders',
    notePrefix: 'Product focus',
    contact: 'Have a hard problem<br />worth solving?',
  },
  exploring: {
    eyebrow: 'For curious people',
    notePrefix: 'What to notice',
    contact: 'See something interesting?<br />Let’s connect.',
  },
});

const rolePresets = Object.freeze({
  general: {
    short: 'General',
    eyebrow: 'Full-stack, AI & data',
    title: 'From messy context<br />to working software.',
    titlePlain: 'Full-Stack & Applied AI Engineer',
    lede: 'I build practical AI-enabled products, backend systems, and thoughtful user experiences—from document intelligence and automation to real-time, data-driven applications.',
    note: 'Showing a balanced view of secure integrations, retrieval-grounded products, data pipelines, and clearly labeled supporting work.',
    cta: 'See selected work',
    ctaTarget: '#work',
    workHeading: 'Selected work.',
    workIntro: 'Five selected projects spanning secure handoffs, grounded AI, multi-tenant products and reliable workflows.',
    experienceHeading: 'Built in good company.',
    experienceIntro: 'Building at the intersection of technology, operations, and user needs.',
    about: 'I’m a UC Davis computer science graduate based in San Francisco, California. I like untangling hard technical problems, but I care just as much about whether the result feels intuitive and earns its place in someone’s workflow.',
    chips: ['Python', 'Data platforms', 'Applied AI'],
    matches: [],
  },
  fullstack: {
    short: 'Full-stack',
    eyebrow: 'Full-stack / product engineering',
    title: 'I build <em>complete products</em> from interface to infrastructure.',
    titlePlain: 'Full-Stack & Product Engineer',
    lede: 'Full-stack engineer delivering React and TypeScript interfaces, Python and Node.js services, API integrations, data models, testing, and deployment across real workflows.',
    note: 'Prioritizing end-to-end ownership, product usability, integration depth, and reliable delivery.',
    cta: 'See full-stack work',
    ctaTarget: '#work',
    workHeading: 'Products built end to end.',
    workIntro: 'Explore systems that connect interfaces, backend services, data stores, real-time updates, authorization, testing, deployment, and mobile delivery.',
    experienceHeading: 'Engineering across the stack.',
    experienceIntro: 'Product delivery spanning React, Python, Node.js, APIs, cloud services, data workflows, and stakeholder needs.',
    about: 'I’m a UC Davis computer science graduate who likes owning the path from an ambiguous product need to a tested interface, service, data model, and deployment.',
    chips: ['React', 'TypeScript', 'FastAPI'],
    matches: ['sylk', 'lume', 'tech4good', 'educationai', 'commerce'],
  },
  ai: {
    short: 'Applied AI',
    eyebrow: 'Applied AI / RAG engineering',
    title: 'I build <em>grounded AI</em> systems that keep evidence in the loop.',
    titlePlain: 'Applied AI & RAG Engineer',
    lede: 'Applied AI engineer building document ingestion, vector search, evidence extraction, citation-backed answers, evaluation workflows, and human review into real products.',
    note: 'Prioritizing grounding, retrieval quality, traceable outputs, evaluation, and useful product integration.',
    cta: 'See applied AI work',
    ctaTarget: '#work',
    workHeading: 'AI products with traceable answers.',
    workIntro: 'Explore grounded systems built around retrieval, project context, evidence extraction, citations, model evaluation, and practical user workflows.',
    experienceHeading: 'Applied AI backed by delivery depth.',
    experienceIntro: 'Building AI/RAG services and document workflows alongside the APIs, data platforms, quality checks, and interfaces that make them useful.',
    about: 'I’m a UC Davis computer science graduate focused on applied AI systems that remain grounded in source evidence, fit real workflows, and preserve meaningful human review.',
    chips: ['RAG', 'FastAPI', 'AWS'],
    matches: ['lume', 'educationai', 'ragpoc', 'novasonic', 'automation'],
  },
  backend: {
    short: 'Backend',
    eyebrow: 'Backend / platform engineering',
    title: 'I build <em>reliable APIs</em> and integration layers for complex workflows.',
    titlePlain: 'Backend & Platform Engineer',
    lede: 'Backend engineer working across Python, FastAPI, Node.js, Express, storage, authentication, OpenAPI, MCP, webhooks, data modeling, and cloud integrations.',
    note: 'Prioritizing clear contracts, secure access, durable storage, validation, interoperability, and operational reliability.',
    cta: 'See backend systems',
    ctaTarget: '#work',
    workHeading: 'Infrastructure that makes products work.',
    workIntro: 'Explore services built around secure APIs, storage, versioning, webhooks, multi-tenant authorization, AI-client integrations, real-time events, and deployment.',
    experienceHeading: 'Services, integrations, and data foundations.',
    experienceIntro: 'Backend delivery spanning enterprise AI services, cloud APIs, document workflows, Snowflake pipelines, and quality-controlled integrations.',
    about: 'I’m a UC Davis computer science graduate who enjoys designing the contracts and safeguards behind useful products: APIs, data models, integrations, storage, and tests.',
    chips: ['Python', 'REST APIs', 'AWS'],
    matches: ['filedrop', 'sylk', 'lume', 'forge'],
  },
  data: {
    short: 'Data / MDM',
    eyebrow: 'Data engineering / MDM',
    title: 'I turn <em>complex data</em> into trusted systems and decisions.',
    titlePlain: 'Data & MDM Engineer',
    lede: 'Data and MDM engineer building Snowflake SQL pipelines, layered ETL architecture, entity resolution, reconciliation, quality controls, and audit-ready outputs for healthcare technology workflows.',
    note: 'Prioritizing 327K+ record workflows, 67K+ entity matching, traceable quality rules, stewardship review, and business-readable outputs.',
    cta: 'See relevant experience',
    ctaTarget: '#experience',
    workHeading: 'Products that make data useful.',
    workIntro: 'Verified case studies showing Snowflake and MDM quality controls, scheduled ingestion, structured storage, APIs, and review workflows that turn complex information into trusted context.',
    experienceHeading: 'Data systems built for trust.',
    experienceIntro: 'Snowflake, layered ETL/MDM, identifier matching, reconciliation, data-quality controls, and stakeholder-ready evidence across healthcare technology programs.',
    about: 'I’m a UC Davis computer science graduate who likes turning messy records and ambiguous business rules into traceable pipelines, quality checks, reconciliation logic, and useful review workflows.',
    chips: ['Snowflake', 'ETL / MDM', 'Data quality'],
    matches: ['mdm', 'tech4good', 'forge', 'dashboard', 'lume'],
  },
  frontend: {
    short: 'Frontend',
    eyebrow: 'Frontend engineering',
    title: 'I build <em>clear interfaces</em> for complex products.',
    titlePlain: 'Frontend Engineer',
    lede: 'Frontend engineer building responsive React and TypeScript products, reusable components, data-rich workflows, real-time interactions, and Three.js product experiences.',
    note: 'Prioritizing usability, accessible interaction, responsive behavior, reusable UI systems, and design-to-code precision.',
    cta: 'See frontend work',
    ctaTarget: '#work',
    workHeading: 'Interfaces with depth and intent.',
    workIntro: 'Explore collaborative FigJam tools, interactive commerce, and role-aware multi-tenant supply-chain software built with responsive, reusable interfaces.',
    experienceHeading: 'Frontend work grounded in real workflows.',
    experienceIntro: 'Building React interfaces and collaborative tools around enterprise data, educator feedback, and research and classroom workflows.',
    about: 'I’m a UC Davis computer science graduate who enjoys translating complicated workflows into responsive interfaces that feel direct, coherent, and worth using.',
    chips: ['React', 'TypeScript', 'Three.js'],
    matches: ['tech4good', 'commerce', 'dashboard', 'sylk', 'lume'],
  },
  solutions: {
    short: 'Solutions / FDE',
    eyebrow: 'Solutions / forward-deployed engineering',
    title: 'I turn <em>ambiguous needs</em> into working systems.',
    titlePlain: 'Solutions & Forward-Deployed Engineer',
    lede: 'Solutions engineer translating stakeholder needs into rapid prototypes, API and data integrations, tested workflows, delivery documentation, and implementation-ready handoffs.',
    note: 'Prioritizing requirements clarity, implementation depth, feedback loops, debugging, validation, and cross-functional delivery.',
    cta: 'See delivery experience',
    ctaTarget: '#experience',
    workHeading: 'Systems shaped around real workflows.',
    workIntro: 'See regulated-enterprise delivery, secure cross-device infrastructure, and human-in-the-loop automation shaped around concrete user and stakeholder needs.',
    experienceHeading: 'From requirements to reliable delivery.',
    experienceIntro: 'Converting stakeholder feedback into rules, integrations, UAT items, decision logs, working software, and implementation-ready artifacts.',
    about: 'I’m a UC Davis computer science graduate who likes entering ambiguous problem spaces, learning the workflow quickly, and leaving behind software and documentation people can actually use.',
    chips: ['Integrations', 'UAT', 'Delivery'],
    matches: ['crm', 'filedrop', 'automation', 'lume'],
  },
  salesforce: {
    short: 'Salesforce / CRM',
    eyebrow: 'Salesforce / business technology',
    title: 'I turn <em>CRM complexity</em> into validated workflows and clear delivery.',
    titlePlain: 'Salesforce & Business Technology Consultant',
    lede: 'Business technology engineer translating stakeholder feedback, CRM metadata, live workflow behavior, and healthcare data into testable requirements, UAT evidence, implementation-ready backlogs, and usable interfaces.',
    note: 'Prioritizing requirements traceability, metadata and workflow validation, acceptance criteria, data quality, approval states, user guidance, and technical handoffs.',
    cta: 'See CRM delivery evidence',
    ctaTarget: '#work',
    workHeading: 'Business systems made testable and clear.',
    workIntro: 'Explore anonymized CRM/UAT and healthcare-data case studies alongside a public workflow-interface implementation. No client identity, private screenshots, or proprietary artifacts are published.',
    experienceHeading: 'CRM delivery backed by engineering depth.',
    experienceIntro: 'Requirements, metadata inspection, live-system validation, UAT tracking, data quality, executive communication, and implementation-ready delivery for regulated enterprise workflows.',
    about: 'I’m a UC Davis computer science graduate who enjoys turning business-system ambiguity into validated requirements, reliable workflows, clear evidence, and documentation that technical and business teams can act on.',
    chips: ['CRM validation', 'UAT', 'Data quality'],
    matches: ['crm', 'mdm', 'dashboard'],
  },
});

const roleResumeFiles = Object.freeze({
  general: 'Chembu_Ashwin_General.pdf',
  fullstack: 'Chembu_Ashwin_Full-Stack.pdf',
  ai: 'Chembu_Ashwin_Applied-AI.pdf',
  backend: 'Chembu_Ashwin_Backend.pdf',
  data: 'Chembu_Ashwin_Data-MDM.pdf',
  frontend: 'Chembu_Ashwin_Frontend.pdf',
  solutions: 'Chembu_Ashwin_Solutions-FDE.pdf',
  salesforce: 'Chembu_Ashwin_Salesforce-CRM.pdf',
});

const roleProjectSelections = Object.freeze({
  general: ['filedrop', 'lume', 'sylk'],
  fullstack: ['sylk', 'automation', 'lume'],
  ai: ['lume', 'educationai', 'ragpoc'],
  backend: ['filedrop', 'automation', 'forge'],
  data: ['mdm', 'tech4good', 'forge'],
  frontend: ['tech4good', 'commerce', 'sylk'],
  solutions: ['crm', 'filedrop', 'automation'],
  salesforce: ['crm', 'mdm', 'dashboard'],
});

const roleStackPresets = Object.freeze({
  general: ['React · TypeScript', 'Python · FastAPI · Node.js · Express', 'MongoDB · Firebase · Snowflake · Cloudflare D1', 'RAG · Vector search · Evidence grounding', 'REST APIs · OpenAPI · MCP · Webhooks', 'pytest · Vitest · Playwright · Render'],
  fullstack: ['React 19 · TypeScript · Responsive UI', 'Node.js · Express · FastAPI · Cloud Functions', 'MongoDB · Firestore · Firebase Storage · AWS S3', 'RAG · LangChain · OpenAI', 'REST APIs · WebSockets · Figma API · OAuth · RBAC', 'Vitest · Firebase emulators · Playwright'],
  ai: ['React · Evidence and review interfaces', 'Python · FastAPI · Node.js', 'MongoDB · S3 · Vector stores', 'RAG · LangChain · FAISS · Transformers · LangSmith', 'Ingestion · Intent routing · Citations', 'Evaluation · pytest · Human review'],
  backend: ['Typed clients · Admin workflows', 'Python · FastAPI · Node.js · Express', 'MongoDB · Redis · S3-compatible storage', 'AI-ready services · Retrieval APIs', 'REST · OpenAPI · MCP · Signed webhooks', 'Validation · Auth · Rate limiting · pytest'],
  data: ['React · Vue · Review dashboards', 'Python · SQL · FastAPI · PySpark', 'Snowflake · MongoDB · AWS Glue · Redshift', 'Entity resolution · Fuzzy matching', 'ETL layers · Figma imports · Scheduled ingestion', 'Pandas · Power BI · Tableau · Data quality'],
  frontend: ['React 18/19 · TypeScript · Three.js', 'Node.js · Express · Figma API integration', 'MongoDB · Firebase · Client state', 'Real-time widgets · Collaborative UI', 'Responsive systems · Forms · Auto-layout', 'Testing Library · Vitest · Playwright'],
  solutions: ['React · Vue · Workflow interfaces', 'Python · FastAPI · Node.js', 'Snowflake · MongoDB · AWS', 'RAG · Bedrock · Evidence extraction', 'Requirements · APIs · UAT · Handoffs', 'Decision logs · Exception review · Deployment'],
  salesforce: ['React/Vite · CRM workflow UI', 'Metadata inspection · Mock adapters', 'Snowflake · Healthcare reference data', 'Data quality · Entity resolution', 'UAT · Acceptance criteria · Backlogs', 'User guides · Decision logs · Executive decks'],
});

const zsLensPresets = Object.freeze({
  general: 'Cross-functional scope across AI/RAG services, Snowflake and MDM, API integrations, CRM validation, and delivery documentation.',
  fullstack: 'Full-stack lens · React and FastAPI services, cloud integrations, document workflows, testing, and end-to-end delivery.',
  ai: 'Applied AI lens · RAG assistants, document ingestion, evidence-oriented evaluation, FastAPI services, Redis, and enterprise AI tooling.',
  backend: 'Backend lens · Python and Flask endpoints, FastAPI services, AWS S3, Redis, Smartsheet integrations, and quality-controlled APIs.',
  data: 'Data lens · Snowflake SQL across 327K+ records, entity matching across 67K+ records, layered ETL/MDM, reconciliation, and stewardship review.',
  frontend: 'Frontend lens · React interfaces connecting enterprise AI, data, document, and CRM workflows to clear user-facing experiences.',
  solutions: 'Solutions lens · Ambiguous requirements translated into testable rules, integrations, UAT items, decision logs, user guides, and delivery plans.',
  salesforce: 'CRM lens · Live workflow and metadata validation, UAT evidence, enhancement backlogs, approval states, user guides, and implementation-ready handoffs.',
});

const projectCatalog = Object.freeze({
  "sylk": {
    "title": "Sylk",
    "category": "Android application / Multi-tenant supply chain",
    "role": "Private organization product · 2025—Present",
    "summaries": {
      "general": "A complete React/Capacitor Android supply-chain application spanning organization onboarding, authentication, line-item shipments, fulfillment, inventory, billing, file collaboration, team access, and real-time messaging.",
      "fullstack": "A React 19 and TypeScript Android application backed by Firebase Auth, Firestore, Storage, Cloud Functions, native-safe routing, phone-specific workflows, real-time chat, layered testing, and Capacitor packaging.",
      "backend": "A Firebase-backed multi-tenant system with organization-scoped Firestore and Storage rules, constrained fulfillment transitions, Cloud Functions, and emulator-tested authorization boundaries.",
      "frontend": "Phone-ready React interfaces for retailer administrators, factory viewers, and staff across onboarding, authentication, shipments, fulfillment, inventory, billing, files, chat, team access, drawers, and stacked list/detail workflows."
    },
    "flow": [
      [
        "Problem",
        "Retailers, factories, and staff need shared shipment visibility without exposing private organization data."
      ],
      [
        "Approach",
        "Model organization-scoped roles and adapt the complete workflow for phone-sized use."
      ],
      [
        "Engineering",
        "React 19, TypeScript, Firebase, Capacitor Android, native-safe routing, WebView compatibility, and layered testing."
      ],
      [
        "Outcome",
        "A packaged Android application with tenant isolation, complete mobile workflows, real-time collaboration, and a validated debug APK."
      ]
    ],
    "tech": [
      "React 19",
      "TypeScript",
      "Firebase",
      "Capacitor",
      "Android",
      "Security rules",
      "Playwright"
    ],
    "detailsTitle": "Android delivery, multi-tenancy & testing",
    "detailsIntro": "The complete React/Firebase product is packaged as a Capacitor Android application, with organization and role boundaries enforced at both the interface and Firebase security-rule layers.",
    "bullets": [
      "Adapted onboarding, authentication, retailer/manufacturer workflows, orders, inventory, billing, chat, files, team access, drawers, and list/detail navigation for phone-sized use.",
      "Implemented native-safe routing, Capacitor Firebase Authentication, safe-area handling, legacy Android WebView/CSS fallbacks, and mobile file-picker compatibility.",
      "Enforced organization isolation and least-privilege Firestore and Storage rules, including retailer-only financial data and constrained factory fulfillment updates.",
      "Designed unit and component tests, emulator-backed security-rule tests, and Playwright journeys covering organization creation through shipment, fulfillment, and chat; produced a working com.sylk.app debug APK.",
      "Maintained cross-platform integration with an iOS project scaffold; signed builds, TestFlight and App Store release are not established."
    ],
    "links": [],
    "sourceNote": "Private organization product. Android debug packaging is established; store releases and a shipped iOS application are not claimed.",
  },
  "tech4good": {
    "title": "Tech4Good FigJam Toolkit",
    "category": "Collaborative tools / Figma platform",
    "role": "Collaborative research tools · Mar 2023—Jun 2025",
    "summaries": {
      "general": "Team-developed FigJam collaboration tools for threaded chat, anonymous responses, polling and research-ready spreadsheet exports.",
      "fullstack": "TypeScript/Figma interfaces backed by Node.js, Express and MongoDB change streams, connecting shared response state to structured Excel/XLSX exports.",
      "frontend": "Collaborative FigJam interfaces for threaded chat, anonymous responses, multi-select polling, vote changes, text entry, carousels, radar and Likert input, tooltips, admin controls, and responsive layouts.",
      "backend": "Node.js, Express, and MongoDB services supporting chat persistence, text-entry response management, poll creation and grouping, logs, refresh, reveal, edit, and delete workflows.",
      "data": "Python/Pandas analysis of 43,340 anonymized interaction rows across 2,805 sessions, alongside Power BI and Tableau research dashboards.",
      "solutions": "A research-facing toolkit shaped through iterative delivery: synchronized collaboration widgets, configurable admin controls, structured exports, analytics, and a responsive Angular career-exploration component."
    },
    "flow": [
      [
        "Problem",
        "Research and classroom teams needed richer participation and structured data workflows inside a shared FigJam canvas."
      ],
      [
        "Approach",
        "Build focused widgets for conversation, polling, visual response, text entry, administration, and spreadsheet exchange."
      ],
      [
        "Engineering",
        "TypeScript, Figma APIs, esbuild, Node.js, Express, MongoDB, Excel/XLSX, Python, and Pandas."
      ],
      [
        "Outcome",
        "Persisted collaborative responses, structured exports and research analysis across 43,340 interaction rows and 2,805 sessions."
      ]
    ],
    "tech": [
      "TypeScript",
      "Figma API",
      "FigJam widgets",
      "Node.js / Express",
      "MongoDB",
      "Excel / XLSX",
      "Python / Pandas"
    ],
    "detailsTitle": "Verified contribution & widget-system details",
    "detailsIntro": "I implemented scoped interfaces and backend integrations within the collaborative Tech4Good toolkit, alongside research analysis and dashboards.",
    "bullets": [
      "Built and iterated chat, text-entry, polling, carousel, radar, Likert, tooltip, and Excel/XLSX modules using TypeScript, Figma APIs, esbuild, dynamic styling, and synchronized state.",
      "Implemented threaded chat, edits, anonymous responses, bulk loading, voting, multi-select polls, vote changes, grouped widgets, admin controls, and Node/Express/MongoDB persistence and logs.",
      "Used MongoDB change streams and three logical databases to synchronize chat, text-entry and polling state.",
      "Analyzed 43,340 anonymized interaction rows across 2,805 sessions with Python and Pandas.",
      "Built Power BI and Tableau research dashboards and contributed a responsive Angular career-exploration component.",
      "Coauthored the ICER 2024 paper and the accepted/upcoming ACM SIGCSE TS 2027 paper listed below."
    ],
    "links": [
      [
        "Chat widget",
        "https://www.figma.com/community/widget/1338970910141331132/tech4good-chat-widget"
      ],
      [
        "Text Entry widget",
        "https://www.figma.com/community/widget/1391195703137776986/text-entry-widget"
      ],
      [
        "Polling widget",
        "https://www.figma.com/community/widget/1400160483063412580/polling-widget"
      ],
      [
        "GIF widget",
        "https://www.figma.com/community/widget/1445572433117139179/tech4good-gif-widget"
      ],
      [
        "Quote widget",
        "https://www.figma.com/community/widget/1445572123776858346/tech4good-quote-widget"
      ],
      [
        "Wordcloud widget",
        "https://www.figma.com/community/widget/1460800419684738181/tech4good-wordcloud-widget"
      ],
      [
        "Collaborator-owned source",
        "https://github.com/davmantor/FigJam-Widgets"
      ],
      [
        "All Tech4Good resources",
        "https://www.figma.com/@tech4good"
      ]
    ],
    "sourceNote": "Collaborator-owned source and team-published resources. The six Community listings showed approximately 12.2K aggregate uses in July 2026; this is a team-library measure.",
  },
  "automation": {
    "title": "Job Hub",
    "category": "Full-stack / Workflow platform",
    "role": "Independent product · Jul—Aug 2026",
    "summaries": {
      "general": "Workflow platform with a React/TypeScript interface, Cloudflare Worker API, D1 persistence, revision-aware updates, idempotent events and evidence-grounded AI interview feedback.",
      "fullstack": "Workflow platform with a React/TypeScript interface, Cloudflare Worker API, D1 persistence, revision-aware updates, idempotent events and evidence-grounded AI interview feedback.",
      "ai": "An evidence-grounded interview coach with structured AI feedback, progressive hints and source-aware review, integrated into a persistent workflow product.",
      "backend": "Cloudflare Worker APIs and D1 persistence with revision-aware state updates, idempotent events, immutable artifact hashes and duplicate-safe retries.",
      "solutions": "A typed workflow product connecting preparation, validation, exception handling, tracking and evidence-grounded coaching."
    },
    "flow": [
      [
        "Problem",
        "Workflow state, evidence and generated artifacts need to stay coherent across devices."
      ],
      [
        "Approach",
        "Organize discovery and preparation in a typed interface."
      ],
      [
        "Engineering",
        "React, TypeScript, Cloudflare Workers, D1, revision checks and idempotent events."
      ],
      [
        "Outcome",
        "Coherent cross-device state, explicit exceptions and evidence-grounded coaching."
      ]
    ],
    "tech": [
      "React",
      "TypeScript",
      "Cloudflare Workers",
      "D1",
      "OpenAI Responses API",
      "Python",
      "LaTeX / Tectonic"
    ],
    "detailsTitle": "Validation, rendering & exception review",
    "detailsIntro": "A full-stack workflow platform combining routine package validation, exception-only review and reproducible resume generation.",
    "bullets": [
      "Built a responsive React/TypeScript interface over a Cloudflare Worker API and D1 persistence.",
      "Used revision-aware updates and idempotent actions to recover from stale saves and duplicate events.",
      "Bound generated artifacts to immutable content hashes and explicit workflow states.",
      "Validated routine application packages against evidence, source and exact-artifact checks; routed only genuine exceptions to human review.",
      "Built a version-5 Python-to-LaTeX resume pipeline with Tectonic, source fingerprints, ATS extraction and rendered-page quality checks.",
      "Integrated structured AI interview feedback, progressive hints and reproducible coding-practice journals."
    ],
    "links": [],
    "sourceNote": "Architecture summary only; personal application records, recruiter data, journals and operational artifacts remain private.",
  },
  "mdm": {
    "title": "Healthcare Data Quality & MDM",
    "category": "Data engineering / Entity resolution",
    "role": "Anonymized employer case study · 327K+ / 67K+ records",
    "summaries": {
      "general": "An anonymized healthcare-data case study covering Snowflake pipelines, layered ETL/MDM, provider and organization identifiers, entity resolution, reconciliation, and stewardship-ready evidence.",
      "data": "Snowflake and MDM work spanning 327K+ records, 67K+ entity matching, layered ingestion and canonical models, deterministic and scored rules, exception datasets, and audit-ready outputs.",
      "solutions": "A regulated-enterprise workflow that turns ambiguous data-quality questions into traceable matching rules, API-assisted lookups, review checkpoints, and business-readable evidence.",
      "salesforce": "Healthcare reference-data and CRM-adjacent quality work covering identifier presence, affiliations, address/license profiling, duplicate resolution, stewardship review, and publication controls."
    },
    "flow": [
      [
        "Problem",
        "Provider and organization records contained missing identifiers, duplicates, conflicting affiliations, and address or license inconsistencies."
      ],
      [
        "Approach",
        "Layer ingestion, matching, canonicalization, exceptions, and stewardship review with traceable rules."
      ],
      [
        "Engineering",
        "Snowflake SQL, NPI/DEA/HIN/340B/license signals, fuzzy matching, API lookups, manifests, and QC outputs."
      ],
      [
        "Outcome",
        "Auditable input, canonical, exception, validation, and publication datasets across 327K+ and 67K+ record workflows."
      ]
    ],
    "tech": [
      "Snowflake",
      "SQL",
      "ETL / MDM",
      "Entity resolution",
      "API lookups",
      "Data quality"
    ],
    "detailsTitle": "Matching, quality & stewardship details",
    "detailsIntro": "Only generalized architecture and approved scale are shown; client identity, source data, screenshots, workbooks, SQL, and internal endpoints remain private.",
    "bullets": [
      "Profiled healthcare-provider and organization data to identify missing identifiers, duplicates, conflicting affiliations, and address or license quality issues.",
      "Designed deterministic and scored rules for duplicate resolution, state and address selection, survivorship proposals, and stewardship review.",
      "Built API-assisted lookup checkpoints and traceable input, output, exception, and validation datasets with business-readable summaries and review materials."
    ],
    "links": [],
    "sourceNote": "Anonymized employer evidence; no client identity, private data, screenshots, SQL, or proprietary artifacts are published.",
  },
  "crm": {
    "title": "CRM Workflow & UAT Delivery",
    "category": "Business technology / Salesforce delivery",
    "role": "Anonymized employer case study · Private artifacts",
    "summaries": {
      "general": "An anonymized delivery case study turning stakeholder meetings, CRM metadata, live application behavior, and regulated workflows into requirements, UAT evidence, user guides, and implementation-ready backlogs.",
      "solutions": "Requirements-to-delivery work spanning meeting synthesis, live-system validation, metadata inspection, acceptance criteria, UAT status, decision logs, executive communication, and technical handoffs.",
      "frontend": "React/Vite business-workflow interfaces for hierarchical plan records, approval and read-only states, executive summaries, barriers, tactics, validation, and review without exposing CRM data.",
      "data": "CRM and healthcare-data delivery connecting metadata, validation rules, source evidence, acceptance criteria, discrepancies, and traceable implementation status.",
      "salesforce": "Salesforce and CRM delivery across metadata and live-workflow validation, UAT and enhancement tracking, acceptance evidence, approval states, user guides, and executive-ready artifacts."
    },
    "flow": [
      [
        "Problem",
        "Stakeholder feedback, CRM configuration, live behavior, and implementation gaps were spread across meetings and artifacts."
      ],
      [
        "Approach",
        "Synthesize requirements, inspect metadata, validate live workflows, and track every issue with acceptance evidence."
      ],
      [
        "Engineering",
        "CRM metadata checks, UAT trackers, React/Vite review interfaces, mock adapters, validation rules, and structured documentation."
      ],
      [
        "Outcome",
        "Prioritized backlogs, explicit blockers, user guides, decision logs, and implementation-ready technical handoffs."
      ]
    ],
    "tech": [
      "CRM metadata",
      "UAT",
      "Acceptance criteria",
      "React / Vite",
      "Decision logs",
      "User guides"
    ],
    "detailsTitle": "Validation, UAT & handoff details",
    "detailsIntro": "This case study uses synthetic interface abstractions and generalized facts; it does not reproduce employer or client systems.",
    "bullets": [
      "Synthesized meeting recordings and stakeholder feedback into structured requirements, completed-work summaries, open issues, owners, and timelines.",
      "Inspected CRM metadata and live application behavior to validate fields, layouts, approval and read-only workflows, and implementation gaps.",
      "Maintained UAT and enhancement trackers with acceptance criteria, evidence, prioritization, implementation status, user guides, and executive-ready communication.",
      "Implemented account-plan submission, manager review, approval history and timestamps in React/JavaScript workflows.",
      "Added cached refresh recovery and explicit retry while rejecting obsolete responses and resetting readiness when the selected plan changes."
    ],
    "links": [],
    "sourceNote": "Anonymized employer evidence; no client identity, screenshots, transcripts, credentials, or private CRM artifacts are published.",
  },
  "filedrop": {
    "title": "Private Filedrop",
    "category": "Backend / AI-ready infrastructure",
    "role": "Independent platform · Jun—Aug 2026",
    "summaries": {
      "general": "Secure cross-device file exchange with version history, local and S3-compatible storage, REST/OpenAPI/MCP integrations, shared mailboxes, and HMAC-signed webhooks.",
      "backend": "A backend platform with authenticated REST and OpenAPI contracts, MCP tools, local and S3-compatible storage, migration tooling, version history, and signed webhooks.",
      "solutions": "A concrete workflow problem turned into a deployable bridge across browsers, computers, and AI clients—with human control, auditable state, and documented handoffs."
    },
    "flow": [
      [
        "Problem",
        "Cross-device and AI-session file handoffs were slow and easy to lose."
      ],
      [
        "Approach",
        "Unify browser uploads, APIs, MCP tools, versioning, and messages."
      ],
      [
        "Engineering",
        "Node.js, Express, OpenAPI, S3-compatible storage, validation, and HMAC webhooks."
      ],
      [
        "Outcome",
        "Versioned file exchange and durable cross-device work coordination with explicit ownership and completion records."
      ]
    ],
    "tech": [
      "Node.js",
      "Express",
      "AWS SDK",
      "OpenAPI",
      "MCP",
      "HMAC"
    ],
    "detailsTitle": "Architecture & security details",
    "detailsIntro": "The service exposes REST, OpenAPI, and MCP interfaces over local or S3-compatible storage, with shared mailboxes and channels for cross-session coordination.",
    "bullets": [
      "Implemented categories, tags, project paths, file metadata, version history, unguessable downloads, and storage migration tooling.",
      "Added password and API-key access, timing-safe credential checks, upload validation, rate limiting, and HMAC-SHA256 signed webhooks.",
      "Documented browser, API, AI-client, cloud-storage, ChatGPT Action, MCP, and Render deployment workflows without publishing secrets or user data.",
      "Built durable coordination with deduplicated jobs, atomic claims, renewable leases, bounded retries and structured completion records."
    ],
    "links": [
      [
        "View source",
        "https://github.com/ashwinchembu/render-filedrop"
      ]
    ],
  },
  "lume": {
    "title": "Lume",
    "category": "AI meeting intelligence / Full-stack product",
    "role": "Independent product · Dec 2025—Jan 2026",
    "summaries": {
      "general": "A full-stack meeting intelligence platform for capturing, storing, searching, and querying meetings and uploaded project files with reusable context.",
      "fullstack": "An end-to-end React and Node/Express product connecting MongoDB, AWS S3, WebSockets, transcription, search, task extraction, and responsive project workflows.",
      "ai": "A retrieval-grounded product with vector embeddings, intent routing, evidence extraction, citations, transcript-aware search, and multi-pass generator/critic refinement.",
      "backend": "A Node/Express, MongoDB, S3, and WebSocket system for durable meeting ingestion, real-time updates, project-scoped retrieval, and document-backed answers.",
      "frontend": "A responsive React experience for transcripts, live updates, project context, task extraction, semantic search, and source-backed answer exploration.",
      "solutions": "A product built around a common team failure mode: context disappearing across meetings and files, then recovered through reusable project memory and traceable answers."
    },
    "flow": [
      [
        "Problem",
        "Decisions and context disappear across meetings and files."
      ],
      [
        "Approach",
        "Build reusable Project Brain memory around retrieval and evidence."
      ],
      [
        "Engineering",
        "React, Node/Express, MongoDB, S3, WebSockets, vector embeddings, and RAG."
      ],
      [
        "Outcome",
        "Searchable context, extracted tasks, document-grounded responses, and cited answers."
      ]
    ],
    "tech": [
      "React",
      "Node.js",
      "MongoDB",
      "AWS S3",
      "WebSockets",
      "RAG"
    ],
    "detailsTitle": "Architecture & product details",
    "detailsIntro": "The React client and Node/Express services capture, store, and query meeting content through MongoDB, AWS S3, vector retrieval, and live WebSocket updates.",
    "bullets": [
      "Built a RAG question-answering flow with vector embeddings, intent routing, evidence extraction, and multi-pass generator/critic refinement.",
      "Modeled reusable Project Brain knowledge bases that learn project-specific language and relationships from transcripts, files, and seeded context.",
      "Designed transcript-aware search and citation-backed answers so useful outputs remain traceable to meetings and source documents."
    ],
    "links": [
      [
        "View source",
        "https://github.com/ashwinchembu/work-helper"
      ]
    ],
  },
  "forge": {
    "title": "Forge",
    "category": "Data integration / Backend APIs",
    "role": "Public repository · Personal fitness intelligence · 2026",
    "summaries": {
      "general": "A personal fitness-intelligence backend that unifies strength training, nutrition, sleep, heart-rate, and recovery data into program-aware analysis.",
      "backend": "A FastAPI and MongoDB service with scheduled Hevy/Oura API pulls, separate Apple Health webhooks, on-demand refresh and nutrition CSV ingestion.",
      "data": "A multi-source data pipeline that normalizes training, nutrition, sleep, heart-rate, and recovery signals before comparing them with a structured 12-week program."
    },
    "flow": [
      [
        "Problem",
        "Training, nutrition, recovery, and health signals lived in separate systems."
      ],
      [
        "Approach",
        "Normalize source data and compare it with a structured hypertrophy plan."
      ],
      [
        "Engineering",
        "FastAPI, MongoDB Atlas, APIs, webhooks, scheduled sync, and CSV ingestion."
      ],
      [
        "Outcome",
        "Daily and weekly views of adherence, nutrition compliance, recovery quality, and next actions."
      ]
    ],
    "tech": [
      "Python",
      "FastAPI",
      "MongoDB Atlas",
      "Webhooks",
      "Scheduled sync",
      "Render"
    ],
    "detailsTitle": "Data pipeline & analysis details",
    "detailsIntro": "Forge unifies Hevy, Oura, MyFitnessPal-derived Apple Health data, and Health Auto Export webhooks without publishing personal records or credentials.",
    "bullets": [
      "Implemented configurable Hevy/Oura API pulls with a 15-minute default, separate Health Auto Export pushes documented at six hours, on-demand refresh and CSV ingestion.",
      "Modeled workouts, nutrition, sleep, heart-rate, recovery, and body metrics in MongoDB for daily and weekly analysis.",
      "Built an analysis engine that compares actual performance with a 12-week hypertrophy plan and scores workout adherence, nutrition compliance, and recovery quality.",
      "Preferred Oura recovery fields while filling missing values from Apple Health, keeping overlapping sources distinct."
    ],
    "links": [
      [
        "View source",
        "https://github.com/ashwinchembu/forge"
      ]
    ],
  },
  "educationai": {
    "title": "Tallyrus",
    "category": "Applied AI / Education product",
    "role": "Founder & Lead Developer · Jun 2023—Sep 2025",
    "summaries": {
      "general": "Educator-facing essay feedback combining teacher rubrics, historical examples and retrieval-grounded AI outputs for review.",
      "fullstack": "React educator workflows connected to Flask grading APIs, Express document uploads, S3 storage and MongoDB assignment records.",
      "ai": "LangChain/OpenAI embeddings, NumPy normalization and FAISS retrieval combine historical essay context with rubrics and prompts; pretrained Transformers/PyTorch inference and LangSmith tracing support the AI workflow.",
      "solutions": "Founder-led product planning, educator feedback, user testing, iterative delivery and five-figure fundraising for an essay-feedback platform."
    },
    "flow": [
      [
        "Problem",
        "Educators need detailed feedback that stays tied to their rubrics and examples."
      ],
      [
        "Approach",
        "Retrieve historical essay context and combine it with the current essay, rubric and prompt."
      ],
      [
        "Engineering",
        "Flask, LangChain/OpenAI embeddings, NumPy, FAISS, React, Express, S3, MongoDB and LangSmith tracing."
      ],
      [
        "Outcome",
        "Reviewable feedback and integrated educator workflows, supported by five-figure product funding."
      ]
    ],
    "tech": [
      "Python / Flask",
      "LangChain",
      "FAISS / NumPy",
      "Transformers / PyTorch",
      "LangSmith",
      "React"
    ],
    "detailsTitle": "Grading, pretrained inference & product iteration",
    "detailsIntro": "Tallyrus connects educator materials, retrieval and model outputs while preserving educator review.",
    "bullets": [
      "Built a Flask grading API using LangChain/OpenAI embeddings, normalized NumPy vectors and FAISS similarity search to retrieve historical essay context.",
      "Combined retrieved examples, the essay, teacher rubric and prompt in GPT-4o requests returning reviewable feedback.",
      "Integrated a pretrained Hugging Face Transformers classifier with PyTorch, sentence chunking and length-weighted prediction aggregation.",
      "Integrated LangSmith tracing into the Tallyrus AI workflow.",
      "Connected Express/Multer uploads to AWS S3 and MongoDB records and React educator interfaces.",
      "Led product planning, educator feedback, user testing and iteration; raised five figures for product development."
    ],
    "links": [],
    "sourceNote": "Collaborative founder product. Pretrained inference and tracing integration; no custom-training or classifier-accuracy claim.",
  },
  "commerce": {
    "title": "3D Commerce Experience",
    "category": "Frontend / Interactive product UI",
    "role": "Public repository · Figma-originated UI prototype",
    "summaries": {
      "general": "An interactive varsity-jacket storefront with product discovery, cart, checkout, account, search, content pages, and a responsive Three.js configurator.",
      "fullstack": "A React and TypeScript commerce product connecting reusable components, navigation, cart and checkout flows, account pages, and a Three.js product builder.",
      "frontend": "A responsive component system and GLB/Draco-powered Three.js configurator with independent garment, color, material, and placement controls."
    },
    "flow": [
      [
        "Problem",
        "Static product pages cannot explain a highly configurable garment."
      ],
      [
        "Approach",
        "Combine familiar commerce flows with an interactive 3D builder."
      ],
      [
        "Engineering",
        "React, TypeScript, Three.js, GLB assets, Draco decoding, Tailwind, Radix UI, and Material UI."
      ],
      [
        "Outcome",
        "A production-build-verified storefront with reusable responsive components and detailed configuration controls."
      ]
    ],
    "tech": [
      "React",
      "TypeScript",
      "Three.js",
      "Vite",
      "Tailwind",
      "Radix UI"
    ],
    "detailsTitle": "3D interaction & interface details",
    "detailsIntro": "The prototype covers both the broader shopping journey and the specialized interaction needed to configure a varsity jacket.",
    "bullets": [
      "Built product discovery, cart, checkout, account, search, and content pages as reusable responsive flows.",
      "Developed a Three.js product builder using GLB assets and Draco decoding.",
      "Implemented independent garment customization, color configuration, placement adjustments, modals, product cards, navigation, and consent flows.",
      "Preloaded poster, GLB and DRACO assets, withheld the canvas until visible pixels rendered and restored a retryable poster after interrupted WebGL rendering.",
      "Refined garment-attached artwork, sleeve masking, Safari alignment and responsive builder height."
    ],
    "links": [
      [
        "Open preview",
        "https://ecommerce-website-design.onrender.com/jacket-builder"
      ],
      [
        "View source",
        "https://github.com/ashwinchembu/E-commerceWebsiteDesign"
      ]
    ],
    "sourceNote": "Interface concept originated in Figma; implementation and repository evidence are linked.",
  },
  "dashboard": {
    "title": "Enterprise Healthcare Dashboard",
    "category": "Frontend / Healthcare workflow design",
    "role": "Public repository · Figma-originated UI prototype",
    "summaries": {
      "general": "A reusable dashboard prototype for healthcare account hierarchies, trial progress, follow-ups, barriers, site progression, tasks, and detail workflows.",
      "data": "A data-dense review surface that translates account hierarchy, progress metrics, trials, follow-ups, barriers, and site progression into scannable operational context.",
      "frontend": "A React/TypeScript and Vue interface system with metric cards, hierarchy views, progress steppers, follow-up queues, barrier summaries, and detail and edit modals."
    },
    "flow": [
      [
        "Problem",
        "Complex healthcare account and trial workflows are difficult to scan and act on."
      ],
      [
        "Approach",
        "Turn hierarchy, progress, follow-up, and barrier data into reusable interface patterns."
      ],
      [
        "Engineering",
        "React, TypeScript, Vue, Vite, Tailwind, metric cards, steppers, queues, and modals."
      ],
      [
        "Outcome",
        "A component-based prototype suitable for stakeholder demos and workflow validation."
      ]
    ],
    "tech": [
      "React",
      "TypeScript",
      "Vue",
      "Vite",
      "Tailwind",
      "UI systems"
    ],
    "detailsTitle": "Workflow & component details",
    "detailsIntro": "The prototype explores how dense healthcare operations data can become a coherent decision surface without publishing any private employer or client material.",
    "bullets": [
      "Designed account hierarchy, progress metrics, ongoing trial, pending follow-up, AI-barrier, and site-progression views.",
      "Built reusable metric cards, progress steppers, task queues, barrier summaries, trial-detail modals, and editing patterns.",
      "Implemented the design in both React/TypeScript and Vue to validate reusable component structure."
    ],
    "links": [
      [
        "View source",
        "https://github.com/ashwinchembu/Enterprisehealthcaredashboarddesign"
      ]
    ],
    "sourceNote": "Synthetic Figma-originated prototype; no employer/client data or screenshots are published.",
  },
  "ragpoc": {
    "title": "Azure RAG Document Search",
    "category": "Applied AI / Retrieval prototype",
    "role": "Public repository · 30+ document corpus",
    "summaries": {
      "general": "A document-search proof of concept with multi-format loading, chunking, Azure OpenAI embeddings, FAISS retrieval, source citation, and interactive Q&A.",
      "ai": "A focused RAG implementation showing the complete path from PDF, TXT, and Markdown ingestion through chunking, embeddings, FAISS similarity search, retrieval, citations, and chat answers."
    },
    "flow": [
      [
        "Problem",
        "Teams need grounded answers across a mixed-format document corpus."
      ],
      [
        "Approach",
        "Create a local vector index with retrievable chunks and cited sources."
      ],
      [
        "Engineering",
        "Python, LangChain, Azure OpenAI embeddings and chat deployments, FAISS, and notebook workflows."
      ],
      [
        "Outcome",
        "Interactive Q&A with source citation across a documented corpus of 30+ files."
      ]
    ],
    "tech": [
      "Python",
      "Azure OpenAI",
      "LangChain",
      "FAISS",
      "Embeddings",
      "PDF ingestion"
    ],
    "detailsTitle": "Retrieval pipeline details",
    "detailsIntro": "The proof of concept isolates the mechanics of a grounded document-search pipeline so each ingestion and retrieval step is visible and inspectable.",
    "bullets": [
      "Loaded PDF, TXT, and Markdown sources, then chunked text for embedding and retrieval.",
      "Built a FAISS similarity index with Azure OpenAI embeddings and interactive Q&A.",
      "Returned source citations and documented configuration for separate Azure embedding and chat-model deployments."
    ],
    "links": [
      [
        "View source",
        "https://github.com/ashwinchembu/RAGpoc"
      ]
    ],
  },
  "novasonic": {
    "title": "Nova Sonic Voice & Data Assistant",
    "category": "Voice AI / AWS data integration",
    "role": "ZS-associated implementation · Oct—Dec 2025",
    "summaries": {
      "general": "A real-time voice assistant integrating AWS Nova Sonic and Bedrock with WebSocket sessions, Vue interfaces, call analysis, cloud data tools, and mobile-browser recovery.",
      "data": "A voice-and-data workflow connecting live sessions and structured tool use with S3 uploads, AWS Glue refreshes, Redshift-oriented adapters, Python data pipelines, and observable status interfaces.",
      "solutions": "A customer-facing AI demo surface combining real-time audio, transcripts, tool logs, call history, database status, prompt and session management, deployment, and mobile recovery documentation."
    },
    "flow": [
      [
        "Problem",
        "Voice interactions need real-time feedback and dependable access to structured data tools."
      ],
      [
        "Approach",
        "Join bidirectional audio sessions with visible transcripts, tool logs, history, and cloud refresh controls."
      ],
      [
        "Engineering",
        "Node.js, Vue, WebSockets, AWS Bedrock/Nova Sonic, S3, Glue, Redshift, and Python pipelines."
      ],
      [
        "Outcome",
        "A browser and iPad-ready assistant with observable voice, tool, and data workflows."
      ]
    ],
    "tech": [
      "Node.js",
      "Vue",
      "WebSockets",
      "AWS Bedrock",
      "S3",
      "Glue"
    ],
    "detailsTitle": "Voice session & data workflow details",
    "detailsIntro": "The public repository combines real-time voice interaction with data-oriented tooling and operational interfaces for demos and debugging.",
    "bullets": [
      "Built WebSocket session management and browser/iPad interfaces for AWS Nova Sonic and Bedrock voice interaction.",
      "Created audio visualization, transcript, tool-log, call-history, database-status, and structured JSON inspection views.",
      "Integrated call-recording analysis, prompt and session management, S3 upload, AWS Glue refresh, cloud adapters, deployment, and mobile-browser recovery documentation.",
      "Persisted Bedrock invocation history and recovered conversation state after reconnects and EKS pod restarts."
    ],
    "links": [],
    "sourceNote": "Generalized professional implementation. The historical Render service is suspended; current live operation is not claimed.",
  },
  "ablegrade": {
    "title": "AbleGrade",
    "category": "Education AI / Hackathon collaboration",
    "role": "HackDavis 2024 · Co-built with Gautham Pandian",
    "summaries": {
      "general": "Co-built AI writing-support application for ESL learners with detailed feedback, progress tracking and PDF ingestion."
    },
    "flow": [
      [
        "Problem",
        "A focused workflow needs a usable, maintainable implementation."
      ],
      [
        "Approach",
        "Connect the interface, service logic and persistent state."
      ],
      [
        "Engineering",
        "MongoDB, Express, React, Node.js, OpenAI."
      ],
      [
        "Outcome",
        "Co-built AI writing-support application for ESL learners with detailed feedback, progress tracking and PDF ingestion."
      ]
    ],
    "tech": [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "OpenAI"
    ],
    "detailsTitle": "Implementation & context",
    "detailsIntro": "Co-built AI writing-support application for ESL learners with detailed feedback, progress tracking and PDF ingestion.",
    "bullets": [
      "Co-built ESL writing feedback using the MERN stack and OpenAI GPT-4.",
      "Added PDF upload and parsing, detailed feedback and progress tracking."
    ],
    "links": [],
  },
  "echo": {
    "title": "Echo",
    "category": "Identity verification / Research",
    "role": "Collaborative research prototype · Sep 2023—Mar 2024",
    "summaries": {
      "general": "Collaborative identity-verification research prototype combining web interfaces, image handling and blockchain-backed verification."
    },
    "flow": [
      [
        "Problem",
        "A focused workflow needs a usable, maintainable implementation."
      ],
      [
        "Approach",
        "Connect the interface, service logic and persistent state."
      ],
      [
        "Engineering",
        "React, Node.js, Express, Flask, MongoDB, AWS S3, ResilientDB integration."
      ],
      [
        "Outcome",
        "First place, Interactive Media Track at HackMIT 2023; team award."
      ]
    ],
    "tech": [
      "React",
      "Node.js",
      "Express",
      "Flask",
      "MongoDB",
      "AWS S3",
      "ResilientDB integration"
    ],
    "detailsTitle": "Implementation & context",
    "detailsIntro": "Collaborative identity-verification research prototype combining web interfaces, image handling and blockchain-backed verification.",
    "bullets": [
      "Collaborated on web interfaces, image handling and blockchain-backed verification.",
      "Integrated React, Express, Flask, MongoDB and AWS S3 workflows with ResilientDB.",
      "Team award: first place, Interactive Media Track at HackMIT 2023."
    ],
    "links": [
      [
        "UC Davis coverage",
        "https://engineering.ucdavis.edu/news/student-wins-hackmit"
      ]
    ],
  },
  "curtain": {
    "title": "Agent Curtain",
    "category": "Desktop tooling / Privacy",
    "role": "Independent macOS utility · Aug 2026",
    "summaries": {
      "general": "macOS privacy utility using the operating system authentication boundary and a restricted local control interface."
    },
    "flow": [
      [
        "Problem",
        "A focused workflow needs a usable, maintainable implementation."
      ],
      [
        "Approach",
        "Connect the interface, service logic and persistent state."
      ],
      [
        "Engineering",
        "Python, macOS APIs, Unix sockets."
      ],
      [
        "Outcome",
        "macOS privacy utility using the operating system authentication boundary and a restricted local control interface."
      ]
    ],
    "tech": [
      "Python",
      "macOS APIs",
      "Unix sockets"
    ],
    "detailsTitle": "Implementation & context",
    "detailsIntro": "macOS privacy utility using the operating system authentication boundary and a restricted local control interface.",
    "bullets": [
      "Covered connected displays and handed authentication to the real macOS Lock Screen.",
      "Restricted Unix-socket commands with input filtering, process identity checks and fail-closed behavior."
    ],
    "links": [
      [
        "View source",
        "https://github.com/ashwinchembu/agent-curtain"
      ]
    ],
  },
  "systems": {
    "title": "Systems Programming Projects",
    "category": "Systems / C",
    "role": "UC Davis coursework",
    "summaries": {
      "general": "Coursework implementations of a Unix-style shell, user-level threading and a FAT-style file system."
    },
    "flow": [
      [
        "Problem",
        "A focused workflow needs a usable, maintainable implementation."
      ],
      [
        "Approach",
        "Connect the interface, service logic and persistent state."
      ],
      [
        "Engineering",
        "C, Unix process APIs, Semaphores, Virtual disks."
      ],
      [
        "Outcome",
        "Coursework implementations of a Unix-style shell, user-level threading and a FAT-style file system."
      ]
    ],
    "tech": [
      "C",
      "Unix process APIs",
      "Semaphores",
      "Virtual disks"
    ],
    "detailsTitle": "Implementation & context",
    "detailsIntro": "Coursework implementations of a Unix-style shell, user-level threading and a FAT-style file system.",
    "bullets": [
      "Implemented a Unix-style shell with process handling.",
      "Built user-level threading with context switching, preemption and semaphores.",
      "Implemented FAT-style virtual-disk persistence, allocation and boundary/error handling."
    ],
    "links": [
      [
        "Shell",
        "https://github.com/ashwinchembu/cse150_p1"
      ],
      [
        "User-level threads",
        "https://github.com/ashwinchembu/ecs150_p2"
      ],
      [
        "FAT file system",
        "https://github.com/ashwinchembu/cse150_p3"
      ]
    ],
  },
  "sixdegrees": {
    "title": "Six Degrees Application",
    "category": "Graph exploration / Full-stack",
    "role": "Take-home project",
    "summaries": {
      "general": "Full-stack graph relationship explorer with a C++ backend and interactive frontend."
    },
    "flow": [
      [
        "Problem",
        "A focused workflow needs a usable, maintainable implementation."
      ],
      [
        "Approach",
        "Connect the interface, service logic and persistent state."
      ],
      [
        "Engineering",
        "C++, Crow, React, TypeScript."
      ],
      [
        "Outcome",
        "Full-stack graph relationship explorer with a C++ backend and interactive frontend."
      ]
    ],
    "tech": [
      "C++",
      "Crow",
      "React",
      "TypeScript"
    ],
    "detailsTitle": "Implementation & context",
    "detailsIntro": "Full-stack graph relationship explorer with a C++ backend and interactive frontend.",
    "bullets": [
      "Built a C++ Crow backend with API routes and a React/TypeScript interface.",
      "Added graph-style relationship exploration, error handling, logging and setup documentation."
    ],
    "links": [
      [
        "View source",
        "https://github.com/ashwinchembu/AggieWorks-Take-Home"
      ]
    ],
  },
  "wearable": {
    "title": "Smart-glasses Audio Visualizer",
    "category": "Wearables / Real-time audio",
    "role": "Private implementation · Nov 2025",
    "summaries": {
      "general": "Customized wearable interface for audio visualization and live transcription."
    },
    "flow": [
      [
        "Problem",
        "A focused workflow needs a usable, maintainable implementation."
      ],
      [
        "Approach",
        "Connect the interface, service logic and persistent state."
      ],
      [
        "Engineering",
        "TypeScript, React, MentraOS SDK."
      ],
      [
        "Outcome",
        "Customized wearable interface for audio visualization and live transcription."
      ]
    ],
    "tech": [
      "TypeScript",
      "React",
      "MentraOS SDK"
    ],
    "detailsTitle": "Implementation & context",
    "detailsIntro": "Customized wearable interface for audio visualization and live transcription.",
    "bullets": [
      "Customized a TypeScript/React interface for audio visualization and live transcription with the MentraOS SDK.",
      "Implemented audio-chunk handling, transcription modules and troubleshooting flows."
    ],
    "links": [],
    "sourceNote": "Custom application built with MentraOS; private source. No ownership of the underlying platform is implied."
  }
});

const preferenceGate = document.querySelector('#preference-gate');
const preferenceDialog = document.querySelector('.preference-dialog');
const preferenceForm = document.querySelector('#preference-form');
const preferenceContinue = document.querySelector('.preference-continue');
const preferenceGeneral = document.querySelector('#preference-general');
const preferenceClose = document.querySelector('#preference-close');
const preferenceTrigger = document.querySelector('#preference-trigger');
const preferenceTriggerLabel = document.querySelector('.preference-trigger-label');
const preferenceStatus = document.querySelector('#preference-status');
const pageRegions = [document.querySelector('.site-header'), document.querySelector('main')].filter(Boolean);

const heroEyebrow = document.querySelector('#hero-eyebrow');
const heroTitle = document.querySelector('#hero-title');
const heroLede = document.querySelector('#hero-lede');
const personalizationNote = document.querySelector('#personalization-note');
const primaryCta = document.querySelector('#primary-cta');
const currentRoleChips = document.querySelector('#current-role-chips');
const workHeading = document.querySelector('#work-heading');
const workIntro = document.querySelector('#work-intro');
const experienceHeading = document.querySelector('#experience-heading');
const experienceIntro = document.querySelector('#experience-intro');
const aboutSummary = document.querySelector('#about-summary');
const contactHeading = document.querySelector('#contact-heading');
const metaDescription = document.querySelector('meta[name="description"]');
const projectShowcase = document.querySelector('#project-showcase');
const projectSlots = [...document.querySelectorAll('[data-project-slot]')];
const stackValues = [...document.querySelectorAll('.technology-map-grid strong')];
const zsViewLens = document.querySelector('#zs-view-lens');
const supportingWorkHeading = document.querySelector('#supporting-work-heading');

let activePreferences = null;
let lastFocusedElement = null;

function getStoredTheme() {
  try { return window.localStorage.getItem('portfolio-theme'); } catch { return null; }
}

function storeTheme(theme) {
  try { window.localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works for this visit. */ }
}

function getStoredPreferences() {
  try {
    const value = JSON.parse(window.localStorage.getItem(PREFERENCE_KEY));
    if (!value || !audiencePresets[value.audience] || !rolePresets[value.role]) return null;
    return { audience: value.audience, role: value.role };
  } catch {
    return null;
  }
}

function storePreferences(preferences) {
  try { window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(preferences)); } catch { /* Personalization still works for this visit. */ }
}

function setTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeButton?.setAttribute('aria-pressed', String(dark));
  themeButton?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  if (themeLabel) themeLabel.textContent = dark ? 'Light' : 'Dark';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#171918' : '#f5f5f0');
}

function syncPreferenceForm(preferences) {
  if (!preferenceForm || !preferences) return;
  const audienceInput = preferenceForm.querySelector(`input[name="audience"][value="${preferences.audience}"]`);
  const roleInput = preferenceForm.querySelector(`input[name="role"][value="${preferences.role}"]`);
  if (audienceInput) audienceInput.checked = true;
  if (roleInput) roleInput.checked = true;
  updatePreferenceButton();
}

const projectScreenshots = Object.freeze({
  commerce: {
    src: 'assets/screenshots/commerce-builder.jpg',
    width: 1470, height: 750,
    alt: 'The actual Manoir Kits jacket builder with its Three.js garment and material color controls.',
    caption: 'Manoir Kits · Local capture of the public 3D configurator.',
  },
  dashboard: {
    src: 'assets/screenshots/healthcare-dashboard.jpg',
    width: 1470, height: 694,
    alt: 'The healthcare dashboard prototype showing site progression, trial metrics and a potential-barriers panel with synthetic data.',
    caption: 'React prototype · Existing synthetic demonstration data.',
  },
  forge: {
    src: 'assets/screenshots/forge-preview.jpg',
    width: 1470, height: 694,
    alt: 'Forge’s actual web interface running in preview mode with synthetic training and recovery data.',
    caption: 'Forge preview mode · Synthetic data, no personal health records.',
  },
  filedrop: {
    src: 'assets/screenshots/filedrop-preview.jpg',
    width: 1470, height: 694,
    alt: 'Private Filedrop’s actual file-management interface running in an isolated local demo.',
    caption: 'Local demo · Sample files in isolated storage.',
  },
});

function renderProjectVisual(projectKey) {
  const screenshot = projectScreenshots[projectKey];
  if (!screenshot) return '';
  return `<figure class="project-visual project-screenshot"><img src="${screenshot.src}" alt="${screenshot.alt}" width="${screenshot.width}" height="${screenshot.height}" loading="lazy" decoding="async" /><figcaption><span>Actual interface</span>${screenshot.caption}</figcaption></figure>`;
}

function renderProjectShowcase(role, audienceKey) {
  const featured = roleProjectSelections[role] || roleProjectSelections.general;
  const additional = [...(rolePresets[role]?.matches || []), 'forge', 'commerce', 'tech4good', 'ragpoc', 'filedrop']
    .filter((projectKey, index, candidates) => projectCatalog[projectKey] && !featured.includes(projectKey) && candidates.indexOf(projectKey) === index)
    .slice(0, 2);
  const selected = [...featured, ...additional];
  const audienceLabels = {
    hiring: 'Hiring signal',
    engineering: 'Technical deep dive',
    product: 'Product signal',
    exploring: 'Recommended for this view',
  };
  const badge = audienceLabels[audienceKey] || audienceLabels.exploring;

  selected.forEach((projectKey, index) => {
    const slot = projectSlots[index];
    const project = projectCatalog[projectKey];
    if (!slot || !project) return;
    const summary = project.summaries[role] || project.summaries.general || Object.values(project.summaries)[0];
    const flowClass = index === 0 ? 'case-study-flow' : 'case-study-flow compact';
    const flow = project.flow.map(([label, copy]) => `<div><span>${label}</span><p>${copy}</p></div>`).join('');
    const tech = project.tech.map((item) => `<span>${item}</span>`).join('');
    const bullets = project.bullets.map((item) => `<li>${item}</li>`).join('');
    const links = project.links.map(([label, href]) => `<a class="text-link" href="${href}" target="_blank" rel="noopener">${label} <span>↗</span></a>`).join('');
    const sourceNote = project.sourceNote ? `<p class="source-note">${project.sourceNote}</p>` : '';

    slot.id = `${projectKey}-case-study`;
    slot.dataset.project = projectKey;
    slot.classList.toggle('project-text', !projectScreenshots[projectKey]);
    slot.setAttribute('aria-labelledby', `${projectKey}-title`);
    slot.innerHTML = `${renderProjectVisual(projectKey, project)}<div class="project-copy"><p class="project-index">${project.category} <span class="role-match-badge">${badge}</span></p><h3 id="${projectKey}-title">${project.title}</h3><p class="project-role">${project.role}</p><p class="project-summary">${summary}</p><div class="${flowClass}" aria-label="${project.title} case study summary">${flow}</div><div class="tech-list">${tech}</div><details class="project-more"><summary>${project.detailsTitle}</summary><div class="project-more-body"><p>${project.detailsIntro}</p><ul>${bullets}</ul></div></details><div class="project-links">${links}</div>${sourceNote}</div>`;
    const visual = slot.querySelector('.project-visual');
    if (visual) {
      const frame = document.createElement('div');
      frame.className = 'visual-frame';
      visual.before(frame);
      frame.append(visual);
      const expand = document.createElement('button');
      expand.className = 'expand-visual';
      expand.type = 'button';
      expand.textContent = 'View screenshot ↗';
      expand.setAttribute('aria-label', `Expand ${project.title} screenshot`);
      expand.dataset.projectKey = projectKey;
      frame.append(expand);
    }
  });

  if (projectShowcase) projectShowcase.setAttribute('aria-label', `Five projects selected for the ${rolePresets[role]?.short || 'general'} view`);

  document.querySelectorAll('#support-grid [data-project]').forEach((card) => {
    const isFeatured = selected.includes(card.dataset.project);
    card.hidden = isFeatured;
    card.classList.toggle('role-match', !isFeatured && (rolePresets[role]?.matches || []).includes(card.dataset.project));
  });

  if (supportingWorkHeading) {
    supportingWorkHeading.textContent = `Browse projects beyond the ${rolePresets[role]?.short || 'general'} view.`;
  }
}

function renderRoleStack(role) {
  const values = roleStackPresets[role] || roleStackPresets.general;
  stackValues.forEach((element, index) => {
    if (values[index]) element.textContent = values[index];
  });
}

function applyPreferences(preferences) {
  const audience = audiencePresets[preferences.audience] || audiencePresets.exploring;
  const preset = rolePresets[preferences.role] || rolePresets.general;
  activePreferences = { audience: preferences.audience, role: preferences.role };

  document.documentElement.dataset.roleFocus = preferences.role;
  document.documentElement.dataset.audience = preferences.audience;

  if (heroEyebrow) {
    const dot = document.createElement('span');
    dot.className = 'status-dot';
    heroEyebrow.replaceChildren(dot, document.createTextNode(` ${audience.eyebrow} · San Francisco · ${preset.eyebrow}`));
  }
  if (heroTitle) heroTitle.innerHTML = preset.title;
  if (heroLede) heroLede.textContent = preset.lede;
  if (personalizationNote) personalizationNote.textContent = `${audience.notePrefix} · ${preset.note}`;
  if (primaryCta) {
    primaryCta.href = preset.ctaTarget;
    primaryCta.innerHTML = `${preset.cta} <span>↓</span>`;
  }
  if (workHeading) workHeading.textContent = preset.workHeading;
  if (workIntro) workIntro.textContent = preset.workIntro;
  if (experienceHeading) experienceHeading.textContent = preset.experienceHeading;
  if (experienceIntro) experienceIntro.textContent = preset.experienceIntro;
  if (aboutSummary) aboutSummary.textContent = preset.about;
  if (contactHeading) contactHeading.innerHTML = audience.contact;
  if (preferenceTriggerLabel) preferenceTriggerLabel.textContent = `View: ${preset.short}`;
  if (metaDescription) metaDescription.content = preset.lede;
  document.title = `Ashwin Chembu — ${preset.titlePlain}`;

  const resumeFile = roleResumeFiles[preferences.role] || roleResumeFiles.general;
  document.querySelectorAll('[data-resume-link]').forEach((link) => {
    link.href = `resumes/${resumeFile}`;
    link.setAttribute('aria-label', `Open ${preset.short} résumé (PDF)`);
    const action = link.dataset.resumeLink;
    const prefix = action === 'primary' ? 'View ' : action === 'experience' ? 'Open ' : '';
    link.replaceChildren(document.createTextNode(`${prefix}${preset.short} résumé`));
    if (action !== 'footer') {
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden', 'true');
      link.append(arrow);
    }
  });

  if (currentRoleChips) {
    currentRoleChips.replaceChildren(...preset.chips.map((chip) => {
      const element = document.createElement('span');
      element.textContent = chip;
      return element;
    }));
  }

  renderProjectShowcase(preferences.role, preferences.audience);
  renderRoleStack(preferences.role);
  if (zsViewLens) zsViewLens.textContent = zsLensPresets[preferences.role] || zsLensPresets.general;

  syncPreferenceForm(activePreferences);
}

function updatePreferenceButton() {
  if (!preferenceForm || !preferenceContinue) return;
  const audience = preferenceForm.querySelector('input[name="audience"]:checked');
  const role = preferenceForm.querySelector('input[name="role"]:checked');
  preferenceContinue.disabled = !(audience && role);
  if (preferenceStatus) preferenceStatus.textContent = '';
}

function setPageInert(inert) {
  pageRegions.forEach((region) => { region.inert = inert; });
}

function openPreferenceGate() {
  if (!preferenceGate) return;
  lastFocusedElement = document.activeElement;
  preferenceGate.hidden = false;
  document.documentElement.removeAttribute('data-preference-saved');
  document.documentElement.removeAttribute('data-preference-pending');
  preferenceGate.setAttribute('aria-hidden', 'false');
  if (preferenceDialog) preferenceDialog.scrollTop = 0;
  if (preferenceClose) preferenceClose.hidden = !activePreferences;
  setPageInert(true);
  syncPreferenceForm(activePreferences);
  window.requestAnimationFrame(() => {
    const selected = preferenceForm?.querySelector('input:checked');
    const first = preferenceForm?.querySelector('input');
    (selected || first)?.focus();
  });
}

function closePreferenceGate() {
  if (!preferenceGate) return;
  preferenceGate.hidden = true;
  document.documentElement.removeAttribute('data-preference-pending');
  document.documentElement.dataset.preferenceSaved = 'true';
  preferenceGate.setAttribute('aria-hidden', 'true');
  setPageInert(false);
  lastFocusedElement?.focus?.();
}

function useGeneralView() {
  const preferences = { audience: 'exploring', role: 'general' };
  applyPreferences(preferences);
  storePreferences(preferences);
  closePreferenceGate();
}

renderProjectShowcase('general', 'exploring');
renderRoleStack('general');

const savedTheme = getStoredTheme();
setTheme(savedTheme || 'light');

const savedPreferences = getStoredPreferences();
if (savedPreferences) {
  applyPreferences(savedPreferences);
  if (preferenceGate) preferenceGate.hidden = true;
  document.documentElement.removeAttribute('data-preference-pending');
  document.documentElement.dataset.preferenceSaved = 'true';
  preferenceGate?.setAttribute('aria-hidden', 'true');
} else {
  applyPreferences({ audience: 'exploring', role: 'general' });
  if (preferenceGate) preferenceGate.hidden = true;
  document.documentElement.dataset.preferenceSaved = 'true';
  document.documentElement.removeAttribute('data-preference-pending');
  preferenceGate?.setAttribute('aria-hidden', 'true');
}

preferenceForm?.addEventListener('change', updatePreferenceButton);
preferenceForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(preferenceForm);
  const preferences = { audience: data.get('audience'), role: data.get('role') };
  if (!audiencePresets[preferences.audience] || !rolePresets[preferences.role]) {
    if (preferenceStatus) preferenceStatus.textContent = 'Choose one option in each section to continue.';
    return;
  }
  applyPreferences(preferences);
  storePreferences(preferences);
  closePreferenceGate();
});

preferenceGeneral?.addEventListener('click', useGeneralView);
preferenceTrigger?.addEventListener('click', openPreferenceGate);
preferenceClose?.addEventListener('click', closePreferenceGate);

preferenceGate?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && activePreferences) {
    event.preventDefault();
    closePreferenceGate();
    return;
  }
  if (event.key !== 'Tab') return;
  const focusable = [...preferenceGate.querySelectorAll('button:not([disabled]):not([hidden]), input:not([disabled])')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

themeButton?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  storeTheme(nextTheme);
});

function setMenuOpen(open) {
  if (!menuButton || !navigation) return;
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
}

menuButton?.addEventListener('click', () => {
  setMenuOpen(!navigation.classList.contains('open'));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    setMenuOpen(false);
    menuButton?.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && navigation?.classList.contains('open')) setMenuOpen(false);
});

const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 }) : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('visible');
});
document.querySelector('#year').textContent = new Date().getFullYear();

const visualDialog = document.querySelector('.visual-dialog');
projectShowcase?.addEventListener('click', (event) => {
  const expand = event.target.closest('.expand-visual');
  if (!expand || !visualDialog) return;
  const visual = expand.closest('.visual-frame')?.querySelector('.project-visual');
  const project = projectCatalog[expand.dataset.projectKey];
  if (!visual || !project) return;
  visualDialog.querySelector('#visual-dialog-title').textContent = project.title;
  visualDialog.querySelector('#visual-dialog-description').textContent = projectScreenshots[expand.dataset.projectKey]?.caption || '';
  visualDialog.querySelector('.visual-original').href = projectScreenshots[expand.dataset.projectKey]?.src || '#';
  visualDialog.classList.remove('zoomed');
  visualDialog.querySelector('.visual-zoom').setAttribute('aria-pressed', 'false');
  visualDialog.querySelector('.visual-zoom').textContent = 'Zoom in';
  visualDialog.querySelector('.visual-dialog-content').replaceChildren(visual.cloneNode(true));
  visualDialog.showModal();
});
document.querySelector('.visual-zoom')?.addEventListener('click', (event) => {
  const zoomed = visualDialog.classList.toggle('zoomed');
  event.currentTarget.setAttribute('aria-pressed', String(zoomed));
  event.currentTarget.textContent = zoomed ? 'Fit to screen' : 'Zoom in';
});
document.querySelector('.visual-dialog-close')?.addEventListener('click', () => visualDialog.close());
visualDialog?.addEventListener('click', (event) => {
  if (event.target === visualDialog) visualDialog.close();
});

const skillsStrip = document.querySelector('.practice-strip');
const skillsTrack = document.querySelector('.practice-track');
const skillsGroup = document.querySelector('.practice-group');
const skillsToggle = document.querySelector('.skills-toggle');
if (skillsGroup && skillsTrack && skillsStrip) {
  const duplicate = skillsGroup.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  skillsTrack.append(duplicate);
  skillsStrip.classList.add('scrolling');
}
skillsToggle?.addEventListener('click', () => {
  const paused = skillsToggle.getAttribute('aria-pressed') !== 'true';
  skillsToggle.setAttribute('aria-pressed', String(paused));
  skillsToggle.textContent = paused ? 'Resume scrolling' : 'Pause scrolling';
  skillsStrip?.classList.toggle('paused', paused);
});
