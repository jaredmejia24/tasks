const express = require("express");

//init express app
const app = express();

//enable to receive json
app.use(express.json());

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };