'use client';

// 이모지 피커 컴포넌트 - 카테고리별 추천 이모지 선택
import { Category, CATEGORY_EMOJI_LIST } from '@/types/dday';

interface EmojiPickerProps {
  category: Category;
  selected: string;
  onChange: (emoji: string) => void;
}

export default function EmojiPicker({ category, selected, onChange }: EmojiPickerProps) {
  const emojiList = CATEGORY_EMOJI_LIST[category];

  return (
    <div>
      <div className="grid grid-cols-5 gap-3">
        {emojiList.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onChange(emoji)}
            className={[
              'flex items-center justify-center',
              'w-12 h-12 rounded-xl text-2xl',
              'transition-all duration-200',
              selected === emoji
                ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 scale-110'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-110',
            ].join(' ')}
            aria-label={emoji}
            aria-pressed={selected === emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
