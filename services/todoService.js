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
    let query = `SELECT task.task_id as id, task_name, task_desc, due_date, task_status, task_artifacts, task_item_id, item_name, item_status
                FROM task INNER JOIN task_item
                ON task.task_id = task_item.task_id`;
    let result = await dbPool.query(query);
    return result.rows;
}

async function getTaskWithItemsById(id) {
    let query = `SELECT task.task_id as id, task_name, task_desc, due_date, task_status, task_artifacts, task_item_id, item_name, item_status
                FROM task INNER JOIN task_item
                ON task.task_id = task_item.task_id
                WHERE task.task_id = $1`;
    let result = await dbPool.query(query, [id]);
    return result.rows;
}

async function createTask(task) {
    let query = `INSERT INTO task(task_name, task_desc, due_date, task_status, task_artifacts)
                VALUES ($1, $2, $3, $4, $5) RETURNING task_id`;
    let params = [task.taskName, task.taskDesc, task.dueDate, task.taskStatus, task.taskArtifacts];
    let result = await dbPool.query(query, params);
    return result.rows;
}


module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById,
    getTaskWithItems: getTaskWithItems,
    getTaskWithItemsById: getTaskWithItemsById,
    createTask: createTask
}