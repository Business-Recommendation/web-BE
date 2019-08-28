const AuthRouter = require('./router/AuthRouter');
const BizRouter = require('./router/BizRouter');
const server = require('./server.js');

const PORT = process.env.PORT || 8000;

server.use('/api/auth', AuthRouter)
server.use('/api/biz', BizRouter)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});