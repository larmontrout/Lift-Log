// ===== Storage keys =====
// liftlog_profiles -> array of profile names
// liftlog_active_profile -> currently selected profile name
// liftlog_<profile>_program -> selected program key for that profile
// liftlog_<profile>_week -> current week number for that profile
// liftlog_<profile>_data -> logged sets for that profile

let activeProfile = null;
let activeProgram = null;
let week = 1;
let tab = null;
let db = {};

// ===== Storage helpers =====
function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) { return fallback; }
}
function saveJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
}

function getProfiles() { return loadJSON('liftlog_profiles', []); }
function saveProfiles(list) { saveJSON('liftlog_profiles', list); }

// ===== Init =====
function init() {
  const profiles = getProfiles();
  const last = localStorage.getItem('liftlog_active_profile');

  if (last && profiles.includes(last)) {
    selectProfile(last);
  } else if (profiles.length > 0) {
    selectProfile(profiles[0]);
  } else {
    openProfilePicker(true);
  }
}

// ===== Profile management =====
function selectProfile(name) {
  activeProfile = name;
  localStorage.setItem('liftlog_active_profile', name);

  activeProgram = localStorage.getItem(`liftlog_${name}_program`) || null;
  week = parseInt(localStorage.getItem(`liftlog_${name}_week`)) || 1;
  db = loadJSON(`liftlog_${name}_data`, {});

  document.getElementById('profile-pill').textContent = name;
  document.getElementById('wk-label').textContent = `Week ${week}`;

  closeProfilePicker();

  if (!activeProgram || !PROGRAMS[activeProgram]) {
    openProgramPicker(true);
  } else {
    document.getElementById('program-pill').textContent = PROGRAMS[activeProgram].name;
    const dayKeys = Object.keys(PROGRAMS[activeProgram].days);
    tab = 'progress';
    renderNav();
    switchTab(dayKeys[0]);
  }
}

function createProfile() {
  const input = document.getElementById('new-profile-input');
  const name = input.value.trim();
  if (!name) return;

  const profiles = getProfiles();
  if (profiles.includes(name)) {
    selectProfile(name);
    input.value = '';
    return;
  }
  profiles.push(name);
  saveProfiles(profiles);
  input.value = '';
  selectProfile(name);
}

function deleteProfile(name, ev) {
  ev.stopPropagation();
  if (!confirm(`Delete profile "${name}" and all its data? This can't be undone.`)) return;

  const profiles = getProfiles().filter(p => p !== name);
  saveProfiles(profiles);
  localStorage.removeItem(`liftlog_${name}_program`);
  localStorage.removeItem(`liftlog_${name}_week`);
  localStorage.removeItem(`liftlog_${name}_data`);

  if (activeProfile === name) {
    activeProfile = null;
    localStorage.removeItem('liftlog_active_profile');
    if (profiles.length > 0) {
      selectProfile(profiles[0]);
    } else {
      openProfilePicker(true);
    }
  } else {
    renderProfileList();
  }
}

function openProfilePicker(forceOpen) {
  renderProfileList();
  document.getElementById('profile-overlay').style.display = 'flex';
  document.getElementById('profile-footer').style.display = forceOpen ? 'none' : 'flex';
}

function closeProfilePicker() {
  if (!activeProfile) return; // must pick one
  document.getElementById('profile-overlay').style.display = 'none';
}

function renderProfileList() {
  const profiles = getProfiles();
  const list = document.getElementById('profile-list');
  if (profiles.length === 0) {
    list.innerHTML = `<div class="empty-msg" style="padding:20px 0">No profiles yet — add one below.</div>`;
    return;
  }
  list.innerHTML = profiles.map(name => {
    const prog = localStorage.getItem(`liftlog_${name}_program`);
    const progName = prog && PROGRAMS[prog] ? PROGRAMS[prog].name : 'No program selected';
    return `<div class="profile-item" onclick="selectProfile('${escapeAttr(name)}')">
      <div>
        <div class="profile-name">${escapeHtml(name)}</div>
        <div class="profile-meta">${progName}</div>
      </div>
      <div style="display:flex;align-items:center;gap:4px">
        <span class="delete-x" onclick="deleteProfile('${escapeAttr(name)}', event)">✕</span>
        <span class="profile-arrow">›</span>
      </div>
    </div>`;
  }).join('');
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(s) { return s.replace(/'/g, "\\'"); }

// ===== Program management =====
function openProgramPicker(forceOpen) {
  renderProgramList();
  document.getElementById('program-overlay').style.display = 'flex';
  const footer = document.querySelector('#program-overlay .overlay-footer');
  footer.style.display = forceOpen ? 'none' : 'flex';
}

function closeProgramPicker() {
  if (!activeProgram) return;
  document.getElementById('program-overlay').style.display = 'none';
}

function renderProgramList() {
  const list = document.getElementById('program-list');
  list.innerHTML = Object.keys(PROGRAMS).map(key => {
    const p = PROGRAMS[key];
    const selected = key === activeProgram;
    return `<div class="program-card${selected?' selected':''}" onclick="chooseProgram('${key}')">
      <div class="program-top">
        <div class="program-name">${p.name}</div>
        <div class="program-tag">${p.tag}</div>
      </div>
      <div class="program-desc">${p.description}</div>
      <div class="program-meta-row">
        <div><b>Best for:</b> ${p.bestFor}</div>
        <div><b>Frequency:</b> ${p.frequency}</div>
      </div>
    </div>`;
  }).join('');
}

function chooseProgram(key) {
  activeProgram = key;
  localStorage.setItem(`liftlog_${activeProfile}_program`, key);
  document.getElementById('program-pill').textContent = PROGRAMS[key].name;
  document.getElementById('program-overlay').style.display = 'none';

  const dayKeys = Object.keys(PROGRAMS[key].days);
  renderNav();
  switchTab(dayKeys[0]);
}

// ===== Week navigation =====
function changeWeek(d) {
  if (!activeProfile || !activeProgram) return;
  const n = week + d;
  if (n < 1) return;
  week = n;
  localStorage.setItem(`liftlog_${activeProfile}_week`, week);
  document.getElementById('wk-label').textContent = `Week ${week}`;
  render();
}

// ===== Nav =====
function renderNav() {
  const nav = document.getElementById('nav');
  const days = PROGRAMS[activeProgram].days;
  let h = '';
  for (const [key, day] of Object.entries(days)) {
    h += `<button class="nav-tab" data-tab="${key}" onclick="switchTab('${key}')">${day.title}</button>`;
  }
  h += `<button class="nav-tab" data-tab="progress" onclick="switchTab('progress')">Stats</button>`;
  nav.innerHTML = h;
}

function switchTab(t) {
  tab = t;
  document.querySelectorAll('.nav-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === t);
  });
  render();
}

// ===== Data keys =====
// data is namespaced per program so switching programs doesn't collide history
function dataKey(w, exId, s, field) {
  return `${activeProgram}:${w}:${exId}:${s}:${field}`;
}
function doneKey(w, exId) {
  return `${activeProgram}:${w}:${exId}:done`;
}
function getPrev(exId, s, field) {
  for (let w = week - 1; w >= 1; w--) {
    const v = db[dataKey(w, exId, s, field)];
    if (v !== undefined && v !== '') return v;
  }
  return null;
}

function saveData() {
  saveJSON(`liftlog_${activeProfile}_data`, db);
}

// ===== Rendering =====
function render() {
  const c = document.getElementById('content');
  if (!activeProgram) { c.innerHTML = ''; return; }
  if (tab === 'progress') { c.innerHTML = renderProgress(); return; }

  const day = PROGRAMS[activeProgram].days[tab];
  if (!day) { c.innerHTML = ''; return; }

  let h = `<p style="font-size:13px;color:var(--text3);padding:14px 0 4px;font-family:'Barlow Condensed',sans-serif;letter-spacing:.04em;text-transform:uppercase;font-weight:600">${day.sub}</p>`;

  for (const g of day.groups) {
    h += `<div class="section-label">${g.name}</div>`;
    for (const ex of g.exercises) {
      const dKey = doneKey(week, ex.id);
      const isDone = !!db[dKey];
      h += `<div class="ex-card${isDone?' done':''}">
        <div class="ex-top">
          <div class="ex-name">${ex.name}</div>
          <div class="ex-scheme">${ex.sets}×${ex.reps}</div>
        </div>
        ${ex.note ? `<div class="ex-note">${ex.note}</div>` : ''}
        <div class="sets-head">
          <span></span><span>Weight</span><span>Reps</span><span>Last wk</span>
        </div>`;
      for (let s = 1; s <= ex.sets; s++) {
        const wv = db[dataKey(week, ex.id, s, 'w')] || '';
        const rv = db[dataKey(week, ex.id, s, 'r')] || '';
        const pw = getPrev(ex.id, s, 'w');
        const pr = getPrev(ex.id, s, 'r');
        const isPR = pw && wv && parseFloat(wv) > parseFloat(pw);
        const prevStr = pw ? `${pw}×${pr||'?'}` : '—';
        h += `<div class="set-row">
          <div class="set-num">${s}</div>
          <input class="set-input" type="number" inputmode="decimal" placeholder="lb" value="${wv}"
            onchange="log('${ex.id}',${s},'w',this.value)">
          <input class="set-input" type="number" inputmode="numeric" placeholder="reps" value="${rv}"
            onchange="log('${ex.id}',${s},'r',this.value)">
          <div class="prev-cell${isPR?' has-pr':''}">${prevStr}${isPR?' 🔺':''}</div>
        </div>`;
      }
      h += `<button class="done-btn${isDone?' done':''}" onclick="toggleDone('${ex.id}')">
        ${isDone ? '✓ Done' : 'Mark Complete'}
      </button></div>`;
    }
  }
  c.innerHTML = h;
}

function log(id, s, field, val) {
  db[dataKey(week, id, s, field)] = val;
  saveData();
}

function toggleDone(id) {
  const k = doneKey(week, id);
  db[k] = !db[k];
  saveData();
  render();
}

function renderProgress() {
  let sets = 0, reps = 0, prs = 0;
  let rows = '';
  const days = PROGRAMS[activeProgram].days;

  for (const [dayKey, day] of Object.entries(days)) {
    for (const g of day.groups) {
      for (const ex of g.exercises) {
        let topW = 0, topR = 0;
        for (let s = 1; s <= ex.sets; s++) {
          const w = parseFloat(db[dataKey(week, ex.id, s, 'w')]) || 0;
          const r = parseInt(db[dataKey(week, ex.id, s, 'r')]) || 0;
          if (w) { sets++; reps += r; topW = Math.max(topW, w); topR = Math.max(topR, r); }
          const pw = getPrev(ex.id, s, 'w');
          if (pw && w && w > parseFloat(pw)) prs++;
        }
        if (topW > 0) {
          rows += `<tr><td>${ex.name}<span class="day-tag">${day.title}</span></td>
            <td>${topW} × ${topR}</td></tr>`;
        }
      }
    }
  }

  const empty = `<div class="empty-msg">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M6 4v6a6 6 0 0012 0V4M4 4h16"/>
    </svg>
    No sets logged for week ${week} yet.
  </div>`;

  return `
    <div class="stats-row">
      <div class="stat-box"><span class="stat-val">${sets}</span><span class="stat-lbl">Sets</span></div>
      <div class="stat-box"><span class="stat-val">${reps}</span><span class="stat-lbl">Reps</span></div>
      <div class="stat-box"><span class="stat-val">${prs}</span><span class="stat-lbl">PRs</span></div>
    </div>
    ${rows ? `<div class="log-wrap"><table class="log-table">
      <thead><tr><th>Exercise</th><th>Top set</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>` : empty}`;
}

// ===== Boot =====
init();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
