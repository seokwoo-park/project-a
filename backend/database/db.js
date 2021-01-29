'use strict';

const mysql = require('mysql');
const db_cofig = require('./db_config.json');

const pool = mysql.createPool(db_cofig);

const getConnection = function(callback){
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = getConnection;