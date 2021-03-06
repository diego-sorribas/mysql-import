
const mysql = require('mysql');

var con;

/**
 * Handle Errors and kill the test script.
 * @param {Error} err
 * @returns {undefined}
 */
function errorHandler(err){
	console.log("\n\nsomething went wrong: ", err.message);
	console.error(err);
	process.exit(1);
}

/**
 * Run a query
 * @param {type} sql
 * @returns {Promise}
 */
function query(sql){ 
	return new Promise(done=>{
		con.query(sql, (err, result)=>{
			if(err) errorHandler(err);
			else done(result);
		});
	});
}

/**
 * Create a fresh MySQL connection
 * @param {config object} config
 * @returns {Connection}
 */
function mysqlConnect(config){
	con = mysql.createConnection({
		host: config.host, 
		user: config.user, 
		password: config.password
	});
}

/**
 * Create a database to test with
 * @returns {undefined}
 */
async function createTestDB(){
	await query("DROP DATABASE IF EXISTS `testdb`;");
	await query("CREATE DATABASE `testdb`;");
	await query("USE `testdb`;");
}

/**
 * Destroy the testing DB
 * @returns {undefined}
 */
async function destroyTestDB(){
	await query("DROP DATABASE `testdb`;");
	con.end();
}

module.exports = {
	errorHandler, 
	query, 
	mysqlConnect,
	createTestDB, 
	destroyTestDB
};