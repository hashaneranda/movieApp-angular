import { TestBed } from '@angular/core/testing';
import { User } from '@app/models';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getValue should return user list', () => {
    let actualCount: number | undefined;
    service.getAll().subscribe((users) => {
      actualCount = users.length;
    });
    expect(actualCount).toBeGreaterThan(0);
  });

  it('#getById should return admin user correctly', () => {
    let user: any;
    service.getById(1).subscribe((users) => {
      user = users;
    });
    expect(user?.username).toBe('admin');
  });

  it('#getById should return default user correctly', () => {
    let user: any;
    service.getById(2).subscribe((users) => {
      user = users;
    });
    expect(user?.username).toBe('user');
  });
});
