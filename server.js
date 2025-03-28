import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());


let tasks = [
    { id: "1", title: "Buy groceries", description: "test groceries", dueDate: "2025-03-26" },
    { id: "2", title: "Workout", description: "do workout", dueDate: "2025-03-27"},
];
  
// GET endpoint return all tasks
app.get("/api/tasks", (req, res) => {
    res.status(200).json(tasks);
});
  
//Post endpoint to create a task. 
app.post("/api/createtask", (req, res) => {
    const { title, description, dueDate } = req.body;
    const newId = uuidv4();
    const newTask = { id: newId, title: title, description: description, dueDate: dueDate  };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
 
//Put endpoint to update a task
app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
  
    let task = tasks.find((t) => t.id === id);
    if (task) {
        task.title = title !== undefined && title !== null ? title : task.title;
        task.description = description !== undefined && description !== null ? description : task.description;
        task.dueDate = dueDate !== undefined && dueDate !== null ? dueDate : task.dueDate;
      res.status(200).json({ message: "Task updated successfully!", task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
});
  
//Delete endpoint to delete a task
app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    let task = tasks.find((t) => t.id === id);
    if (task) {
      tasks = tasks.filter((t) => t.id !== id);
      res.status(200).json({ message: "Task deleted successfully!", task });
    } else
        res.status(404);
});
  
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});