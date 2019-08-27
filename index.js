const AuthRouter = require('./router/AuthRouter');
const BizRouter = require('./router/BizRouter');
const verifyHeader = require('./middleware/VerifyHeader');
const server = require('./server.js');

const PORT = process.env.PORT || 8000;

server.use('/api/auth', AuthRouter)
server.use('/api/biz', verifyHeader, BizRouter)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});