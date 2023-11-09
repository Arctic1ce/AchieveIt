const mongoose = require('mongoose');
// schemas.js
// mock to do item
const mockTodoItem = {
    name: 'Do homework',
    description: 'some semi description',
    due_date: 'some random time',
    priority: 'Low',
    task_category: 'School',
    completed: false
};
const todoItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoList',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    // other fields...
});

const todoListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [todoItemSchema]
});



module.exports= {
    TodoItem : mongoose.model('TodoItem', todoItemSchema),
    TodoList : mongoose.model('TodoList', todoListSchema)
};