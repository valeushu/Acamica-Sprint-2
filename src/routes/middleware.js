const { usuarios, Usuario } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");

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
    (elemento) =>
      elemento.nombre_usuario == nombre_usuario &&
      elemento.contraseña == contraseña
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
  index = id;
  usuario = usuarios[index];
  if (!usuario) {
    res.status(404).send({ result: "usuario no logueado" });
  } else {
    req.usuario_index = index;
    req.usuario = usuario;
    next();
  }
}

function existe_producto(req, res, next) {
  producto = productos[req.body.indiceProducto];
  if (!producto) {
    res.sendStatus(404);
  } else if (productos[req.body.indiceProducto].stock <= 0) {
    res.send("Sin stock");
  } else {
    next();
  }
}

function existe_pedido(req, res, next) {
  pedido = pedidos[req.body.indicePedido];
  if (!pedido) {
    res.sendStatus(404);
  } else {
    next();
  }
}

function valida_metodo_pago(req, res, next) {
  metodo_pago = req.body.metodoPago;
  if (!metodo_pago in ["EF", "TC", "TD", "MP"]) {
    return res
      .status(404)
      .send({ resultado: `Forma de pago incorrecta: ${metodo_pago}` });
  } else {
    next();
  }
}

module.exports = {
  nuevo_usuario,
  existe_usuario,
  es_admin,
  is_login_usuario,
  existe_producto,
  existe_pedido,
  valida_metodo_pago,
};
