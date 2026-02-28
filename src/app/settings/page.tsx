'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Upload, Trash2, ChevronRight } from 'lucide-react';
import { exportData, importData, deleteAllDDays } from '@/lib/storage';
import PageHeader from '@/components/ui/page-header';
import ThemeToggle from '@/components/features/theme-toggle';
import DeleteConfirmDialog from '@/components/features/delete-confirm-dialog';
import { ToastContainer, useToast } from '@/components/ui/toast';

export default function SettingsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  // 데이터 내보내기
  function handleExport() {
    try {
      const json = exportData();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      a.href = url;
      a.download = `day-counter-backup-${dateStr}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('데이터를 내보냈습니다', 'success');
    } catch {
      showToast('내보내기에 실패했습니다', 'error');
    }
  }

  // 데이터 가져오기
  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      importData(text);
      showToast('데이터를 가져왔습니다', 'success');
    } catch {
      showToast('데이터 가져오기에 실패했습니다. JSON 파일을 확인해주세요.', 'error');
    } finally {
      // input 초기화 (같은 파일 재선택 가능)
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  // 전체 삭제
  async function handleDeleteAll() {
    setIsDeletingAll(true);
    try {
      deleteAllDDays();
      setIsDeleteAllOpen(false);
      showToast('모든 D-Day가 삭제되었습니다', 'success');
    } catch {
      showToast('삭제에 실패했습니다', 'error');
    } finally {
      setIsDeletingAll(false);
    }
  }

  return (
    <>
      <PageHeader title="설정" backHref="/" />

      <div className="space-y-8">
        {/* 테마 섹션 */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">
            테마
          </h2>
          <ThemeToggle />
        </section>

        {/* 데이터 관리 섹션 */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">
            데이터 관리
          </h2>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* 내보내기 */}
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-3 px-4 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <Download size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  데이터 내보내기
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  JSON 파일로 백업
                </p>
              </div>
              <ChevronRight size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
            </button>

            {/* 가져오기 */}
            <button
              onClick={handleImportClick}
              className="w-full flex items-center gap-3 px-4 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Upload size={16} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  데이터 가져오기
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  JSON 파일에서 복원 (기존 데이터 덮어쓰기)
                </p>
              </div>
              <ChevronRight size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
            </button>

            {/* 전체 삭제 */}
            <button
              onClick={() => setIsDeleteAllOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-4 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <Trash2 size={16} className="text-red-500 dark:text-red-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  모든 데이터 삭제
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  이 작업은 되돌릴 수 없습니다
                </p>
              </div>
              <ChevronRight size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
            </button>
          </div>

          {/* 숨겨진 파일 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
            aria-label="JSON 파일 선택"
          />
        </section>

        {/* 앱 정보 섹션 */}
        <section>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">
            앱 정보
          </h2>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 text-center space-y-1.5">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
              Day Counter
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500">v1.0.0</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Made with Next.js + Tailwind CSS
            </p>
            <p className="text-xs text-slate-300 dark:text-slate-600 pt-1">
              광고 없이 깔끔한 D-Day 카운터
            </p>
          </div>
        </section>
      </div>

      {/* 전체 삭제 확인 다이얼로그 */}
      <DeleteConfirmDialog
        isOpen={isDeleteAllOpen}
        onClose={() => setIsDeleteAllOpen(false)}
        onConfirm={handleDeleteAll}
        title="모든 D-Day를 삭제하시겠어요?"
        message="모든 D-Day가 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        isLoading={isDeletingAll}
      />

      {/* 토스트 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
