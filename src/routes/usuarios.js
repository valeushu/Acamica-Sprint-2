const { Router } = require("express");
const router = Router();

const { usuarios } = require("../info.js/users.js");
const {
  nuevo_usuario,
  existe_usuario,
  is_login_usuario,
  es_admin,
} = require("./middleware");

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    tags: [usuarios]
 *    summary: Usuarios.
 *    description : Listado de usuarios.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
router.get("/", is_login_usuario, es_admin, (req, res) => {
  res.json({ Usuarios: usuarios });
});

/**
 * @swagger
 * /api/usuarios/registro:
 *  post:
 *    tags: [usuarios]
 *    summary: usuarios.
 *    description : Listado de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - nombre_usuario
 *            - password
 *            - nombre_completo
 *            - email
 *            - direccionEnvio
 *            - telefono
 *          properties:
 *            nombre_usuario:
 *              description: Nombre del usuario
 *              type: string
 *              example: juangomez
 *            constraseña:
 *              description: Contraseña
 *              type: password
 *              example: 1234
 *            nombre_completo:
 *              description: Nombre y apellido del usuario
 *              type: string
 *              example: Juan Perez
 *            email:
 *              description: Correo electrónico del usuario
 *              type: email
 *              example: juangomez@gmail.com
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example: La Plata, Calle 7 # 1234
 *            telefono:
 *              description: Telefono del usuario
 *              type: string
 *              example: 221 1234567
 *    responses:
 *      201:
 *       description: Usuario registrado
 *      401:
 *       description: Usuario no registrado
 *
 */
router.post("/registro", nuevo_usuario, (req, res) => {
  const usuario = req.body;
  console.log(usuario);
  const id = usuarios.length + 1;
  const usuarioNuevo = { ...req.body, id };
  usuarios.push(usuarioNuevo);
  res.json({ Usuarios: usuarios });
});

/**
 * @swagger
 * /api/usuarios/login:
 *  post:
 *    tags: [usuarios]
 *    summary: Login de usuarios.
 *    description : Login de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: nombre de usuario y contraseña de usuario a loguearse
 *        schema:
 *          type: object
 *          required:
 *            - nombre_usuario
 *            - contraseña
 *          properties:
 *            nombre_usuario:
 *              description: nombre de usuario a loguearse.
 *              type: string
 *              example: valeush
 *            contraseña:
 *              description: Contraseña de usuario a loguearse
 *              type: string
 *              example: val123
 *    responses:
 *      200:
 *       description: Login de usuario exitoso.
 *      404:
 *       description: Usuario no encontrado (nombre de usuario y/o contraseña incorrecta)
 */
router.post("/login", existe_usuario, function (req, res) {
  console.log("Login OK: ", req.usuarioIndex);
  res.json({ index: req.usuarioIndex });
});

module.exports = router;
