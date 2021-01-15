'use strict';
const express = require('express');
const router = express.Router();
const db = require('../database/db.js');
const multer = require('multer');
const upload = multer({dest:'./upload'})

router.use('/img',express.static('./upload'));

//리스트
router.get('/list', (req,res) => {
    let sql = 'select * from side_project_board';

    db((err,conn) => {
        if(err)console.log(err);
        conn.query(sql,(err,rows) => {
            if(err)console.log(err);
            res.send(rows);
        })
        conn.release();
    })
})

//생성
router.post('/create', upload.single('image') ,async(req,res) => {
    console.log(req.body);
    if(!req.file){
        var data = [req.body.user_id, req.body.content];
        var sql = 'insert into side_project_board(user_id,content,created) values(?,?,NOW())';
    }else{
    let img = '/img/' + req.file.filename;
    var data = [req.body.user_id,req.body.content,img];
    var sql = 'insert into side_project_board(user_id,content,image,created) values(?,?,?,NOW())';
    }

   await db((err,conn) => {
        if(err)console.log(err);
        conn.query(sql,data,(err,rows) => {
            if(err)console.log(err);
            if(!rows){
                res.send('1') // 오류
            }
        })
        conn.release();
    })
})
//수정
router.post('/update', upload.single('image') ,async(req,res) => {
    let img = '/img/' + req.file.filename;
    var data = [req.body.content,img,req.body.user_id];
    let sql = 'update side_project_board set content = ?, image = ? where user_id = ?';

    await db((err,conn) => {
            if(err)console.log(err);
            conn.query(sql,data,(err,rows) => {
            if(err)console.log(err);
            if(!rows){
                res.send('1') // 오류
            }
        })
        conn.release();
    })
})
//삭제
router.post('/delete', (req,res) => {
    var data = [req.body.idx];
    let sql = 'delete from side_project_board where idx = ?';
    
    db((err,conn) => {
        if(err)console.log(err);
        conn.query(sql,data,(err,rows) => {
        if(err)console.log(err);
        if(!rows){
            res.send('1') // 오류
        }
    })
    conn.release();
})  
})
//상세
router.post('/detail', (req,res) => {
    var data = [req.body.idx];
    let sql = 'select * from side_project_board where idx = ?';
    
    db((err,conn) => {
        if(err)console.log(err);
        conn.query(sql,data,(err,rows) => {
        if(err)console.log(err);
        res.send(rows);
    })
    conn.release();
})  
})


module.exports = router;