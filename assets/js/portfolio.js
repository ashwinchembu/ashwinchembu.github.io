const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');

const PREFERENCE_KEY = 'portfolio-preferences-v1';

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
    workIntro: 'Three public, inspectable projects spanning secure handoffs, retrieval-grounded product work, and personal data integration.',
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
    workIntro: 'Inspect public systems that connect interfaces, backend services, data stores, real-time updates, integrations, testing, and deployment.',
    experienceHeading: 'Engineering across the stack.',
    experienceIntro: 'Product delivery spanning React, Python, Node.js, APIs, cloud services, data workflows, and stakeholder needs.',
    about: 'I’m a UC Davis computer science graduate who likes owning the path from an ambiguous product need to a tested interface, service, data model, and deployment.',
    chips: ['React', 'TypeScript', 'FastAPI'],
    matches: ['filedrop', 'lume', 'forge', 'commerce'],
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
    matches: ['lume', 'filedrop'],
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
    workIntro: 'Inspect services built around secure APIs, storage, versioning, webhooks, AI-client integrations, real-time events, and deployment.',
    experienceHeading: 'Services, integrations, and data foundations.',
    experienceIntro: 'Backend delivery spanning enterprise AI services, cloud APIs, document workflows, Snowflake pipelines, and quality-controlled integrations.',
    about: 'I’m a UC Davis computer science graduate who enjoys designing the contracts and safeguards behind useful products: APIs, data models, integrations, storage, and tests.',
    chips: ['Python', 'REST APIs', 'AWS'],
    matches: ['filedrop', 'forge', 'lume'],
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
    workIntro: 'Public systems showing scheduled ingestion, document search, structured storage, API integration, and workflows that turn complex information into useful context.',
    experienceHeading: 'Data systems built for trust.',
    experienceIntro: 'Snowflake, layered ETL/MDM, identifier matching, reconciliation, data-quality controls, and stakeholder-ready evidence across healthcare technology programs.',
    about: 'I’m a UC Davis computer science graduate who likes turning messy records and ambiguous business rules into traceable pipelines, quality checks, reconciliation logic, and useful review workflows.',
    chips: ['Snowflake', 'ETL / MDM', 'Data quality'],
    matches: ['forge', 'lume'],
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
    workIntro: 'Explore responsive product interfaces spanning meeting intelligence and clearly labeled Figma-originated commerce and healthcare dashboard prototypes.',
    experienceHeading: 'Frontend work grounded in real workflows.',
    experienceIntro: 'Building React interfaces and collaborative tools around enterprise data, educator feedback, and research and classroom workflows.',
    about: 'I’m a UC Davis computer science graduate who enjoys translating complicated workflows into responsive interfaces that feel direct, coherent, and worth using.',
    chips: ['React', 'TypeScript', 'Three.js'],
    matches: ['lume', 'commerce', 'dashboard'],
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
    workIntro: 'See products built from concrete user problems: meeting context, secure cross-device handoffs, and fragmented personal-data workflows.',
    experienceHeading: 'From requirements to reliable delivery.',
    experienceIntro: 'Converting stakeholder feedback into rules, integrations, UAT items, decision logs, working software, and implementation-ready artifacts.',
    about: 'I’m a UC Davis computer science graduate who likes entering ambiguous problem spaces, learning the workflow quickly, and leaving behind software and documentation people can actually use.',
    chips: ['Integrations', 'UAT', 'Delivery'],
    matches: ['filedrop', 'lume', 'forge'],
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

  document.querySelectorAll('[data-project]').forEach((project) => {
    const matches = preset.matches.includes(project.dataset.project);
    project.classList.toggle('role-match', matches);
    const badge = project.querySelector('.role-match-badge');
    if (badge) badge.hidden = !matches;
  });

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
