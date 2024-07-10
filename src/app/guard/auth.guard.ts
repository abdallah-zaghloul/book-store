import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../../auth/repository/auth.repository';
import { TokenPayload } from '../../auth/type/token-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token: string = request.headers.authorization.split(' ').at(1);
      const payload: TokenPayload = this.jwtService.verify(token);
      request.personaId = payload.personaId;
      const validToken = await this.authRepository.getValidToken(payload);
      if (!validToken) throw new UnauthorizedException();
      return true;
      //
    } catch (err: any) {
      Logger.error(err);
      throw new UnauthorizedException();
    }
  }
}
