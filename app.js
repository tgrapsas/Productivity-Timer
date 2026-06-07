// --- ΑΡΧΙΚΑ ΔΕΔΟΜΕΝΑ & ELEMENTS ---
let tasks = JSON.parse(localStorage.getItem('prodTasks')) || [];
let activeTimers = {}; 

const taskInput = document.getElementById('taskInput');
const categoryInput = document.getElementById('categoryInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// --- ΔΙΑΧΕΙΡΙΣΗ LIGHT/DARK THEME ---
let savedTheme = localStorage.getItem('theme') || 'dark-theme';
document.body.className = savedTheme;
updateToggleButtonText(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
        document.body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
        updateToggleButtonText('light-theme');
    } else {
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
        updateToggleButtonText('dark-theme');
    }
});

function updateToggleButtonText(theme) {
    if (theme === 'dark-theme') {
        themeToggleBtn.innerText = "☀️ Light Mode";
    } else {
        themeToggleBtn.innerText = "🌙 Dark Mode";
    }
}

// --- ΛΟΓΙΚΗ TASKS & ΧΡΟΝΟΜΕΤΡΩΝ ---
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Δώσε ένα όνομα στο task!");
        return;
    }

    const newTask = {
        id: Date.now(), 
        name: text,
        category: categoryInput.value,
        seconds: 0,
        isRunning: false,
        isCompleted: false
    };

    tasks.push(newTask);
    saveAndRefresh();
    taskInput.value = "";
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

function saveAndRefresh() {
    localStorage.setItem('prodTasks', JSON.stringify(tasks));
    renderTasks();
    updateAnalytics();
}

function formatTime(totalSeconds) {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function renderTasks() {
    tasksList.innerHTML = "";
    
    if (tasks.length === 0) {
        tasksList.innerHTML = `<p style="text-align:center; color:#64748b; padding: 20px;">Δεν υπάρχουν tasks ακόμη. Ξεκινήστε προσθέτοντας ένα!</p>`;
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.isCompleted ? 'completed' : ''}`;

        taskDiv.innerHTML = `
            <div class="task-info">
                <span class="task-name" style="${task.isCompleted ? 'text-decoration: line-through;' : ''}">${task.name}</span>
                <span class="task-cat">${task.category}</span>
            </div>
            <div class="task-controls">
                <span class="timer-display" id="timer-${task.id}">${formatTime(task.seconds)}</span>
                
                ${!task.isCompleted ? `
                    <button class="action-btn ${task.isRunning ? 'pause' : 'start'}" onclick="toggleTimer(${task.id})">
                        ${task.isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button class="action-btn complete" onclick="completeTask(${task.id})">✓</button>
                ` : ''}
                
                <button class="action-btn delete" onclick="deleteTask(${task.id})">×</button>
            </div>
        `;
        tasksList.appendChild(taskDiv);

        if (task.isRunning && !activeTimers[task.id]) {
            startInterval(task.id);
        }
    });
}

window.toggleTimer = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (task.isRunning) {
        task.isRunning = false;
        clearInterval(activeTimers[id]);
        delete activeTimers[id];
    } else {
        task.isRunning = true;
        startInterval(id);
    }
    saveAndRefresh();
};

function startInterval(id) {
    activeTimers[id] = setInterval(() => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.seconds++;
            const el = document.getElementById(`timer-${id}`);
            if (el) el.innerText = formatTime(task.seconds);
            updateAnalytics(); 
        }
    }, 1000);
}

window.completeTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.isCompleted = true;
        task.isRunning = false;
        clearInterval(activeTimers[id]);
        delete activeTimers[id];
        saveAndRefresh();
    }
};

window.deleteTask = function(id) {
    clearInterval(activeTimers[id]);
    delete activeTimers[id];
    tasks = tasks.filter(t => t.id !== id);
    saveAndRefresh();
};

function updateAnalytics() {
    const totalTasksEl = document.getElementById('totalTasks');
    const totalTimeEl = document.getElementById('totalTime');
    
    if (totalTasksEl) totalTasksEl.innerText = tasks.length;
    
    const totalSeconds = tasks.reduce((sum, task) => sum + task.seconds, 0);
    if (totalTimeEl) totalTimeEl.innerText = formatTime(totalSeconds);
}

// Αρχική εκκίνηση
renderTasks();
updateAnalytics();