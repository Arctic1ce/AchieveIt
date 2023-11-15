/* Filename: server.js */
const express = require('express');
const cors = require('cors');
const service = require('./achieveit-database/service');
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

/* Validate a to-do item */
function ValidateItem(item) {
  if (item.task === undefined || item.task === '') {
    return false;
  }
  if (item.description === undefined || item.description === '') {
    return false;
  }
  if (item.due_date === undefined || item.due_date === '') {
    return false;
  }
  if (item.priority === undefined || item.priority === '') {
    return false;
  }
  if (item.task_category === undefined || item.task_category === '') {
    return false;
  }
  return true;
}
// Get all to-do lists
app.get('/', async (req, res) => {
  try {
    const name = req.query['name'];
    const result = name
      ? await service.getTodoList(name)
      : await service.getTodoList();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// Create a new to-do list
app.post('/', async (req, res) => {
  try {
    const newList = req.query['name'];
    const result = await service.createTodoList(newList);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// Add a new task to a to-do list
app.post('/tasks/', async (req, res) => {
  try {
    // Validate the item
    if (!ValidateItem(req.body) || req.query['name'] === undefined) {
      res.status(420).send();
      return;
    }

    const listName = req.query['name'];
    const newTask = req.body;
    const list = await service.getTodoList(listName);

    if (!list) {
      const result = await service.createTodoList(listName);
      res.send(result);
    } else {
      await service.createTodoItem(listName, newTask);
      // Get updated tasks and send the response after creating the task
      const updatedTasks = await service.getTodoList(listName);
      res.send(updatedTasks);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// Update a task's status
app.patch('/', async (req, res) => {
  try {
    const listName = req.query['name'];
    const taskName = req.query['task'];
    const status = req.query['status'];
    const result = await service.toggleCheck(listName, taskName, status);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a task from a to-do list
app.delete('/', async (req, res) => {
  try {
    const listName = req.query['name'];
    const taskName = req.query['task'];
    await service.deleteTodoItem(listName, taskName);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Run the server
app.listen(process.env.PORT || port, () => {
  console.log(`AchieveIt listening on port ${port}`);
});
