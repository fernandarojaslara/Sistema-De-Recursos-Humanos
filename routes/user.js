const express = require("express");
const jwt = require("jsonwebtoken");
const user = express.Router();
const db = require("../config/database");

user.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM admin WHERE email='${email}' AND password='${password}';`;
  const rows = await db.query(query);
  if (email && password) {
    if (rows.length == 1) {
      const token = jwt.sign(
        {
          admin_id: rows[0].admin_id,
          email: rows[0].email,
        },
        "debugkey"
      );
      return res.status(200).json({ code: 200, message: token });
    } else {
      return res
        .status(200)
        .json({ code: 401, message: "USUARIO Y/O CONTRASEÑA INCORRECTOS" });
    }
  }
  return res.status(200).json({ code: 500, message: "CAMPOS INCOMPLETOS" });
});

module.exports = user;
