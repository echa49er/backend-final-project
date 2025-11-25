import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Service API',
      version: '1.0.0',
      description: 'API documentation for the final project',
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:3000`,
        description: 'Server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);

export default specs;