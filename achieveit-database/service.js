const mongoose = require("mongoose");
const {TodoItem, TodoList} = require("./schemas");
mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch((error) => console.log(error));

// Create a new to-do list
function createTodoList(listName) {
    // create a new list
    let promise = TodoList.create({name: listName, items: []});
    return promise;
}

// Read all to-do lists, or read a single to-do list by name
function getTodoList(name) {
    let promise;
    if (name) {
        promise = TodoList.find({name: name}).populate({ path: 'items',
            model: 'TodoItem'});
    } else {
        promise = TodoList.find().populate({
            path: 'items',
            model: 'TodoItem'
        });
    }
    return promise;
}


// Delete a to-do list by name
function deleteTodoList(listName) {
    let promise;
    promise = TodoList.deleteOne({name: listName});
    return promise;
}

// Create a new to-do item for a specific to-do list
function createTodoItem(listName, itemData) {
    let promise;
    // const newItem = new TodoItem(itemData);
    // promise =  TodoList.updateOne({name: listName}, {$push: {items: newItem}});
    promise = TodoItem.create(
        name = itemData.name,
        listId = itemData.listId,
        description = itemData.description,
        due_date = itemData.due_date,
        priority = itemData.priority,
        completed = itemData.completed
    );
    return promise;
}


// Delete a to-do item for a specific to-do list
function deleteTodoItem(listName, itemID) {
    let promise =  TodoList.updateOne({name: listName}, {$pull: {items: {_id: itemID}}});
    return promise;
}

function getTodoItem(itemID) {
    let promise = TodoItem.find({_id: itemID});
    return promise;
}

module.exports = {
    createTodoList,
    getTodoList,
    deleteTodoList,
    createTodoItem,
    deleteTodoItem
};