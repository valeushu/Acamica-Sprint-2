const { productos } = require("./productos");
let usuarios = [];

class Usuario {
  constructor(
    nombre_usuario,
    nombre_completo,
    email,
    contraseña,
    telefono,
    dir_envio,
    admin
  ) {
    this.nombre_usuario = nombre_usuario;
    this.nombre_completo = nombre_completo;
    this.email = email;
    this.contraseña = contraseña;
    this.telefono = telefono;
    this.dir_envio = dir_envio;
    this.admin = admin === undefined ? false : admin;
    this.pedidoUsuario = [];
  }

  addPedido(codigo, cantidad) {
    let producto_pedido = productos.find(
      (producto) => producto.codigo == codigo
    );
    this.pedidoUsuario.push(producto_pedido);
    console.log("cantidad:" + cantidad);
  }
}

let admin = new Usuario(
  "admin",
  null,
  "admin@localhost",
  "admin",
  null,
  null,
  true
);
let user1 = new Usuario(
  "valeush",
  "Valeria Mancilla",
  "valeushuaia@hotmail.com",
  "val123",
  "15472626",
  "maipu 111",
  false
);

let user2 = new Usuario(
  "carlitos",
  "carlos tevez",
  "tevez444@hotmail.com",
  "apache",
  "15474125",
  "san martin 825",
  false
);

usuarios = [admin, user1, user2];

module.exports = { usuarios, Usuario };
