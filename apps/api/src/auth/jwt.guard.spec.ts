import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';

function makeContext(authHeader?: string): ExecutionContext {
  const request = { headers: { authorization: authHeader } };
  return {
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;
}

describe('JwtGuard', () => {
  let guard: JwtGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test-secret' });
    guard = new JwtGuard(jwtService);
  });

  it('returns true and attaches user for a valid token', () => {
    const token = jwtService.sign({ email: 'alice@example.com' });
    const ctx = makeContext(`Bearer ${token}`);
    expect(guard.canActivate(ctx)).toBe(true);
    const req = ctx.switchToHttp().getRequest<Record<string, unknown>>();
    expect((req as any).user).toMatchObject({ email: 'alice@example.com' });
  });

  it('throws UnauthorizedException when Authorization header is missing', () => {
    expect(() => guard.canActivate(makeContext())).toThrow(UnauthorizedException);
  });

  it('throws UnauthorizedException when token is invalid', () => {
    expect(() => guard.canActivate(makeContext('Bearer bad.token'))).toThrow(UnauthorizedException);
  });
});
