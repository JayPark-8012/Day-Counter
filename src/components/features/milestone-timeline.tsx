// 마일스톤 타임라인 컴포넌트
import { Milestone } from '@/types/dday';
import { Check } from 'lucide-react';

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export default function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  // 날짜를 "2026.03.25" 형식으로 포맷
  function formatMilestoneDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${year}.${month}.${day}`;
  }

  // 상태 텍스트
  function getStatusText(milestone: Milestone): string {
    if (milestone.isCurrent) return '오늘';
    if (milestone.isPassed) return '지남';
    if (milestone.daysFromToday === 1) return '내일';
    return `${milestone.daysFromToday}일 남음`;
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        마일스톤
      </h2>
      <div className="relative pl-8">
        {/* 타임라인 수직선 */}
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-5">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-center gap-4">
              {/* 타임라인 포인트 */}
              {milestone.isCurrent ? (
                // 현재 마일스톤 (펄스 애니메이션)
                <div className="absolute -left-5 w-4 h-4 rounded-full bg-indigo-500 dark:bg-indigo-400 ring-4 ring-indigo-200 dark:ring-indigo-800/40 animate-pulse" />
              ) : milestone.isPassed ? (
                // 완료된 마일스톤
                <div className="absolute -left-4.5 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400 ring-4 ring-indigo-100 dark:ring-indigo-900/40 flex items-center justify-center">
                </div>
              ) : (
                // 미완료 마일스톤
                <div className="absolute -left-4.5 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-slate-100 dark:ring-slate-800" />
              )}

              {/* 마일스톤 내용 */}
              <div className="flex items-center justify-between w-full pl-1">
                <div className="flex items-center gap-3">
                  {/* 라벨 */}
                  <span
                    className={[
                      'text-sm font-semibold w-12',
                      milestone.isCurrent
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : milestone.isPassed
                          ? 'text-indigo-500 dark:text-indigo-400'
                          : 'text-slate-400 dark:text-slate-500',
                    ].join(' ')}
                  >
                    {milestone.label}
                  </span>

                  {/* 날짜 */}
                  <span
                    className={[
                      'text-sm',
                      milestone.isPassed || milestone.isCurrent
                        ? 'text-slate-600 dark:text-slate-300'
                        : 'text-slate-400 dark:text-slate-500',
                    ].join(' ')}
                  >
                    {formatMilestoneDate(milestone.date)}
                  </span>
                </div>

                {/* 상태 텍스트 */}
                <span
                  className={[
                    'text-xs font-medium px-2 py-0.5 rounded-full',
                    milestone.isCurrent
                      ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400'
                      : milestone.isPassed
                        ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                        : 'bg-slate-50 text-slate-400 dark:bg-slate-800/50 dark:text-slate-500',
                  ].join(' ')}
                >
                  {getStatusText(milestone)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
