const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const searchBar = document.getElementById('search-bar');
const clearBtn = document.getElementById('clear-btn');


const searchBtn = document.querySelector('.search-icon-btn'); // Assuming the button with class 'search-icon-btn' triggers the search
const dateFilter = document.getElementById("date-filter");



// Show/hide clear button based on input
searchBar.addEventListener('input', () => {
  if (searchBar.value.length > 0 /*|| dateFilter.value != null*/) { // Yeah I just wanted to make the X clear button appear when date had an input but it didn't work as intended so avoided it for NOW
    clearBtn.classList.remove('hidden'); // Show the button
  } else {
    clearBtn.classList.add('hidden'); // Hide the button
  }
});

// Clear input field on button click
clearBtn.addEventListener('click', () => {
  searchBar.value = ''; // Clear the input field
  dateFilter.value = '';
  clearBtn.classList.add('hidden'); // Hide the button
});


//This array will store all the tasks along with their associated data, including title, due date, and description. 
const taskData = JSON.parse(localStorage.getItem("data")) || [];
//This variable will be used to track the state when editing and discarding tasks.
let currentTask = {};

/* freeCodeCamp description of a step (keep this in mind when manipulating classes)
"In earlier projects, you learned how to add and remove classes from an element with el.classList.add() and el.classList.remove(). 
Another method to use with the classList property is the toggle method.
The toggle method will add the class if it is not present on the element, and remove the class if it is present on the element."
*/
openTaskFormBtn.addEventListener("click", ()=>{taskForm.classList.toggle("hidden")})

const removeSpecialChars = (val) => {
    return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}

const addOrUpdateTask = () => {
  if (!titleInput.value.trim()) {
      alert("Please provide a title");
      return;
  }
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
      id: dataArrIndex === -1
          ? `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`
          : currentTask.id, // Preserve the same ID if editing
      title: removeSpecialChars(titleInput.value),
      date: removeSpecialChars(dateInput.value),
      description: removeSpecialChars(descriptionInput.value),
      status: dataArrIndex === -1 ? "not completed" : currentTask.status, // Keep the current status when editing
  };

  if (dataArrIndex === -1) {
      taskData.unshift(taskObj);
  } else {
      taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};


const toggleStatus = (checkbox, taskId) => {
    // Finds the task based on its ID
    const task = taskData.find(item => item.id === taskId);
  
    // Updates the status based on whether the checkbox is checked or not
    task.status = checkbox.checked ? "completed" : "not completed";
  
    // Saves the updated data back to localStorage
    localStorage.setItem("data", JSON.stringify(taskData));
  
    // Updates the task container to reflect the new status
    filterAllTasks();
  };
  

const updateTaskContainer = () => {
    tasksContainer.innerHTML = ""; // Clears the previous task container first because we'll update it with a new one!
  
    taskData.forEach(({ id, title, date, description, status }) => {
      tasksContainer.innerHTML += `
      <div class="individual-task-containers">
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <hr/>
          <p><strong>Date:</strong> ${date}</p>
          <hr/>
          <p class="description"><strong>Description:</strong> ${description}</p>
          <hr/>
          <div id="status" style="cursor:pointer;">
            <input style="cursor:pointer;" type="checkbox" id="checkbox-${id}" ${status === "completed" ? "checked" : ""} onclick="toggleStatus(this, '${id}')">
            <label style="cursor:pointer;" for="checkbox-${id}">${status === "completed" ? `<span class="completed">Completed</span>` : `<span class="not-completed">Not Completed</span>`}</label>
          </div>
          <hr/>
          <button onclick="editTask(this)" type="button" class="btn" style="margin: 10px 36px 10px 0px;">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn" style="margin: 10px 36px 10px 0px;">Delete</button> 
        </div>
      </div>
      `;
    });
  };

const deleteTask = (buttonEl) => {
const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
);

// Remove the entire individual-task-container instead of just the task
buttonEl.closest(".individual-task-containers").remove();

taskData.splice(dataArrIndex, 1);
localStorage.setItem("data", JSON.stringify(taskData));
filterAllTasks();
};


const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
      (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  // Keep the button text to reflect an edit
  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");
};


const reset = () => {
addOrUpdateTaskBtn.innerText = "Add Task";
titleInput.value = "";
dateInput.value = "";
descriptionInput.value = "";
taskForm.classList.toggle("hidden");
currentTask = {};
}

if (taskData.length) {
updateTaskContainer();
}

/*opentaskform hidden old*/

closeTaskFormBtn.addEventListener("click", () => {
const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
} else {
    reset();
}
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
confirmCloseDialog.close();
reset()
});

taskForm.addEventListener("submit", (e) => {
e.preventDefault();
addOrUpdateTask();
filterAllTasks();
});

// Theme toggle (this took a hell lot of time to perfect with the CSS but it was worth it at the end)
const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('.icon');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.toggle('dark', savedTheme === 'dark');
      icon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
      const isDarkMode = document.body.classList.toggle('dark');
      icon.textContent = isDarkMode ? '🌙' : '☀️';

      // Save theme preference
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });




// Search and filter tasks (this was one of the most simple yet hard looking things I've worked on, it was so fun to test and play around!)
const filterAllTasks = () => {
  const searchValue = searchBar.value.toLowerCase();
  const dateValue = dateFilter.value;
  if(searchValue === "" && !dateValue){ // Simply put, if date and time are both empty, then just display the default task list
    updateTaskContainer();
    return;
  }

  const filterSystem = taskData.filter(({title, date, description}) => {
    return (title.toLowerCase().includes(searchValue) || description.toLowerCase().includes(searchValue)) && date.includes(dateValue); 
    // I just can't remember how I came up with the date filter solution. Guess I gotta figure out again the solution I thought of.
  });

  displayFilteredTasks(filterSystem);
};

const displayFilteredTasks = (filterSystem) => {
  tasksContainer.innerHTML = "";
  if(filterSystem.length === 0){
    tasksContainer.innerHTML = `<p>No tasks found 🚫</p>`;
    return;
  }

filterSystem.forEach(({ id, title, date, description, status }) => {
  tasksContainer.innerHTML += `
  <div class="individual-task-containers">
    <div class="task" id="${id}">
      <p><strong>Title:</strong> ${title}</p>
      <hr/>
      <p><strong>Date:</strong> ${date}</p>
      <hr/>
      <p class="description"><strong>Description:</strong> ${description}</p>
      <hr/>
      <div id="status">
        <input style="cursor:pointer;" type="checkbox" id="checkbox-${id}" ${status === "completed" ? "checked" : ""} onclick="toggleStatus(this, '${id}')">
        <label style="cursor:pointer;" for="checkbox-${id}">${status === "completed" ? `<span class="completed">Completed</span>` : `<span class="not-completed">Not Completed</span>`}</label>
      </div>
      <hr/>
      <button onclick="editTask(this)" type="button" class="btn" style="margin: 10px 36px 10px 0px;">Edit</button>
      <button onclick="deleteTask(this)" type="button" class="btn" style="margin: 10px 36px 10px 0px;">Delete</button> 
    </div>
  </div>
  `;
});
};

// Search bar input triggers filter mechanism
searchBar.addEventListener("input", filterAllTasks);
searchBar.addEventListener("click", filterAllTasks);

// Clearing the search bar will also reset the task list to default
clearBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  updateTaskContainer();
})

// Datw filter system
dateFilter.addEventListener("input", filterAllTasks);
/* dateFilter.addEventListener("click", (e) => {
  filterAllTasks();
});*/



