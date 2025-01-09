const mongoose = require('mongoose');
const app = require('./app'); // Ensure this points to your Express app entry
const config = require('./config/config'); // Ensure config contains valid port and mongoose options
const logger = require('./config/logger'); // Ensure logger is configured

// Start the server and connect to MongoDB
let server;
mongoose
  .connect(
    'mongodb+srv://Anushka:Anushka@cluster0.iaqp2.mongodb.net/?retryWrites=true&w=majority',
    config.mongoose.options
  )
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
      logger.info(`Server running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Graceful shutdown
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Handle unexpected errors
const unexpectedErrorHandler = (error) => {
  logger.error('Unexpected error:', error);
  exitHandler();
};

// Event listeners for error handling
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('Process terminated');
    });
  }
});
