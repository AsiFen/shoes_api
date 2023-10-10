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

import ShoesDB from './db/db_logic.js';

let shoesDB = ShoesDB(db);

let app = express();

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
app.get('/api/shoes', async (req, res) => {
    let data = await shoesDB.all();
    console.log(data);
    res.send(data)
    res.end;
})

//process the enviroment the port is running on
let PORT = process.env.PORT || 9999;
//listen on the port - opens the port on the terminal.
app.listen(PORT, () => {
    console.log('App started...', PORT);
})