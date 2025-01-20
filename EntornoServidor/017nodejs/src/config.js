require('dotenv').config();

console.log('Environment Variables:', process.env); // Log environment variables

const app = {
  port: process.env.PORT || 3000,
};

console.log('Loaded configuration:', app); // Log the loaded configuration

const config = {
  app,
};

module.exports = config;