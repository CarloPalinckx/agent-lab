import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test-secret' })],
      controllers: [AppController],
      providers: [AppService, UsersService],
    }).compile();
    controller = module.get<AppController>(AppController);
  });

  it('returns greeting from service', () => {
    expect(controller.getHello()).toBe('Hello from Agent Lab API!');
  });

  it('returns user profile for a valid request', () => {
    const req = { user: { email: 'alice@example.com' } };
    expect(controller.getMe(req as any)).toMatchObject({
      id: 'usr_001',
      email: 'alice@example.com',
      name: 'Alice Johnson',
      role: 'admin',
    });
  });
});
