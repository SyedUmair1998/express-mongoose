const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
app.use(morgan('dev'));
app.use(cors());
const UserController = require('./controller/user.js')


app.use('/api',UserController);


const database = require('./database.js');

app.get('/',(req,res)=>{

    res.send('Working fine')
})
app.listen(port,()=>{
    console.log('Server running');
})