// 히어로 카드 컴포넌트 - 가장 가까운 D-Day를 메인 상단에 크게 표시
import Link from 'next/link';
import { DDay, Category, CATEGORY_LABELS } from '@/types/dday';
import { calculateDDay, formatDDay, formatDate } from '@/lib/date-utils';

interface HeroCardProps {
  dday: DDay;
}

// 히어로 카드용 그라데이션 (더 진한 버전)
const HERO_GRADIENT: Record<Category, string> = {
  anniversary:
    'bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-950/60 dark:to-rose-900/50',
  exam: 'bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-950/60 dark:to-indigo-900/50',
  travel:
    'bg-gradient-to-br from-green-100 to-teal-200 dark:from-green-950/60 dark:to-teal-900/50',
  birthday:
    'bg-gradient-to-br from-orange-100 to-yellow-200 dark:from-orange-950/60 dark:to-yellow-900/50',
  custom:
    'bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-950/60 dark:to-indigo-900/50',
};

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

export default function HeroCard({ dday }: HeroCardProps) {
  const days = calculateDDay(dday.targetDate);
  const ddayText = formatDDay(days);
  const dateText = formatDate(dday.targetDate);

  const countColor =
    days === 0
      ? 'text-amber-500 dark:text-amber-400'
      : days > 0
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-500 dark:text-slate-400';

  return (
    <Link href={`/detail/${dday.id}`} className="block mb-6">
      <article
        className={[
          'rounded-2xl shadow-md p-6 sm:p-8',
          'hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer',
          'border border-slate-200/50 dark:border-slate-700/50',
          HERO_GRADIENT[dday.category],
        ].join(' ')}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* 이모지 */}
            <div className="text-4xl mb-3" role="img" aria-label={dday.title}>
              {dday.emoji}
            </div>

            {/* 제목 */}
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 truncate">
              {dday.title}
            </p>

            {/* 날짜 */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {dateText}
            </p>
          </div>

          {/* 카테고리 태그 */}
          <span
            className={[
              'text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-3',
              CATEGORY_TAG[dday.category],
            ].join(' ')}
          >
            {CATEGORY_LABELS[dday.category]}
          </span>
        </div>

        {/* D-Day 큰 숫자 */}
        <div
          className={[
            'text-5xl sm:text-6xl font-extrabold tracking-tight',
            countColor,
          ].join(' ')}
        >
          {ddayText}
        </div>
      </article>
    </Link>
  );
}
