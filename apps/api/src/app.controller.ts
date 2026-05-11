import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AppService } from "./app.service";
import { JwtGuard } from "./auth/jwt.guard";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Returns basic profile info for the authenticated user.
   * Requires a valid Bearer JWT containing an `email` claim.
   */
  @Get("me")
  @UseGuards(JwtGuard)
  getMe(@Req() req: Request): object {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = (req as any).user as { email: string };
    const user = this.usersService.findByEmail(payload.email)!;
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
}
