const express = require('express');
const router = express.Router();
const db = require('./../util/dbconn');

router.get('/', (req,res) => {
    
});

router.get('/view', (req,res) => {
    const selectSQL = `SELECT * FROM employee`;

    db.query(selectSQL, (err, rows) => {
        console.log(rows);
        res.render('viewemployees', {data: rows});
    });
});

module.exports = router;