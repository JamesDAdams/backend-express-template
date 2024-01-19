import express from 'express';
import { createExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import path from 'path';
import { ErrorHandler } from '../middleware/ErrorHandler';
import { authCheck } from '../utils/AuthorizationChecker';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';

/**
 * Server class
 * @class
 */
export class Server {
  /** @type {express.Application} */
  private app: express.Application;
  /** @type {number} */
  private port: number;

  /**
   * Server constructor
   * initializes express server
   * and sets listening port
   * @constructor
   * @returns void
   */
  public constructor() {
    this.app = createExpressServer({
      cors: true,
      defaultErrorHandler: false,
      middlewares: [ErrorHandler],
      authorizationChecker: authCheck,
      controllers: [path.join(__dirname + '/../controllers/*.js')],
    });

    this.port = Number(process.env['PORT']) || 3000;
  }

  /**
   * Listen method
   * @memberof Server
   * @returns void
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public startSwagger(): void {
    const packageJson = require('../../package.json');
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage')

    const routingControllersOptions = {
      controllers: [path.join(__dirname + '/../controllers/*.js')],
      routePrefix: '/api',
    }


    // Parse class-validator classes into JSON Schema:
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    })

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage()
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
    })


    const swaggerUi = require('swagger-ui-express');
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }

}


