const mongoose = require('mongoose');
// schemas.js

const todoItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoList',
        required: true
    }
    // other fields...
});

const todoListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [todoItemSchema]
});

// Add ID field
todoListSchema.add({
    _id: mongoose.Schema.Types.ObjectId
});

module.exports= {
    TodoItem : mongoose.model('TodoItem', todoItemSchema),
    TodoList : mongoose.model('TodoList', todoListSchema)
};