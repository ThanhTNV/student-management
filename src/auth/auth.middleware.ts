import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    
    const userSession = req.session;
    if (!userSession) {
      return res.redirect('/account/login');
    }
    
    next();
  }
}
