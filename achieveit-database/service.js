import mongoose from "mongoose";
import {TodoList, TodoItem} from "./schemas";

mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch((error) => console.log(error));

// Create a new to-do list
function createTodoList(listData) {
    const list = new TodoList(listData);
    const promise = list.save();
    return promise;
}

// Read all to-do lists, or read a single to-do list by name
function getTodoList(name) {
    let promise;
    if (name) {
        promise = TodoList.find({name: name});
    } else {
        promise = TodoList.find();
    }
    return promise;

}


// Delete a to-do list by name
function deleteTodoList(listName) {
    // get the list then delete it
    let promise;
    promise = TodoList.delete({name: listName});
    return promise;
}

// Create a new to-do item for a specific to-do list
function createTodoItem(listName, itemData) {
    let promise;
    promise = TodoList.find({name: listName});
    const item = new TodoItem(itemData);
    promise = item.save();

}


// Delete a to-do item for a specific to-do list
function deleteTodoItem(listName, task) {
    let promise;
    promise = TodoList.find({name: listName});
    promise = TodoItem.delete({task: task});
    return promise;

}

