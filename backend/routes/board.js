"use strict";
const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
const multer = require("multer");
const isAuth = require("../middleware/isAuth.js");
const upload = multer({ dest: "./upload" });

router.use("/img", express.static("./upload"));

//리스트
router.get("/list", (req, res) => {
  let sql = "select * from side_project_board";

  db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, (err, rows) => {
      if (err) console.log(err);
      res.send(rows);
    });
    conn.release();
  });
});

//내글만보기
router.post("/mylist", isAuth, (req, res) => {
  var data = [req.body.user_id];
  let sql = "select * from side_project_board where user_id = ? ";

  db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      res.send(rows);
    });
  });
});

//생성
router.post("/create", isAuth, upload.single("image"), async (req, res) => {
  console.log(req.body);
  if (!req.file) {
    var data = [req.body.user_id, req.body.content];
    var sql =
      "insert into side_project_board(user_id,content,created) values(?,?,NOW())";
  } else {
    let img = "/img/" + req.file.filename;
    var data = [req.body.user_id, req.body.content, img];
    var sql =
      "insert into side_project_board(user_id,content,image,created) values(?,?,?,NOW())";
  }

  await db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      if (!rows) {
        res.send("1"); // 오류
      }
      res.send("0"); //생성성공
    });
    conn.release();
  });
});
//수정
router.post("/update", isAuth, upload.single("image"), async (req, res) => {
  if (req.file) {
    var img = "/img/" + req.file.filename;
    var data = [req.body.content, img, req.body.idx];
    var sql =
      "update side_project_board set content = ?, image = ? where idx = ?";
  } else {
    var data = [req.body.content, req.body.idx];
    var sql = "update side_project_board set content = ? where idx = ?";
  }
  await db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      if (!rows) {
        res.send("1"); // 오류
      }
      res.send("0"); //성공
    });
    conn.release();
  });
});
//삭제
router.post("/delete", isAuth, (req, res) => {
  var data = [req.body.idx];
  let sql = "delete from side_project_board where idx = ?";

  db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      if (!rows) {
        res.send("1"); // 오류
      }
      res.send("0"); //성공
    });
    conn.release();
  });
});
//상세
router.post("/detail", isAuth, (req, res) => {
  var data = [req.body.idx];
  let sql = "select * from side_project_board where idx = ?";

  db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      res.send(rows);
    });
    conn.release();
  });
});

module.exports = router;
