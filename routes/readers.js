const express = require("express");
const router = express.Router();
const { format } = require("date-fns");

// Get Articles data
router.get("/", (req, res) => {
	// Define the query
	query = "SELECT * FROM articles WHERE published = 1;";

	// Execute the query and render the page with the results
	global.db.all(query, function (err, rows) {
		if (err) {
			next(err); // send the error on to the error handler
		} else {
			res.render("reader-home", { articles: rows }); // render the EJS page with the data
		}
	});
});

// Get article data by ID
router.get('/article/:id', (req, res, next) => {
    // Define the query
    const articleId = req.params.id;
    query = 'SELECT * FROM articles WHERE id = ?;';
    parameters = [articleId];

    // Execute the query and render the page with the results
    global.db.get(query, parameters, 
        function (err, article) {
            if (err) {
                next(err); // send the error on to the error handler
            } else {
                // Retrieve the comments for an article
                const commentQuery = "SELECT * FROM comments WHERE article_id = ?;";
                const commentParameters = [articleId];

                global.db.all(commentQuery, commentParameters,
                    function (err, comments) {
                        if (err) {
                            next(err); // send the error on to the error handler
                        } else {
                            res.render("reader-article", { article, comments }); // render the EJS page with the data
                        }
                    }
                )
            }
        }
    );
});

// Handle increment views request
router.post("/article/:id", (req, res, next) => {
    // Define the query
    query = "UPDATE articles SET views = views + 1 WHERE id = ?";
	const articleId = req.params.id;
	parameters = [articleId];

    // Execute the query and render the page with the results
	global.db.run(query, parameters, function (err) {
		if (err) {
			next(err); // send the error on to the error handler
		} else {
            res.redirect(`/reader/article/${articleId}`);	
		}
	});
});

// Handle like requests
router.post('/article/:id/like', (req, res) => {
    // Define the query
    query = "UPDATE articles SET likes = likes + 1 WHERE id = ?";
    const articleId = req.params.id;
    parameters = [articleId];

    // Execute the query and render the page with the results
    global.db.run(query, parameters, 
        function (err) {
            if (err) {
                next(err); // send the error on to the error handler
            } else {
                res.redirect(`/reader/article/${articleId}`); // redirect back to the article page
            }
    });
});

// Handle comment form by article
router.post("/article/:id/comment", (req, res, next) => {
	// Define the query
	const articleId = req.params.id;
	query = "INSERT INTO comments (name, comment, created_at, article_id) VALUES ( ?, ?, ?, ? )";
	parameters = [
		req.body.name,
		req.body.comment,
		format(new Date(), "yyyy-MM-dd HH:mm:ss"),
		articleId,
	];

	// Execute the query and render the page with the results
	global.db.get(query, parameters, function (err) {
		if (err) {
			next(err); // send the error on to the error handler
		} else {
			res.redirect(`/reader/article/${articleId}`); // render the EJS page with the data
		}
	});
});

module.exports = router;
