import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import productsRoutes from './routes/products.routes.js';
import usersRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import ordersRoutes from "./routes/order.routes.js";
import payRoutes from "./routes/pay.routes.js";
import "dotenv/config";
import { createRoles } from "./libs/initialSetup.js";

const app = express();
app.use(helmet());
createRoles();

//swagger
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerOptions from './docs/swagger.js';
const swaggerDocs = swaggerJSDoc(swaggerOptions);

//settings
app.set("port", process.env.PORT);
app.set("json spaces", 2);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//ver swagger en localhost:3000/api-docs

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/payMeth", payRoutes);

export default app;
