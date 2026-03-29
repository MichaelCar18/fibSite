'use strict';

// ── Job Data ────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 'spec-agent-a',
    title: 'Special Agent',
    division: 'field',
    divisionLabel: 'Field Operations',
    location: 'Los Santos, SA',
    salary: '$68,000 – $92,000 / yr',
    clearance: 'Top Secret / SCI',
    badge: 'urgent',
    badgeLabel: 'Urgent Hire',
    series: 'FIB-1811 | Full-Time | Permanent',
    desc: 'Conduct undercover investigations into organized crime, terrorism, and unsanctioned heist activity in the greater Los Santos area. Must be comfortable operating in hostile environments and maintaining cover identities for extended periods.'
  },
  {
    id: 'fin-analyst',
    title: 'Financial Crimes Analyst',
    division: 'finance',
    divisionLabel: 'Financial Crimes Unit',
    location: 'Los Santos, SA',
    salary: '$54,000 – $78,000 / yr',
    clearance: 'Secret',
    badge: 'open',
    badgeLabel: 'Open',
    series: 'FIB-1801 | Full-Time | Permanent',
    desc: 'Analyze financial records, trace laundered funds through shell corporations, and build prosecutable cases against money laundering operations. Familiarity with offshore banking in Cayman, Vespucci Beach, or Maze Bank is a plus.'
  },
  {
    id: 'intel-analyst',
    title: 'Intelligence Analyst',
    division: 'intel',
    divisionLabel: 'Intelligence Division',
    location: 'Los Santos, SA (Classified Annex)',
    salary: '$60,000 – $85,000 / yr',
    clearance: 'Top Secret / SCI',
    badge: 'senior',
    badgeLabel: 'Senior Level',
    series: 'FIB-0132 | Full-Time | Permanent',
    desc: 'Produce all-source intelligence assessments supporting FIB field operations. Synthesize HUMINT, SIGINT, and surveillance data into actionable briefs. Prior IAA experience may be considered on a case-by-case basis.'
  },
  {
    id: 'cyber-spec',
    title: 'Cybercrime Specialist',
    division: 'tech',
    divisionLabel: 'Cyber Division',
    location: 'Los Santos, SA',
    salary: '$72,000 – $105,000 / yr',
    clearance: 'Top Secret',
    badge: 'urgent',
    badgeLabel: 'Urgent Hire',
    series: 'FIB-2210 | Full-Time | Permanent',
    desc: 'Investigate digital intrusions, ransomware attacks, and cryptocurrency fraud. Conduct forensic analysis of seized devices. Must be proficient in at least three programming languages. Applicants who have previously hacked FIB systems will be disqualified and/or recruited.'
  },
  {
    id: 'surveillance-tech',
    title: 'Surveillance Technician',
    division: 'field',
    divisionLabel: 'Field Operations',
    location: 'Los Santos / Blaine County, SA',
    salary: '$48,000 – $63,000 / yr',
    clearance: 'Secret',
    badge: 'open',
    badgeLabel: 'Open',
    series: 'FIB-0856 | Full-Time | Permanent',
    desc: 'Install, maintain, and monitor surveillance equipment across designated observation posts. Experience with long-range optical systems, unmarked vehicle operations, and discretely following persons of interest in busy pedestrian areas required.'
  },
  {
    id: 'admin-officer',
    title: 'Administrative Officer',
    division: 'admin',
    divisionLabel: 'Administration',
    location: 'Los Santos, SA',
    salary: '$42,000 – $55,000 / yr',
    clearance: 'Confidential',
    badge: 'open',
    badgeLabel: 'Open',
    series: 'FIB-0341 | Full-Time | Permanent',
    desc: 'Provide administrative support for FIB field operations including scheduling, document management, requisition processing, and coordinating helicopter transport. Discretion is mandatory. You will see things. You will not discuss them.'
  },
  {
    id: 'forensic-accountant',
    title: 'Forensic Accountant',
    division: 'finance',
    divisionLabel: 'Financial Crimes Unit',
    location: 'Los Santos, SA',
    salary: '$65,000 – $90,000 / yr',
    clearance: 'Secret',
    badge: 'senior',
    badgeLabel: 'Senior Level',
    series: 'FIB-0510 | Full-Time | Permanent',
    desc: 'Trace financial flows linked to drug trafficking, arms dealing, and Merryweather Securities off-book contracts. CPA license preferred. Must be comfortable testifying in federal court while maintaining a low public profile.'
  },
  {
    id: 'tactical-team',
    title: 'Tactical Response Officer',
    division: 'field',
    divisionLabel: 'Field Operations',
    location: 'Los Santos, SA (Mobile)',
    salary: '$58,000 – $80,000 / yr',
    clearance: 'Top Secret',
    badge: 'urgent',
    badgeLabel: 'Urgent Hire',
    series: 'FIB-0083 | Full-Time | Permanent',
    desc: 'Serve as a member of the FIB Tactical Response Unit, executing high-risk warrants, hostage rescue operations, and containment of extraordinary threats. Combat experience, tactical driving certification, and tolerance for classified incidents required.'
  }
];

// ── Router ────────────────────────────────────────────────────────────────────
const VIEWS = ['home', 'about', 'benefits', 'contact'];

const HASH_MAP = {
  '':          'home',
  '#listings': 'home',
  '#home':     'home',
  '#about':    'about',
  '#benefits': 'benefits',
  '#contact':  'contact',
};

function getViewFromHash() {
  return HASH_MAP[window.location.hash] || 'home';
}

function navigate(view, pushState = true) {
  if (!VIEWS.includes(view)) view = 'home';

  // Update views
  VIEWS.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.hidden = (v !== view);
    if (v === view && el) {
      el.classList.remove('view-enter');
      // force reflow for re-trigger
      void el.offsetWidth;
      el.classList.add('view-enter');
    }
  });

  // Update nav active state
  document.querySelectorAll('.top-nav a, .footer-links a').forEach(a => {
    const linkView = a.dataset.view;
    a.classList.toggle('active', linkView === view);
  });

  // Update hash without triggering hashchange loop
  const hashMap = { home: '#listings', about: '#about', benefits: '#benefits', contact: '#contact' };
  if (pushState) {
    history.pushState({ view }, '', hashMap[view] || '#listings');
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Handle nav clicks (header, footer, hero CTAs)
document.addEventListener('click', e => {
  const link = e.target.closest('[data-view]');
  if (!link) return;
  e.preventDefault();
  navigate(link.dataset.view);
});

// Logo click → home
document.querySelector('.agency-logo').addEventListener('click', () => navigate('home'));

// Browser back/forward
window.addEventListener('popstate', e => {
  navigate(e.state?.view || getViewFromHash(), false);
});

// Initial load from URL
navigate(getViewFromHash(), false);

// ── Utility ───────────────────────────────────────────────────────────────────
function genRef() {
  return 'FIB-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 9000 + 1000);
}

function setDate() {
  const d = new Date();
  const el = document.getElementById('update-date');
  if (el) el.textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Render Cards ──────────────────────────────────────────────────────────────
function renderCards(jobs) {
  const grid = document.getElementById('job-grid');
  document.getElementById('job-count').textContent = jobs.length;
  grid.innerHTML = '';

  if (jobs.length === 0) {
    grid.innerHTML = '<p style="font-family:Arial,sans-serif;color:#666;padding:1rem 0;">No positions match the selected filter.</p>';
    return;
  }

  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <div class="job-card-header">
        <div class="job-title">${job.title}</div>
        <span class="job-badge badge-${job.badge}">${job.badgeLabel}</span>
      </div>
      <div class="job-meta">
        <span class="meta-division">${job.divisionLabel}</span>
        <span class="meta-location">${job.location}</span>
        <span class="meta-salary">${job.salary}</span>
        <span class="meta-clearance">Clearance: ${job.clearance}</span>
      </div>
      <p class="job-desc">${job.desc}</p>
      <button class="apply-btn" data-id="${job.id}">Apply Now</button>
    `;
    grid.appendChild(card);
  });
}

// ── Modal ─────────────────────────────────────────────────────────────────────
const overlay  = document.getElementById('modal-overlay');
const formView = document.getElementById('form-view');
const tyView   = document.getElementById('thankyou-view');
const form     = document.getElementById('app-form');
let currentJob = null;

function openModal(job) {
  currentJob = job;
  document.getElementById('modal-title').textContent = job.title;
  document.getElementById('modal-series').textContent = job.series;
  formView.hidden = false;
  tyView.hidden   = true;
  form.reset();
  clearValidation();
  overlay.classList.add('open');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentJob = null;
}

function clearValidation() {
  overlay.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  overlay.querySelectorAll('.disclosure-item').forEach(el => el.style.borderColor = '');
}

function validateForm() {
  let valid = true;
  form.querySelectorAll('[required]').forEach(el => {
    if (el.type === 'radio') return;
    if (!el.value.trim()) { el.classList.add('invalid'); valid = false; }
    else el.classList.remove('invalid');
  });
  ['q1', 'q2', 'q3'].forEach(name => {
    const group = form.querySelectorAll(`input[name="${name}"]`);
    const checked = Array.from(group).some(r => r.checked);
    if (!checked) { valid = false; group[0].closest('.disclosure-item').style.borderColor = 'var(--red)'; }
    else group[0].closest('.disclosure-item').style.borderColor = '';
  });
  return valid;
}

document.getElementById('job-grid').addEventListener('click', e => {
  if (e.target.matches('.apply-btn')) {
    const job = JOBS.find(j => j.id === e.target.dataset.id);
    if (job) openModal(job);
  }
});

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!validateForm()) return;

  const ref = genRef();
  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting…';

  const payload = {
    ref,
    position:     currentJob.title,
    firstName:    document.getElementById('f-first').value.trim(),
    lastName:     document.getElementById('f-last').value.trim(),
    dob:          document.getElementById('f-dob').value,
    ssn:          document.getElementById('f-ssn').value.trim(),
    address:      document.getElementById('f-address').value.trim(),
    phone:        document.getElementById('f-phone').value.trim(),
    email:        document.getElementById('f-email').value.trim(),
    education:    document.getElementById('f-edu').value,
    experience:   document.getElementById('f-exp').value,
    prevEmployer: document.getElementById('f-prev').value.trim(),
    whyFib:       document.getElementById('f-why').value.trim(),
    q1: form.querySelector('input[name="q1"]:checked')?.value,
    q2: form.querySelector('input[name="q2"]:checked')?.value,
    q3: form.querySelector('input[name="q3"]:checked')?.value,
  };

  await submitToSupabase(payload);

  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit Application';

  formView.hidden = true;
  tyView.hidden   = false;
  document.getElementById('ty-position').textContent = currentJob.title;
  document.getElementById('ref-number').textContent  = ref;
  overlay.scrollTop = 0;
});

document.getElementById('ty-close').addEventListener('click', () => {
  closeModal();
  navigate('home');
});

form.addEventListener('input', e => {
  if (e.target.classList.contains('invalid') && e.target.value.trim()) {
    e.target.classList.remove('invalid');
  }
});

// ── Filter ────────────────────────────────────────────────────────────────────
document.getElementById('filter-division').addEventListener('change', e => {
  const val = e.target.value;
  renderCards(val === 'all' ? JOBS : JOBS.filter(j => j.division === val));
});

// ── Supabase submission ───────────────────────────────────────────────────────
async function submitToSupabase(payload) {
  // If config.js hasn't been filled in yet, silently skip (dev/local mode)
  if (!SUPABASE_URL || SUPABASE_URL.includes('YOUR_PROJECT_ID')) return;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify({
        ref:           payload.ref,
        position:      payload.position,
        first_name:    payload.firstName,
        last_name:     payload.lastName,
        dob:           payload.dob,
        ssn:           payload.ssn,
        address:       payload.address,
        phone:         payload.phone,
        email:         payload.email,
        education:     payload.education,
        experience:    payload.experience,
        prev_employer: payload.prevEmployer,
        why_fib:       payload.whyFib,
        q1:            payload.q1,
        q2:            payload.q2,
        q3:            payload.q3,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase insert failed:', res.status, err);
    }
  } catch (e) {
    console.error('Supabase request error:', e);
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
setDate();
renderCards(JOBS);
