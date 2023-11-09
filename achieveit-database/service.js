const mongoose = require("mongoose");
const {TodoItem, TodoList} = require("./schemas");
mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch((error) => console.log(error));

// Create a new to-do list
function createTodoList(listData) {
    const newList = new TodoList(listData);
    return newList.save();

}

// Read all to-do lists, or read a single to-do list by name
function getTodoList(id) {
    let promise;
    if (id) {
        promise = TodoList.find({_id: id});
    } else {
        promise = TodoList.find();
    }
    return promise;
}


// Delete a to-do list by name
function deleteTodoList(listID) {
    let promise;
    promise = TodoList.delete({_id: listID});
}

// Create a new to-do item for a specific to-do list
function createTodoItem(listID, itemData) {
    const newItem = new TodoItem(itemData);
    return TodoList.update({_id: listID}, {$push: {items: newItem}});
}


// Delete a to-do item for a specific to-do list
function deleteTodoItem(listID, itemID) {
    return TodoList.update({_id: listID}, {$pull: {items: {_id: itemID}}});
}

module.exports = {
    createTodoList,
    getTodoList,
    deleteTodoList,
    createTodoItem,
    deleteTodoItem
};