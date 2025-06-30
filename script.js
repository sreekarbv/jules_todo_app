document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTasksList = document.getElementById('new-tasks-list');
    const inprogressTasksList = document.getElementById('inprogress-tasks-list');
    const doneTasksList = document.getElementById('done-tasks-list');

    // Function to create a new task element
    function createTaskElement(taskText) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.textContent = taskText;

        // Status changer (e.g., a select dropdown)
        const statusSelector = document.createElement('select');
        statusSelector.innerHTML = `
            <option value="new">New</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
        `;
        statusSelector.value = 'new'; // Default status

        statusSelector.addEventListener('change', (event) => {
            moveTask(taskElement, event.target.value);
        });

        taskElement.appendChild(statusSelector);
        return taskElement;
    }

    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const newTask = createTaskElement(taskText);
        newTasksList.appendChild(newTask);
        taskInput.value = ''; // Clear input field
    });

    // Function to move task between columns
    function moveTask(taskElement, newStatus) {
        // Remove from current parent if it has one
        if (taskElement.parentNode) {
            taskElement.parentNode.removeChild(taskElement);
        }

        // Append to the correct new column
        if (newStatus === 'new') {
            newTasksList.appendChild(taskElement);
        } else if (newStatus === 'inprogress') {
            inprogressTasksList.appendChild(taskElement);
        } else if (newStatus === 'done') {
            doneTasksList.appendChild(taskElement);
        }
        // Ensure the dropdown reflects the current status
        const selector = taskElement.querySelector('select');
        if (selector) {
            selector.value = newStatus;
        }
    }
});
