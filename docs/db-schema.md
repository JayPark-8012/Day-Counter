# DB 스키마

## 개요

Day Counter는 프로토타입 단계에서 **브라우저 로컬스토리지**를 1차 데이터 저장소로 사용한다.
로컬 개발 시에는 SQLite + Prisma ORM으로 API 테스트를 할 수 있으며,
향후 Vercel Postgres / Supabase로 전환 가능한 구조로 설계한다.

---

## 데이터 저장 전략

| 환경 | 저장소 | 비고 |
|------|--------|------|
| 클라이언트 (MVP) | 브라우저 로컬스토리지 | Vercel 서버리스 호환, 별도 DB 불필요 |
| 로컬 개발 (API 테스트) | SQLite + Prisma | `file:./dev.db` |
| 배포 확장 시 | Vercel Postgres 또는 Supabase | PostgreSQL 기반 |

---

## 로컬스토리지 스키마

### 저장 키
- `day-counter-ddays`: D-Day 배열 (JSON)
- `day-counter-theme`: 테마 설정 (`"light"` | `"dark"` | `"system"`)

### D-Day 객체 구조 (TypeScript)
```typescript
interface DDay {
  id: string;           // cuid 또는 uuid
  title: string;        // D-Day 제목 (1~30자)
  targetDate: string;   // 대상 날짜 (YYYY-MM-DD)
  category: Category;   // 카테고리
  emoji: string;        // 이모지 아이콘
  createdAt: string;    // 생성일시 (ISO 8601)
  updatedAt: string;    // 수정일시 (ISO 8601)
}

type Category = 'anniversary' | 'exam' | 'travel' | 'birthday' | 'custom';
```

### 마일스톤 객체 구조 (클라이언트에서 동적 생성)
```typescript
interface Milestone {
  label: string;        // "D-100", "D-50", "D-30" 등
  date: string;         // 마일스톤 날짜 (YYYY-MM-DD)
  daysFromToday: number; // 오늘 기준 남은/지난 일수
  isPassed: boolean;    // 이미 지났는지 여부
}
```

---

## Prisma 스키마 (로컬 개발 / 향후 확장용)

### 로컬 개발용 (SQLite)
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}
```

### 배포용 (Vercel Postgres / Supabase 전환 시)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### 모델 정의
```prisma
model DDay {
  id         String   @id @default(cuid())
  title      String   // D-Day 제목 (1~30자)
  targetDate DateTime // 대상 날짜
  category   String   // 카테고리: anniversary, exam, travel, birthday, custom
  emoji      String   // 이모지 아이콘
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("ddays")
}
```

---

## 카테고리별 기본 이모지 매핑

| 카테고리 | 영문 키 | 기본 이모지 | 추천 이모지 목록 |
|---------|---------|------------|----------------|
| 기념일 | anniversary | :heart: | :heart: :two_hearts: :revolving_hearts: :gift: :ring: :bouquet: :sparkles: :star2: :ribbon: :love_letter: |
| 시험 | exam | :books: | :books: :pencil2: :mortar_board: :memo: :trophy: :muscle: :dart: :bulb: :brain: :100: |
| 여행 | travel | :airplane: | :airplane: :earth_asia: :luggage: :palm_tree: :sunrise_over_mountains: :camera: :compass: :world_map: :beach_umbrella: :rocket: |
| 생일 | birthday | :birthday: | :birthday: :tada: :balloon: :confetti_ball: :gift: :partying_face: :cake: :crown: :star: :sparkler: |
| 커스텀 | custom | :calendar: | :calendar: :pushpin: :bell: :alarm_clock: :hourglass: :zap: :fire: :rainbow: :clover: :gem: |

> 위 이모지 이름은 참조용이며, 실제 구현 시 유니코드 이모지 문자를 사용한다.

---

## 데이터 마이그레이션 경로

### Phase 1 (현재 - MVP)
```
브라우저 로컬스토리지
  └── day-counter-ddays: DDay[]
  └── day-counter-theme: string
```

### Phase 2 (확장 시)
```
Vercel Postgres / Supabase
  └── ddays 테이블
  └── 사용자 인증 추가 시 users 테이블 추가
```

### 마이그레이션 시 고려사항
1. 로컬스토리지 데이터를 서버 DB로 동기화하는 마이그레이션 스크립트 필요
2. 사용자 인증 도입 시 `userId` 필드를 `DDay` 모델에 추가
3. Prisma 스키마의 `provider`를 `sqlite`에서 `postgresql`로 변경
4. `DateTime` 타입은 SQLite/PostgreSQL 모두 호환됨
