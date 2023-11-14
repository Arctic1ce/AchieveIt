const express = require('express')
const cors = require("cors")
const service = require( "../achieveit-database/service");
const app = express()
const port = 8000
app.use(cors());
app.use(express.json())

/* Validate a to-do item */
function ValidateItem(item) {
    if (item.task === undefined || item.task === "") {
        return false;
    }
    if (item.description === undefined || item.description === "") {
        return false;
    }
    if (item.due_date === undefined || item.due_date === "") {
        return false;
    }
    if (item.priority === undefined || item.priority === "") {
        return false;
    }
    if (item.task_category === undefined || item.task_category === "") {
        return false;
    }
    return true;
}

/* Sample data */
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
/* Get all to-do lists or a specific to-do list*/
app.get('/', (req, res) => {
    // read from the database and get all the todolists
    let name = req.query['name']
if (name) {
        service.getTodoList(name).then((result) => {
            res.send(result);
        })
    }
    else {
        service.getTodoList().then((result) => {
            res.send(result);
        })
    }
})



/* Add a new to-do list */
app.post('/', (req, res) => {
    const newList = req.query['name'];
    service.createTodoList(newList).then((result) => {
        res.send(result);

    });
})

/* Add a new task to a to-do list */
app.post('/tasks/', (req, res) => {
    // Validate the item
    console.log("query: " + req.query)
    if (!ValidateItem(req.body) || req.query['name'] === undefined) {
        res.status(420).send();
        return;
    }
    const listName = req.query['name'];
    const newTask = req.body;
    const list = service.getTodoList(listName);
    if (list === undefined) {
        service.createTodoList(listName).then((result) => {
            res.send(result);
        });
    }
    else{
        service.createTodoItem(listName, newTask).then((result) => {
            res.send(result);
        });
    }

})
/* Mark a task as completed */
app.patch('/', (req, res) => {
    const listName = req.query['name'];
    const taskName = req.query['task'];
    const status = req.query['status'];

        service.toggleCheck(listName, taskName,status).then((result) => {
            res.send(result);
        });

})

app.get('/tasks/', (req, res) => {
    // get all the tasks
    service.getAllToDos().then((result) => {
        res.send(result);
    });
}, (error) => {
    console.log(error);
    res.send(error);
})

app.delete('/', (req, res) => {
    const listName = req.query['name'];
    const taskName = req.query['task'];
    service.deleteTodoItem(listName, taskName).then((result) => {
        // send 200 if successful
        res.status(200).send();
    });
})

app.listen(port, () => {
  console.log(`AchieveIt listening on port ${port}`)
})