'use strict';

var mysql = require('mysql');
var db_cofig = require('./db_config.json');

var pool = mysql.createPool(db_cofig);

var getConnection = function(callback){
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = getConnection;