import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.logger.debug('Activating JWT Auth Guard');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (token) {
      this.logger.debug(`JWT Token: ${token}`);
      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        const decodedToken = this.jwtService.verify(token, { secret });
        this.logger.debug(`Decoded JWT Token: ${JSON.stringify(decodedToken)}`);
        
        // Set the full decoded token with roles directly on request.user
        request.user = {
          userId: decodedToken.sub,
          username: decodedToken.username,
          roles: decodedToken.roles, // Ensure roles are set here
        };

        this.logger.debug(`Set request.user: ${JSON.stringify(request.user)}`);

      } catch (error) {
        this.logger.error('Error decoding JWT token', error.message);
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      this.logger.warn('No JWT token found in request headers');
      throw new UnauthorizedException('No token found');
    }
    return super.canActivate(context);
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}
