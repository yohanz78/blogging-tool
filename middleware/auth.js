// Middleware function to check if a user is logged in
module.exports = function isLoggedIn(req, res, next) {
	if (!req.session.author) {
		return res.redirect("/author/login");
	}
	next();
};
