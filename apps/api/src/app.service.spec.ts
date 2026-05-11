import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    service = module.get<AppService>(AppService);
  });

  it('returns greeting', () => {
    expect(service.getHello()).toBe('Hello from Agent Lab API!');
  });
});
