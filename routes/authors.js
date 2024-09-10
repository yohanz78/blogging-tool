const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/auth');
const { format } = require('date-fns');

// Display Author Sign Up page
router.get('/signup', (req, res) => {
    res.render('author-signup')
});

// Handle Author Sign Up
router.post("/signup", (req, res, next) => {
	// Define the query
	query = 'INSERT INTO authors (name, email, password) VALUES( ?, ?, ? );';
	parameters = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    // Execute the query and send a confirmation message
    global.db.run(query, parameters, 
        function (err) {
            if (err) {
                next(err); //send the error on to the error handler
            } else {
                res.redirect("/author/login");
            }
        }
    )
});

// Display Author Log In page
router.get('/login', (req, res) => {
    res.render('author-login')
});

// Handle Author Log In
router.post('/login', (req, res, next) => {
    // Define the query
	query = 'SELECT * FROM authors WHERE email = ? AND password = ?';
	parameters = [
        req.body.email,
        req.body.password
    ];

    // Execute the query and send a confirmation message// Execute the query and send a confirmation message
    global.db.get(query, parameters, 
    function (err, row) {
        if (err) {
            next(err); // Pass error to error handler
        } else if (row) {
            req.session.author = { 
                id: row.id, 
                email: req.body.email 
            };
            res.redirect("/author/home");
        } else {
            res.status(401).redirect("/author/login");
        }
    })
})

// Handle Author Log out
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        next(err); // Pass error to error handler
      } else {
        res.redirect('/');
      }
    });
});

// Handle Author home page and articles data
router.get('/home', isLoggedIn, (req, res) => {
    // Define the queries
    const draftQuery = "SELECT * FROM articles WHERE published = 0";
    const publishedQuery = "SELECT * FROM articles WHERE published = 1";

    // Execute the queries and render the page with the results
    global.db.all(draftQuery, (err, draftRows) => {
      if (err) {
        next(err); // send the error on to the error handler
      } else {
        global.db.all(publishedQuery, (err, publishedRows) => {
            if (err) {
                next(err); // send the error on to the error handler
            } else {
                res.render("author-home", {
                    draftArticles: draftRows,
                    publishedArticles: publishedRows,
                });
            }
        });
      }
    });
});

// Display Create Article page
router.get('/home/create-article', isLoggedIn, (req, res) => {
    res.render('author-create-article')
});

// Handle Create Article
router.post('/home/create-article', isLoggedIn, (req, res, next) => {
    // Define the query
	query = 'INSERT INTO articles (title, subtitle, content, published, created_at, author_id) VALUES( ?, ?, ?, ?, ?, ? );';
    const authorId = req.session.author.id;
    parameters = [
        req.body.title,
        req.body.subtitle,
        req.body.content,
        0,
        format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        authorId
    ];

    // Execute the queries and render the page with the results
    global.db.run(query, parameters, 
        function(err) {
            if (err) {
                next(err); // send the error on to the error handler
            } else {
                res.redirect("/author/home"); // redirect to the author homepage
            }
    });
});

// Get article data to be edit
router.get('/home/edit-article/:id', isLoggedIn, (req, res, next) => {
    // Define the query
    query = 'SELECT * FROM articles WHERE id = ?;';
    const articleId = req.params.id;
    parameters = [articleId];

    // Execute the queries and render the page with the results
    global.db.get(query, parameters, (err, row) => {
        if (err) {
            next(err); // send the error on to the error handler
        } else {
            res.render('author-edit-article', { article: row }); // pass the article data to the template
        }
    })
})

// Handle edit article
router.post('/home/edit-article/:id', isLoggedIn, (req, res, next) => {
    // Use middleware method-override
    if (req.body._method === 'PUT') {
        // Define the query
        query = 'UPDATE articles SET title = ?, subtitle = ?, content = ?, updated_at = ? WHERE id = ?;';
        const articleId = req.body.articleId;
        parameters = [
            req.body.title,
            req.body.subtitle,
            req.body.content,
            format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            articleId
        ]
    
        // Execute the queries and render the page with the results
        global.db.run(query, parameters, 
        function(err) {
            if (err) {
                next(err); // send the error on to the error handler
            } else {
                res.redirect("/author/home"); // redirect to the author home page
            }
        });
    } else {
        next(new Error('Invalid request'));
    }
});

// Handle Publish article
router.post("/home/publish/:id", (req, res, next) => {
    // Use middleware method-overide
    if (req.body._method === 'PUT') {
        // Define the query
        const query = "UPDATE articles SET published = 1, published_at = ? WHERE id = ?;";
        const articleId = req.params.id;
        const parameters = [
            format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            articleId
        ];
  
        // Execute the queries and render the page with the results
        global.db.run(query, parameters,
            function (err) {
                if (err) {
                    next(err); // send the error on to the error handler
                } else {
                    res.redirect("/author/home"); // redirect to the author home page
                }
            }
        );
    } else {
        next(new Error('Invalid request'));
    }
});

// Handle delete article
router.post('/home/delete-article/:id', isLoggedIn, (req, res, next) => {
    // Use middleware method-overide
    if (req.body._method === 'DELETE') {
        // Define the query
        const query = 'DELETE FROM articles WHERE id = ?';
        const articleId = req.params.id;
        const parameters = [articleId];
    
        // Execute the queries and render the page with the results
        global.db.run(query, parameters, (err) => {
            if (err) {
              next(err); // send the error on to the error handler
            } else {
              res.redirect('/author/home'); // Redirect to the author home page
            }
        });
    } else {
        next(new Error('Invalid request'));
    }
});

// Display Author Settings page
router.get('/home/settings', isLoggedIn, (req, res) => {
    res.render('author-settings'); // pass the article data to the template
});

// Handle author and blog info
router.post('/home/settings', isLoggedIn, (req, res, next) => {
    // Define the query
    query = "UPDATE authors SET blog_title = ?, blog_subtitle = ?, name = ?, latest_edit = ? WHERE id = ?;";
    const authorId = req.session.author.id;
    parameters = [
        req.body.blog_title,
        req.body.blog_subtitle,
        req.body.name,
        format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        authorId
    ]

    // Execute the queries and render the page with the results
    global.db.run(query, parameters, (err) => {
        if (err) {
          next(err);
        } else {
          res.redirect('/author/home'); // redirect back to the author home page
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;