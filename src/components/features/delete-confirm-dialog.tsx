'use client';

// 삭제 확인 다이얼로그 컴포넌트
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = '정말 삭제하시겠어요?',
  message = '삭제된 D-Day는 복구할 수 없습니다.',
  isLoading = false,
}: DeleteConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center">
        {/* 아이콘 */}
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <span className="text-2xl">🗑️</span>
        </div>

        {/* 제목 */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          {title}
        </h3>

        {/* 메시지 */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {message}
        </p>

        {/* 버튼 영역 */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            variant="danger"
            fullWidth
            onClick={onConfirm}
            isLoading={isLoading}
          >
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}
