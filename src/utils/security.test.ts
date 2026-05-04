import { describe, it, expect } from 'vitest';
import { emailSchema } from './security';

describe('emailSchema', () => {
  it('accepts a well-formed address', () => {
    expect(emailSchema.safeParse('alice@example.com').success).toBe(true);
  });

  it('rejects a missing @', () => {
    expect(emailSchema.safeParse('alice.example.com').success).toBe(false);
  });

  it('rejects a missing domain', () => {
    expect(emailSchema.safeParse('alice@').success).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(emailSchema.safeParse('').success).toBe(false);
  });

  it('rejects a non-string value', () => {
    expect(emailSchema.safeParse(42).success).toBe(false);
  });
});
