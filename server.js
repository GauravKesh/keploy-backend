const mongoose = require('mongoose');
const dotenvFlow = require('dotenv-flow');
const app = require('./app'); 
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./api/routes/*.js'],
};


const openapiSpecification = swaggerJsdoc(swaggerOptions);
// After defining `openapiSpecification`
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Load env variables
dotenvFlow.config();

const PORT = process.env.PORT || 9090;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  '';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
