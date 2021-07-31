const express = require("express");
//const morgan = require('morgan')
const app = express();

const { usuarios } = require("../info.js/usuarios.js");
const {
  nuevo_usuario,
  existe_usuario,
  is_login_usuario,
  is_admin,
} = require("./middleware");

//obtiene todos los usuarios
app.get("/", (req, res) => {
  res.json(usuarios);
});

//registro usuario nuevo
app.post("/registro", nuevo_usuario, (req, res) => {
  const usuario = req.body;
  console.log(req.body);
  usuarios.push(usuario);
  res.send(usuario);
});

module.exports = app;
