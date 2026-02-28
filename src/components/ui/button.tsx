// 공통 버튼 컴포넌트 - Primary, Secondary, Ghost, Danger 변형 지원
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold shadow-sm hover:shadow-md dark:bg-indigo-600 dark:hover:bg-indigo-500',
  secondary:
    'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200',
  ghost:
    'hover:bg-slate-100 text-slate-600 font-medium dark:hover:bg-slate-800 dark:text-slate-300',
  danger:
    'bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm hover:shadow-md dark:bg-red-600 dark:hover:bg-red-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-200',
          'active:scale-[0.98]',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {isLoading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
