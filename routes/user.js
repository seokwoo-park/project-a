'use strict'
const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const createToken = (payload) => {
    const token = jwt.sign({nickName : payload.toString()}, ACCESS_SECRET_KEY,{
        algorithm : 'HS256',
        expiresIn : '30m'
    });
    return token;
}

const createRefreshToken = (payload) => {
    const refreshtoken = jwt.sign({nickName : payload.toString()}, REFRESH_SECRET_KEY,{
        algorithm : 'HS256',
        expiresIn : '1d'
    });
    return refreshtoken;
}

router.post('/register',(req,res) => {
    const saltRounds = parseInt(process.env.saltRounds);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    var data = [req.body.nickName, hash, req.body.email];
    let sql = 'insert into side_project_user(user_id,user_pw,email,refreshtoken) values(?,?,?,0)';

    db((err, conn) => {
        if(err)console.log(err);
    conn.query(sql, data, (err,rows) => {
        if(err) console.log(err);
        res.send(rows);
    })
        conn.release();
    })

});

router.post('/login', (req, res) => {
    var data = [req.body.email];
    let sql = 'select * from side_project_user where email = ?';
    db((err, conn) => {
        if(err) console.log(err);
        conn.query(sql,data, (err,rows) => {
            if(err)console.log(err);
            if(!rows){
                res.send('0'); //존재하지않는 아이디
            }else{
                console.log(rows);
                var hash_pw = rows[0].user_pw;
                var user_id = rows[0].user_id;
                var compare = bcrypt.compareSync(req.body.password,hash_pw);
                if(compare === true){
                    const token = createToken(rows[0].user_id);
                    const refreshtoken = createRefreshToken(rows[0].user_id);
                    var data = [refreshtoken, rows[0].user_id];
                    let sql = 'update side_project_user set refreshtoken = ? where user_id = ?';
                    db((err,conn) => {
                        if(err)console.log(err);
                        conn.query(sql,data, (err,rows) => {
                            if(err)console.log(err);
                            if(!rows)console.log('fatal error!');
                        })
                        conn.release();
                    })
                    res.send([token,refreshtoken,user_id]);
                }else{
                    res.send('1'); //비밀번호가 일치하지 않음
                }
            }
        })
        conn.release();
    })
})

module.exports = router;