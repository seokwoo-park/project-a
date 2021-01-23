'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.ACCESS_SECRET_KEY;
const R_secretKey = process.env.REFRESH_SECRET_KEY;
const db = require('../lib/db');

const createToken = (user) => {
    const token = jwt.sign({nickName : user.toString()},secretKey,{
        algorithm : 'HS256',
        expiresIn : '30m'
    });
    return token;
}

module.exports = async(req,res,next) => {
    try{
        const refreshtoken = req.get('r_x_auth');
       
       if(!refreshtoken){
           return false;
       }

       var decodedToken = jwt.verify(refreshtoken,R_secretKey);
       var data = [decodedToken.nickName,refreshtoken];
      
       let sql = 'select * from side_project_user where user_id = ? and refreshtoken = ?';
       db.query(sql,data,(err,rows) => {
           if(err)console.log(err);
           if(!rows){
               return false; //토큰 오류
           }else{
            console.log(rows[0].id);
            const newToken = createToken(rows[0].id);
            res.send([newToken]);
           }
       })
       
    }catch(err){
        next(err);
    }
}