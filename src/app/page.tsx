'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Settings, Plus } from 'lucide-react';
import { DDay, Category } from '@/types/dday';
import { getAllDDays } from '@/lib/storage';
import { calculateDDay } from '@/lib/date-utils';
import HeroCard from '@/components/features/hero-card';
import DdayCard from '@/components/features/dday-card';
import CategoryFilter from '@/components/features/category-filter';
import SortSelector, { SortOption } from '@/components/features/sort-selector';
import EmptyState from '@/components/ui/empty-state';

type FilterCategory = 'all' | Category;

// 정렬 함수
function sortDDays(list: DDay[], sort: SortOption): DDay[] {
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'date-asc': {
        const dA = Math.abs(calculateDDay(a.targetDate));
        const dB = Math.abs(calculateDDay(b.targetDate));
        return dA - dB;
      }
      case 'date-desc': {
        const dA = Math.abs(calculateDDay(a.targetDate));
        const dB = Math.abs(calculateDDay(b.targetDate));
        return dB - dA;
      }
      case 'name':
        return a.title.localeCompare(b.title, 'ko');
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });
}

// 가장 가까운 D-Day 선택 (미래 우선, 없으면 과거 중 가장 최근)
function getHeroDDay(list: DDay[]): DDay | null {
  if (list.length === 0) return null;

  const futureDDays = list.filter((d) => calculateDDay(d.targetDate) >= 0);
  if (futureDDays.length > 0) {
    return futureDDays.reduce((closest, cur) => {
      const closestDiff = calculateDDay(closest.targetDate);
      const curDiff = calculateDDay(cur.targetDate);
      return curDiff < closestDiff ? cur : closest;
    });
  }

  // 과거 D-Day 중 가장 최근
  return list.reduce((closest, cur) => {
    const closestDiff = Math.abs(calculateDDay(closest.targetDate));
    const curDiff = Math.abs(calculateDDay(cur.targetDate));
    return curDiff < closestDiff ? cur : closest;
  });
}

export default function HomePage() {
  const [allDDays, setAllDDays] = useState<DDay[]>([]);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date-asc');
  const [isLoaded, setIsLoaded] = useState(false);

  // 로컬스토리지에서 D-Day 목록 로드
  const loadDDays = useCallback(() => {
    const data = getAllDDays();
    setAllDDays(data);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadDDays();
  }, [loadDDays]);

  // 필터링
  const filtered =
    filterCategory === 'all'
      ? allDDays
      : allDDays.filter((d) => d.category === filterCategory);

  // 정렬
  const sorted = sortDDays(filtered, sortOption);

  // 히어로 카드용 D-Day (전체 목록 기준)
  const heroDDay = getHeroDDay(allDDays);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* 헤더 */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Day Counter
        </h1>
        <Link
          href="/settings"
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          aria-label="설정"
        >
          <Settings size={22} />
        </Link>
      </header>

      {/* 히어로 카드 */}
      {heroDDay && <HeroCard dday={heroDDay} />}

      {/* 카테고리 필터 */}
      <CategoryFilter selected={filterCategory} onChange={setFilterCategory} />

      {/* 정렬 선택기 */}
      <SortSelector count={sorted.length} selected={sortOption} onChange={setSortOption} />

      {/* D-Day 카드 그리드 또는 빈 상태 */}
      {sorted.length === 0 ? (
        filterCategory === 'all' ? (
          <EmptyState />
        ) : (
          <EmptyState
            title="해당 카테고리에 D-Day가 없어요"
            description="다른 카테고리를 선택하거나 새 D-Day를 추가해보세요"
            ctaLabel="D-Day 추가하기"
            ctaHref="/new"
          />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {sorted.map((dday) => (
            <DdayCard key={dday.id} dday={dday} />
          ))}
        </div>
      )}

      {/* FAB - 추가 버튼 */}
      <Link
        href="/new"
        className={[
          'fixed bottom-6 right-6',
          'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500',
          'text-white rounded-full w-14 h-14',
          'flex items-center justify-center',
          'shadow-lg hover:shadow-xl',
          'hover:scale-105 transition-all duration-200',
          'z-40',
        ].join(' ')}
        aria-label="D-Day 추가"
      >
        <Plus size={26} />
      </Link>
    </>
  );
}
