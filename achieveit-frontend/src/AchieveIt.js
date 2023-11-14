/* Filename: AchieveIt.js */
import Navbar from './Navbar';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';

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
        fetch('http://localhost:8000/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setTasks(data))
            .catch(error => {
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
            await fetch('http://localhost:8000/?name=' + listName, requestOptions);
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

        fetch(`http://localhost:8000/tasks/?name=${list}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => getTasks())
            .catch(error => console.error('Fetch error:', error));
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
            const response = await fetch('http://localhost:8000/?name=' + taskName + '&task=' + itemName + '&status=' + status, requestOptions);

            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                throw new Error(`Failed to update task status. Status: ${response.status}`);
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
    /* Delete a task */
    async function deleteTask(listName, taskName) {
        try {
            // Delete the task
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };

            // DELETE request using fetch with async/await
            const response = await fetch('http://localhost:8000/?name=' + listName + '&task=' + taskName, requestOptions);

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
        <div className="AchieveIt">
            <div className="header">
                <Navbar />
            </div>
            <div className="taskList">
                <TaskList lists={taskLists} addList={addList} numItems={numItems} setChecked={setChecked} insertTask={insertTask} deleteTask={deleteTask} />
            </div>
        </div>
    );
}
/* Export the component! */
export default AchieveIt;
