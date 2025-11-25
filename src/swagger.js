// src/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const setupSwagger = (app) => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Service API',
      version: '1.0.0',
      description: 'API documentation for the Vehicle Service API',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'], 
  };

  const swaggerSpec = swaggerJsdoc(options);

  // Serve Swagger API docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
