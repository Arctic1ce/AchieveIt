import mongoose from 'mongoose';

const toDoItemSchema = new mongoose.Schema({
        task: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        dueDate: {
            type: Date,
            default: Date.now
        },
        priority: {
            type: String,
            default: 'low'
        },

    },
);

const toDoListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [toDoItemSchema]
});

module.exports= {
    TodoItem : mongoose.model('TodoItem', toDoItemSchema),
    TodoList : mongoose.model('TodoList', toDoListSchema)
};