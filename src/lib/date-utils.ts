import { Milestone } from '@/types/dday';

// 날짜 문자열(YYYY-MM-DD)을 자정 기준 Date 객체로 변환
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// 오늘 날짜를 자정 기준으로 반환
function getTodayMidnight(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

/**
 * 대상 날짜까지 남은 일수를 계산한다.
 * - 양수: 미래 (D-N)
 * - 0: 당일 (D-Day)
 * - 음수: 과거 (D+N, 절댓값 사용)
 */
export function calculateDDay(targetDate: string): number {
  const today = getTodayMidnight();
  const target = parseLocalDate(targetDate);
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * 남은 일수를 "D-30", "D-Day", "D+100" 형식의 문자열로 변환한다.
 * - days > 0: "D-30" (미래)
 * - days === 0: "D-Day" (당일)
 * - days < 0: "D+100" (과거)
 */
export function formatDDay(days: number): string {
  if (days === 0) return 'D-Day';
  if (days > 0) return `D-${days}`;
  return `D+${Math.abs(days)}`;
}

/**
 * 대상 날짜를 "2026년 3월 1일 (토)" 형식으로 포맷한다.
 */
export function formatDate(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
}

/**
 * ISO 8601 날짜시간 문자열을 "2026년 3월 1일" 형식으로 포맷한다.
 */
export function formatDateShort(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

/**
 * Date 객체를 YYYY-MM-DD 형식 문자열로 변환한다.
 */
function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 대상 날짜에 대한 마일스톤 배열을 반환한다.
 * 마일스톤: D-100, D-50, D-30, D-10, D-7, D-3, D-1, D-Day
 */
export function getMilestones(targetDate: string): Milestone[] {
  const target = parseLocalDate(targetDate);
  const today = getTodayMidnight();

  // 마일스톤 기준 일수 (대상 날짜로부터 N일 전)
  const MILESTONE_DAYS = [100, 50, 30, 10, 7, 3, 1, 0];

  return MILESTONE_DAYS.map((offsetDays) => {
    // 마일스톤 날짜 = 대상 날짜 - offsetDays
    const milestoneDate = new Date(target.getTime());
    milestoneDate.setDate(milestoneDate.getDate() - offsetDays);

    // 오늘 기준 마일스톤 날짜까지 남은 일수
    const diffMs = milestoneDate.getTime() - today.getTime();
    const daysFromToday = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const label = offsetDays === 0 ? 'D-Day' : `D-${offsetDays}`;
    const isPassed = daysFromToday < 0;
    const isCurrent = daysFromToday === 0;

    return {
      label,
      date: toDateString(milestoneDate),
      daysFromToday,
      isPassed,
      isCurrent,
    };
  });
}

/**
 * 대상 날짜가 미래인지 여부를 반환한다.
 */
export function isFuture(targetDate: string): boolean {
  return calculateDDay(targetDate) > 0;
}

/**
 * 대상 날짜가 오늘인지 여부를 반환한다.
 */
export function isToday(targetDate: string): boolean {
  return calculateDDay(targetDate) === 0;
}

/**
 * 대상 날짜가 과거인지 여부를 반환한다.
 */
export function isPast(targetDate: string): boolean {
  return calculateDDay(targetDate) < 0;
}
