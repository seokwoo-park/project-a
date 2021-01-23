'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.ACCESS_SECRET_KEY ;
const db = require('../lib/db');

module.exports = async (req,res,next) => {
    try{
        
        const token = req.get('x_auth');
        console.log(token);
        const decodedToken = jwt.verify(token,secretKey);
        const {nickName} = decodedToken;
        var data = [nickName]
        let sql = 'select * from side_project_user where user_id = ?';
        db.query(sql,data, (err,rows) => {
            console.log(rows);
            if(err)console.log(err);
        });

        next();
    }catch(err){
       
        next(err);
    }
}

