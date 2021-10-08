const express=require('express');
const app=express();
const hostname='127.0.0.1';
const port=1300;
const ejsLayouts=require('express-ejs-layouts');
const passport=require('passport');
const passportLocal=require('passport-local');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');


//setup the ejs-layouts
app.use(ejsLayouts);
    //extract the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//middleware
app.use(express.urlencoded());
//cookie Parser
app.use(cookieParser());


//setup the views
app.set('view engine','ejs');
app.set('views','./views');

//access the static files
app.use(express.static('./assets'));


//setup the route
app.use('/',require('./routes/routes'));

//listen
app.listen(port,hostname,function(err){
    if(err){
        console.log(`Error in listen${err}`);
        return ;
    }
    console.log(`Server is running on http://${hostname}:${port}`);
    return;
})