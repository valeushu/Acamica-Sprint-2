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
  apis: ["./src/app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));


//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(require("./routes/index"));
app.use("/api/users", require("./routes/users"));

//starting the server
app.listen(3000, () => {
  console.log("escuchando puerto 3000");
});

