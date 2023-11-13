//import express  framework
import express from 'express';
//import the handlebars engine 
import exphbs from 'express-handlebars';
//import body-parsers to handle the reading of template objects?
import bodyParser from 'body-parser';
//import express flash and session to use inconjuction for displaying error & reset messages
import flash from 'express-flash';
import session from 'express-session';

//conection to the database using pg-promise and dotevn
import db from './db/connection.js';
import ShoesDB from './services/shoes_services.js';
import CartDB from './services/cart_services.js'
import UsersDB from './services/users_services.js';

import Router from './routes/shoe_display.js';
import CartRoute from './routes/cart_route.js';
import SignUpRoute from './routes/signup_route.js';

let shoesDB = ShoesDB(db);
let cartDB = CartDB(db);
let usersDB = UsersDB(db);

let router = Router(shoesDB);
let cart_route = CartRoute(cartDB);
let user_signup_route = SignUpRoute(usersDB);

let app = express();

import cors from "cors";

app.use(cors());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<JesusLovesYou>",
    resave: false,
    saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());
// his ensures form variables can be read from the req.body variable
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//built-in static middleware from ExpressJS to use static resources such as my CSS
app.use(express.static('public'))


//List all shoes in stock
app.get('/api/shoes', router.show)
app.get('/api/shoes/brandnames', router.getBrand)
app.get('/api/shoes/brand/:brandname', router.brand_name)
app.get('/api/shoes/sizes', router.getAllsize)
app.get('/api/shoes/size/:size', router.allSize)
app.get('/api/shoes/brand/:brandname/size/:size', router.brand_and_size)
app.get('/api/shoes/colors', router.getAllColors)
app.get('/api/shoes/colors/:color', router.filterByColor)

app.post('/cart/:userId/add/:id', cart_route.addToCart);
app.get('/cart/:userId', cart_route.getCart);

app.post('/api/shoes/sold/:id', router.update_stock)
app.post('/api/shoes', router.add)

app.post('/signup', user_signup_route.user_signup)
app.post('/login', user_signup_route.user_login)



//process the enviroment the port is running on
let PORT = process.env.PORT || 9999;
//listen on the port - opens the port on the terminal.
app.listen(PORT, () => {
    console.log('App started...', PORT);
})