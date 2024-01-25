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

//add employee

router.get('/addemployee', (req,res) =>{
    res.render('addemployee')
});

router.post('/addemployee', (req, res) =>{

console.log(req.body);

const{name, address, number, role, salary} = req.body;

const values = [name, address, number, role, salary];

const selectSQL = `INSERT INTO employee (employee_name, employee_address, employee_number, employee_role, employee_salary) VALUES (?,?,?,?,?)`  ;
db.query(selectSQL, values, (err, rows) => {
    res.redirect('/view');
});

});

module.exports = router;