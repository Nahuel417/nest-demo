import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`,
    );
    next();
  }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const DateIsoString = new Date().toISOString();
  const fecha = DateIsoString.split('T')[0];
  const horaCompleta = DateIsoString.split('T')[1];
  const hora = horaCompleta.slice(0, 5);

  console.log(
    `Estas ejecutando un metodo ${req.method} en la ruta "${req.url}", el dia ${fecha} y a la hora ${hora} `,
  );
  next();
}
