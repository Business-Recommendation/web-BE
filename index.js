const AuthRouter = require('./AuthRouter');

const server = require('./server.js');

const PORT = process.env.PORT || 8000;

server.use('/api/auth', AuthRouter)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});