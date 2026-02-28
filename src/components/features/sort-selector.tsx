'use client';

// 정렬 선택 컴포넌트
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'date-asc' | 'date-desc' | 'name' | 'created';

const SORT_LABELS: Record<SortOption, string> = {
  'date-asc': '날짜 가까운 순',
  'date-desc': '날짜 먼 순',
  name: '이름순',
  created: '생성순',
};

interface SortSelectorProps {
  count: number;
  selected: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortSelector({ count, selected, onChange }: SortSelectorProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {count}개의 D-Day
      </span>
      <div className="relative">
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
          <ArrowUpDown size={14} className="shrink-0" />
          <select
            value={selected}
            onChange={(e) => onChange(e.target.value as SortOption)}
            className={[
              'appearance-none bg-transparent',
              'text-sm font-medium text-slate-600 dark:text-slate-300',
              'cursor-pointer focus:outline-none',
              'pr-0',
            ].join(' ')}
            aria-label="정렬 기준 선택"
          >
            {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(
              ([key, label]) => (
                <option key={key} value={key} className="bg-white dark:bg-slate-800">
                  {label}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
