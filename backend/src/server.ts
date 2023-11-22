/**
 * @file Server.
 */

import app from './app.js';
import 'dotenv/config';
import logger from './utils/logger.js';

const port = process.env.PORT || 3000;
const signals = ['SIGINT', 'SIGTERM'];

const server = app.listen(port, async () => {
  logger.info(`Running on port ${port}`);
});

const shutdown = async (signal: string) => {
  server.close(async () => {
    logger.info(`Stopped by ${signal}`);
  });
};

signals.forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal);
  });
});

export default server;
