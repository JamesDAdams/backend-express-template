import 'reflect-metadata';
import {
  createExpressServer,
  getMetadataArgsStorage,
} from 'routing-controllers';
import path from 'path';
import { ErrorHandler } from './middleware/ErrorHandler';
import { authCheck } from './utils/AuthorizationChecker';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import packageJson from '../package.json';
import defaultMetadataStorage from 'class-transformer/cjs/storage';
import pino from 'pino';

const app = createExpressServer({
  cors: true,
  defaultErrorHandler: false,
  middlewares: [ErrorHandler],
  authorizationChecker: authCheck,
  controllers: [path.join(__dirname + '/controllers/*.js')],
});

const port = Number(process.env['PORT']) || 3001;

/** Start Swagger */
if (process.env['ENABLE_SWAGGER'] === 'true') {
  const routingControllersOptions = {
    controllers: [path.join(__dirname + '/controllers/*.js')],
    routePrefix: '/api',
  };

  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
      schemas,
      securitySchemes: {
        basicAuth: {
          scheme: 'basic',
          type: 'http',
        },
      },
    },
    info: {
      title: `${packageJson.name} API`,
      description: 'Generated with `routing-controllers-openapi`',
      version: packageJson.version,
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Prisma-Express-Template',
        url: 'https://github.com/JamesDAdams/Prisma-Express-Template',
      },
    },
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
}

/** Starts listening */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/** logging system */
export const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
