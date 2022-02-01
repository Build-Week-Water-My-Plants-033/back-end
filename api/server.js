const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
//const authRouter = require('')
//const plantsRouter = require('')


const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())


// server.use("/api/auth", authRouter); UNCOMMENT THIS OUT ONCE AUTH ROUTER IS SET UP - DONT FORGET TO REQUIRE IT UP TOP!
// server.use("/api/plants", plantsRouter); UNCOMMENT THIS OUT ONCE PLANTS ROUTER IS SET UP - DONT FORGET TO REQUIRE IT UP TOP!

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
module.exports = server
