import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

it('compiles module', async () => {
  const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
  expect(module).toBeDefined();
});
