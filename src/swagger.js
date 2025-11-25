import swaggerJSDoc from 'swagger-jsdoc';

// Options for swagger-jsdoc
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
        // This will automatically use your Render URL in production
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:3000`,
        description: 'Server',
      },
    ],
  },
  // This is crucial:
  // It tells swagger-jsdoc where to find your API endpoint comments
  apis: ['./src/routes/*.js'],
};

// Initialize swagger-jsdoc
const specs = swaggerJSDoc(options);

// Export 'specs' as the default
export default specs;