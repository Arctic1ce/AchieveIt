// AchieveIt.js
import Navbar from './Navbar';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';

const tasks = [
    {
        name: 'All Tasks',
        num_items: 43,
    },
    {
        name: 'Favorites',
        num_items: 4,
    },
    {
        name: 'Groceries',
        num_items: 7,
    },
    {
        name: 'Work',
        num_items: 10,
    },
    {
        name: 'School',
        num_items: 3,
    },
    {
        name: 'Sports',
        num_items: 2,
    },
    {
        name: 'Cars',
        num_items: 1,
    },
    {
        name: 'Wishlist',
        num_items: 5,
    },
    {
        name: 'Something',
        num_items: 7,
    },
    {
        name: 'Idk',
        num_items: 4,
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
