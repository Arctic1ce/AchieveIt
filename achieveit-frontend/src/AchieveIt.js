// AchieveIt.js
import Navbar from './Navbar';
import TaskList from './TaskList';
import React, { useState, useEffect } from 'react';

const tasks = [
    {
        name: 'Favorites',
        items: [
            {
                task: 'Do laundry',
                description: 'some random description',
                due_date: 'some time',
                priority: 'High',
                task_category: 'Favorites',
                completed: false,
            },
        ],
    },
    {
        name: 'Groceries',
        items: [],
    },
    {
        name: 'Work',
        items: [],
    },
    {
        name: 'School',
        items: [
            {
                task: 'Do homework',
                description: 'some semi description',
                due_date: 'some random time',
                priority: 'Low',
                task_category: 'School',
                completed: false
            },
        ],
    },
    {
        name: 'Sports',
        items: [],
    },
    {
        name: 'Cars',
        items: [],
    },
    {
        name: 'Wishlist',
        items: [],
    },
    {
        name: 'Something',
        items: [],
    },
    {
        name: 'Idk',
        items: [],
    },
]

function AchieveIt() {
    const [taskLists, setTasks] = useState([]);
    const [numItems, setNumItems] = useState(0);

    useEffect(() => {
        setTasks(tasks);
        let count = 0;
        for (let i = 0; i < taskLists.length; i++) {
            count += taskLists[i].items.length;
        }
        setNumItems(count);
    }, [taskLists]);

    function addList(listName) {
        setTasks([...taskLists, {
            name: listName,
            num_items: 0,
            items: [],
        }]);
    }

    function setChecked(task, val, status) {
        let list = [...taskLists];
        for (let i = 0; i < taskLists.length; i++) {
            if (taskLists[i] === task) {
                for (let j = 0; j < taskLists[i].items.length; j++) {
                    if (taskLists[i].items[j] === val) {
                        list[i].items[j].completed = status;
                    }
                }

            }
        }
        setTasks(list);
    }

    return (
        <div className="AchieveIt">
            <div className="header">
                <Navbar />
            </div>
            <div className="taskList">
                <TaskList lists={taskLists} addList={addList} numItems={numItems} setChecked={setChecked} />
            </div>
        </div>
    );
}

export default AchieveIt;
