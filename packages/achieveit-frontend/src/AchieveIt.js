/* Filename: AchieveIt.js */
import Nav from './Navbar';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import * as process from 'process';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

// The server location
let backend = require('./server-locations.json')['backend'];
if (process.argv.includes('--local')) {
  // set to http://localhost:8000 for local development
  backend = 'http://localhost:8000';
}

const serverUrl = backend;

function AchieveIt() {
  const cookies = new Cookies();
  const INVALID_TOKEN = 'INVALID_TOKEN';
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [taskLists, setTasks] = useState([]);
  const [numItems, setNumItems] = useState(0);

  useEffect(() => {
    // Check if there is a token in localStorage when the component mounts
    const storedToken = cookies.get('authToken');
    if (!storedToken) {
      cookies.set('authToken', INVALID_TOKEN);
    }

    const username = cookies.get('username');
    if (!username) {
      cookies.set('username', null);
    }

    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * GetTasks: Fetches all the tasks from the database and updates the state
   * */
  function getTasks() {
    fetch(serverUrl, {
      headers: addAuthHeader(),
    })
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
      headers: addAuthHeader({ 'Content-Type': 'application/json' }),
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
      headers: addAuthHeader({ 'Content-Type': 'application/json' }),
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
        headers: addAuthHeader({ 'Content-Type': 'application/json' }),
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
        headers: addAuthHeader({ 'Content-Type': 'application/json' }),
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
        headers: addAuthHeader({ 'Content-Type': 'application/json' }),
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

  function logoutUser() {
    cookies.set('authToken', INVALID_TOKEN);
    cookies.set('username', null);
    setUser(null);
  }

  function loginUser(creds) {
    const cred = {
      username: creds.email,
      pwd: creds.password,
    };

    const promise = fetch(`${serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cred),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => {
            const decoded = jwtDecode(payload.token);
            setUser(decoded);
            cookies.set('authToken', payload.token);
            cookies.set('username', cred.username);
          });
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function signupUser(creds) {
    const cred = {
      username: creds.email,
      pwd: creds.password,
    };

    const promise = fetch(`${serverUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cred),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => {
            const decoded = jwtDecode(payload.token);
            setUser(decoded);
            cookies.set('authToken', payload.token);
            cookies.set('username', cred.username);
            console.log('sign up token: ' + payload.token);
          });
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`,
          );
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    console.log('user' + user);
    console.log('message' + message);
    return promise;
  }

  function addAuthHeader(otherHeaders = {}) {
    const authToken = cookies.get('authToken');
    const username = cookies.get('username');

    if (authToken === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        username: username,
        Authorization: `Bearer ${authToken}`,
      };
    }
  }

  const PrivateRoute = () => {
    const authToken = cookies.get('authToken');
    return authToken !== INVALID_TOKEN ? <Outlet /> : <Navigate to="/login" />;
  };

  const [isDark, setIsDark] = useState(false);

  function setDarkMode(val) {
    setIsDark(val);
  }

  /* Render the page */
  return (
    <main
      className={`${
        isDark ? 'achieveit-dark' : 'achieveit-light'
      } text-foreground bg-background`}>
      <Router>
        <div className="flex flex-col AchieveIt">
          <div className="flex-row header">
            <Nav
              logoutUser={logoutUser}
              token={cookies.get('authToken')}
              isDark={isDark}
              setDarkMode={setDarkMode}
            />
          </div>
          <div className="flex-1 taskList">
            <Routes>
              <Route
                path="/login"
                element={<Login handleSubmit={loginUser} />}
              />
              <Route
                path="/signup"
                element={<Signup handleSubmit={signupUser} />}
              />
              <Route element={<PrivateRoute />}>
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
                      token={cookies.get('authToken')}
                      loginUser={loginUser}
                      isDark={isDark}
                    />
                  }
                />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </main>
  );
}
/* Export the component! */
export default AchieveIt;
