'use client';

// 테마 토글 컴포넌트 - 라이트/다크/시스템 3단 선택
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { saveTheme, getTheme } from '@/lib/storage';

type Theme = 'light' | 'dark' | 'system';

const THEME_OPTIONS: { key: Theme; label: string; Icon: typeof Sun }[] = [
  { key: 'light', label: '라이트', Icon: Sun },
  { key: 'dark', label: '다크', Icon: Moon },
  { key: 'system', label: '시스템', Icon: Monitor },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    // system
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');

  useEffect(() => {
    const saved = getTheme();
    setCurrentTheme(saved);
  }, []);

  function handleThemeChange(theme: Theme) {
    setCurrentTheme(theme);
    saveTheme(theme);
    applyTheme(theme);
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex">
      {THEME_OPTIONS.map(({ key, label, Icon }) => {
        const isSelected = currentTheme === key;
        return (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            className={[
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium',
              'transition-all duration-200',
              isSelected
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300',
            ].join(' ')}
            aria-pressed={isSelected}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
