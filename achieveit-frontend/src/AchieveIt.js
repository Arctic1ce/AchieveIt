// AchieveIt.js
import Navbar from './Navbar';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';

const tasks = [
    {
        name: 'All Tasks',
    },
    {
        name: 'Favorites',
    },
    {
        name: 'Groceries',
    },
    {
        name: 'Work',
    },
    {
        name: 'School',
    },
    {
        name: 'Sports',
    },
    {
        name: 'Cars',
    },
    {
        name: 'Wishlist',
    },
    {
        name: 'Something',
    },
    {
        name: 'Idk',
    },
]

function AchieveIt() {
    const [taskLists, setTasks] = useState([]);

    useEffect(() => {
        setTasks(tasks);
    }, []);

    return (
        <div className="AchieveIt">
            <div className="header">
                <Navbar />
            </div>
            <div className="taskList">
                <TaskList lists={taskLists} />
            </div>
        </div>
    );
}

export default AchieveIt;
