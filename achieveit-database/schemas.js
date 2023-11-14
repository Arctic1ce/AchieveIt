/* Filename: schemas.js */
const mongoose = require('mongoose');
const { mongo } = require('mongoose');
const todoItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoList',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  due_date: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const todoListSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoItem',
    },
  ],
});

module.exports = {
  TodoItem: mongoose.model('TodoItem', todoItemSchema),
  TodoList: mongoose.model('TodoList', todoListSchema),
};
