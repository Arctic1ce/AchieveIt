// DON'T USE THIS IN PROD
// This is a test script for backend

import express from 'express';
import cors from 'cors';

import service from "./service";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');

});

// test create to do list
app.post('/todolist', (req, res) => {
    service.createTodoList(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// test get to do list
app.get('/todolist', (req, res) => {
    service.getTodoList()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// test delete to do list
app.delete('/todolist/:id', (req, res) => {
    service.deleteTodoList(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// test create to do item
app.post('/todolist/:id/item', (req, res) => {
    service.createTodoItem(req.params.id, req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// test delete to do item
app.delete('/todolist/:id/item/:itemID', (req, res) => {
    service.deleteTodoItem(req.params.id, req.params.itemID)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

