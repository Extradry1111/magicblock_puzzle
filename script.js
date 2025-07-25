const N = 3;
const container = document.getElementById('puzzle-container');
const shuffleBtn = document.getElementById('shuffle-btn');
const imageSelect = document.getElementById('imageSelect');

let positions = [];
let currentImage = 'images/' + imageSelect.value;

imageSelect.addEventListener('change', () => {
  currentImage = 'images/' + imageSelect.value;
  init();
});

function init() {
  positions = Array.from({ length: N * N }, (_, i) => i);
  render();
}

function render() {
  container.innerHTML = '';
  positions.forEach((pos, i) => {
    const div = document.createElement('div');
    div.classList.add('piece');
    const row = Math.floor(pos / N), col = pos % N;
    div.style.backgroundImage = `url('${currentImage}')`;
    div.style.backgroundPosition = `-${col * 150}px -${row * 150}px`;
    div.dataset.index = i;
    div.addEventListener('click', () => move(i));
    container.append(div);
  });
}

function move(i) {
  const emptyIdx = positions.indexOf(N * N - 1);
  if ([i - 1, i + 1, i - N, i + N].includes(emptyIdx)) {
    [positions[i], positions[emptyIdx]] = [positions[emptyIdx], positions[i]];
    render();
  }
}

function shuffle() {
  for (let k = 0; k < 1000; k++) {
    const i = Math.floor(Math.random() * (N * N));
    move(i);
  }
}

shuffleBtn.addEventListener('click', () => shuffle());

init();
let timerInterval;
let seconds = 0;
let timerStarted = false;
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById('timer').textContent = `Time: ${seconds}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerStarted = false;
}
if (!timerStarted) {
  startTimer();
  timerStarted = true;
}
stopTimer();
