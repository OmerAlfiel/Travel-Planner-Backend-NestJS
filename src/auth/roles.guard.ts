import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // No specific roles required
    }
  
    const { user } = context.switchToHttp().getRequest();
    this.logger.debug(`User Object: ${JSON.stringify(user)}`);
    this.logger.debug(`User Roles (direct check): ${JSON.stringify(user.roles)}`); // Log user roles
  
    // Check for the presence of roles in user object
    if (!user.roles) {
      this.logger.warn('Roles not found on user object');
      return false; // If roles are not defined, deny access
    }
  
    const hasRole = () => user.roles.some((role) => requiredRoles.includes(role));
    if (!hasRole()) {
      this.logger.warn('User does not have the required roles');
    }
    return hasRole();
  }
  
}
