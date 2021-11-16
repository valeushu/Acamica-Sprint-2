const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Sprint 2",
      version: "1.0.0",
      description: "API DELILAH Resto",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "auth",
        description: "Operations on authorization",
      },
      {
        name: "users",
        description: "Operations on users",
      },
      {
        name: "products",
        description: "Operations on products",
      },
      {
        name: "orders",
        description: "Operations on orders",
      },
      {
        name: "payment methods",
        description: "Operations on payment methods",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;