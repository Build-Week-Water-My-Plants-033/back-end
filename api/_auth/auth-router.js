const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../secret/index");

const model = require("./auth-model");

const { signupPayload, loginPayloadValidation } = require("./auth-middleware"); // come back to add more middleware

router.post("/login", loginPayloadValidation, (req, res, next) => {
  const { username, password } = req.payload;
  model
    .getBy({ username })
    .then((users) => {
      if (!users.length || !bcrypt.compareSync(password, users[0].password))
        res.status(400).json({ message: "Invalid username or password" });
      else {
        const token = jwt.sign({ subject: username }, SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({ message: `Welcome ${username}`, token });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ where: "getting user", message: err.message, stack: err.stack })
    );
});

router.post("/signup", signupPayload, (req, res) => {
  model
    .insert(req.payload)
    .then((user) => {
      const token = jwt.sign({ subject: req.payload.username }, SECRET, {
        expiresIn: "1d",
      });
      res.status(201).json({
        message: `Welcome to your new account ${req.payload.username}`,
        token,
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ where: "adding user", message: err.message, stack: err.stack })
    );
});

module.exports = router;
