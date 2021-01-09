var express = require('express');
var router = express.Router();
var db = require('../database/db.js');
var bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/register',(req,res) => {
    var saltRounds = parseInt(process.env.saltRounds);
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var data = [req.body.nickName, hash, req.body.email];
    var sql = 'insert into side_project_user(user_id,user_pw,email,refreshtoken) values(?,?,?,0)';

    db((err, conn) => {
        if(err)console.log(err);
    conn.query(sql, data, (err,rows) => {
        if(err) console.log(err);
        res.send(rows);
    })
        conn.release();
    })

});


module.exports = router;