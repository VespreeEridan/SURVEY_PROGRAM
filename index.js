let charName = '';
let selectedColor = '#333';
let selectedFace = '?';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function updateFace() {
  const n = document.getElementById('char-name').value;
  charName = n;
  const initials = n.length > 0 ? n[0].toUpperCase() : '?';
  document.getElementById('face1').textContent = initials;
}

function selectOpt(groupId, btn, color, face) {
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  if (color) { selectedColor = color; syncAvatars(); }
  if (face) { selectedFace = face; syncFaces(); }
}

function syncAvatars() {
  ['av2','av3','av4','av5','av6'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.background = selectedColor;
  });
}

function syncFaces() {
  const initials = charName.length > 0 ? charName[0].toUpperCase() : selectedFace;
  ['face2','face3','face4','face5','face6'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = initials;
  });
}

function nextFromName() {
  if (!charName.trim()) { alert('Please enter a name.'); return; }
  syncFaces();
  showScreen('q1-screen');
}

function nextQ(from, to) {
  showScreen(to);
  syncAvatars();
  syncFaces();
}

function triggerRejection() {
  showScreen('loading-screen');
  syncAvatars();
  syncFaces();

  const msgs = ['Sauvegarde...', 'Lien entre âme et réceptacle...', 'Connexion établie...', 'Racines...'];
  let i = 0;
  const iv = setInterval(() => {
    if (i < msgs.length) {
      document.getElementById('loading-text').textContent = msgs[i++];
    }
  }, 500);

  setTimeout(() => {
    clearInterval(iv);
    document.getElementById('static').style.opacity = '0.8';
    setTimeout(() => {
      document.getElementById('static').style.opacity = '0';
      showRejection();
    }, 600);
  }, 2400);
}

function showRejection() {
  showScreen('rejection-screen');
  document.getElementById('av6').style.background = selectedColor;
  const initials = charName.length > 0 ? charName[0].toUpperCase() : '?';
  document.getElementById('face6').textContent = initials;
  document.getElementById('rej-name-line').textContent = '"' + (charName || 'Stranger') + '"';
  document.getElementById('rej-av-wrap').classList.add('shake');

  setTimeout(() => {
    document.getElementById('final-quote').textContent =
      '"Dans ce monde, personne ne peut choisir qui il est."';
  }, 2500);
}
