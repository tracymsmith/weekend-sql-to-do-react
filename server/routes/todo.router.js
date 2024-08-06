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


// POST


// PUT

// DELETE

module.exports = router;
