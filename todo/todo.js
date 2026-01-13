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