require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection')



const app = express();
const PORT = process.env.PORT || 8080;



// log request
app.use(morgan('tiny'));

// mongo db connection
connectDB();

// parse req to body - parser

app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname."views/ejs")) // if we add ejs file in other folder

// load assests -- yha pe hm express ko bta rhy hai ki sara assests kha se lena hai or loading all assests in our web server
app.use('/css',express.static(path.resolve(__dirname,"assests/css")))
app.use('/img',express.static(path.resolve(__dirname,"assests/img")))
app.use('/js',express.static(path.resolve(__dirname,"assests/js")))



// load routers 
app.use('/',require('./server/routes/router'))



app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)});

