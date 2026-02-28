'use client';

// 카테고리 필터 칩 컴포넌트
import { Category, CATEGORY_LABELS, CATEGORY_DEFAULT_EMOJI, VALID_CATEGORIES } from '@/types/dday';

type FilterCategory = 'all' | Category;

interface CategoryFilterProps {
  selected: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

// 카테고리별 선택 상태 클래스
const SELECTED_CLASSES: Record<string, string> = {
  all: 'bg-indigo-500 text-white shadow-sm dark:bg-indigo-600',
  anniversary: 'bg-pink-500 text-white shadow-sm dark:bg-pink-600',
  exam: 'bg-blue-500 text-white shadow-sm dark:bg-blue-600',
  travel: 'bg-green-500 text-white shadow-sm dark:bg-green-600',
  birthday: 'bg-orange-500 text-white shadow-sm dark:bg-orange-600',
  custom: 'bg-purple-500 text-white shadow-sm dark:bg-purple-600',
};

const UNSELECTED_CLASS =
  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const categories: { key: FilterCategory; label: string; emoji: string }[] = [
    { key: 'all', label: '전체', emoji: '✨' },
    ...VALID_CATEGORIES.map((cat) => ({
      key: cat as FilterCategory,
      label: CATEGORY_LABELS[cat],
      emoji: CATEGORY_DEFAULT_EMOJI[cat],
    })),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
      {categories.map(({ key, label, emoji }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={[
            'shrink-0 rounded-full px-4 py-2 text-sm font-medium',
            'transition-all duration-200 flex items-center gap-1.5',
            selected === key ? SELECTED_CLASSES[key] : UNSELECTED_CLASS,
          ].join(' ')}
        >
          <span>{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
