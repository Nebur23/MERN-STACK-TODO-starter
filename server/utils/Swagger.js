import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RESTFUL API',
      version: '1.0.0',
      description: 'A simple Express RESTFUL API designed by JPTEKS',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  
  apis: ['./routes/*.js'], // files containing annotations for Swagger
};

const swaggerSpec = swaggerJsdoc(options);

export default (app) => {
  app.use('/todoApi-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
