const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks";';

    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making query: ${queryText}`, error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const { description } = req.body;
    const { is_complete } = req.body;

    const queryText = `
    INSERT INTO "tasks" ( "description", "is_complete" )
    VALUES ($1, $2);`
    ;

    pool.query(queryText, [description, is_complete])
    .then(result => {
        console.log('added new task to db:', result);
        res.sendStatus(201).send(result.rows[0]);
    })
    .catch(error => {
        console.log('added new task to db failed', error);
        res.sendStatus(500);
    });
});


// POST


// PUT

// DELETE

module.exports = router;
