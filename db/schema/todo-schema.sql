CREATE TABLE task (
    task_id SERIAL PRIMARY KEY NOT NULL,
    task_desc VARCHAR(255),
    due_date DATE,
    task_status VARCHAR(10) DEFAULT 'TODO' CHECK(task_status IN ('TODO', 'DOING', 'DONE')),
    task_artifacts JSON
);

CREATE TABLE task_item (
    task_item_id SERIAL PRIMARY KEY NOT NULL,
    item_name VARCHAR(30) NOT NULL,
    item_status VARCHAR(10) DEFAULT 'TODO' CHECK(item_status IN ('TODO', 'DOING', 'DONE')),
    task_id INTEGER,
    CONSTRAINT fk_task_and_task_item FOREIGN KEY(task_id) REFERENCES task(task_id)
);