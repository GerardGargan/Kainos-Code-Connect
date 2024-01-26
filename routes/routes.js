const express = require('express');
const router = express.Router();
const db = require('./../util/dbconn');

router.get('/', (req, res) => {

});

router.get('/view', (req, res) => {
    if(req.session.isLoggedIn == true) {
        const selectSQL = `SELECT * FROM employee`;

        db.query(selectSQL, (err, rows) => {
        console.log(rows);
        res.render('viewemployees', { data: rows, role: req.session.role });
    });
    } else {
        res.render('login', {error: 'User not logged in'});
    }
    
});

//add employee

router.get('/addemployee', (req, res) => {
    
    res.render('addemployee')
});

router.post('/addemployee', (req, res) => {

    console.log(req.body);
    
    const { name, address, number, role, salary } = req.body;
    const values = [name, address, number, role, salary];

    const selectSQL = `INSERT INTO employee (employee_name, employee_address, employee_number, employee_role, employee_salary) VALUES (?,?,?,?,?)`;
    db.query(selectSQL, values, (err, rows) => {
        res.redirect('/view');
    });

});

router.get('/login', (req, res) => {
    res.render('login', {error: ''});
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    console.log(`${email} ${password}`);

    const vals = [email, password];
    const querySQL = `SELECT email, password, role FROM user WHERE email = ? AND password = ?`;
    db.query(querySQL, vals, (err, rows) => {
        if(rows.length>=1) {
            console.log('User exists and password is correct');
            const session = req.session;
            session.isLoggedIn = true;
            session.role = rows[0].role;
            res.redirect('/view');
        } else {
            console.log('Failed login');
            res.render('login', {error: 'Incorrect login details'});
        }
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


// delete employee

router.post('/delete', (req, res) => {
    
    
    const { id } = req.body;
    const values = [id]; 
    
    const deleteSQL = `DELETE from employee WHERE employee_id = ?`;
    console.log(req.body);
    db.query(deleteSQL, values, (err, result) => {
        if (err) {
            console.error("Error deleting employee:", err);
            res.status(500).send("Error deleting employee.");
        } else {
            console.log("Employee deleted successfully.");
            res.redirect('/view');
        }
    });
});
module.exports = router;