"use strict";
const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isRefresh = require("../middleware/isRefresh.js");
const isAuth = require("../middleware/isAuth.js");
const multer = require("multer");
require("dotenv").config();
const upload = multer({ dest: "./upload" });

router.use("/img", express.static("./upload"));

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const createToken = (payload) => {
  const token = jwt.sign({ nickName: payload.toString() }, ACCESS_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
  return token;
};

const createRefreshToken = (payload) => {
  const refreshtoken = jwt.sign(
    { nickName: payload.toString() },
    REFRESH_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );
  return refreshtoken;
};

router.post("/register", (req, res) => {
  const saltRounds = parseInt(process.env.saltRounds);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  var data = [req.body.nickName, hash, req.body.email];
  let sql =
    "insert into side_project_user(user_id,user_pw,email,refreshtoken,profile,myself) values(?,?,?,0,NULL,NULL)";

  db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      res.send(rows);
    });
    conn.release();
  });
});

router.post("/login", (req, res) => {
  var data = [req.body.email];
  let sql = "select * from side_project_user where email = ?";
  db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      if (!rows) {
        res.send("0"); //존재하지않는 아이디
      } else {
        var hash_pw = rows[0].user_pw;
        var user_id = rows[0].user_id;
        var compare = bcrypt.compareSync(req.body.password, hash_pw);
        if (compare === true) {
          const token = createToken(rows[0].user_id);
          const refreshtoken = createRefreshToken(rows[0].user_id);
          var data = [refreshtoken, rows[0].user_id];
          let sql =
            "update side_project_user set refreshtoken = ? where user_id = ?";
          db((err, conn) => {
            if (err) console.log(err);
            conn.query(sql, data, (err, rows) => {
              if (err) console.log(err);
              if (!rows) console.log("fatal error!");
            });
            conn.release();
          });
          res.send([token, refreshtoken, user_id]);
        } else {
          res.send("1"); //비밀번호가 일치하지 않음
        }
      }
    });
    conn.release();
  });
});

//엑세스토큰 리프레쉬 요청
router.get("/retoken", isRefresh);

//본인정보 조회
router.post("/myprofile", isAuth, (req, res) => {
  var data = [req.body.idx];
  let sql = "select * from side_project_user where idx = ?";

  db((err, conn) => {
    if (err) console.log(err);
    conn.query(sql, data, (err, rows) => {
      if (err) console.log(err);
      if (!rows) {
        res.status(404);
      }
      res.send(rows);
    });
    conn.release();
  });
});

//본인정보수정
router.post("/updateprofile", isAuth, upload.single("image"), (req, res) => {
  if (req.file) {
    let profile = "/img/" + req.file.filename;
    var data = [profile, req.body.myself, req.body.idx];
    var sql =
      "update side_project_user set profile = ?, myself = ? where idx = ?";
  } else {
    var data = [req.body.myself, req.body.idx];
    var sql = "update side_project_user set myself = ? where idx = ?";
  }
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

module.exports = router;
