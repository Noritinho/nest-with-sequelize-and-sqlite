import {
  Injectable,
  NestMiddleware,
  Request,
  Response,
  Next,
} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Request() req: Request, @Response() res: Response, @Next() next: any) {
    console.log('test');
    next();
  }
}
