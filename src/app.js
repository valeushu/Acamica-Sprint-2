import express from 'express';
import morgan from 'morgan';
import { readFile } from "fs/promises";
import productsRoutes from './routes/products.routes.js';
import usersRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

import { createRoles } from './libs/initialSetup.js';
//const pkg = JSON.parse(await readFile("./package.json"));


const app = express();
createRoles();
//const swaggerJSDoc = require("swagger-jsdoc");
//swagger
//const swaggerJsDoc = require("swagger-jsdoc");
//const swaggerUI = require("swagger-ui-express");

/*const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Delilah Restó",
      version: "1.0.0",
    },
  },
  apis: [
    "./src/app.js",
    "./src/routes/usuarios.js",
    "./src/routes/medios de pago.js",
    "./src/routes/productos.js",
    "./src/routes/pedidos.js",
  ],
};*/

//const swaggerDocs = swaggerJsDoc(swaggerOptions);

//settings
//app.set('pkg', pkg);


//app.set("port", process.env.PORT || 3000);
//app.set("json spaces", 2);
//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//ver swagger en localhost:3000/api-docs

//middlewares
app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
/*app.use(require("./routes/index"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/pedidos", require("./routes/pedidos"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/mediosDePago", require("./routes/medios de pago"));
*/


app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
export default app;
