import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('returns a user by email', () => {
    const user = service.findByEmail('alice@example.com');
    expect(user).toMatchObject({ id: 'usr_001', name: 'Alice Johnson', role: 'admin' });
  });

  it('returns undefined for an unknown email', () => {
    expect(service.findByEmail('nobody@example.com')).toBeUndefined();
  });
});
