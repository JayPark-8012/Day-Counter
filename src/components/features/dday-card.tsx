// D-Day 카드 컴포넌트 - 카테고리별 그라데이션 배경
import Link from 'next/link';
import { DDay, Category, CATEGORY_LABELS } from '@/types/dday';
import { calculateDDay, formatDDay, formatDate } from '@/lib/date-utils';

interface DdayCardProps {
  dday: DDay;
}

// 카테고리별 그라데이션 클래스 (라이트 + 다크)
const CATEGORY_GRADIENT: Record<Category, string> = {
  anniversary:
    'bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-950/40 dark:to-rose-900/30',
  exam: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/30',
  travel:
    'bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950/40 dark:to-teal-900/30',
  birthday:
    'bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-orange-950/40 dark:to-yellow-900/30',
  custom:
    'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950/40 dark:to-indigo-900/30',
};

// 카테고리별 태그 컬러 클래스
const CATEGORY_TAG: Record<Category, string> = {
  anniversary:
    'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  exam: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  travel:
    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  birthday:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  custom:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

export default function DdayCard({ dday }: DdayCardProps) {
  const days = calculateDDay(dday.targetDate);
  const ddayText = formatDDay(days);
  const dateText = formatDate(dday.targetDate);

  // D-Day 숫자 색상
  const countColor =
    days === 0
      ? 'text-amber-500 dark:text-amber-400'
      : days > 0
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-500 dark:text-slate-400';

  return (
    <Link href={`/detail/${dday.id}`} className="block">
      <article
        className={[
          'rounded-2xl border border-slate-200/50 dark:border-slate-700/50',
          'p-5 shadow-sm hover:shadow-md',
          'hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
          'backdrop-blur-sm',
          CATEGORY_GRADIENT[dday.category],
        ].join(' ')}
      >
        {/* 상단: 이모지 + 카테고리 태그 */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl leading-none" role="img" aria-label={CATEGORY_LABELS[dday.category]}>
            {dday.emoji}
          </span>
          <span
            className={[
              'text-xs font-medium px-2 py-1 rounded-full',
              CATEGORY_TAG[dday.category],
            ].join(' ')}
          >
            {CATEGORY_LABELS[dday.category]}
          </span>
        </div>

        {/* 중앙: D-Day 카운트 */}
        <div className={['text-3xl font-extrabold tracking-tight mb-2', countColor].join(' ')}>
          {ddayText}
        </div>

        {/* 하단: 제목 + 날짜 */}
        <div className="flex items-end justify-between gap-2">
          <p className="text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
            {dday.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
            {dateText.split(' ').slice(0, 3).join(' ')}
          </p>
        </div>
      </article>
    </Link>
  );
}
