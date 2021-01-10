'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

require('dotenv').config();
const port = process.env.PORT;

const user = require('./routes/user.js');
//프론트 프록시허용
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//보안
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

//라우팅

app.use('/user',user);

app.listen(port, () => {
    console.log(`server on ${port}`);
})