//const { Router } = require("express");
//const router = Router();
const { usuarios , Usuario} = require("../info.js/users.js");

function nuevo_usuario(req, res, next) {
  username = req.body.nombre_usuario;
  email = req.body.email;
  index = usuarios.findIndex(
    (elemento) => elemento.email == email || elemento.nombre_usuario == username
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
  nombre_usuario = req.body.nombre_usuario;
  contraseña = req.body.contraseña;
  index = usuarios.findIndex(
    (elemento) => elemento.nombre_usuario == nombre_usuario && elemento.contraseña == contraseña
  );
  console.log(req.body, index);
  if (index === -1) {
    //res.status(404).send({ resultado: false, mensaje: `Usuario no logueado o inexistente` });
    res.status(404).send({ resultado: false });
  } else {
    req.usuarioIndex = index;
    req.usuario = usuarios[index];
    next();
  }
}

function es_admin(req, res, next) {
    admin = req.usuario.admin;
    //console.log(admin);
    if (!admin) {
      res.status(404).send({
        mensaje: `Usuario no tiene permiso`,
      });
    } else {

      next();
    }
  }
 

function is_login_usuario(req, res, next) {
  id = parseInt(req.query.index);
  console.log(req.query);
  index = id;
  usuario = usuarios[index];
  //console.log(index);
  if (!usuario) {
    res.status(404).send({ result: "usuario no logueado" });
  } else {
    req.usuario_index = index;
    req.usuario = usuario;
    next();
  }
}


module.exports = { nuevo_usuario, existe_usuario, es_admin, is_login_usuario };
