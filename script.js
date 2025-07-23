const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

document.addEventListener('DOMContentLoaded', function () {
    showTask();

    inputBox.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
        alert("You must write something!");
        inputBox.focus();
    } else {
        if (isDuplicate(taskText)) {
            alert("Task already exists!");
            inputBox.focus();
            return;
        }

        let li = document.createElement("li");
        li.textContent = taskText;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.textContent = "×";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

function isDuplicate(newTask) {
    const existingTasks = listContainer.querySelectorAll('li');
    return Array.from(existingTasks).some(li => {
        const taskText = li.childNodes[0].textContent;
        return taskText.toLowerCase() === newTask.toLowerCase();
    });
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        const taskText = e.target.parentElement.childNodes[0].textContent;
        if (confirm(`Delete "${taskText}"?`)) {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

function saveData() {
    try {
        localStorage.setItem("data", listContainer.innerHTML);
    } catch (error) {
        console.error("Failed to save data:", error);
        alert("Failed to save tasks!");
    }
}

function showTask() {
    try {
        const savedData = localStorage.getItem("data");
        if (savedData) {
            listContainer.innerHTML = savedData;
        }
    } catch (error) {
        console.error("Failed to load data:", error);
        alert("Failed to load saved tasks!");
    }
}

showTask();