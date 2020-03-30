const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService');

router.get('/get-tasks', async (req, res, next) => {
    try {
        if (req.query.id) {
            let result = await todoService.getTaskById(req.query.id);
            return res.status(200).json(result);
        }
        else {
            let result = await todoService.getTasks();
            return res.status(200).json(result);
        }

    }
    catch (ex) {
        return res.status(500).json({ message: ex.toString() });
    }
})

router.get('/get-tasks-with-items', async (req, res, next) => {
    try {
        if (req.query.id) {
            let result = await todoService.getTaskWithItemsById(req.query.id);
            return res.status(200).json(result);
        }
        else {
            let result = await todoService.getTaskWithItems();
            return res.status(200).json(result);
        }

    }
    catch (ex) {
        return res.status(500).json({ message: ex.toString() });
    }
});


router.post('/create-task', async (req, res, next) => {
    try {
        let task = {
            taskName: req.body.taskName,
            taskDesc: req.body.taskDesc,
            dueDate: req.body.dueDate,
            taskStatus: req.body.taskStatus,
            taskArtifacts: req.body.taskArtifacts
        }
        let result = await todoService.createTask(task);
        return res.status(201).json(result);

    }
    catch (ex) {
        return res.status(500).json({ message: ex.toString() });
    }
});

router.post('/create-task-item', async (req, res, next) => {
    try {
        let taskItem = {
            name: req.body.name,
            status: req.body.status,
            taskId: req.body.taskId
        }
        let result = await todoService.createTaskItem(taskItem);
        return res.status(201).json(result);
    }
    catch(ex) {
        console.log(ex);
        return res.status(500).json({ message: ex.toString() });
    }
});

router.delete('/delete-task-item/:id', async (req, res,next) => {
    try {
        let result = await todoService.deleteTaskItem(req.params.id);
        return res.status(200).json({message: "Deleted Successfully", id: result.id});
    }
    catch(ex) {
        return res.status(500).json({ message: ex.toString() });
    }
});


router.delete('/delete-task/:id', async (req, res, next) => {
    try {
        let result = await todoService.deleteTask(req.params.id);
        return res.status(200).json({message: "Deleted Successfully", id: result.id});
    }
    catch(ex) {
        return res.status(500).json({ message: ex.toString() });
    }
});


module.exports = router;