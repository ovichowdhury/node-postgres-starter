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

async function createTaskItem(taskItem) {
    let query = "INSERT INTO task_item (item_name, item_status, task_id) VALUES($1, $2, $3) RETURNING task_item_id";
    let params = [taskItem.name, taskItem.status, taskItem.taskId];
    let result = await dbPool.query(query, params);
    return result.rows;
}

async function deleteTaskItem(id) {
    let query = "DELETE FROM task_item WHERE task_item_id = $1";
    let params = [id];
    await dbPool.query(query, params);
    return {id: id};
}


async function deleteTask(id) {
    const client = await dbPool.connect();
    try {
        await client.query('BEGIN');

        let query1 = "DELETE FROM task_item WHERE task_id = $1";
        let params1 = [id];
        await client.query(query1, params1);

        let query2 = "DELETE FROM task WHERE task_id = $1";
        let params2 = [id];
        await client.query(query2, params2);

        await client.query('COMMIT')
    }
    catch(e) {
        await client.query('ROLLBACK')
        throw e
    }
    finally {
        client.release()
    }

    return {id: id};
}


module.exports = {
    getTasks: getTasks,
    getTaskById: getTaskById,
    getTaskWithItems: getTaskWithItems,
    getTaskWithItemsById: getTaskWithItemsById,
    createTask: createTask,
    createTaskItem: createTaskItem,
    deleteTaskItem: deleteTaskItem,
    deleteTask: deleteTask
}