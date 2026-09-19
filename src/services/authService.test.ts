import { describe, it, expect } from 'vitest';
import { authService } from './authService';

describe('authService', () => {
  it('should successfully log in with demo credentials', async () => {
    const res = await authService.login('analyst@soc.local', 'raven2025');
    expect(res).toBeDefined();
    expect(res.user.email).toBe('analyst@soc.local');
    expect(res.token).toBe('mock-jwt-token-12345');
  });

  it('should reject invalid credentials', async () => {
    await expect(authService.login('wrong@email.com', 'short'))
      .rejects
      .toThrow('Invalid credentials');
  });

  it('should successfully log out', async () => {
    await expect(authService.logout()).resolves.toBeUndefined();
  });
});
