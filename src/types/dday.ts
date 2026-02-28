// D-Day 카테고리 타입
export type Category = 'anniversary' | 'exam' | 'travel' | 'birthday' | 'custom';

// D-Day 메인 인터페이스
export interface DDay {
  id: string;
  title: string;       // D-Day 제목 (1~30자)
  targetDate: string;  // 대상 날짜 (YYYY-MM-DD)
  category: Category;  // 카테고리
  emoji: string;       // 이모지 아이콘
  createdAt: string;   // 생성일시 (ISO 8601)
  updatedAt: string;   // 수정일시 (ISO 8601)
}

// D-Day 생성 시 입력 데이터
export interface CreateDDayInput {
  title: string;
  targetDate: string;
  category: Category;
  emoji?: string;
}

// D-Day 수정 시 입력 데이터 (모든 필드 선택적)
export interface UpdateDDayInput {
  title?: string;
  targetDate?: string;
  category?: Category;
  emoji?: string;
}

// 마일스톤 인터페이스
export interface Milestone {
  label: string;          // "D-100", "D-50", "D-30" 등
  date: string;           // 마일스톤 날짜 (YYYY-MM-DD)
  daysFromToday: number;  // 오늘 기준 남은/지난 일수
  isPassed: boolean;      // 이미 지났는지 여부
  isCurrent: boolean;     // 오늘이 마일스톤 당일인지 여부
}

// 카테고리별 기본 이모지 매핑
export const CATEGORY_DEFAULT_EMOJI: Record<Category, string> = {
  anniversary: '❤️',
  exam: '📚',
  travel: '✈️',
  birthday: '🎂',
  custom: '📅',
};

// 카테고리별 추천 이모지 목록
export const CATEGORY_EMOJI_LIST: Record<Category, string[]> = {
  anniversary: ['❤️', '💕', '💞', '🎁', '💍', '💐', '✨', '🌟', '🎀', '💌'],
  exam: ['📚', '✏️', '🎓', '📝', '🏆', '💪', '🎯', '💡', '🧠', '💯'],
  travel: ['✈️', '🌏', '🧳', '🌴', '🌄', '📷', '🧭', '🗺️', '🏖️', '🚀'],
  birthday: ['🎂', '🎉', '🎈', '🎊', '🎁', '🥳', '🍰', '👑', '⭐', '🎇'],
  custom: ['📅', '📌', '🔔', '⏰', '⌛', '⚡', '🔥', '🌈', '🍀', '💎'],
};

// 카테고리 한국어 레이블
export const CATEGORY_LABELS: Record<Category, string> = {
  anniversary: '기념일',
  exam: '시험',
  travel: '여행',
  birthday: '생일',
  custom: '커스텀',
};

// 유효한 카테고리 배열
export const VALID_CATEGORIES: Category[] = ['anniversary', 'exam', 'travel', 'birthday', 'custom'];
