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

module.exports = router;