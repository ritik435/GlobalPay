const express=require('express');
const app=express();
const hostname='127.0.0.1';
const port=1300;
const ejsLayouts=require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware= require('node-sass-middleware');
const flash= require('connect-flash');
const customMiddleware=require('./config/flashMiddleware');




//sass-middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
//9be29d7

//setup the ejs-layouts
app.use(ejsLayouts);
    //extract the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//middleware--> req.body is available because of this
app.use(express.urlencoded());
//cookie Parser --> for the cookies
app.use(cookieParser());


//setup the views
app.set('view engine','ejs');
app.set('views','./views');

//access the static files
app.use(express.static('./assets'));

//MongoStore is usedf to store cookies in the database
app.use(session({
    name:'GlobalPay',
    secret:'Moneytransfer',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/MoneyTransferApp',
            autoRemove:'disabled'

        },
        function(err){
            console.log(err || 'connect-mongo setup is OK')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
//set user in locals
app.use(passport.setAuthenticatedUser);


//adding middleware for flash
app.use(flash());
app.use(customMiddleware.setFlash);

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