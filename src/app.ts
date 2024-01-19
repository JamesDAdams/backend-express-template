import 'reflect-metadata';
import { Server } from './server/Server';

/**
 * Instantiates Server
 */
const server: Server = new Server();

/** Start Swagger */
if (process.env['ENABLE_SWAGGER'] === "true") {
    server.startSwagger();
}

/** Starts listening */
server.listen();

/** logging system */
const pino = require('pino')
export const log = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  });

