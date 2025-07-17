import {
  Middleware,
  type ExpressErrorMiddlewareInterface,
} from 'routing-controllers';
import type { Request, Response } from 'express';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
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
