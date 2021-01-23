'use strict';

const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'utf8'
});

const getConnection = function(callback){
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = getConnection;