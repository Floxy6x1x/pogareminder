document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    loadNotes();
});

function setReminder() {
    const time = new Date(document.getElementById("reminder-time").value).getTime();
    const now = Date.now();
    const delay = time - now;

    if (delay > 0) {
        setTimeout(() => {
            document.getElementById("alarm-sound").play();
            alert("⏰ Reminder!");
        }, delay);
        alert("Reminder setat!");
    } else {
        alert("Timpul trebuie să fie în viitor!");
    }
}

function addTodo() {
    const input = document.getElementById("todo-input");
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.textContent = text;
    li.onclick = () => {
        li.classList.toggle("completed");
        saveTodos();
    };
    document.getElementById("todo-list").appendChild(li);
    input.value = "";

    saveTodos();
}

function saveTodos() {
    const list = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        list.push({ text: li.textContent, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("todos", JSON.stringify(list));
}

function loadTodos() {
    const list = JSON.parse(localStorage.getItem("todos") || "[]");
    list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.completed) li.classList.add("completed");
        li.onclick = () => {
            li.classList.toggle("completed");
            saveTodos();
        };
        document.getElementById("todo-list").appendChild(li);
    });
}

const notesArea = document.getElementById("notes-area");
if (notesArea) {
    notesArea.value = localStorage.getItem("notes") || "";
    notesArea.addEventListener("input", () => {
        localStorage.setItem("notes", notesArea.value);
    });
}