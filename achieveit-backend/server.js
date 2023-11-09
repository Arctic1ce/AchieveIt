const express = require('express')
const cors = require("cors")
const app = express()
const port = 8000
app.use(cors());
app.use(express.json())



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

app.get('/', (req, res) => {
    res.json(tasks);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})