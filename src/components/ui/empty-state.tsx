// 빈 상태 컴포넌트 - 아이콘 + 안내 메시지 + CTA 버튼
import { CalendarPlus } from 'lucide-react';
import Link from 'next/link';
import Button from './button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export default function EmptyState({
  title = '아직 등록된 D-Day가 없어요',
  description = '첫 번째 D-Day를 추가해보세요',
  ctaLabel = 'D-Day 추가하기',
  ctaHref = '/new',
  onCtaClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 p-5 rounded-full bg-slate-100 dark:bg-slate-800">
        <CalendarPlus size={44} className="text-slate-300 dark:text-slate-600" />
      </div>
      <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {title}
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-8">
        {description}
      </p>
      {onCtaClick ? (
        <Button variant="primary" size="md" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      ) : (
        <Link href={ctaHref ?? '/new'}>
          <Button variant="primary" size="md">
            {ctaLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
