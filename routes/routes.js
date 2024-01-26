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

// edit employee

router.get('/editemployee/:id', (req,res) => {
    
    const{id}=req.params;
    const vals = [id];
    const selectSQL = `SELECT * FROM employee WHERE employee_id =?`;

    db.query(selectSQL, vals, (err, rows) => {
        console.log(rows);
        res.render('editemployee', {data: rows[0]});
    });
});

router.post('/editemployee', (req, res) => {
    
    
    const { name, address, role, salary, id } = req.body;
    const values = [name, address, role, salary, id]; // assuming 'number' is the identifier for the employee
    
    const updateSQL = `UPDATE employee SET employee_name = ?, employee_address = ?, employee_role = ?, employee_salary = ? WHERE employee_id = ?`;
    console.log(req.body);
    db.query(updateSQL, values, (err, result) => {
        if (err) {
            console.error("Error updating employee:", err);
            res.status(500).send("Error updating employee.");
        } else {
            console.log("Employee updated successfully.");
            res.redirect('/view');
        }
    });
});


module.exports = router;