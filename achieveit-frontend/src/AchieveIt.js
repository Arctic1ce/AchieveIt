// AchieveIt.js
import Navbar from './Navbar';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';

function AchieveIt() {
    const [taskLists, setTasks] = useState([]);
    const [numItems, setNumItems] = useState(0);

    useEffect(() => {
        getTasks();
    }, []);

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
    
    useEffect(() => {
        let count = 0;
        for (let i = 0; i < taskLists.length; i++) {
            count += taskLists[i].items.length;
        }
        setNumItems(count);
    }, [taskLists]);

    function addList(listName) {
        let taskList = taskLists.filter(list => list.name === listName);
        console.log(taskList);
        console.log(taskList.length);

        if (taskList.length > 0) {
            return;
        }

        const newItem = {
            name: listName,
            items: [],
        };
        setTasks([...taskLists, newItem]);
    }

    function insertTask(list, task) {
        let newLists = [...taskLists];
        for (let i = 0; i < taskLists.length; i++) {
            if (taskLists[i].name === list) {
                newLists[i].items.push(task);
            }
        }
        setTasks(newLists);
    }

    function setChecked(taskName, itemName, status) {
        const updatedTaskLists = taskLists.map((taskList) => {
            if (taskList.name === taskName) {
                const updatedItems = taskList.items.map((item) => {
                    if (item.task === itemName) {
                        return { ...item, completed: status };
                    }
                    return item;
                });
                return { ...taskList, items: updatedItems };
            }
            return taskList;
        });
        setTasks(updatedTaskLists);
    }

    return (
        <div className="AchieveIt">
            <div className="header">
                <Navbar />
            </div>
            <div className="taskList">
                <TaskList lists={taskLists} addList={addList} numItems={numItems} setChecked={setChecked} insertTask={insertTask} />
            </div>
        </div>
    );
}

export default AchieveIt;
