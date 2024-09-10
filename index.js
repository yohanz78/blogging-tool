/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const session = require('express-session');
const methodOverride = require('method-override');
const { format } = require('date-fns');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(__dirname + '/public')); // set location of static files

// Express Session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// date-fns
app.locals.formatDate = function(date) {
    return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};

// Override the request method using the _method field in the form
app.use(methodOverride('_method'));

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// Get blog info data
app.use((req, res, next) => {
    // Define the query
    query = "SELECT * FROM authors ORDER BY latest_edit DESC LIMIT 1;";

    // Execute the queries and render the page with the results
    global.db.get(query, (err, row) => {
        if (err) {
            next(err);
        } else {
            res.locals.author = row;
            next();
        }
    });
});

// Display homepage
app.get('/', (req, res) => {
    res.render('homepage')
});

// Add all the route handlers in authorRoutes to the app under the path /authors
const authorRoutes = require('./routes/authors');
app.use('/author', authorRoutes)

// Add all the route handlers in readerRoutes to the app under the path /readers
const readerRoutes = require('./routes/readers');
app.use('/reader', readerRoutes)

// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})