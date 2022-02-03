const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const authRouter = require("./_auth/auth-router");
const plantsRouter = require("./_plants/plants-router");
const { restricted } = require("./_auth/auth-middleware");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/plants", restricted, plantsRouter);

server.get("/", (req, res) => {
  res.send("<h1>Welcome to Water My Plants API</h1>");
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "This endpoint does not exist" });
});

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
module.exports = server;
