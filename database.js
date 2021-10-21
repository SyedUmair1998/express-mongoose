const mongoose = require('mongoose');
require('dotenv').config();
const db_url = process.env.DB_URL;

mongoose.connect(db_url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
},(err,link)=>{
    if(err)
    {
        return console.log(err)
    }
    console.log('Connected');
})