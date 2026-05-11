import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Validates the Bearer JWT from the Authorization header.
   * Attaches the decoded payload to `request.user` on success.
   */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid Authorization header");
    }

    const token = authHeader.slice(7);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (request as any).user = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }

    return true;
  }
}
