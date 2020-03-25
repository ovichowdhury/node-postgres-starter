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


module.exports = router;