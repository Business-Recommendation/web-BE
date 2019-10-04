const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const AuthRouter = require('./router/AuthRouter');
const BizRouter = require('./router/BizRouter');

require('dotenv').config()

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', AuthRouter)
server.use('/api/biz', BizRouter)

server.get('/', (req,res) => {
    res.send("<h1>Welcome to our Better Business Server</h1>")
})

module.exports = server;
//need for push