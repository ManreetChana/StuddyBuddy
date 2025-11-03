// Navigation buttons
const pomodoroBtn = document.getElementById('pomodoro-btn');
const countdownBtn = document.getElementById('countdown-btn');
const todoBtn = document.getElementById('todo-btn');
const tallyBtn = document.getElementById('tally-btn');
const gameBtn = document.getElementById('game-btn');
const notesBtn = document.getElementById('notes-btn');
const backBtns = document.querySelectorAll('.back-btn');
const homeDiv = document.getElementById('home');

function showFeature(featureId) {
  // Hide all feature sections
  document.querySelectorAll('.feature-section').forEach(sec => {
    sec.style.display = 'none';
  });
  // Hide home
  homeDiv.style.display = 'none';

  // Show chosen feature
  document.getElementById(featureId).style.display = 'block';
}

function showHome() {
  // Hide all features
  document.querySelectorAll('.feature-section').forEach(sec => {
    sec.style.display = 'none';
  });
  // Show home
  homeDiv.style.display = 'flex';
}

// Button listeners for navigation
pomodoroBtn.addEventListener('click', () => showFeature('pomodoro'));
countdownBtn.addEventListener('click', () => showFeature('countdown'));
todoBtn.addEventListener('click', () => showFeature('todo'));
tallyBtn.addEventListener('click', () => showFeature('tally'));
gameBtn.addEventListener('click', () => showFeature('game'));
notesBtn.addEventListener('click', () => showFeature('notes'));

backBtns.forEach(btn => {
  btn.addEventListener('click', showHome);
});


// ------------------ Pomodoro Timer ------------------

const pomodoroTimerDisplay = document.getElementById('pomodoro-timer');
const pomodoroStartBtn = document.getElementById('pomodoro-start');
const pomodoroResetBtn = document.getElementById('pomodoro-reset');

let pomodoroTime = 25 * 60; // seconds
let pomodoroInterval = null;
let pomodoroRunning = false;

function updatePomodoroDisplay() {
  let minutes = Math.floor(pomodoroTime / 60);
  let seconds = pomodoroTime % 60;
  pomodoroTimerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

function pomodoroTick() {
  if (pomodoroTime > 0) {
    pomodoroTime--;
    updatePomodoroDisplay();
  } else {
    clearInterval(pomodoroInterval);
    alert("Time's up! Take a break 😊");
    pomodoroRunning = false;
  }
}

pomodoroStartBtn.addEventListener('click', () => {
  if (!pomodoroRunning) {
    pomodoroInterval = setInterval(pomodoroTick, 1000);
    pomodoroRunning = true;
  }
});

pomodoroResetBtn.addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();
  pomodoroRunning = false;
});

updatePomodoroDisplay();


// ------------------ Countdown Timer ------------------

const countdownInput = document.getElementById('countdown-input');
const countdownDisplay = document.getElementById('countdown-display');
const countdownStartBtn = document.getElementById('countdown-start');
const countdownResetBtn = document.getElementById('countdown-reset');

let countdownInterval = null;

function updateCountdown() {
  const targetTime = new Date(countdownInput.value).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    countdownDisplay.textContent = "Time's up!";
    clearInterval(countdownInterval);
    return;
  }

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((diff / (1000 * 60)) % 60);
  let seconds = Math.floor((diff / 1000) % 60);

  countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

countdownStartBtn.addEventListener('click', () => {
  if (!countdownInput.value) {
    alert("Please select a date and time first!");
    return;
  }
  clearInterval(countdownInterval);
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

countdownResetBtn.addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownDisplay.textContent = "Set a date and time";
  countdownInput.value = '';
});


// ------------------ To-Do List ------------------

const todoInput = document.getElementById('todo-input');
const todoAddBtn = document.getElementById('todo-add');
const todoList = document.getElementById('todo-list');

function saveTodos() {
  const todos = [];
  todoList.querySelectorAll('li').forEach(li => {
    todos.push({text: li.textContent, done: li.classList.contains('done')});
  });
  localStorage.setItem('studdyBuddyTodos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('studdyBuddyTodos')) || [];
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.done) li.classList.add('done');
    li.addEventListener('click', () => {
      li.classList.toggle('done');
      saveTodos();
    });
    todoList.appendChild(li);
  });
}

todoAddBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task === '') return;
  const li = document.createElement('li');
  li.textContent = task;
  li.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTodos();
  });
  todoList.appendChild(li);
  todoInput.value = '';
  saveTodos();
});

loadTodos();


// ------------------ Tally Counter ------------------

const tallyDisplay = document.getElementById('tally-display');
const tallyIncrementBtn = document.getElementById('tally-increment');
const tallyResetBtn = document.getElementById('tally-reset');

let tallyCount = 0;

function saveTally() {
  localStorage.setItem('studdyBuddyTally', tallyCount);
}

function loadTally() {
  tallyCount = parseInt(localStorage.getItem('studdyBuddyTally')) || 0;
  tallyDisplay.textContent = tallyCount;
}

tallyIncrementBtn.addEventListener('click', () => {
  tallyCount++;
  tallyDisplay.textContent = tallyCount;
  saveTally();
});

tallyResetBtn.addEventListener('click', () => {
  tallyCount = 0;
  tallyDisplay.textContent = tallyCount;
  saveTally();
});

loadTally();


// ------------------ Notes / Journal ------------------

const notesTextarea = document.getElementById('notes-textarea');
const notesSaveBtn = document.getElementById('notes-save');
const notesClearBtn = document.getElementById('notes-clear');

function saveNotes() {
  localStorage.setItem('studdyBuddyNotes', notesTextarea.value);
}

function loadNotes() {
  notesTextarea.value = localStorage.getItem('studdyBuddyNotes') || '';
}

notesSaveBtn.addEventListener('click', () => {
  saveNotes();
  alert("Notes saved!");
});

notesClearBtn.addEventListener('click', () => {
  notesTextarea.value = '';
  saveNotes();
});

loadNotes();


// ------------------ Monkey Runner Game ------------------

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let monkey = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  yVelocity: 0,
  gravity: 1,
  jumpForce: 15,
  isJumping: false
};

let obstacles = [];
let obstacleSpeed = 6;
let score = 0;
let gameRunning = false;
let gameInterval;
let obstacleInterval;

function resetGame() {
  monkey.y = 150;
  monkey.yVelocity = 0;
  obstacles = [];
  score = 0;
  gameRunning = true;
}

function drawMonkey() {
  ctx.fillStyle = '#f9c5d1'; // pastel pink monkey
  ctx.fillRect(monkey.x, monkey.y, monkey.width, monkey.height);
  // Eyes (cute!)
  ctx.fillStyle = '#6a2c70';
  ctx.beginPath();
  ctx.arc(monkey.x + 10, monkey.y + 15, 5, 0, Math.PI * 2);
  ctx.arc(monkey.x + 30, monkey.y + 15, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacle(obstacle) {
  ctx.fillStyle = '#b03060';
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updateMonkey() {
  if (monkey.isJumping) {
    monkey.yVelocity -= monkey.gravity;
    monkey.y -= monkey.yVelocity;
    if (monkey.y >= 150) {
      monkey.y = 150;
      monkey.isJumping = false;
      monkey.yVelocity = 0;
    }
  }
}

function updateObstacles() {
  obstacles.forEach((obs, index) => {
    obs.x -= obstacleSpeed;
    if (obs.x + obs.width < 0) {
      obstacles.splice(index, 1);
      score++;
    }
  });
}

function detectCollision() {
  for (let obs of obstacles) {
    if (
      monkey.x < obs.x + obs.width &&
      monkey.x + monkey.width > obs.x &&
      monkey.y < obs.y + obs.height &&
      monkey.y + monkey.height > obs.y
    ) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMonkey();
  updateMonkey();

  updateObstacles();
  obstacles.forEach(drawObstacle);

  ctx.fillStyle = '#6a2c70';
  ctx.font = '20px Times New Roman';
  ctx.fillText(`Score: ${score}`, 10, 30);

  if (detectCollision()) {
    alert(`Game Over! Your score: ${score}`);
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    gameRunning = false;
    showHome();
  }
}

function jump() {
  if (!monkey.isJumping) {
    monkey.isJumping = true;
    monkey.yVelocity = monkey.jumpForce;
  }
}

function spawnObstacle() {
  const height = 30 + Math.random() * 20;
  obstacles.push({
    x: canvas.width,
    y: 150 + 40 - height,
    width: 20,
    height: height
  });
}

document.addEventListener('keydown', e => {
  if ((e.code === 'Space' || e.code === 'ArrowUp') && gameRunning) {
    jump();
  }
});

gameBtn.addEventListener('click', () => {
  resetGame();
  gameInterval = setInterval(gameLoop, 30);
  obstacleInterval = setInterval(spawnObstacle, 2000);
});
