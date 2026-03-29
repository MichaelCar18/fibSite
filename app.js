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

// ── Utility ──────────────────────────────────────────────────────────────────
function genRef() {
  return 'FIB-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 9000 + 1000);
}

function setDate() {
  const d = new Date();
  document.getElementById('update-date').textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Render Cards ─────────────────────────────────────────────────────────────
function renderCards(jobs) {
  const grid = document.getElementById('job-grid');
  grid.innerHTML = '';
  document.getElementById('job-count').textContent = jobs.length;

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
const overlay   = document.getElementById('modal-overlay');
const formView  = document.getElementById('form-view');
const tyView    = document.getElementById('thankyou-view');
const form      = document.getElementById('app-form');
let currentJob  = null;

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
  // scroll modal to top
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
}

function validateForm() {
  let valid = true;
  const required = form.querySelectorAll('[required]');
  required.forEach(el => {
    if (el.type === 'radio') return; // handled separately
    if (!el.value.trim()) {
      el.classList.add('invalid');
      valid = false;
    } else {
      el.classList.remove('invalid');
    }
  });

  // Check radio groups
  ['q1', 'q2', 'q3'].forEach(name => {
    const group = form.querySelectorAll(`input[name="${name}"]`);
    const checked = Array.from(group).some(r => r.checked);
    if (!checked) {
      valid = false;
      // visually flag the disclosure item
      group[0].closest('.disclosure-item').style.borderColor = 'var(--red)';
    } else {
      group[0].closest('.disclosure-item').style.borderColor = '';
    }
  });

  return valid;
}

// Apply button clicks (delegated)
document.getElementById('job-grid').addEventListener('click', e => {
  if (e.target.matches('.apply-btn')) {
    const job = JOBS.find(j => j.id === e.target.dataset.id);
    if (job) openModal(job);
  }
});

document.getElementById('modal-close').addEventListener('click', closeModal);

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  // Show thank-you
  formView.hidden = true;
  tyView.hidden   = false;
  document.getElementById('ty-position').textContent = currentJob.title;
  document.getElementById('ref-number').textContent  = genRef();
  overlay.scrollTop = 0;
});

document.getElementById('ty-close').addEventListener('click', closeModal);

// ── Filter ────────────────────────────────────────────────────────────────────
document.getElementById('filter-division').addEventListener('change', e => {
  const val = e.target.value;
  const filtered = val === 'all' ? JOBS : JOBS.filter(j => j.division === val);
  renderCards(filtered);
});

// ── Live validation: clear invalid on input ───────────────────────────────────
form.addEventListener('input', e => {
  if (e.target.classList.contains('invalid')) {
    if (e.target.value.trim()) e.target.classList.remove('invalid');
  }
});

// ── Init ──────────────────────────────────────────────────────────────────────
setDate();
renderCards(JOBS);
