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
      document.getElementById("alarm").play();
      alert("⏰ Reminder!");
    }, delay);
    alert("Reminder setat!");
  } else {
    alert("Alege un timp viitor.");
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
  const todos = [];
  document.querySelectorAll("#todo-list li").forEach(li => {
    todos.push({ text: li.textContent, completed: li.classList.contains("completed") });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.forEach(item => {
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

const notes = document.getElementById("notes");
notes.value = localStorage.getItem("notes") || "";
notes.addEventListener("input", () => {
  localStorage.setItem("notes", notes.value);
});