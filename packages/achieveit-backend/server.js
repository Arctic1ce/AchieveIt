/* Filename: server.js */
import express from 'express';
import cors from 'cors';
import service from './achieveit-database/service.js';
import auth from './achieveit-database/auth.js';
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

/* Validate a to-do item */
function ValidateItem(item) {
  if (item.task === undefined || item.task === '') {
    return false;
  }
  if (item.due_date === undefined || item.due_date === '') {
    return false;
  }
  if (item.priority === undefined || item.priority === '') {
    return false;
  }
  return !(item.task_category === undefined || item.task_category === '');

}

// Get all to-do lists
app.get('/', auth.authenticateUser, async (req, res) => {
  try {
    const username = req.headers['username'];
    const name = req.query['name'];
    const result = name
      ? await service.getTodoList(username, name)
      : await service.getTodoList(username);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a new to-do list
app.post('/', auth.authenticateUser, async (req, res) => {
  try {
    const username = req.headers['username'];
    const newList = req.query['name'];
    const result = await service.createTodoList(username, newList);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Add a new task to a to-do list
app.post('/tasks/', auth.authenticateUser, async (req, res) => {
  try {
    console.log()
    // Validate the item
    if (!ValidateItem(req.body) || req.query['name'] === undefined) {
      res.status(420).send();
      return;
    }

    const username = req.headers['username'];
    const listName = req.query['name'];
    const newTask = req.body;
    const list = await service.getTodoList(username, listName);

    if (!list) {
      const result = await service.createTodoList(username, listName);
      res.send(result);
    } else {
      await service.createTodoItem(username, newTask);
      // Get updated tasks and send the response after creating the task
      const updatedTasks = await service.getTodoList(username, listName);
      res.send(updatedTasks);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a task's status
app.patch('/', auth.authenticateUser, async (req, res) => {
  try {
    const username = req.headers['username'];
    const listName = req.query['name'];
    const taskName = req.query['task'];
    const status = req.query['status'];
    const result = await service.toggleCheck(username, listName, taskName, status);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a task from a to-do list
app.delete('/', auth.authenticateUser, async (req, res) => {
  try {
    const username = req.headers['username'];
    const listName = req.query['name'];
    const taskName = req.query['task'];
    await service.deleteTodoItem(username, listName, taskName);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a to-do list
app.delete('/list/', auth.authenticateUser, async (req, res) => {
  try {
    const username = req.headers['username'];
    const listName = req.query['name'];
    await service.deleteTodoList(username, listName);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Register a new user
app.post("/signup", auth.registerUser);

// Login a user
app.post("/login", auth.loginUser);

// Run the server
app.listen(process.env.PORT || port, () => {
  console.log(`AchieveIt listening on port ${port}`);
});
