const { Router } = require("express");
const router = Router();

const { usuarios } = require("../info.js/users.js");
const {
  nuevo_usuario,
  existe_usuario,
  is_login_usuario,
  is_admin,
} = require("./middleware");

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Usuarios
 *    description: Obtiene el listado de todos los usuarios registrados
 *    responses:
 *      200:
 *         description: Listado de usuarios
 */
router.get("/", (req, res) => {
  res.json({ Usuarios: usuarios });
});

/**
 * @swagger
 * /api/users/registro:
 *  post:
 *    summary: Usuarios
 *    description: Registro de usuario nuevo
 *    responses:
 *      200:
 *         description: Registro de usuario exitoso
 */

//registro usuario nuevo
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
 * /login:
 *  post:
 *    summary: Login de usuarios.
 *    description : Login de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: Email y contraseña de usuario a loguearse
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              description: Email de usuario a loguearse.
 *              type: email
 *              example: admin@localhost
 *            password:
 *              description: Contraseña de usuario a loguearse
 *              type: string
 *              example:
 *    responses:
 *      200:
 *       description: Login de usuario exitoso.
 *      404:
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */
router.post("/login", existe_usuario, function (req, res) {
  console.log("Login OK: ", req.usuarioIndex);
  res.json({ index: req.usuarioIndex });
});

module.exports = router;
