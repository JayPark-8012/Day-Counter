'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { DDay, Category, CATEGORY_LABELS, CATEGORY_DEFAULT_EMOJI, VALID_CATEGORIES } from '@/types/dday';
import { getDDayById, updateDDay, deleteDDay } from '@/lib/storage';
import { calculateDDay, formatDDay, formatDate, getMilestones, formatDateShort } from '@/lib/date-utils';
import PageHeader from '@/components/ui/page-header';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';
import MilestoneTimeline from '@/components/features/milestone-timeline';
import DeleteConfirmDialog from '@/components/features/delete-confirm-dialog';
import EmojiPicker from '@/components/features/emoji-picker';
import { ToastContainer, useToast } from '@/components/ui/toast';

// 카테고리 그라데이션 (상세용)
const CATEGORY_GRADIENT: Record<Category, string> = {
  anniversary: 'bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-950/60 dark:to-rose-900/50',
  exam: 'bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-950/60 dark:to-indigo-900/50',
  travel: 'bg-gradient-to-br from-green-100 to-teal-200 dark:from-green-950/60 dark:to-teal-900/50',
  birthday: 'bg-gradient-to-br from-orange-100 to-yellow-200 dark:from-orange-950/60 dark:to-yellow-900/50',
  custom: 'bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-950/60 dark:to-indigo-900/50',
};

const CATEGORY_TAG: Record<Category, string> = {
  anniversary: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  exam: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  travel: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  birthday: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  custom: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
};

const CATEGORY_SELECTED: Record<Category, string> = {
  anniversary: 'bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-700',
  exam: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
  travel: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700',
  birthday: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700',
  custom: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700',
};

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [dday, setDday] = useState<DDay | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  // 수정 폼 상태
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editCategory, setEditCategory] = useState<Category>('anniversary');
  const [editEmoji, setEditEmoji] = useState('');
  const [editErrors, setEditErrors] = useState<{ title?: string; date?: string }>({});
  const [isSaving, setIsSaving] = useState(false);

  const loadDDay = useCallback(() => {
    const found = getDDayById(id);
    setDday(found);
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    loadDDay();
  }, [loadDDay]);

  // 수정 모달 열기
  function openEdit() {
    if (!dday) return;
    setEditTitle(dday.title);
    setEditDate(dday.targetDate);
    setEditCategory(dday.category);
    setEditEmoji(dday.emoji);
    setEditErrors({});
    setIsEditOpen(true);
  }

  // 카테고리 변경
  function handleEditCategoryChange(cat: Category) {
    setEditCategory(cat);
    setEditEmoji(CATEGORY_DEFAULT_EMOJI[cat]);
  }

  // 수정 저장
  async function handleEditSave() {
    const errors: { title?: string; date?: string } = {};
    if (!editTitle.trim()) errors.title = '제목을 입력해주세요';
    else if (editTitle.trim().length > 30) errors.title = '제목은 30자 이내로 입력해주세요';
    if (!editDate) errors.date = '날짜를 선택해주세요';

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      const updated = updateDDay(id, {
        title: editTitle.trim(),
        targetDate: editDate,
        category: editCategory,
        emoji: editEmoji,
      });
      if (updated) {
        setDday(updated);
        setIsEditOpen(false);
        showToast('수정되었습니다', 'success');
      }
    } catch {
      showToast('수정에 실패했습니다', 'error');
    } finally {
      setIsSaving(false);
    }
  }

  // 삭제 확인
  async function handleDelete() {
    setIsDeleting(true);
    try {
      deleteDDay(id);
      router.push('/');
    } catch {
      showToast('삭제에 실패했습니다', 'error');
      setIsDeleting(false);
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!dday) {
    return (
      <>
        <PageHeader backHref="/" />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-6xl mb-4">😕</p>
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            D-Day를 찾을 수 없어요
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
            삭제되었거나 존재하지 않는 D-Day입니다
          </p>
          <Button variant="primary" onClick={() => router.push('/')}>
            메인으로 돌아가기
          </Button>
        </div>
      </>
    );
  }

  const days = calculateDDay(dday.targetDate);
  const ddayText = formatDDay(days);
  const dateText = formatDate(dday.targetDate);
  const milestones = getMilestones(dday.targetDate);

  const countColor =
    days === 0
      ? 'text-amber-500 dark:text-amber-400'
      : days > 0
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-500 dark:text-slate-400';

  return (
    <>
      {/* 페이지 헤더 */}
      <PageHeader
        backHref="/"
        actions={
          <>
            <button
              onClick={openEdit}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="수정"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              aria-label="삭제"
            >
              <Trash2 size={20} />
            </button>
          </>
        }
      />

      <div className="space-y-6">
        {/* 히어로 영역 */}
        <div
          className={[
            'rounded-2xl p-8 text-center border border-slate-200/50 dark:border-slate-700/50',
            CATEGORY_GRADIENT[dday.category],
          ].join(' ')}
        >
          {/* 이모지 */}
          <div className="text-6xl mb-4" role="img" aria-label={dday.title}>
            {dday.emoji}
          </div>

          {/* 제목 */}
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            {dday.title}
          </p>

          {/* D-Day 카운트 */}
          <div
            className={[
              'text-6xl font-extrabold tracking-tight mb-4',
              countColor,
              days === 0 ? 'animate-pulse' : '',
            ].join(' ')}
          >
            {ddayText}
          </div>

          {/* 날짜 */}
          <p className="text-base text-slate-600 dark:text-slate-300 mb-3">{dateText}</p>

          {/* 카테고리 태그 */}
          <span
            className={[
              'inline-block text-xs font-medium px-3 py-1 rounded-full',
              CATEGORY_TAG[dday.category],
            ].join(' ')}
          >
            {CATEGORY_LABELS[dday.category]}
          </span>
        </div>

        {/* 마일스톤 타임라인 */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <MilestoneTimeline milestones={milestones} />
        </div>

        {/* 등록 정보 */}
        <div className="text-center space-y-1 pb-6">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            등록일: {formatDateShort(dday.createdAt)}
          </p>
          {dday.updatedAt !== dday.createdAt && (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              수정일: {formatDateShort(dday.updatedAt)}
            </p>
          )}
        </div>
      </div>

      {/* 수정 모달 */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="D-Day 수정">
        <div className="space-y-5">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              제목
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (editErrors.title) setEditErrors((p) => ({ ...p, title: undefined }));
              }}
              maxLength={30}
              placeholder="D-Day 제목을 입력하세요"
              className={[
                'w-full rounded-xl border px-4 py-3 text-base bg-white dark:bg-slate-700',
                'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500',
                'dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400 transition-all duration-200',
                editErrors.title ? 'border-red-500' : 'border-slate-200 dark:border-slate-600',
              ].join(' ')}
            />
            {editErrors.title && (
              <p className="mt-1 text-xs text-red-500">{editErrors.title}</p>
            )}
          </div>

          {/* 날짜 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              날짜
            </label>
            <div className="relative">
              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={editDate}
                onChange={(e) => {
                  setEditDate(e.target.value);
                  if (editErrors.date) setEditErrors((p) => ({ ...p, date: undefined }));
                }}
                className={[
                  'w-full rounded-xl border pl-10 pr-4 py-3 text-base bg-white dark:bg-slate-700',
                  'text-slate-900 dark:text-slate-100',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500',
                  'dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400 transition-all duration-200',
                  editErrors.date ? 'border-red-500' : 'border-slate-200 dark:border-slate-600',
                ].join(' ')}
              />
            </div>
            {editErrors.date && (
              <p className="mt-1 text-xs text-red-500">{editErrors.date}</p>
            )}
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {VALID_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleEditCategoryChange(cat)}
                  className={[
                    'flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all duration-200',
                    editCategory === cat
                      ? CATEGORY_SELECTED[cat]
                      : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600',
                  ].join(' ')}
                >
                  <span>{CATEGORY_DEFAULT_EMOJI[cat]}</span>
                  <span>{CATEGORY_LABELS[cat]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 이모지 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              이모지
            </label>
            <EmojiPicker category={editCategory} selected={editEmoji} onChange={setEditEmoji} />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" fullWidth onClick={() => setIsEditOpen(false)} disabled={isSaving}>
              취소
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleEditSave}
              isLoading={isSaving}
              disabled={!editTitle.trim() || !editDate}
            >
              수정하기
            </Button>
          </div>
        </div>
      </Modal>

      {/* 삭제 확인 다이얼로그 */}
      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="D-Day를 삭제하시겠어요?"
        message="삭제된 D-Day는 복구할 수 없습니다."
        isLoading={isDeleting}
      />

      {/* 토스트 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
