const app = require('./src/app');
const config = require('./src/config');
const logger = require('./src/utils/logger');

const { port } = config.app;

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

app.listen(port, err => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`App listening on port ${port}!`);
  console.log(`App listening on port ${port}!`); // Add this line for additional confirmation
});

logger.info('Server starting...'); // Add this line to confirm server start