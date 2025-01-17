# Todo App - Taskify
#### Video Demo:  https://youtu.be/jJYw75O8eFk
#### Description: This Todo App called "Taskify" allows users to manage their tasks efficiently. The main features include:

- **Task Management:** Users can create, edit, and delete tasks at will.
- **Search Bar:** Filters tasks by name and description, so you don't get lost while searching for a specific task you've had in mind!
- **Date Filter:** Filters tasks by their due date just in case you forgot the title or description of your tasks!
- **Theme Toggle:** Switches between light and dark modes for better usability whether you're a night or day person!

The project is composed of three main files:

- <span style="color:#e96125">**index.html</span>:** The main HTML structure for the app’s user interface.
- <span style="color:#39aecf">**styles.css</span>:** Contains all the styles to make the app look visually appealing and giving it the Google Theme, including the light and dark theme toggle functionality.
- <span style="color:yellow">**script.js:</span>** Manages all the dynamic features like task creation, editing and deleting. Filtering for search, status of completion, and theme switching.

Each of these files interacts to create a seamless experience for managing tasks in a simple yet functional interface that gives the Google interface vibe.

This project, my first Todo app, was developed in less than a week using the JavaScript, CSS, and HTML knowledge I acquired through freeCodeCamp. While the app is fully functional and meets its primary objectives, there is still room for further improvements and enhancements.

The most significant challenge I faced was implementing the search filter to dynamically search through tasks and their descriptions. To overcome this, I brainstormed the algorithm with a coworker during my internship, though the project itself was entirely my own work without collaboration from other students. Once I refined the logic, I implemented a search function that was both efficient and responsive, using minimal space in the `script.js` file.

On the design side, the CSS posed its own set of challenges, particularly in aligning header elements horizontally while maintaining equal spacing and symmetry. This required precise adjustments, as other elements on the page often collided, leading to complications.

After completing the search filter, implementing the date filter was straightforward and took minimal time. However, in a moment of excitement after everything worked seamlessly, I forgot my initial reasoning for including the date filter. This is documented in the `script.js` file for transparency.


My main concept for an engaging and visually captivating Todo App theme was to emulate **Google's signature simplicity**, uniqueness, and charm. By incorporating Google's iconic red, yellow, green, and blue accents for key elements, I aimed to create a design that is both familiar and striking.

To complement this, the theme switch was inspired by **Discord’s color palette**, seamlessly blending light and dark modes to enhance usability and aesthetic appeal. This combination makes the app feel like a harmonious fusion of Google's clean design principles and Discord's modern interface.


## How it works

### Local Storage

The functionality of `script.js` revolves around managing an array of objects that represent tasks, leveraging localStorage to persist data.

> <strong><span style="color:yellow">JS Javascript</span></strong>
```javascript
// This array will store all the tasks along with their associated data, including title, due date, and description. 
const taskData = JSON.parse(localStorage.getItem("data")) || [];
```
Each task object in the array contains properties such as the task’s title, description, and due date. The array is initialized by either retrieving previously saved tasks from `localStorage` (using `JSON.parse`) or creating an empty array if no data exists.
<br><br>

> <strong><span style="color:yellow">JS Javascript</span></strong>
```javascript
// Saves the updated data back to localStorage
localStorage.setItem("data", JSON.stringify(taskData));
```

When users create, edit, or delete tasks, these actions dynamically update the `taskData` array. The modified array is then saved back to `localStorage` using `JSON.stringify`, ensuring that all changes are stored persistently.

Key functionalities such as filtering tasks by name, description, or due date work by iterating over this array and applying user-defined criteria. The `taskData` array serves as the backbone of the app, allowing for seamless interaction and a responsive user experience.


### Task Containers

The `updateTaskContainer` function dynamically updates the task container in the app's interface.

> <strong><span style="color:yellow">JS Javascript</span></strong>
```javascript
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
          <div id="status">
            <input type="checkbox" id="checkbox-${id}" ${status === "completed" ? "checked" : ""} onclick="toggleStatus(this, '${id}')">
            <label for="checkbox-${id}">${status === "completed" ? `<span class="completed">Completed</span>` : `<span class="not-completed">Not Completed</span>`}</label>
          </div>
          <hr/>
          <button onclick="editTask(this)" type="button" class="btn" style="margin: 10px 36px 10px 0px;">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn" style="margin: 10px 36px 10px 0px;">Delete</button> 
        </div>
      </div>
      `;
    });
  };
```

It first clears the existing content of the container, then loops through the `taskData` array to create HTML elements for each task. For each task, it generates a structure that includes the task's title, date, description, and status (either "completed" or "not completed"). It also includes an interactive checkbox to toggle the task's status and a button to edit the task. This function effectively refreshes the task list with updated information whenever it's called.

### Theme Toggle

This feature allows the user to switch between `dark` and `light` themes, with the user's preference saved for future visits.

> <strong><span style="color:yellow">JS Javascript</span></strong>
```javascript
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
```
<br>

> <strong><span style="color:#39aecf"># CSS</span></strong>
```css
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: var(--bg-color-light);
    transition: background-color var(--transition-duration), color var(--transition-duration);
  }

body.dark {
  background-color: var(--bg-color-grey);
}
```

This code allows the user to toggle between dark and light modes through `CSS` and `Javascript`. It checks the stored theme preference in the `localStorage` when the page loads and applies it. Upon clicking the theme toggle button, the theme switches and the choice is saved in the localStorage for future visits.

### Filtering System

This system uses both a text input (search bar) and a date input to filter tasks based on their title, description, and due date.

> <strong><span style="color:yellow">JS Javascript</span></strong>

```javascript
// Search and filter tasks (this was one of the most simple yet hard looking things things I've worked on, it was so fun to test and play around!)
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
        <input type="checkbox" id="checkbox-${id}" ${status === "completed" ? "checked" : ""} onclick="toggleStatus(this, '${id}')">
        <label for="checkbox-${id}">${status === "completed" ? `<span class="completed">Completed</span>` : `<span class="not-completed">Not Completed</span>`}</label>
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
```

The `filterAllTasks` function listens for changes in both the search bar and the date filter input. It first checks if either of these inputs has a value. If both are empty, it resets the task list. If either has a value, it filters the task data array by checking if the task's title or description includes the search term, and if the task's date matches the date filter. The filtered tasks are then passed to the `displayFilteredTasks` function, which updates the task list UI accordingly. Additionally, the search bar and date filter have event listeners to trigger the filtering mechanism when their values change. The clear button resets the task list when clicked.
<br><br>

## Final review

This Todo App project allowed me to apply and expand my skills in JavaScript, HTML, and CSS, bringing together everything I’ve learned so far into a functional and aesthetically pleasing app. While this is my first release, there are still opportunities for improvements, such as further enhancing the user interface and optimizing the code. Overall, I’m proud of how it turned out and am excited to continue developing my skills with future projects.
