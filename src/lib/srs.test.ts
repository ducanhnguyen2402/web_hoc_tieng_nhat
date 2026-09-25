import { expect, test, describe } from 'vitest';
import { calculateNextReview, initializeSRSData, Grade } from './srs';

describe('SRS Algorithm (SM-2 simplified)', () => {
  test('Initial calculation with Good (4) grade', () => {
    const initial = initializeSRSData();
    const result = calculateNextReview(4, initial);

    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBe(2.5); // 2.5 + (0.1 - 1 * (0.08 + 1*0.02)) = 2.5 + 0 = 2.5
  });

  test('Calculation with Hard (3) grade should reduce easeFactor', () => {
    const initial = initializeSRSData();
    const result = calculateNextReview(3, initial);

    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBeLessThan(2.5);
  });

  test('Second repetition with Good (4) grade jumps interval to 6', () => {
    const data1 = calculateNextReview(4, initializeSRSData());
    const data2 = calculateNextReview(4, data1);

    expect(data2.repetition).toBe(2);
    expect(data2.interval).toBe(6);
    expect(data2.easeFactor).toBe(2.5);
  });

  test('Forgot (0) grade resets repetition and interval', () => {
    // Thẻ đã ôn được 3 lần
    let data = calculateNextReview(4, initializeSRSData()); // rep 1, int 1
    data = calculateNextReview(4, data); // rep 2, int 6
    data = calculateNextReview(4, data); // rep 3, int 15

    // Bấm quên
    const forgotData = calculateNextReview(0, data);

    expect(forgotData.repetition).toBe(0);
    expect(forgotData.interval).toBe(1);
    expect(forgotData.easeFactor).toBeLessThan(2.5); // Ease factor giảm mạnh
  });

  test('Ease Factor does not go below 1.3', () => {
    let data = initializeSRSData();
    // Bấm quên liên tục 10 lần
    for (let i = 0; i < 10; i++) {
      data = calculateNextReview(0, data);
    }
    expect(data.easeFactor).toBe(1.3);
  });
});
