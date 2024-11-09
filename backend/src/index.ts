import app from './app';
import config from './config/config';
import logger from './modules/logger/logger';

const port = config.port || 8081;

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Optional: Basic error handling and graceful shutdown

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

const unexpectedErrorHandler = (error: Error) => {
  logger.error('Unexpected Error:', error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection at Promise:', reason);
  exitHandler();
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('Server closed');
    });
  }
});
