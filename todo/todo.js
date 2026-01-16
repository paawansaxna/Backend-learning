const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname, "tasks.json");

const command = process.argv[2]
const argument = process.argv[3]

const loadTasks = () =>{
    try {
        const databuffer = fs.readFileSync(filepath);
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const saveTasks = (tasks) =>{
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filepath, dataJSON);
};

const addTask = (task) =>{
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("task added", task )
};

const listTasks = () =>{
    const tasks = loadTasks();
    tasks.forEach((task,index) => console.log(`${index +1} - ${task.task}`));        
};

if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTasks();
} else {
    console.log("Command not found!")
}


// NOTE

// Step 1: Decide what this program is

// “I want a command-line app where a user can add tasks and list them later.”

// This immediately creates two requirements:
// • User must give commands
// • Data must stay saved after the program ends

// ⸻

// Step 2: Decide where data will live

// So the developer thinks:

// “I need one permanent place to store tasks.”

// That’s why they define a file path like:
// const filePath = “./tasks.json”

// This line exists because:
// • You don’t want to hardcode file names everywhere
// • If storage changes later, you update it in one place

// This same idea is used anywhere data needs persistence:
// • task lists
// • user settings
// • logs
// • cached responses

// ⸻

// Step 3: Enable file access

// Now the developer asks:

// “How will JavaScript read and write files?”

// Answer:
// const fs = require(“fs”)

// This line gives the program the ability to:
// • read existing data
// • write updated data
// • create files if they don’t exist

// This is the gateway to persistence in Node.js.

// ⸻

// Step 4: Decide how user will interact

// Next thought:

// “How will the user tell my program what to do?”

// Since it’s a CLI app, the answer is:
// const command = process.argv[2]
// const argument = process.argv[3]

// This means:
// • User types something in terminal
// • Node captures it as an array
// • We pick what matters

// This same thinking exists in:
// • npm commands
// • git commands
// • build scripts

// Only the interface changes, not the idea.

// ⸻

// Step 5: Always load existing data first

// Before doing anything, the developer knows:

// “I must read current tasks before modifying them.”

// So they create a function whose responsibility is:
// • read the file
// • convert raw data to usable format
// • return an empty list if nothing exists

// Mentally, the logic is:
// “If file exists → use it
// If not → start fresh”

// This protects the program from crashing and makes it first-run safe.

// ⸻

// Step 6: Save data after any change

// Another natural thought:

// “Whatever I change in memory must be saved.”

// That’s why there is a function that:
// • takes current tasks
// • converts them to JSON text
// • writes them back to the same file

// This idea exists everywhere:
// • saving profile changes
// • updating configuration
// • writing logs

// Memory is temporary. Storage is permanent.

// ⸻

// Step 7: Handle the ADD command

// Now the developer focuses on behavior:

// “When user says ADD, what should happen?”

// The thinking sequence is:
// • load existing tasks
// • add new task to list
// • save updated list

// This load → modify → save flow is a universal backend pattern.

// Same logic is used in:
// • adding a product
// • registering a user
// • posting a comment

// ⸻

// Step 8: Handle the LIST command

// Next behavior:

// “When user says LIST, show all tasks.”

// So the thinking becomes:
// • load saved tasks
// • loop through them
// • display them cleanly

// This is just reading + presenting data, nothing more.

// The same mental model exists in:
// • dashboards
// • admin panels
// • reports

// ⸻

// Step 9: Connect user commands to actions

// Only after all behaviors exist does the developer write:

// “If command is ADD → run add logic
// If command is LIST → run list logic
// Else → show error”

// This is routing, but in terminal form instead of HTTP.

// ⸻

// The BIG takeaway (very important)

// What you’re really learning is NOT Node.js syntax.

// You’re learning how developers think:
// 	1.	Decide purpose
// 	2.	Decide storage
// 	3.	Decide input method
// 	4.	Load data
// 	5.	Modify data
// 	6.	Save data
// 	7.	Route user intent