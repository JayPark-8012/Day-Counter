'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { Category, CATEGORY_LABELS, CATEGORY_DEFAULT_EMOJI, VALID_CATEGORIES } from '@/types/dday';
import { createDDay } from '@/lib/storage';
import { calculateDDay, formatDDay } from '@/lib/date-utils';
import PageHeader from '@/components/ui/page-header';
import Button from '@/components/ui/button';
import EmojiPicker from '@/components/features/emoji-picker';

// 카테고리 선택 칩 스타일
const CATEGORY_SELECTED: Record<Category, string> = {
  anniversary: 'bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-700',
  exam: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
  travel: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700',
  birthday: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700',
  custom: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700',
};

const CATEGORY_GRADIENT: Record<Category, string> = {
  anniversary: 'bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-950/40 dark:to-rose-900/30',
  exam: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/30',
  travel: 'bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950/40 dark:to-teal-900/30',
  birthday: 'bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-orange-950/40 dark:to-yellow-900/30',
  custom: 'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950/40 dark:to-indigo-900/30',
};

export default function NewDDayPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState<Category>('anniversary');
  const [emoji, setEmoji] = useState(CATEGORY_DEFAULT_EMOJI['anniversary']);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; date?: string }>({});

  // 카테고리 변경 시 이모지도 기본값으로 초기화
  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    setEmoji(CATEGORY_DEFAULT_EMOJI[cat]);
  }

  // 유효성 검사
  function validate(): boolean {
    const newErrors: { title?: string; date?: string } = {};
    if (!title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    } else if (title.trim().length > 30) {
      newErrors.title = '제목은 30자 이내로 입력해주세요';
    }
    if (!targetDate) {
      newErrors.date = '날짜를 선택해주세요';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // 저장
  async function handleSave() {
    if (!validate()) return;
    setIsSaving(true);
    try {
      createDDay({
        title: title.trim(),
        targetDate,
        category,
        emoji,
      });
      router.push('/');
    } catch {
      setErrors({ title: '저장에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSaving(false);
    }
  }

  // 미리보기용 데이터
  const previewDays = targetDate ? calculateDDay(targetDate) : null;
  const previewDDayText = previewDays !== null ? formatDDay(previewDays) : 'D-?';
  const isFormValid = title.trim().length > 0 && targetDate.length > 0;

  return (
    <>
      <PageHeader title="D-Day 추가" backHref="/" />

      <div className="space-y-6">
        {/* 제목 입력 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="D-Day 제목을 입력하세요"
            maxLength={30}
            className={[
              'w-full rounded-xl border px-4 py-3 text-base bg-white dark:bg-slate-800',
              'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500',
              'dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400',
              'transition-all duration-200',
              errors.title
                ? 'border-red-500 dark:border-red-400'
                : 'border-slate-200 dark:border-slate-700',
            ].join(' ')}
          />
          <div className="flex justify-between mt-1.5">
            {errors.title ? (
              <p className="text-xs text-red-500 dark:text-red-400">{errors.title}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
              {title.length}/30
            </span>
          </div>
        </div>

        {/* 날짜 입력 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            날짜
          </label>
          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
            <input
              type="date"
              value={targetDate}
              onChange={(e) => {
                setTargetDate(e.target.value);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              className={[
                'w-full rounded-xl border pl-11 pr-4 py-3 text-base bg-white dark:bg-slate-800',
                'text-slate-900 dark:text-slate-100',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500',
                'dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400',
                'transition-all duration-200',
                errors.date
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-slate-200 dark:border-slate-700',
              ].join(' ')}
            />
          </div>
          {errors.date && (
            <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.date}</p>
          )}
        </div>

        {/* 카테고리 선택 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            카테고리
          </label>
          <div className="flex flex-wrap gap-2">
            {VALID_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={[
                  'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200',
                  category === cat
                    ? CATEGORY_SELECTED[cat]
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600',
                ].join(' ')}
              >
                <span>{CATEGORY_DEFAULT_EMOJI[cat]}</span>
                <span>{CATEGORY_LABELS[cat]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 이모지 선택 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            이모지
          </label>
          <EmojiPicker category={category} selected={emoji} onChange={setEmoji} />
        </div>

        {/* 실시간 미리보기 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            미리보기
          </label>
          <div
            className={[
              'rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5',
              CATEGORY_GRADIENT[category],
            ].join(' ')}
          >
            {/* 상단 */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                {CATEGORY_LABELS[category]}
              </span>
            </div>
            {/* D-Day 카운트 */}
            <div className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 mb-2">
              {previewDDayText}
            </div>
            {/* 하단 */}
            <div className="flex items-end justify-between gap-2">
              <p className="text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
                {title || '제목을 입력하세요'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
                {targetDate || 'YYYY-MM-DD'}
              </p>
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleSave}
          isLoading={isSaving}
          disabled={!isFormValid || isSaving}
        >
          {isSaving ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </>
  );
}
