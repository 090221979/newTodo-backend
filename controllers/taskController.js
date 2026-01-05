import Task from "../models/Task.js";

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);//if res is ok convert tasks to json and send data as the response body
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
};

// CREATE a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority, category } = req.body;

    const task = new Task({
      title,
      description,
      status,
      dueDate,
      priority,
      category,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask); //201 = HTTP code when a new resource is created
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error creating task" });
  }
};

// UPDATE a task
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error updating task" });
  }
};

// DELETE a task
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error deleting task" });
  }
};
