'use client';

// 페이지 헤더 컴포넌트 - 뒤로가기 + 제목 + 액션 버튼
import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title?: string;
  onBack?: () => void;
  backHref?: string;
  actions?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  onBack,
  backHref,
  actions,
  className = '',
}: PageHeaderProps) {
  const router = useRouter();

  function handleBack() {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  }

  return (
    <header
      className={['flex items-center justify-between mb-6', className].join(' ')}
    >
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        aria-label="뒤로가기"
      >
        <ChevronLeft size={22} />
      </button>

      {/* 제목 */}
      {title && (
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
      )}

      {/* 액션 버튼 영역 */}
      <div className="flex items-center gap-1">
        {actions || <span className="w-10" />}
      </div>
    </header>
  );
}
