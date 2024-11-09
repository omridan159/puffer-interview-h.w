import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import routes from './routes/v1';
import config from './config/config';
import { ApiError, errorConverter, errorHandler } from './modules/errors';

const app: Express = express();

if (config.env !== 'test') {
  // Setup your logging here if needed in non-test environments
}

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());
app.options('*', cors());

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Gzip compression for response bodies
app.use(compression());

// API routes
app.use('/v1', routes);
app.get('/health', (_req, res) => res.status(200).send('OK'));

// Handle 404 errors for unknown API requests
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle errors
app.use(errorHandler);

export default app;
