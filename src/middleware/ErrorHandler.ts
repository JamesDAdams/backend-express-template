import {
  Middleware,
  type ExpressErrorMiddlewareInterface,
} from 'routing-controllers';
import type { Request, Response } from 'express';
/**
 * ErrorHandler middleware class
 * @class
 * @decorator `Middleware({ type: "after" })`
 */
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  /**
   * Error handler method
   * @param {any} error
   * @param {Request} _request
   * @param {Response} response
   * @param {any} _next
   * @returns {any}
   */
  public error(
    error: any,
    _request: Request,
    response: Response,
    _next: (err: any) => any,
  ): any {
    if (response.headersSent) {
      return;
    }

    response.status(error.httpCode || 500).json(error);
  }
}
