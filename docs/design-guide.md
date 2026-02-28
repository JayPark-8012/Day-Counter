# 디자인 가이드

## 디자인 철학

- **모던 & 미니멀**: 불필요한 요소를 배제하고 핵심 정보에 집중
- **여백의 미**: 충분한 여백으로 시각적 숨 공간 확보
- **iOS 스타일**: 부드러운 라운드 코너, 은은한 쉐도우, 깔끔한 타이포그래피
- **감성적 그라데이션**: 카테고리별 고유 그라데이션으로 시각적 즐거움 제공

---

## 컬러 팔레트

### 라이트 모드

| 용도 | 색상 | Hex | Tailwind |
|------|------|-----|----------|
| Primary | 인디고 | #6366F1 | indigo-500 |
| Primary Hover | 진한 인디고 | #4F46E5 | indigo-600 |
| Primary Light | 연한 인디고 | #EEF2FF | indigo-50 |
| Secondary | 슬레이트 | #64748B | slate-500 |
| Background | 화이트 | #FFFFFF | white |
| Surface | 연한 회색 | #F8FAFC | slate-50 |
| Text Primary | 거의 검정 | #0F172A | slate-900 |
| Text Secondary | 중간 회색 | #64748B | slate-500 |
| Text Tertiary | 연한 회색 | #94A3B8 | slate-400 |
| Border | 매우 연한 회색 | #E2E8F0 | slate-200 |
| Error | 레드 | #EF4444 | red-500 |
| Success | 에메랄드 | #10B981 | emerald-500 |
| Warning | 앰버 | #F59E0B | amber-500 |

### 다크 모드

| 용도 | 색상 | Hex | Tailwind |
|------|------|-----|----------|
| Primary | 인디고 | #818CF8 | indigo-400 |
| Primary Hover | 연한 인디고 | #A5B4FC | indigo-300 |
| Background | 매우 진한 회색 | #0F172A | slate-900 |
| Surface | 진한 회색 | #1E293B | slate-800 |
| Text Primary | 거의 흰색 | #F1F5F9 | slate-100 |
| Text Secondary | 중간 회색 | #94A3B8 | slate-400 |
| Text Tertiary | 어두운 회색 | #64748B | slate-500 |
| Border | 어두운 회색 | #334155 | slate-700 |
| Error | 연한 레드 | #F87171 | red-400 |
| Success | 연한 에메랄드 | #34D399 | emerald-400 |

---

## 카테고리별 그라데이션

각 카테고리 카드에 적용되는 배경 그라데이션이다. 은은하고 부드러운 톤을 사용한다.

### 라이트 모드 그라데이션

| 카테고리 | 그라데이션 | Tailwind 클래스 |
|---------|-----------|----------------|
| 기념일 (anniversary) | 핑크 -> 로즈 | `bg-gradient-to-br from-pink-50 to-rose-100` |
| 시험 (exam) | 블루 -> 인디고 | `bg-gradient-to-br from-blue-50 to-indigo-100` |
| 여행 (travel) | 그린 -> 틸 | `bg-gradient-to-br from-green-50 to-teal-100` |
| 생일 (birthday) | 오렌지 -> 옐로 | `bg-gradient-to-br from-orange-50 to-yellow-100` |
| 커스텀 (custom) | 퍼플 -> 인디고 | `bg-gradient-to-br from-purple-50 to-indigo-100` |

### 다크 모드 그라데이션

| 카테고리 | 그라데이션 | Tailwind 클래스 |
|---------|-----------|----------------|
| 기념일 (anniversary) | 진한 핑크 -> 로즈 | `dark:bg-gradient-to-br dark:from-pink-950/40 dark:to-rose-900/30` |
| 시험 (exam) | 진한 블루 -> 인디고 | `dark:bg-gradient-to-br dark:from-blue-950/40 dark:to-indigo-900/30` |
| 여행 (travel) | 진한 그린 -> 틸 | `dark:bg-gradient-to-br dark:from-green-950/40 dark:to-teal-900/30` |
| 생일 (birthday) | 진한 오렌지 -> 옐로 | `dark:bg-gradient-to-br dark:from-orange-950/40 dark:to-yellow-900/30` |
| 커스텀 (custom) | 진한 퍼플 -> 인디고 | `dark:bg-gradient-to-br dark:from-purple-950/40 dark:to-indigo-900/30` |

### 카테고리 액센트 컬러

필터 칩, 카테고리 태그 등에 사용하는 포인트 컬러이다.

| 카테고리 | 라이트 배경 | 라이트 텍스트 | 다크 배경 | 다크 텍스트 |
|---------|-----------|-------------|----------|-----------|
| 기념일 | pink-100 | pink-700 | pink-900/40 | pink-300 |
| 시험 | blue-100 | blue-700 | blue-900/40 | blue-300 |
| 여행 | green-100 | green-700 | green-900/40 | green-300 |
| 생일 | orange-100 | orange-700 | orange-900/40 | orange-300 |
| 커스텀 | purple-100 | purple-700 | purple-900/40 | purple-300 |

---

## 타이포그래피

- **폰트 패밀리**: 시스템 폰트 스택 (Inter 또는 Pretendard 웹폰트 추가 가능)
- **폰트 스택**: `font-sans` (Tailwind 기본: Inter, system-ui, -apple-system, sans-serif)

### 텍스트 스타일

| 용도 | 클래스 | 설명 |
|------|--------|------|
| 히어로 숫자 (D-Day 카운트) | `text-5xl sm:text-6xl font-extrabold tracking-tight` | 카드의 남은 일수 대형 표시 |
| 페이지 제목 | `text-2xl font-bold tracking-tight` | 페이지 상단 제목 |
| 섹션 제목 | `text-xl font-semibold` | 섹션 구분 제목 |
| 카드 제목 | `text-lg font-semibold` | 카드 내 D-Day 제목 |
| 본문 | `text-base font-normal` | 일반 텍스트 |
| 보조 텍스트 | `text-sm text-slate-500 dark:text-slate-400` | 날짜, 카테고리 등 부가 정보 |
| 캡션 | `text-xs text-slate-400 dark:text-slate-500` | 매우 작은 부가 정보 |
| 이모지 (카드) | `text-3xl` | 카드 내 이모지 표시 |
| 이모지 (상세) | `text-6xl` | 상세 페이지 이모지 표시 |

---

## 간격 규칙

| 용도 | 클래스 | 설명 |
|------|--------|------|
| 페이지 패딩 (모바일) | `px-4 py-6` | 좌우 16px, 상하 24px |
| 페이지 패딩 (데스크톱) | `px-6 py-8` | 좌우 24px, 상하 32px |
| 최대 너비 | `max-w-3xl mx-auto` | 960px 중앙 정렬 |
| 섹션 간 간격 | `space-y-8` | 32px |
| 카드 간 간격 | `gap-4` | 16px |
| 카드 내부 패딩 | `p-5` | 20px |
| 요소 간 간격 | `space-y-4` | 16px |
| 인라인 간격 | `gap-2` 또는 `gap-3` | 8px 또는 12px |
| 폼 필드 간격 | `space-y-6` | 24px |

---

## 컴포넌트 스타일

### 버튼

```
/* Primary 버튼 */
bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
text-white font-semibold
rounded-xl px-6 py-3
transition-all duration-200
shadow-sm hover:shadow-md
dark:bg-indigo-600 dark:hover:bg-indigo-500

/* Secondary 버튼 */
bg-slate-100 hover:bg-slate-200
text-slate-700 font-medium
rounded-xl px-6 py-3
transition-all duration-200
dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200

/* Ghost 버튼 */
hover:bg-slate-100
text-slate-600 font-medium
rounded-xl px-4 py-2
transition-all duration-200
dark:hover:bg-slate-800 dark:text-slate-300

/* Danger 버튼 */
bg-red-500 hover:bg-red-600
text-white font-semibold
rounded-xl px-6 py-3
transition-all duration-200
dark:bg-red-600 dark:hover:bg-red-500

/* FAB (Floating Action Button) */
bg-indigo-500 hover:bg-indigo-600
text-white
rounded-full w-14 h-14
shadow-lg hover:shadow-xl
flex items-center justify-center
fixed bottom-6 right-6
transition-all duration-200
dark:bg-indigo-600 dark:hover:bg-indigo-500
```

### 카드

```
/* D-Day 카드 */
rounded-2xl
shadow-sm hover:shadow-md
border border-slate-200/50
p-5
transition-all duration-200
cursor-pointer
backdrop-blur-sm
dark:border-slate-700/50
/* + 카테고리별 그라데이션 배경 */

/* 히어로 카드 (메인 상단 하이라이트) */
rounded-2xl
shadow-md
p-6 sm:p-8
/* + 카테고리 그라데이션 배경, 좀 더 진하게 */
```

### 입력 필드

```
/* 텍스트 입력 */
w-full
rounded-xl
border border-slate-200
bg-white
px-4 py-3
text-base
placeholder:text-slate-400
focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
transition-all duration-200
dark:bg-slate-800 dark:border-slate-700
dark:text-slate-100 dark:placeholder:text-slate-500
dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400

/* 날짜 입력 */
(동일 스타일 + date 타입)
```

### 모달 / 다이얼로그

```
/* 오버레이 */
fixed inset-0
bg-black/50 backdrop-blur-sm
z-50
flex items-center justify-center
p-4

/* 모달 본체 */
bg-white
rounded-2xl
shadow-2xl
p-6
w-full max-w-md
dark:bg-slate-800
```

### 필터 칩

```
/* 기본 상태 */
rounded-full
px-4 py-2
text-sm font-medium
bg-slate-100 text-slate-600
transition-all duration-200
dark:bg-slate-800 dark:text-slate-300

/* 선택 상태 */
bg-indigo-500 text-white
shadow-sm
dark:bg-indigo-600
```

### 마일스톤 타임라인

```
/* 타임라인 컨테이너 */
relative pl-8

/* 타임라인 라인 */
absolute left-3 top-0 bottom-0 w-0.5
bg-slate-200
dark:bg-slate-700

/* 마일스톤 포인트 (완료) */
absolute left-1.5 w-3 h-3
rounded-full
bg-indigo-500
ring-4 ring-indigo-100
dark:bg-indigo-400 dark:ring-indigo-900/40

/* 마일스톤 포인트 (미완료) */
absolute left-1.5 w-3 h-3
rounded-full
bg-slate-300
ring-4 ring-slate-100
dark:bg-slate-600 dark:ring-slate-800

/* 마일스톤 포인트 (현재) */
absolute left-1 w-4 h-4
rounded-full
bg-indigo-500
ring-4 ring-indigo-200
animate-pulse
dark:bg-indigo-400 dark:ring-indigo-800/40
```

---

## 애니메이션

| 요소 | 효과 | 클래스 |
|------|------|--------|
| 카드 호버 | 약간 위로 이동 + 쉐도우 증가 | `hover:-translate-y-0.5 hover:shadow-md transition-all duration-200` |
| 버튼 클릭 | 살짝 축소 | `active:scale-[0.98] transition-transform` |
| 페이지 진입 | 아래에서 페이드인 | `animate-in fade-in slide-in-from-bottom-4 duration-300` |
| 모달 진입 | 스케일 + 페이드인 | `animate-in fade-in zoom-in-95 duration-200` |
| FAB 호버 | 살짝 확대 | `hover:scale-105 transition-transform duration-200` |
| 현재 마일스톤 | 펄스 | `animate-pulse` |

---

## 반응형 브레이크포인트

| 구간 | 너비 | 설명 |
|------|------|------|
| 모바일 | < 640px (기본) | 1열 카드, 풀 와이드 |
| 태블릿 | >= 640px (`sm:`) | 2열 카드 그리드 |
| 데스크톱 | >= 1024px (`lg:`) | 3열 카드 그리드, max-w-3xl |

---

## 아이콘

아이콘은 **Lucide React** 라이브러리를 사용한다. 일관된 선 굵기(1.5px)와 둥근 코너가 앱의 디자인 톤과 잘 맞는다.

### 사용할 주요 아이콘

| 용도 | 아이콘명 | 컴포넌트 |
|------|---------|---------|
| 뒤로가기 | ChevronLeft | `<ChevronLeft />` |
| 설정 | Settings | `<Settings />` |
| 추가 | Plus | `<Plus />` |
| 수정 | Pencil | `<Pencil />` |
| 삭제 | Trash2 | `<Trash2 />` |
| 정렬 | ArrowUpDown | `<ArrowUpDown />` |
| 캘린더 | Calendar | `<Calendar />` |
| 체크 (완료) | Check | `<Check />` |
| 닫기 | X | `<X />` |
| 빈 상태 | CalendarPlus | `<CalendarPlus />` |
| 다크모드 (해) | Sun | `<Sun />` |
| 다크모드 (달) | Moon | `<Moon />` |
| 시스템 | Monitor | `<Monitor />` |
| 내보내기 | Download | `<Download />` |
| 가져오기 | Upload | `<Upload />` |
