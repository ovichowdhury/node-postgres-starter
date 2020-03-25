const dbPool = require('../db/index');

async function getTasks() {
    let query = "SELECT * FROM task";
    let result = await dbPool.query(query);
    return result.rows;
}

async function getTaskById(id) {
    let query = "SELECT * FROM task WHERE task_id = $1";
    let result = await dbPool.query(query, [id]);
    return result.rows;
}

async function getTaskWithItems() {
    
}

module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById
}