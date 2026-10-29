import bcrypt from 'bcryptjs';
import { ADMIN_PASSWORD_HASH } from './adminConfig';

const SESSION_KEY = 'admin_session';

export async function adminLogin(password: string): Promise<boolean> {
  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (valid) {
    sessionStorage.setItem(SESSION_KEY, 'authenticated');
  }
  return valid;
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
