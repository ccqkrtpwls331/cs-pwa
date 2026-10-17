const STORAGE_KEY = 'cs_pwa_state_v1';
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { solved: {}, wrongIds: [] };
let filteredList = [];
let currentIndex = 0;
let isWrongMode = false;

const weekFilter = document.getElementById('weekFilter');
const subTopicFilter = document.getElementById('subTopicFilter');
const modeAll = document.getElementById('modeAll');
const modeWrong = document.getElementById('modeWrong');
const wrongCountEl = document.getElementById('wrongCount');

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  wrongCountEl.textContent = state.wrongIds.length;
}

function initFilters() {
  const subjects = [...new Set(QUESTIONS_DATA.map(q => q.subject))];
  subjects.forEach(sub => {
    const opt = document.createElement('option');
    opt.value = sub;
    opt.textContent = sub;
    weekFilter.appendChild(opt);
  });
  updateSubTopics();
}

function updateSubTopics() {
  const selectedSubject = weekFilter.value;
  subTopicFilter.innerHTML = '<option value="all">전체 세부단원</option>';
  const base = selectedSubject === 'all' ? QUESTIONS_DATA : QUESTIONS_DATA.filter(q => q.subject === selectedSubject);
  const subTopics = [...new Set(base.map(q => q.subTopic))];
  subTopics.forEach(st => {
    const opt = document.createElement('option');
    opt.value = st;
    opt.textContent = st;
    subTopicFilter.appendChild(opt);
  });
}

function applyFilter() {
  const sub = weekFilter.value;
  const topic = subTopicFilter.value;
  filteredList = QUESTIONS_DATA.filter(q => {
    if (sub !== 'all' && q.subject !== sub) return false;
    if (topic !== 'all' && q.subTopic !== topic) return false;
    if (isWrongMode && !state.wrongIds.includes(q.id)) return false;
    return true;
  });
  currentIndex = 0;
  renderQuestion();
}

function renderQuestion() {
  const badgeEl = document.getElementById('badge');
  const qEl = document.getElementById('question');
  const optEl = document.getElementById('options');
  const expEl = document.getElementById('explanation');
  const progEl = document.getElementById('progressText');
  const scoreEl = document.getElementById('scoreText');

  saveState();
  scoreEl.textContent = `완료: ${Object.keys(state.solved).length} / ${QUESTIONS_DATA.length}문항`;

  if (filteredList.length === 0) {
    badgeEl.textContent = '알림';
    qEl.textContent = isWrongMode ? '오답 노트에 등록된 문제가 없습니다.' : '조건에 맞는 문제가 없습니다.';
    optEl.innerHTML = '';
    expEl.style.display = 'none';
    progEl.textContent = '0 / 0';
    return;
  }

  const item = filteredList[currentIndex];
  progEl.textContent = `${currentIndex + 1} / ${filteredList.length}`;
  badgeEl.textContent = `${item.subject} > ${item.subTopic}`;
  qEl.textContent = `Q. ${item.question}`;
  optEl.innerHTML = '';
  expEl.style.display = 'none';

  const prevSelected = state.solved[item.id];

  item.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.textContent = item.type === 'multiple' ? `${idx + 1}. ${optText}` : optText;

    if (prevSelected !== undefined) {
      btn.disabled = true;
      if (idx === item.answer) btn.classList.add('correct');
      else if (idx === prevSelected) btn.classList.add('wrong');
    }

    btn.onclick = () => checkAnswer(item, idx);
    optEl.appendChild(btn);
  });

  if (prevSelected !== undefined) {
    expEl.innerHTML = `<strong>해설:</strong> ${item.explanation}`;
    expEl.style.display = 'block';
  }
}

function checkAnswer(item, selectedIdx) {
  state.solved[item.id] = selectedIdx;
  if (selectedIdx !== item.answer) {
    if (!state.wrongIds.includes(item.id)) state.wrongIds.push(item.id);
  } else {
    state.wrongIds = state.wrongIds.filter(id => id !== item.id);
  }
  renderQuestion();
}

weekFilter.onchange = () => { updateSubTopics(); applyFilter(); };
subTopicFilter.onchange = applyFilter;
modeAll.onclick = () => { isWrongMode = false; modeAll.classList.add('active'); modeWrong.classList.remove('active'); applyFilter(); };
modeWrong.onclick = () => { isWrongMode = true; modeWrong.classList.add('active'); modeAll.classList.remove('active'); applyFilter(); };
document.getElementById('prevBtn').onclick = () => { if (currentIndex > 0) { currentIndex--; renderQuestion(); } };
document.getElementById('nextBtn').onclick = () => { if (currentIndex < filteredList.length - 1) { currentIndex++; renderQuestion(); } };
document.getElementById('resetBtn').onclick = () => {
  if (confirm('모든 풀이 기록과 오답노트를 초기화할까요?')) {
    state = { solved: {}, wrongIds: [] };
    saveState();
    applyFilter();
  }
};

initFilters();
applyFilter();
