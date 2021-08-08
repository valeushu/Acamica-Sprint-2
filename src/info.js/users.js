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
    this.borrado = false;
    
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
let usuario1 = new Usuario(
  "valeush",
  "Valeria Mancilla",
  "valeushuaia@hotmail.com",
  "val123",
  "15472626",
  "maipu 111",
  
);

let usuario2 = new Usuario(
  "carlitos",
  "carlos tevez",
  "tevez444@hotmail.com",
  "apache",
  "15474125",
  "san martin 825",
  
);

usuarios = [admin, usuario1, usuario2];

module.exports = { usuarios, Usuario };
