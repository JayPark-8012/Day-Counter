import { DDay, CreateDDayInput, UpdateDDayInput, Category, CATEGORY_DEFAULT_EMOJI, VALID_CATEGORIES } from '@/types/dday';

// 로컬스토리지 키 상수
const STORAGE_KEY = 'day-counter-ddays';
const THEME_KEY = 'day-counter-theme';

// 고유 ID 생성 (crypto.randomUUID 우선, 폴백으로 타임스탬프+랜덤 조합)
function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// 로컬스토리지 사용 가능 여부 확인 (SSR 환경 대응)
function isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * 로컬스토리지에서 전체 D-Day 목록을 반환한다.
 */
export function getAllDDays(): DDay[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as DDay[];
  } catch (error) {
    console.error('[storage] getAllDDays 오류:', error);
    return [];
  }
}

// api-spec.md 네이밍 호환 alias
export const getDdays = getAllDDays;

/**
 * 특정 ID의 D-Day를 반환한다. 없으면 null을 반환한다.
 */
export function getDDayById(id: string): DDay | null {
  const all = getAllDDays();
  return all.find((d) => d.id === id) ?? null;
}

// api-spec.md 네이밍 호환 alias
export const getDday = getDDayById;

/**
 * 새 D-Day를 생성하고 저장한 뒤 반환한다.
 * emoji가 없으면 카테고리 기본 이모지를 사용한다.
 */
export function createDDay(data: CreateDDayInput): DDay {
  if (!isLocalStorageAvailable()) {
    throw new Error('로컬스토리지를 사용할 수 없습니다.');
  }

  const now = new Date().toISOString();
  const defaultEmoji = CATEGORY_DEFAULT_EMOJI[data.category as Category] ?? '📅';

  const newDDay: DDay = {
    id: generateId(),
    title: data.title.trim(),
    targetDate: data.targetDate,
    category: data.category,
    emoji: data.emoji || defaultEmoji,
    createdAt: now,
    updatedAt: now,
  };

  const all = getAllDDays();
  all.push(newDDay);
  saveToDDayStorage(all);

  return newDDay;
}

/**
 * 기존 D-Day를 수정한다. 전달된 필드만 업데이트된다.
 * 성공 시 수정된 DDay를 반환하고, 없으면 null을 반환한다.
 */
export function updateDDay(id: string, data: UpdateDDayInput): DDay | null {
  if (!isLocalStorageAvailable()) {
    throw new Error('로컬스토리지를 사용할 수 없습니다.');
  }

  const all = getAllDDays();
  const index = all.findIndex((d) => d.id === id);
  if (index === -1) return null;

  const updated: DDay = {
    ...all[index],
    ...(data.title !== undefined && { title: data.title.trim() }),
    ...(data.targetDate !== undefined && { targetDate: data.targetDate }),
    ...(data.category !== undefined && { category: data.category }),
    ...(data.emoji !== undefined && { emoji: data.emoji }),
    updatedAt: new Date().toISOString(),
  };

  all[index] = updated;
  saveToDDayStorage(all);

  return updated;
}

/**
 * api-spec.md 호환: D-Day를 저장한다 (생성 또는 수정).
 * id가 없거나 기존에 없는 id이면 생성, 기존 id이면 수정한다.
 */
export function saveDday(dday: DDay): DDay {
  if (!isLocalStorageAvailable()) {
    throw new Error('로컬스토리지를 사용할 수 없습니다.');
  }

  const all = getAllDDays();
  const index = all.findIndex((d) => d.id === dday.id);

  if (index === -1) {
    // 신규 생성
    const now = new Date().toISOString();
    const newDDay: DDay = {
      ...dday,
      id: dday.id || generateId(),
      createdAt: dday.createdAt || now,
      updatedAt: now,
    };
    all.push(newDDay);
    saveToDDayStorage(all);
    return newDDay;
  } else {
    // 기존 수정
    const updated: DDay = {
      ...all[index],
      ...dday,
      updatedAt: new Date().toISOString(),
    };
    all[index] = updated;
    saveToDDayStorage(all);
    return updated;
  }
}

/**
 * 특정 D-Day를 삭제한다. 성공 시 true, 없으면 false를 반환한다.
 */
export function deleteDDay(id: string): boolean {
  if (!isLocalStorageAvailable()) {
    throw new Error('로컬스토리지를 사용할 수 없습니다.');
  }

  const all = getAllDDays();
  const filtered = all.filter((d) => d.id !== id);

  if (filtered.length === all.length) return false;

  saveToDDayStorage(filtered);
  return true;
}

// api-spec.md 네이밍 호환 alias
export const deleteDday = deleteDDay;

/**
 * 전체 D-Day를 삭제한다.
 */
export function deleteAllDDays(): void {
  if (!isLocalStorageAvailable()) {
    throw new Error('로컬스토리지를 사용할 수 없습니다.');
  }

  localStorage.removeItem(STORAGE_KEY);
}

// api-spec.md 네이밍 호환 alias
export const deleteAllDdays = deleteAllDDays;

/**
 * 현재 D-Day 데이터를 JSON 문자열로 내보낸다.
 */
export function exportData(): string {
  const all = getAllDDays();
  return JSON.stringify(
    {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      data: all,
    },
    null,
    2
  );
}

/**
 * JSON 문자열에서 D-Day 데이터를 가져온다.
 * 기존 데이터를 덮어쓴다.
 */
export function importData(json: string): void {
  if (!isLocalStorageAvailable()) {
    throw new Error('로컬스토리지를 사용할 수 없습니다.');
  }

  try {
    const parsed = JSON.parse(json);

    // exportData() 형식 (version + data 래퍼) 또는 배열 직접 처리
    let ddays: DDay[];
    if (Array.isArray(parsed)) {
      ddays = parsed;
    } else if (parsed && Array.isArray(parsed.data)) {
      ddays = parsed.data;
    } else {
      throw new Error('유효하지 않은 데이터 형식입니다.');
    }

    // 기본 유효성 검증
    const validated = ddays.filter((d): d is DDay => {
      return (
        typeof d === 'object' &&
        d !== null &&
        typeof d.id === 'string' &&
        typeof d.title === 'string' &&
        typeof d.targetDate === 'string' &&
        VALID_CATEGORIES.includes(d.category as Category) &&
        typeof d.emoji === 'string' &&
        typeof d.createdAt === 'string' &&
        typeof d.updatedAt === 'string'
      );
    });

    saveToDDayStorage(validated);
  } catch (error) {
    console.error('[storage] importData 오류:', error);
    throw new Error('데이터를 가져오는 데 실패했습니다. JSON 형식을 확인해주세요.');
  }
}

/**
 * 테마 설정을 저장한다.
 */
export function saveTheme(theme: 'light' | 'dark' | 'system'): void {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * 저장된 테마 설정을 반환한다. 없으면 'system'을 반환한다.
 */
export function getTheme(): 'light' | 'dark' | 'system' {
  if (!isLocalStorageAvailable()) return 'system';
  const theme = localStorage.getItem(THEME_KEY);
  if (theme === 'light' || theme === 'dark' || theme === 'system') return theme;
  return 'system';
}

// 내부 헬퍼: 배열을 로컬스토리지에 저장
function saveToDDayStorage(ddays: DDay[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ddays));
}
