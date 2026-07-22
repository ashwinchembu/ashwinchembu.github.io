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
    title: 'I build thoughtful software where <em>product, AI,</em> and <em>data</em> meet.',
    titlePlain: 'Full-Stack & Applied AI Engineer',
    lede: 'I build practical AI-enabled products, backend systems, and thoughtful user experiences—from document intelligence and automation to real-time, data-driven applications.',
    note: 'Showing a balanced view of secure integrations, retrieval-grounded products, data pipelines, and clearly labeled supporting work.',
    cta: 'See selected work',
    ctaTarget: '#work',
    workHeading: 'Practical systems, built end to end.',
    workIntro: 'Three representative case studies spanning secure handoffs, retrieval-grounded product work, and multi-tenant SaaS delivery.',
    experienceHeading: 'Engineering across the stack.',
    experienceIntro: 'Building at the intersection of technology, operations, and user needs.',
    about: 'I’m a UC Davis computer science graduate based in Fremont, California. I like untangling hard technical problems, but I care just as much about whether the result feels intuitive and earns its place in someone’s workflow.',
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
    matches: ['lume', 'educationai', 'ragpoc', 'filedrop'],
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

const roleProjectSelections = Object.freeze({
  general: ['filedrop', 'lume', 'sylk'],
  fullstack: ['sylk', 'lume', 'tech4good'],
  ai: ['lume', 'educationai', 'ragpoc'],
  backend: ['filedrop', 'sylk', 'lume'],
  data: ['mdm', 'tech4good', 'forge'],
  frontend: ['tech4good', 'commerce', 'sylk'],
  solutions: ['crm', 'filedrop', 'automation'],
  salesforce: ['crm', 'mdm', 'dashboard'],
});

const roleStackPresets = Object.freeze({
  general: ['React · TypeScript', 'Python · FastAPI · Node.js · Express', 'MongoDB · Firebase · Snowflake · AWS', 'RAG · Vector search · Evidence grounding', 'REST APIs · OpenAPI · MCP · Webhooks', 'pytest · Vitest · Playwright · Render'],
  fullstack: ['React 19 · TypeScript · Responsive UI', 'Node.js · Express · FastAPI · Cloud Functions', 'MongoDB · Firestore · Firebase Storage · AWS S3', 'RAG · LangChain · OpenAI', 'REST APIs · WebSockets · Figma API · OAuth · RBAC', 'Vitest · Firebase emulators · Playwright'],
  ai: ['React · Evidence and review interfaces', 'Python · FastAPI · Node.js', 'MongoDB · S3 · Vector stores', 'RAG · LangChain · Pinecone · FAISS', 'Ingestion · Intent routing · Citations', 'Evaluation · pytest · Human review'],
  backend: ['Typed clients · Admin workflows', 'Python · FastAPI · Node.js · Express', 'MongoDB · Redis · S3-compatible storage', 'AI-ready services · Retrieval APIs', 'REST · OpenAPI · MCP · Signed webhooks', 'Validation · Auth · Rate limiting · pytest'],
  data: ['React · Vue · Review dashboards', 'Python · SQL · FastAPI · PySpark', 'Snowflake · MongoDB · AWS Glue · Redshift', 'Entity resolution · Fuzzy matching', 'ETL layers · Figma imports · Scheduled ingestion', 'DQ checks · Reconciliation · Audit outputs'],
  frontend: ['React 18/19 · TypeScript · Three.js', 'Node.js · Express · Figma API integration', 'MongoDB · Firebase · Client state', 'Real-time widgets · Collaborative UI', 'Responsive systems · Forms · Auto-layout', 'Testing Library · Vitest · Playwright'],
  solutions: ['React · Vue · Workflow interfaces', 'Python · FastAPI · Node.js', 'Snowflake · MongoDB · AWS', 'RAG · Bedrock · Evidence extraction', 'Requirements · APIs · UAT · Handoffs', 'Decision logs · Human approval · Deployment'],
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
  sylk: {
    title: 'Sylk',
    category: 'Multi-tenant SaaS / Supply chain',
    role: 'Private organization product · 2025—Present',
    summaries: {
      general: 'A multi-tenant supply-chain product spanning organization onboarding, line-item shipments, fulfillment, tracking, file collaboration, and real-time messaging.',
      fullstack: 'A React 19 and TypeScript product backed by Firebase Auth, Firestore, Storage, Cloud Functions, responsive role-based workflows, real-time chat, testing, and Capacitor mobile support.',
      backend: 'A Firebase-backed multi-tenant system with organization-scoped Firestore and Storage rules, constrained fulfillment transitions, Cloud Functions, and emulator-tested authorization boundaries.',
      frontend: 'Role-aware React interfaces for retailer administrators, factory viewers, and staff across onboarding, shipment, fulfillment, tracking, files, chat, and responsive mobile workflows.',
    },
    flow: [['Problem', 'Retailers, factories, and staff need shared shipment visibility without exposing private organization data.'], ['Approach', 'Model organization-scoped roles and workflows from onboarding through fulfillment and tracking.'], ['Engineering', 'React 19, TypeScript, Firebase Auth, Firestore, Storage, Cloud Functions, and Capacitor.'], ['Outcome', 'A tested multi-tenant product with least-privilege rules, real-time collaboration, and mobile delivery support.']],
    tech: ['React 19', 'TypeScript', 'Firebase', 'Security rules', 'Playwright', 'Capacitor'],
    detailsTitle: 'Multi-tenancy, testing & mobile details',
    detailsIntro: 'The implementation separates organization and role boundaries at both the interface and Firebase security-rule layers while preserving collaborative shipment workflows.',
    bullets: ['Built organization onboarding, line-item shipments, fulfillment, tracking, file collaboration, and shipment-level real-time messaging.', 'Enforced organization isolation and least-privilege Firestore and Storage rules, including retailer-only financial data and constrained factory fulfillment updates.', 'Designed unit and component tests, emulator-backed security-rule tests, and Playwright journeys covering organization creation through shipment, fulfillment, and chat.'],
    links: [],
    sourceNote: 'Private organization code; source, deployments, customer data, and credentials are intentionally not published.',
    visual: '<div class="project-visual sylk-visual" aria-hidden="true"><div class="sylk-shell"><div class="sylk-top"><b>SYLK</b><span>synthetic workflow view</span><i>role scoped</i></div><div class="sylk-body"><aside><span class="active">Retailer admin</span><span>Factory viewer</span><span>Staff</span></aside><section><div class="sylk-shipment"><span>Demo shipment</span><b>In fulfillment</b></div><div class="sylk-lines"><p><i></i>Line-item materials <b>Ready</b></p><p><i></i>Factory updates <b>Scoped</b></p><p><i></i>Files and messages <b>Linked</b></p></div><div class="sylk-flow"><span>Created</span><i>→</i><span>Factory</span><i>→</i><span>Tracking</span></div></section></div></div></div>',
  },
  tech4good: {
    title: 'Tech4Good FigJam Toolkit',
    category: 'Collaborative tools / Figma platform',
    role: 'Tech4Good Lab · Collaborative work · Nearly 4,000 users',
    summaries: {
      general: 'A family of FigJam widgets and plugins for chat, polling, carousels, radar and Likert responses, text entry, and structured spreadsheet import and export across research and classroom workflows.',
      fullstack: 'TypeScript FigJam widgets and plugin integrations backed by Figma APIs, esbuild, React-oriented modules, Node.js services, and structured spreadsheet workflows with ExcelJS and SheetJS/XLSX.',
      frontend: 'Collaborative FigJam interfaces combining dynamic styling, auto-layout, chat, polling, carousels, radar and Likert responses, text entry, tooltips, and structured imports for nearly 4,000 users.',
      data: 'Research and classroom tooling that joins FigJam collaboration with structured spreadsheet import/export, message and poll logs, Python/Pandas analysis, SQL, and Power BI.',
    },
    flow: [['Problem', 'Research and classroom teams needed richer participation and structured data workflows inside a shared FigJam canvas.'], ['Approach', 'Build focused widgets for conversation, polling, visual response, text entry, and spreadsheet exchange.'], ['Engineering', 'TypeScript, Figma and FigJam APIs, esbuild, React-oriented modules, Node.js, ExcelJS, SheetJS/XLSX, Python, and Pandas.'], ['Outcome', 'A collaborative toolkit used by nearly 4,000 users across research and classroom workflows.']],
    tech: ['TypeScript', 'Figma API', 'FigJam widgets', 'Node.js', 'ExcelJS / XLSX', 'Python / Pandas'],
    detailsTitle: 'Widget system & data workflow details',
    detailsIntro: 'The toolkit combines collaborative interface modules with structured data movement and analysis while preserving the project’s collaborative research ownership.',
    bullets: ['Led collaborative FigJam tooling spanning chat, polling, carousel, radar, Likert, text-entry, tooltip, and structured spreadsheet import/export workflows.', 'Built TypeScript widgets and plugin integrations using Figma APIs, esbuild, dynamic styling, auto-layout, and React-oriented interface modules.', 'Connected spreadsheet and research workflows through ExcelJS, SheetJS/XLSX, Node.js services, Python, Pandas, SQL, and Power BI.'],
    links: [],
    sourceNote: 'Collaborative Tech4Good research/classroom work; private source and research records are not published.',
    visual: '<div class="project-visual figjam-tools-visual" aria-hidden="true"><div class="figjam-tools-shell"><div class="figjam-tools-top"><b>FIGJAM TOOLKIT</b><span>research + classroom collaboration</span><i>nearly 4,000 users</i></div><div class="figjam-tools-board"><section class="figjam-chat"><small>CHAT</small><p><i></i><span>Capture the idea</span></p><p><i></i><span>Build on it</span></p><p><i></i><span>Share the result</span></p></section><section class="figjam-poll"><small>POLL + LIKERT</small><b>Which direction?</b><p><span style="--vote:82%"></span></p><p><span style="--vote:58%"></span></p><div><i></i><i></i><i></i><i></i><i></i></div></section><section class="figjam-import"><small>STRUCTURED IMPORT</small><div><b>CSV</b><span>Question</span><span>Response</span><span>Theme</span></div><p>Import → canvas → export</p></section></div><div class="figjam-tools-foot"><span>Chat</span><span>Carousel</span><span>Radar</span><span>Text entry</span><span>XLSX</span></div></div></div>',
  },
  automation: {
    title: 'Human-in-the-Loop Job Operations',
    category: 'Agentic automation / Quality engineering',
    role: 'Private system · Generalized evidence only',
    summaries: {
      general: 'A privacy-aware operations system that maps job requirements to verified evidence, builds role-specific resumes, validates ATS and rendered output, and requires exact-document approval before submission.',
      ai: 'An evidence-first agentic workflow that separates fact validation, content selection, generation, ATS verification, visual QA, human approval, and consequential action into independent gates.',
      solutions: 'A requirements-to-delivery system with reproducible specifications, persistent state, duplicate prevention, truthful-answer validation, approval cards, and authoritative submission confirmation.',
    },
    flow: [['Problem', 'High-volume application work becomes inconsistent when evidence, documents, approvals, and status live in separate tools.'], ['Approach', 'Create a reproducible workflow with explicit quality gates and a persisted human decision before submission.'], ['Engineering', 'Node.js, Python/ReportLab, Gmail and Telegram integrations, Excel, JSONL event logs, and browser automation.'], ['Outcome', 'Job-specific specifications, one-page and ATS checks, rendered-PDF review, exact-document approval, and auditable state.']],
    tech: ['Node.js', 'Python', 'JSONL', 'Excel', 'Telegram', 'PDF QA'],
    detailsTitle: 'Orchestration, safeguards & validation',
    detailsIntro: 'The private system treats evidence validation, document generation, approval, and submission as separate verifiable steps instead of one opaque automation.',
    bullets: ['Designed a job-specific resume orchestration system that maps official role requirements to a verified evidence bank and creates reproducible JSON specifications.', 'Built a Python/ReportLab rendering pipeline with three-bullet enforcement, one-page overflow protection, ATS extraction checks, and PDF-to-image visual review.', 'Integrated dynamic resume generation with human-in-the-loop application automation, persistent request/decision/action logs, duplicate prevention, and exact-document verification before submission.'],
    links: [],
    sourceNote: 'Private system; application records, emails, approval data, credentials, and generated job-search artifacts are never published.',
    visual: '<div class="project-visual automation-visual" aria-hidden="true"><div class="automation-shell"><div class="automation-top"><b>APPLICATION OPS</b><span>auditable workflow</span></div><div class="automation-flow"><section><small>01</small><b>Verified evidence</b><span>fact sheet · job map</span></section><i>→</i><section><small>02</small><b>Dynamic résumé</b><span>ATS · render QA</span></section><i>→</i><section class="approval"><small>03</small><b>Human approval</b><span>exact document</span></section></div><div class="automation-status"><span>✓ truthful answers</span><span>✓ persisted decision</span><span>✓ submission evidence</span></div></div></div>',
  },
  mdm: {
    title: 'Healthcare Data Quality & MDM',
    category: 'Data engineering / Entity resolution',
    role: 'Anonymized employer case study · 327K+ / 67K+ records',
    summaries: {
      general: 'An anonymized healthcare-data case study covering Snowflake pipelines, layered ETL/MDM, provider and organization identifiers, entity resolution, reconciliation, and stewardship-ready evidence.',
      data: 'Snowflake and MDM work spanning 327K+ records, 67K+ entity matching, layered ingestion and canonical models, deterministic and scored rules, exception datasets, and audit-ready outputs.',
      solutions: 'A regulated-enterprise workflow that turns ambiguous data-quality questions into traceable matching rules, API-assisted lookups, review checkpoints, and business-readable evidence.',
      salesforce: 'Healthcare reference-data and CRM-adjacent quality work covering identifier presence, affiliations, address/license profiling, duplicate resolution, stewardship review, and publication controls.',
    },
    flow: [['Problem', 'Provider and organization records contained missing identifiers, duplicates, conflicting affiliations, and address or license inconsistencies.'], ['Approach', 'Layer ingestion, matching, canonicalization, exceptions, and stewardship review with traceable rules.'], ['Engineering', 'Snowflake SQL, NPI/DEA/HIN/340B/license signals, fuzzy matching, API lookups, manifests, and QC outputs.'], ['Outcome', 'Auditable input, canonical, exception, validation, and publication datasets across 327K+ and 67K+ record workflows.']],
    tech: ['Snowflake', 'SQL', 'ETL / MDM', 'Entity resolution', 'API lookups', 'Data quality'],
    detailsTitle: 'Matching, quality & stewardship details',
    detailsIntro: 'Only generalized architecture and approved scale are shown; client identity, source data, screenshots, workbooks, SQL, and internal endpoints remain private.',
    bullets: ['Profiled healthcare-provider and organization data to identify missing identifiers, duplicates, conflicting affiliations, and address or license quality issues.', 'Designed deterministic and scored rules for duplicate resolution, state and address selection, survivorship proposals, and stewardship review.', 'Built API-assisted lookup checkpoints and traceable input, output, exception, and validation datasets with business-readable summaries and review materials.'],
    links: [],
    sourceNote: 'Anonymized employer evidence; no client identity, private data, screenshots, SQL, or proprietary artifacts are published.',
    visual: '<div class="project-visual mdm-visual" aria-hidden="true"><div class="mdm-shell"><div class="mdm-top"><b>DATA QUALITY WORKBENCH</b><span>synthetic view</span></div><div class="mdm-metrics"><div><small>Profiled</small><strong>327K+</strong><span>records</span></div><div><small>Entity review</small><strong>67K+</strong><span>records</span></div><div><small>Quality controls</small><strong>Layered</strong><span>traceable review</span></div></div><div class="mdm-pipeline"><span>Landing</span><i>→</i><span>Staging</span><i>→</i><span>Canonical</span><i>→</i><span>Publish</span></div><div class="mdm-review"><p><i class="pass"></i>NPI + address match <b>accepted</b></p><p><i class="review"></i>License conflict <b>steward review</b></p></div></div></div>',
  },
  crm: {
    title: 'CRM Workflow & UAT Delivery',
    category: 'Business technology / Salesforce delivery',
    role: 'Anonymized employer case study · Private artifacts',
    summaries: {
      general: 'An anonymized delivery case study turning stakeholder meetings, CRM metadata, live application behavior, and regulated workflows into requirements, UAT evidence, user guides, and implementation-ready backlogs.',
      solutions: 'Requirements-to-delivery work spanning meeting synthesis, live-system validation, metadata inspection, acceptance criteria, UAT status, decision logs, executive communication, and technical handoffs.',
      frontend: 'React/Vite business-workflow interfaces for hierarchical plan records, approval and read-only states, executive summaries, barriers, tactics, validation, and review without exposing CRM data.',
      data: 'CRM and healthcare-data delivery connecting metadata, validation rules, source evidence, acceptance criteria, discrepancies, and traceable implementation status.',
      salesforce: 'Salesforce and CRM delivery across metadata and live-workflow validation, UAT and enhancement tracking, acceptance evidence, approval states, user guides, and executive-ready artifacts.',
    },
    flow: [['Problem', 'Stakeholder feedback, CRM configuration, live behavior, and implementation gaps were spread across meetings and artifacts.'], ['Approach', 'Synthesize requirements, inspect metadata, validate live workflows, and track every issue with acceptance evidence.'], ['Engineering', 'CRM metadata checks, UAT trackers, React/Vite review interfaces, mock adapters, validation rules, and structured documentation.'], ['Outcome', 'Prioritized backlogs, explicit blockers, user guides, decision logs, and implementation-ready technical handoffs.']],
    tech: ['CRM metadata', 'UAT', 'Acceptance criteria', 'React / Vite', 'Decision logs', 'User guides'],
    detailsTitle: 'Validation, UAT & handoff details',
    detailsIntro: 'This case study uses synthetic interface abstractions and generalized facts; it does not reproduce employer or client systems.',
    bullets: ['Synthesized meeting recordings and stakeholder feedback into structured requirements, completed-work summaries, open issues, owners, and timelines.', 'Inspected CRM metadata and live application behavior to validate fields, layouts, approval and read-only workflows, and implementation gaps.', 'Maintained UAT and enhancement trackers with acceptance criteria, evidence, prioritization, implementation status, user guides, and executive-ready communication.'],
    links: [],
    sourceNote: 'Anonymized employer evidence; no client identity, screenshots, transcripts, credentials, or private CRM artifacts are published.',
    visual: '<div class="project-visual crm-visual" aria-hidden="true"><div class="crm-shell"><div class="crm-top"><b>CRM DELIVERY</b><span>synthetic validation view</span></div><div class="crm-summary"><section><small>Approval state</small><strong>Ready for review</strong><span>read-only rules applied</span></section><section><small>UAT coverage</small><strong>Tracked</strong><span>acceptance evidence linked</span></section></div><div class="crm-board"><p><i class="done"></i><span>Field and layout validation</span><b>Verified</b></p><p><i class="active"></i><span>Workflow acceptance evidence</span><b>In review</b></p><p><i></i><span>User guide and handoff</span><b>Queued</b></p></div></div></div>',
  },
  filedrop: {
    title: 'Private Filedrop',
    category: 'Backend / AI-ready infrastructure',
    role: 'Public repository · Deployed on Render · 2026',
    summaries: {
      general: 'A secure file-exchange service for moving files between computers and AI sessions through browser uploads, APIs, MCP tools, versioning, and messages.',
      backend: 'A backend platform with authenticated REST and OpenAPI contracts, MCP tools, local and S3-compatible storage, migration tooling, version history, and signed webhooks.',
      solutions: 'A concrete workflow problem turned into a deployable bridge across browsers, computers, and AI clients—with human control, auditable state, and documented handoffs.',
    },
    flow: [['Problem', 'Cross-device and AI-session file handoffs were slow and easy to lose.'], ['Approach', 'Unify browser uploads, APIs, MCP tools, versioning, and messages.'], ['Engineering', 'Node.js, Express, OpenAPI, S3-compatible storage, validation, and HMAC webhooks.'], ['Outcome', 'A durable handoff layer with explicit boundaries between automation and human control.']],
    tech: ['Node.js', 'Express', 'AWS SDK', 'OpenAPI', 'MCP', 'HMAC'],
    detailsTitle: 'Architecture & security details',
    detailsIntro: 'The service exposes REST, OpenAPI, and MCP interfaces over local or S3-compatible storage, with shared mailboxes and channels for cross-session coordination.',
    bullets: ['Implemented categories, tags, project paths, file metadata, version history, unguessable downloads, and storage migration tooling.', 'Added password and API-key access, timing-safe credential checks, upload validation, rate limiting, and HMAC-SHA256 signed webhooks.', 'Documented browser, API, AI-client, cloud-storage, ChatGPT Action, MCP, and Render deployment workflows without publishing secrets or user data.'],
    links: [['View source', 'https://github.com/ashwinchembu/render-filedrop']],
    visual: '<div class="project-visual filedrop-visual" aria-hidden="true"><div class="drop-console"><div class="drop-top"><span>PRIVATE FILEDROP</span><b>secure</b></div><div class="drop-file"><i>PDF</i><div><b>product-brief.pdf</b><small>v4 · project/design</small></div><em>✓</em></div><div class="drop-file"><i>CSV</i><div><b>research-data.csv</b><small>tagged · 2 versions</small></div><em>✓</em></div><div class="drop-channel"><span>REST / OpenAPI</span><span>MCP tools</span><span>Signed webhooks</span></div></div><div class="drop-lock"><span></span><b>HMAC</b><small>signed webhooks</small></div></div>',
  },
  lume: {
    title: 'Lume',
    category: 'AI meeting intelligence / Full-stack product',
    role: 'Public repository · Dec 2025—Present',
    summaries: {
      general: 'A full-stack meeting intelligence platform for capturing, storing, searching, and querying meetings and uploaded project files with reusable context.',
      fullstack: 'An end-to-end React and Node/Express product connecting MongoDB, AWS S3, WebSockets, transcription, search, task extraction, and responsive project workflows.',
      ai: 'A retrieval-grounded product with vector embeddings, intent routing, evidence extraction, citations, transcript-aware search, and multi-pass generator/critic refinement.',
      backend: 'A Node/Express, MongoDB, S3, and WebSocket system for durable meeting ingestion, real-time updates, project-scoped retrieval, and document-backed answers.',
      frontend: 'A responsive React experience for transcripts, live updates, project context, task extraction, semantic search, and source-backed answer exploration.',
      solutions: 'A product built around a common team failure mode: context disappearing across meetings and files, then recovered through reusable project memory and traceable answers.',
    },
    flow: [['Problem', 'Decisions and context disappear across meetings and files.'], ['Approach', 'Build reusable Project Brain memory around retrieval and evidence.'], ['Engineering', 'React, Node/Express, MongoDB, S3, WebSockets, vector embeddings, and RAG.'], ['Outcome', 'Searchable context, extracted tasks, document-grounded responses, and cited answers.']],
    tech: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'WebSockets', 'RAG'],
    detailsTitle: 'Architecture & product details',
    detailsIntro: 'The React client and Node/Express services capture, store, and query meeting content through MongoDB, AWS S3, vector retrieval, and live WebSocket updates.',
    bullets: ['Built a RAG question-answering flow with vector embeddings, intent routing, evidence extraction, and multi-pass generator/critic refinement.', 'Modeled reusable Project Brain knowledge bases that learn project-specific language and relationships from transcripts, files, and seeded context.', 'Designed transcript-aware search and citation-backed answers so useful outputs remain traceable to meetings and source documents.'],
    links: [['Open preview', 'https://lume-app.onrender.com'], ['View source', 'https://github.com/ashwinchembu/work-helper']],
    visual: '<div class="project-visual lume-visual" aria-hidden="true"><div class="product-window lume-window"><div class="product-topbar"><div><span></span><span></span><span></span></div><b>LUME</b><small>Project Brain · RAG</small></div><div class="lume-layout"><aside class="meeting-panel"><p>Design review</p><small>24:18 · 4 people</small><div class="waveform"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="speaker"><b>AC</b><span><i></i><i></i></span></div></aside><div class="brain-panel"><p class="brain-label">Ask across this project</p><h4>What decision did we make about onboarding?</h4><div class="context-map"><span>Meeting 12</span><i></i><span>Onboarding</span><i></i><span>Brief.pdf</span></div><div class="ai-answer"><span>✦</span><p>The team chose a guided setup with progressive disclosure, starting with document import.</p></div><div class="citation-row"><span>Transcript · 18:42</span><span>Brief.pdf · p.3</span></div></div></div></div></div>',
  },
  forge: {
    title: 'Forge',
    category: 'Data integration / Backend APIs',
    role: 'Public repository · Personal fitness intelligence · 2026',
    summaries: {
      general: 'A personal fitness-intelligence backend that unifies strength training, nutrition, sleep, heart-rate, and recovery data into program-aware analysis.',
      backend: 'A FastAPI and MongoDB Atlas service with Hevy and Oura integrations, Apple Health webhooks, six-hour scheduled synchronization, on-demand refresh, and CSV ingestion.',
      data: 'A multi-source data pipeline that normalizes training, nutrition, sleep, heart-rate, and recovery signals before comparing them with a structured 12-week program.',
    },
    flow: [['Problem', 'Training, nutrition, recovery, and health signals lived in separate systems.'], ['Approach', 'Normalize source data and compare it with a structured hypertrophy plan.'], ['Engineering', 'FastAPI, MongoDB Atlas, APIs, webhooks, scheduled sync, and CSV ingestion.'], ['Outcome', 'Daily and weekly views of adherence, nutrition compliance, recovery quality, and next actions.']],
    tech: ['Python', 'FastAPI', 'MongoDB Atlas', 'Webhooks', 'Scheduled sync', 'Render'],
    detailsTitle: 'Data pipeline & analysis details',
    detailsIntro: 'Forge unifies Hevy, Oura, MyFitnessPal-derived Apple Health data, and Health Auto Export webhooks without publishing personal records or credentials.',
    bullets: ['Implemented six-hour synchronization, on-demand refresh, health-data webhooks, and CSV ingestion workflows.', 'Modeled workouts, nutrition, sleep, heart-rate, recovery, and body metrics in MongoDB for daily and weekly analysis.', 'Built an analysis engine that compares actual performance with a 12-week hypertrophy plan and scores workout adherence, nutrition compliance, and recovery quality.'],
    links: [['View source', 'https://github.com/ashwinchembu/forge']],
    visual: '<div class="project-visual forge-visual" aria-hidden="true"><div class="forge-shell"><div class="forge-top"><b>FORGE</b><span>daily intelligence</span><i>synced</i></div><div class="forge-score"><span>Today</span><strong>84</strong><small>program alignment</small></div><div class="forge-signals"><div><span>Workout</span><b>hit</b><i style="--fill:88%"></i></div><div><span>Nutrition</span><b>close</b><i style="--fill:72%"></i></div><div><span>Recovery</span><b>ready</b><i style="--fill:81%"></i></div></div><div class="forge-flow"><span>Hevy</span><i>→</i><span>Apple Health</span><i>→</i><span>Oura</span><b>FastAPI + MongoDB</b></div></div></div>',
  },
  educationai: {
    title: 'Tallyrus + AbleGrade',
    category: 'Education AI / Product engineering',
    role: 'Tallyrus founder product · AbleGrade co-built at HackDavis 2024',
    summaries: {
      general: 'Two clearly attributed education-AI builds: the ongoing Tallyrus essay-feedback product and AbleGrade, a separate HackDavis collaboration for ESL writing support.',
      fullstack: 'Two full-stack education workflows spanning React, TypeScript, Express, Flask, MongoDB, S3, OAuth, protected routes, PDF parsing, and educator-facing feedback interfaces.',
      ai: 'Two practical writing-feedback systems combining educator-defined rubrics, retrieval-augmented grading, LangChain, Pinecone, OpenAI, GPT-4, PDF parsing, and human review.',
      solutions: 'Product work shaped around educator and learner workflows, including user testing, rubric design, iterative feedback, fundraising, and a separately attributed hackathon collaboration.',
    },
    flow: [['Problem', 'Educators and language learners need timely feedback without losing rubric consistency.'], ['Approach', 'Build two distinct, clearly attributed tools around feedback, review, and progress.'], ['Engineering', 'Python, LangChain, Pinecone, Flask, MongoDB, S3, MERN, GPT-4, and PDF parsing.'], ['Outcome', 'Tallyrus raised five figures for continued development; AbleGrade demonstrated actionable ESL writing support.']],
    tech: ['Python', 'LangChain', 'Pinecone', 'React', 'MongoDB', 'GPT-4'],
    detailsTitle: 'Product, AI & attribution details',
    detailsIntro: 'Tallyrus and AbleGrade address related education problems but are separate projects with different ownership and timelines.',
    bullets: ['Founded and led Tallyrus, building RAG-style essay feedback, educator-defined rubric workflows, Flask and MongoDB services, S3 storage, React interfaces, and secure Express application flows.', 'Led Tallyrus product planning, educator feedback, user testing, iterative delivery, and fundraising, raising five figures for product development.', 'Co-built AbleGrade with Gautham Pandian at HackDavis 2024 using the MERN stack and GPT-4 for ESL feedback, progress tracking, PDF upload, and parsing.'],
    links: [['Visit Tallyrus', 'https://tallyrus.com']],
    sourceNote: 'Tallyrus and AbleGrade repositories are private; no GitHub source link is published.',
    visual: '<div class="project-visual education-ai-visual" aria-hidden="true"><div class="education-split"><section><span>Founder product · Ongoing</span><b>Tallyrus</b><p>Rubric-grounded essay feedback</p><div><i>RAG</i><i>Pinecone</i><i>Review</i></div></section><section><span>Co-built · HackDavis 2024</span><b>AbleGrade</b><p>ESL writing support and progress</p><div><i>GPT-4</i><i>PDF</i><i>MERN</i></div></section></div><div class="education-loop"><span>Writing</span><i>→</i><span>Evidence + rubric</span><i>→</i><span>Actionable feedback</span></div></div>',
  },
  commerce: {
    title: '3D Commerce Experience',
    category: 'Frontend / Interactive product UI',
    role: 'Public repository · Figma-originated UI prototype',
    summaries: {
      general: 'An interactive varsity-jacket storefront with product discovery, cart, checkout, account, search, content pages, and a responsive Three.js configurator.',
      fullstack: 'A React and TypeScript commerce product connecting reusable components, navigation, cart and checkout flows, account pages, and a Three.js product builder.',
      frontend: 'A responsive component system and GLB/Draco-powered Three.js configurator with independent garment, color, material, and placement controls.',
    },
    flow: [['Problem', 'Static product pages cannot explain a highly configurable garment.'], ['Approach', 'Combine familiar commerce flows with an interactive 3D builder.'], ['Engineering', 'React, TypeScript, Three.js, GLB assets, Draco decoding, Tailwind, Radix UI, and Material UI.'], ['Outcome', 'A production-build-verified storefront with reusable responsive components and detailed configuration controls.']],
    tech: ['React', 'TypeScript', 'Three.js', 'Vite', 'Tailwind', 'Radix UI'],
    detailsTitle: '3D interaction & interface details',
    detailsIntro: 'The prototype covers both the broader shopping journey and the specialized interaction needed to configure a varsity jacket.',
    bullets: ['Built product discovery, cart, checkout, account, search, and content pages as reusable responsive flows.', 'Developed a Three.js product builder using GLB assets and Draco decoding.', 'Implemented independent garment customization, color configuration, placement adjustments, modals, product cards, navigation, and consent flows.'],
    links: [['Open preview', 'https://ecommerce-website-design.onrender.com/jacket-builder'], ['View source', 'https://github.com/ashwinchembu/E-commerceWebsiteDesign']],
    sourceNote: 'Interface concept originated in Figma; implementation and repository evidence are linked.',
    visual: '<div class="project-visual commerce-visual" aria-hidden="true"><div class="commerce-window"><div class="commerce-top"><span>VARSITY LAB</span><b>3D BUILDER</b></div><div class="commerce-body"><div class="jacket-stage"><div class="jacket"><span class="sleeve left"></span><span class="sleeve right"></span><span class="jacket-body"></span><i>AC</i></div><small>Drag to rotate · GLB + Draco</small></div><div class="customizer"><p>Build your jacket</p><label>Body color</label><div class="swatches"><i></i><i></i><i></i><i></i></div><label>Sleeves</label><div class="swatches alt"><i></i><i></i><i></i></div><span class="config-button">Apply configuration</span></div></div></div></div>',
  },
  dashboard: {
    title: 'Enterprise Healthcare Dashboard',
    category: 'Frontend / Healthcare workflow design',
    role: 'Public repository · Figma-originated UI prototype',
    summaries: {
      general: 'A reusable dashboard prototype for healthcare account hierarchies, trial progress, follow-ups, barriers, site progression, tasks, and detail workflows.',
      data: 'A data-dense review surface that translates account hierarchy, progress metrics, trials, follow-ups, barriers, and site progression into scannable operational context.',
      frontend: 'A React/TypeScript and Vue interface system with metric cards, hierarchy views, progress steppers, follow-up queues, barrier summaries, and detail and edit modals.',
    },
    flow: [['Problem', 'Complex healthcare account and trial workflows are difficult to scan and act on.'], ['Approach', 'Turn hierarchy, progress, follow-up, and barrier data into reusable interface patterns.'], ['Engineering', 'React, TypeScript, Vue, Vite, Tailwind, metric cards, steppers, queues, and modals.'], ['Outcome', 'A component-based prototype suitable for stakeholder demos and workflow validation.']],
    tech: ['React', 'TypeScript', 'Vue', 'Vite', 'Tailwind', 'UI systems'],
    detailsTitle: 'Workflow & component details',
    detailsIntro: 'The prototype explores how dense healthcare operations data can become a coherent decision surface without publishing any private employer or client material.',
    bullets: ['Designed account hierarchy, progress metrics, ongoing trial, pending follow-up, AI-barrier, and site-progression views.', 'Built reusable metric cards, progress steppers, task queues, barrier summaries, trial-detail modals, and editing patterns.', 'Implemented the design in both React/TypeScript and Vue to validate reusable component structure.'],
    links: [['View source', 'https://github.com/ashwinchembu/Enterprisehealthcaredashboarddesign']],
    sourceNote: 'Synthetic Figma-originated prototype; no employer/client data or screenshots are published.',
    visual: '<div class="project-visual dashboard-visual" aria-hidden="true"><div class="dashboard-shell"><div class="dashboard-top"><b>ACCOUNT INTELLIGENCE</b><span>Trial portfolio · Q3</span></div><div class="dashboard-metrics"><div><small>Active sites</small><strong>18</strong></div><div><small>Follow-ups</small><strong>07</strong></div><div><small>Progress</small><strong>72%</strong></div></div><div class="dashboard-main"><div class="dashboard-steps"><span class="done">Account</span><span class="done">Trial</span><span class="active">Site</span><span>Review</span></div><div class="dashboard-queue"><p><i></i>Enrollment barrier review <b>Today</b></p><p><i></i>Site document follow-up <b>2d</b></p><p><i></i>Account hierarchy update <b>4d</b></p></div></div></div></div>',
  },
  ragpoc: {
    title: 'Azure RAG Document Search',
    category: 'Applied AI / Retrieval prototype',
    role: 'Public repository · 30+ document corpus',
    summaries: {
      general: 'A document-search proof of concept with multi-format loading, chunking, Azure OpenAI embeddings, FAISS retrieval, source citation, and interactive Q&A.',
      ai: 'A focused RAG implementation showing the complete path from PDF, TXT, and Markdown ingestion through chunking, embeddings, FAISS similarity search, retrieval, citations, and chat answers.',
    },
    flow: [['Problem', 'Teams need grounded answers across a mixed-format document corpus.'], ['Approach', 'Create a local vector index with retrievable chunks and cited sources.'], ['Engineering', 'Python, LangChain, Azure OpenAI embeddings and chat deployments, FAISS, and notebook workflows.'], ['Outcome', 'Interactive Q&A with source citation across a documented corpus of 30+ files.']],
    tech: ['Python', 'Azure OpenAI', 'LangChain', 'FAISS', 'Embeddings', 'PDF ingestion'],
    detailsTitle: 'Retrieval pipeline details',
    detailsIntro: 'The proof of concept isolates the mechanics of a grounded document-search pipeline so each ingestion and retrieval step is visible and inspectable.',
    bullets: ['Loaded PDF, TXT, and Markdown sources, then chunked text for embedding and retrieval.', 'Built a FAISS similarity index with Azure OpenAI embeddings and interactive Q&A.', 'Returned source citations and documented configuration for separate Azure embedding and chat-model deployments.'],
    links: [['View source', 'https://github.com/ashwinchembu/RAGpoc']],
    visual: '<div class="project-visual rag-visual" aria-hidden="true"><div class="rag-shell"><div class="rag-docs"><span>PDF</span><span>TXT</span><span>MD</span></div><i>→</i><div class="rag-stage"><b>CHUNKS</b><small>embed · index</small></div><i>→</i><div class="rag-stage accent"><b>FAISS</b><small>similarity search</small></div><i>→</i><div class="rag-answer"><span>Answer</span><p>Grounded in the retrieved document context.</p><small>Source · page 3</small></div></div></div>',
  },
  novasonic: {
    title: 'Nova Sonic Voice & Data Assistant',
    category: 'Voice AI / AWS data integration',
    role: 'Public repository · Real-time browser and iPad clients',
    summaries: {
      general: 'A real-time voice assistant integrating AWS Nova Sonic and Bedrock with WebSocket sessions, Vue interfaces, call analysis, cloud data tools, and mobile-browser recovery.',
      data: 'A voice-and-data workflow connecting live sessions and structured tool use with S3 uploads, AWS Glue refreshes, Redshift-oriented adapters, Python data pipelines, and observable status interfaces.',
      solutions: 'A customer-facing AI demo surface combining real-time audio, transcripts, tool logs, call history, database status, prompt and session management, deployment, and mobile recovery documentation.',
    },
    flow: [['Problem', 'Voice interactions need real-time feedback and dependable access to structured data tools.'], ['Approach', 'Join bidirectional audio sessions with visible transcripts, tool logs, history, and cloud refresh controls.'], ['Engineering', 'Node.js, Vue, WebSockets, AWS Bedrock/Nova Sonic, S3, Glue, Redshift, and Python pipelines.'], ['Outcome', 'A browser and iPad-ready assistant with observable voice, tool, and data workflows.']],
    tech: ['Node.js', 'Vue', 'WebSockets', 'AWS Bedrock', 'S3', 'Glue'],
    detailsTitle: 'Voice session & data workflow details',
    detailsIntro: 'The public repository combines real-time voice interaction with data-oriented tooling and operational interfaces for demos and debugging.',
    bullets: ['Built WebSocket session management and browser/iPad interfaces for AWS Nova Sonic and Bedrock voice interaction.', 'Created audio visualization, transcript, tool-log, call-history, database-status, and structured JSON inspection views.', 'Integrated call-recording analysis, prompt and session management, S3 upload, AWS Glue refresh, cloud adapters, deployment, and mobile-browser recovery documentation.'],
    links: [['View source', 'https://github.com/ashwinchembu/wokring-novasonic-demo']],
    sourceNote: 'Public demo repository; enterprise-oriented implementation context should be reviewed before reuse.',
    visual: '<div class="project-visual voice-visual" aria-hidden="true"><div class="voice-shell"><div class="voice-top"><b>NOVA SONIC</b><span>live · websocket</span></div><div class="voice-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="voice-transcript"><span>USER</span><p>Show the latest account signals.</p><span>ASSISTANT</span><p>I found the data refresh and summarized the result.</p></div><div class="voice-tools"><span>S3 upload</span><span>Glue refresh</span><span>Database status</span></div></div></div>',
  },
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
}

function syncPreferenceForm(preferences) {
  if (!preferenceForm || !preferences) return;
  const audienceInput = preferenceForm.querySelector(`input[name="audience"][value="${preferences.audience}"]`);
  const roleInput = preferenceForm.querySelector(`input[name="role"][value="${preferences.role}"]`);
  if (audienceInput) audienceInput.checked = true;
  if (roleInput) roleInput.checked = true;
  updatePreferenceButton();
}

function renderProjectShowcase(role, audienceKey) {
  const selected = roleProjectSelections[role] || roleProjectSelections.general;
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
    slot.setAttribute('aria-labelledby', `${projectKey}-title`);
    slot.innerHTML = `${project.visual}<div class="project-copy"><p class="project-index">0${index + 1} · ${project.category} <span class="role-match-badge">${badge}</span></p><h3 id="${projectKey}-title">${project.title}</h3><p class="project-role">${project.role}</p><p class="project-summary">${summary}</p><div class="${flowClass}" aria-label="${project.title} case study summary">${flow}</div><div class="tech-list">${tech}</div><details class="project-more"><summary>${project.detailsTitle}</summary><div class="project-more-body"><p>${project.detailsIntro}</p><ul>${bullets}</ul></div></details><div class="project-links">${links}</div>${sourceNote}</div>`;
  });

  if (projectShowcase) projectShowcase.setAttribute('aria-label', `Three projects selected for the ${rolePresets[role]?.short || 'general'} view`);

  document.querySelectorAll('#support-grid [data-project]').forEach((card) => {
    const isFeatured = selected.includes(card.dataset.project);
    card.hidden = isFeatured;
    card.classList.toggle('role-match', !isFeatured && (rolePresets[role]?.matches || []).includes(card.dataset.project));
  });

  if (supportingWorkHeading) {
    supportingWorkHeading.textContent = `More verified work beyond the ${rolePresets[role]?.short || 'general'} view.`;
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
    heroEyebrow.replaceChildren(dot, document.createTextNode(` ${audience.eyebrow} · Bay Area · ${preset.eyebrow}`));
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
setTheme(savedTheme || 'dark');

const savedPreferences = getStoredPreferences();
if (savedPreferences) {
  applyPreferences(savedPreferences);
  if (preferenceGate) preferenceGate.hidden = true;
  document.documentElement.removeAttribute('data-preference-pending');
  document.documentElement.dataset.preferenceSaved = 'true';
  preferenceGate?.setAttribute('aria-hidden', 'true');
} else {
  if (preferenceGate) preferenceGate.hidden = false;
  document.documentElement.removeAttribute('data-preference-saved');
  document.documentElement.removeAttribute('data-preference-pending');
  setPageInert(true);
  window.requestAnimationFrame(() => preferenceForm?.querySelector('input')?.focus());
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

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
