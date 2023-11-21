/* Filename: AchieveIt.js */
import Nav from './Navbar';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

// The server location
const backend = require('./server-locations.json')['backend'];
const serverUrl = backend;

function AchieveIt() {
  const [taskLists, setTasks] = useState([]);
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    getTasks();
  }, []);

  /*
   * GetTasks: Fetches all the tasks from the database and updates the state
   * */
  function getTasks() {
    fetch(serverUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  /*
   * Update the number of items in the list
   *  */
  useEffect(() => {
    let count = 0;
    for (let i = 0; i < taskLists.length; i++) {
      count += taskLists[i].items.length;
    }
    setNumItems(count);
  }, [taskLists]);

  async function addList(listName) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      await fetch(serverUrl + '/?name=' + listName, requestOptions);
      await getTasks();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  /*
   * Insert a task into the database
   * */
  function insertTask(list, task) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    };

    fetch(serverUrl + `/tasks/?name=${list}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => getTasks())
      .catch((error) => console.error('Fetch error:', error));
  }
  /* Check or uncheck a task */
  async function setChecked(taskName, itemName, status) {
    try {
      // Set the task to completed
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      };

      console.log('checking: ' + taskName + ' ' + itemName + ' ' + status);

      // PATCH request using fetch with async/await
      const response = await fetch(
        serverUrl +
          '/?name=' +
          taskName +
          '&task=' +
          itemName +
          '&status=' +
          status,
        requestOptions,
      );

      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(
          `Failed to update task status. Status: ${response.status}`,
        );
      }

      // Update the state of the list of tasks
      await getTasks();

      // Optionally, you might want to return some information about the update
      return { success: true, message: 'Task status updated successfully' };
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle or propagate the error as needed
      throw error;
    }
  }

  /* Delete a list */
  async function deleteList(listName) {
    try {
      console.log(listName);
      // Delete the list
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };

      // DELETE request using fetch with async/await
      const response = await fetch(
        serverUrl + '/list/?name=' + listName,
        requestOptions,
      );

      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`Failed to delete list. Status: ${response.status}`);
      }

      // Update the state of the list of tasks
      await getTasks();

      // Optionally, you might want to return some information about the update
      return { success: true, message: 'List deleted successfully' };
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle or propagate the error as needed
      throw error;
    }
  }

  /* Delete a task */
  async function deleteTask(listName, taskName) {
    try {
      // Delete the task
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };

      // DELETE request using fetch with async/await
      const response = await fetch(
        serverUrl + '/?name=' + listName + '&task=' + taskName,
        requestOptions,
      );

      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
      }

      // Update the state of the list of tasks
      await getTasks();

      // Optionally, you might want to return some information about the update
      return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle or propagate the error as needed
      throw error;
    }
  }
  /* Render the page */
  return (
    <Router>
      <div className="AchieveIt">
        <div className="header">
          <Nav />
        </div>
        <div className="taskList">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <TaskList
                  lists={taskLists}
                  addList={addList}
                  numItems={numItems}
                  setChecked={setChecked}
                  insertTask={insertTask}
                  deleteTask={deleteTask}
                  deleteList={deleteList}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
/* Export the component! */
export default AchieveIt;
