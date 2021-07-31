let usuarios = [];

class Usuario {
  constructor(
    user_name,
    nombre,
    apellido,
    email,
    pass,
    telefono,
    dir_envio,
    admin
  ) {
    this.user_name = user_name;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.pass = pass;
    this.telefono = telefono;
    this.dir_envio = dir_envio;
    this.admin = admin === undefined ? false : admin;
  }
}

let admin = new Usuario(
  "admin",
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
  "Valeria",
  "Mancilla",
  "valeushuaia@hotmail.com",
  "val123"
);

usuarios = [admin, user1];

module.exports = { usuarios, Usuario };
