import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) { }

  async canActivate(

    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    // const secretKey = process.env.SECRET_KEY;



    if (!token) {

      throw new UnauthorizedException('Token is required');
    }

    try {

      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY, });

      // const id = request.userId = payload; // opcional

      request['sub'] = payload;

      return true;
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException('Token inválido');

    }

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization'];
    console.log('Authorization Header:', authorization);
    if (!authorization) return undefined;
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

