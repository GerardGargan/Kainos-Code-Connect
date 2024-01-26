const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const router = require('./routes/routes');
const PORT = 3000;


const app = express();

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 360000}    
}));

app.use(morgan('tiny'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public'));

app.use(express.urlencoded({extended:true}));
app.use('/', router);


app.listen(PORT, (err) => {
    if(err){
        return console.log(err);
    }
    console.log(`Server listening on Port ${PORT}`);
});