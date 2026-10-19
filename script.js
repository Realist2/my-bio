
// Displays a welcome message in the browser's developer console.
console.log("Welcome to my Student Portfolio!");

// Finds the element with the class name "hero".
const heroSection = document.querySelector(".hero");

// Checks whether the hero section exists before using it.
if (heroSection) {

    // Finds the h2 heading inside the hero section.
    const heading = heroSection.querySelector("h2");

    // Changes the heading when it is clicked.
    if (heading) {
        heading.addEventListener("click", function () {

            // Changes the heading text after a click.
            heading.textContent = "Thanks for visiting my website!";
        });
    }
}

// Finds the Academic Planner elements.
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskDate = document.querySelector("#task-date");
const taskList = document.querySelector("#task-list");
const taskSummary = document.querySelector("#task-summary");
const emptyMessage = document.querySelector("#empty-message");

// Runs only on the Academic Planner page.
if (taskForm && taskInput && taskList) {

    // Loads saved tasks from the browser.
    let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

    // Displays the tasks on the page.
    function displayTasks() {
        taskList.innerHTML = "";

        // Counts completed tasks.
        const completedTasks = tasks.filter(task => task.completed).length;

        // Updates the task summary.
        if (taskSummary) {
            taskSummary.textContent =
                `Total tasks: ${tasks.length} | Completed: ${completedTasks} | Remaining: ${tasks.length - completedTasks}`;
        }

        // Shows a message when there are no tasks.
        if (emptyMessage) {
            emptyMessage.style.display =
                tasks.length === 0 ? "block" : "none";
        }

        // Creates an item for each task.
        tasks.forEach(function (task) {
            const listItem = document.createElement("li");
            listItem.classList.add("task-item");

            // Creates the task description.
            const taskText = document.createElement("span");
            taskText.textContent = task.text;

            if (task.completed) {
                taskText.classList.add("completed");
            }

            // Shows the due date when one was provided.
            const taskDetails = document.createElement("div");
            taskDetails.classList.add("task-details");
            taskDetails.appendChild(taskText);

            if (task.date) {
                const dateText = document.createElement("small");
                dateText.textContent = `Due: ${task.date}`;
                taskDetails.appendChild(dateText);
            }

            // Creates the Complete button.
            const completeButton = document.createElement("button");
            completeButton.textContent =
                task.completed ? "Undo" : "Complete";
            completeButton.type = "button";
            completeButton.classList.add("complete-button");

            completeButton.addEventListener("click", function () {
                task.completed = !task.completed;
                saveTasks();
                displayTasks();
            });

            // Creates the Delete button.
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";
            deleteButton.classList.add("delete-button");

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(function (item) {
                    return item.id !== task.id;
                });

                saveTasks();
                displayTasks();
            });

            // Groups the buttons together.
            const buttonGroup = document.createElement("div");
            buttonGroup.classList.add("task-actions");
            buttonGroup.append(completeButton, deleteButton);

            // Adds the task and its controls to the page.
            listItem.append(taskDetails, buttonGroup);
            taskList.appendChild(listItem);
        });
    }

    // Saves tasks in the browser.
    function saveTasks() {
        localStorage.setItem("academicTasks", JSON.stringify(tasks));
    }

    // Adds a task when the form is submitted.
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskName = taskInput.value.trim();

        // Prevents empty tasks.
        if (taskName === "") {
            alert("Please enter a task.");
            return;
        }

        // Creates a new task object.
        const newTask = {
            id: Date.now(),
            text: taskName,
            date: taskDate ? taskDate.value : "",
            completed: false
        };

        // Adds and saves the task.
        tasks.push(newTask);
        saveTasks();
        displayTasks();

        // Clears the form after adding a task.
        taskForm.reset();
        taskInput.focus();
    });

    // Displays saved tasks when the page opens.
    displayTasks();
}

// Finds the contact form and its feedback message.
const contactForm = document.querySelector("#contact-form");
const contactFeedback = document.querySelector("#contact-feedback");

// Runs only when the contact form exists.
if (contactForm && contactFeedback) {

    // Handles the form submission.
    contactForm.addEventListener("submit", function (event) {

        // Prevents the browser from reloading the page.
        event.preventDefault();

        // Gets the values entered by the visitor.
        const name = document.querySelector("#contact-name").value.trim();
        const email = document.querySelector("#contact-email").value.trim();
        const phone = document.querySelector("#contact-phone").value.trim();
        const message = document.querySelector("#contact-message").value.trim();

        // Checks whether any required field is empty.
        if (!name || !email || !phone || !message) {
            contactFeedback.textContent =
                "Please fill in all the required fields.";
            contactFeedback.style.color = "#b42318";
            return;
        }

        // Checks the email address format.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            contactFeedback.textContent =
                "Please enter a valid email address.";
            contactFeedback.style.color = "#b42318";
            return;
        }

        // Checks the phone number format.
        const phonePattern = /^[0-9+() -]{7,20}$/;

        if (!phonePattern.test(phone)) {
            contactFeedback.textContent =
                "Please enter a valid phone number.";
            contactFeedback.style.color = "#b42318";
            return;
        }

        // Displays a success message when validation passes.
        contactFeedback.textContent =
            "Thank you! Your form has been validated successfully.";
        contactFeedback.style.color = "#18794e";

        // Clears the form after successful validation.
        contactForm.reset();
    });
}
