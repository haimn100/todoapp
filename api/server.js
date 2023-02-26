const express = require('express');
const cors = require('cors');
const Todo = require('./data/model/Todo');

const app = express();

app.use(express.json());
app.use(cors());

app.route('/api/todos')
    .get(async (req, res) => {
        try {
            const data = await Todo.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        const { task } = req.body;      
        try {
            const data = await Todo.add(task);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

app.route('/api/todos/:id')
    .delete(async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const todo = await Todo.findOne(id);
            if(todo){
                await todo.delete(); 
                res.status(200).json({ id });
            }else{
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            const todo = new Todo({id:req.params.id,...req.body});
            await todo.save();
            res.status(200).json(todo);
        } catch (error) {
            res.status(500).json({ error });
        }
    });

module.exports = app;
