import { describe, expect, test } from '@jest/globals';

const sum = (t1: number,t2: number) => t1+t2

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
