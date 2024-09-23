import { createHmac } from 'crypto';

export function hashString({ value, salt }: { value: string; salt: string }) {
  const hash = createHmac('sha512', salt);
  return hash.update(value).digest('hex');
}

export function generateSalt() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
