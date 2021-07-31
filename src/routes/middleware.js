const { Router } = require("express");
const router = Router();
const { usuarios } = require("../info.js/usuarios.js");

function nuevo_usuario(req, res, next) {
  username = req.body.user_name;
  email = req.body.email;
  index = usuarios.findIndex(
    (elemento) => elemento.email == email || elemento.user_name == username
  );
  console.log(index);
  if (index !== -1) {
    res.status(404).send({
      resultado: false,
      mensaje: `Usuario ya registrado con ese email y/o username`,
    });
  } else {
    next();
  }
}

function existe_usuario(req, res, next) {
  email = req.body.email;
  pass = req.body.pass;
  index = usuarios.findIndex(
    (elemento) => elemento.email == email && elemento.pass == pass
  );
  if (index === -1) {
    res.status(404).send({ result: false, mensaje: "usuario inexistente" });
  } else {
    req.usuario_index = index;
    req.usuario = usuarios[index];
    next();
  }
}

function is_login_usuario(req, res, next) {
  id = parseInt(req.query.index);
  index = id;
  usuario = usuario[index];
  if (!usuario) {
    res.status(404).send({ result: "usuario no logueado" });
  } else {
    req.usuario_index = index;
    req.usuario = usuario;
    next();
  }
}

module.exports = { nuevo_usuario, existe_usuario, is_login_usuario };
