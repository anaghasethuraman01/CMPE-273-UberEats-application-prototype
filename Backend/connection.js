const mysql = require('mysql');


var connection = mysql.createPool({
	host: "database-1.cqtvbve6qkgo.us-east-2.rds.amazonaws.com",
	user: "anagha",
	password: "Anagha123",
	database: "ubereatsdb",
	port: "3306",
});

connection.getConnection(function (err) {
	if (err) {
		throw err;
	} else {
		console.log("connected");
	}
});

module.exports = connection;