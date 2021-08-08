const express = require("express");
const app = express();
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
//swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Acamica API",
      version: "1.0.0",
    },
  },
  apis: ["./src/app.js", "./src/routes/users.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//ver swagger en localhost:3000/api-docs

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/users", require("./routes/users"));
app.use("/api/pedidos", require("./routes/pedidos"));
app.use("/api/productos", require("./routes/productos"));

//starting the server
app.listen(3000, () => {
  console.log("escuchando puerto 3000");
});
