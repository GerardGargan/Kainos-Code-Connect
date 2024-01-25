const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes');
const PORT = 3000;


const app = express();

app.use(morgan('tiny'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}))
app.use('/', router);


app.listen(PORT, (err) => {
    if(err){
        return console.log(err);
    }
    console.log(`Server listening on Port ${PORT}`);
});