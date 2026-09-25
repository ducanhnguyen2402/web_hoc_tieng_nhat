export interface SRSData {
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReviewDate: Date;
}

export type Grade = 0 | 3 | 4 | 5;
// 0: Quên (Forgot)
// 3: Khó (Hard)
// 4: Được (Good)
// 5: Dễ (Easy)

/**
 * Thuật toán SM-2 (đơn giản hoá):
 * Dựa trên mức độ đánh giá (Grade) từ 0, 3, 4, 5 để tính toán khoảng thời gian ôn tập tiếp theo.
 * 
 * @param grade Điểm đánh giá (0, 3, 4, 5)
 * @param previousData Dữ liệu SRS hiện tại của thẻ
 * @returns Dữ liệu SRS mới được cập nhật
 */
export function calculateNextReview(grade: Grade, previousData: SRSData): SRSData {
  let { interval, repetition, easeFactor } = previousData;

  if (grade < 3) {
    // Nếu đánh giá dưới 3 (tức là Quên)
    repetition = 0;
    interval = 1;
  } else {
    // Nếu nhớ (Khó, Được, Dễ)
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetition += 1;
  }

  // Cập nhật Ease Factor (Hệ số dễ)
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  
  // Ease Factor không được dưới 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Tính ngày ôn tiếp theo
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  // Đặt về 0h00 để tính theo ngày trọn vẹn
  nextReviewDate.setHours(0, 0, 0, 0);

  return {
    interval,
    repetition,
    easeFactor,
    nextReviewDate
  };
}

export function initializeSRSData(): SRSData {
  const nextReviewDate = new Date();
  nextReviewDate.setHours(0, 0, 0, 0);
  return {
    interval: 0,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate
  };
}
