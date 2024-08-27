import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// function headerAuthorization(request: Request) {
//   const autenticacion = request.headers['basic'];
//   return autenticacion === 'email: password';
// }

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.basic;

        if (!authHeader) {
            throw new UnauthorizedException(
                'El header de autorizacion no existe',
            );
        }

        const email = authHeader.split(':')[0];
        const password = authHeader.split(':')[1];

        if (!email || !password) {
            throw new UnauthorizedException('Credencial no valida');
        }

        return true;

        // return headerAuthorization(request);
    }
}
