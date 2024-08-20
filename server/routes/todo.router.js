const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET Route
router.get('/', (req, res) => {
    console.log('Initiating GET route');
    const queryText = 'SELECT * FROM "tasks";';

    pool.query(queryText)
        .then((result) => {
            console.log('Fetched tasks:', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.error('Error fetching tasks:', error);
            res.sendStatus(500); 
        });
});

// POST Route
router.post('/', (req, res) => {
    const { description, is_complete } = req.body;

    console.log('Received new task:', req.body); // Log the request body

    

    const queryText = `
        INSERT INTO "tasks" 
            ("description", "is_complete") 
        VALUES
            ($1, $2)
        RETURNING *;
    `;

    pool.query(queryText, [description, is_complete])
        .then(result => {
            console.log('Task inserted:', result.rows[0]);
            res.status(201).send(result.rows[0]); // Return the inserted task
        })
        .catch(error => {
            console.error('Error inserting task:', error);
            res.status(500).send('Server error: ', error);
        });
});


// DELETE
router.delete('/:id', (req, res) => {
    const taskId = req.params.id; 

    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1;'; 

    pool.query(queryText, [taskId])
        .then((result) => {
            console.log('Task deleted with ID:', taskId);
            res.status(200).json({ message: 'Task deleted' });
        })
        .catch((error) => {
            console.error('Error deleting task:', error);
            res.sendStatus(500); 
        });
});

// PUT
router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    const { is_complete } = req.body;

    const queryText = `
        UPDATE "tasks"
        SET "is_complete" = $1
        WHERE "id" = $2
        RETURNING *; 
    `;

    pool.query(queryText, [is_complete, taskId])
        .then(result => {
            console.log('Task updated:', result.rows[0]);
            res.status(200).send(result.rows[0]); 
        })
        .catch(error => {
            console.error('Error updating task:', error);
            res.sendStatus(500);
        });
});

module.exports = router;