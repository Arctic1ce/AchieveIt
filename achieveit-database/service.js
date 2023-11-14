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
        promise = TodoList.find({name: name}).populate({
            path: 'items',
            model: 'TodoItem'
        });
    } else {
        promise = TodoList.find()
            .populate({
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
    // get the list id from the list name
    let listId;
    getTodoList(itemData.task_category).then((result) => {
        listId = result[0]._id;

    console.log("listId: " + listId)
    console.log(itemData)
    let obj = {
        name: itemData.task,
        listId: listId,
        description: itemData.description,
        due_date: itemData.due_date,
        priority: itemData.priority,
        completed: itemData.completed
    }
    promise = TodoItem.create(
        obj
    ).then((result) => {
        console.log("result: " + result)
        TodoList.updateOne({name: listName}, {$push: {items: result._id}}).then((result) => {
            console.log("result: " + result)
        })
    }  );
    return promise;
    });

    }



function deleteTodoItem(listName, itemName) {
    return getTodoList(listName)
        .then((result) => {
            const listId = result[0]._id;
            console.log("listId: " + listId);

            // Return the promise generated by TodoItem.deleteOne directly
            return TodoItem.deleteOne({ name: itemName, listId: listId });
        })
        .catch((error) => {
            console.error("An error occurred:", error);
            // Handle or propagate the error as needed
            throw error;
        });
}


function getTodoItem(itemID) {
    let promise = TodoItem.find({_id: itemID});
    return promise;
}

function getAllToDos() {
    let promise = TodoItem.find();
    return promise;
}

function toggleCheck(listName, taskName, status) {
    return getTodoList(listName)
        .then((list) => {
            const listId = list[0]._id;
            console.log("listId: " + listId);

            // Update the task's completed status
            return TodoItem.updateOne({ name: taskName }, { $set: { completed: status } });
        })
        .catch((error) => {
            console.error("An error occurred:", error);
            throw error; // You can handle or propagate the error as needed
        });
}

module.exports = {
    createTodoList,
    getTodoList,
    deleteTodoList,
    createTodoItem,
    deleteTodoItem,
    toggleCheck,
};