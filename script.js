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
    li.onclick = () => li.classList.toggle("completed");
    document.getElementById("todo-list").appendChild(li);
    input.value = "";
}