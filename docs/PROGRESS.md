# 진행 상황

## Phase 1: 기획 (planner)
- [x] PRD 작성 (docs/PRD.md)
- [x] API 스펙 작성 (docs/api-spec.md)
- [x] DB 스키마 설계 (docs/db-schema.md)
- [x] 디자인 가이드 작성 (docs/design-guide.md)
- [x] UI 참조 문서 작성 (docs/ui-reference.md)
- [x] 환경변수 가이드 작성 (docs/ENV-SETUP.md)
- [x] 진행 상황 문서 작성 (docs/PROGRESS.md)

## Phase 2: 프로젝트 초기화
- [ ] Next.js 14 프로젝트 생성 (App Router, TypeScript, Tailwind CSS)
- [ ] 의존성 설치 (lucide-react, prisma, @prisma/client 등)
- [ ] Prisma 초기 설정 (schema.prisma, SQLite)
- [ ] Prisma 마이그레이션 실행 (npx prisma db push)
- [ ] 디렉토리 구조 생성 (components/ui, components/features, lib, types)
- [ ] 글로벌 레이아웃 설정 (layout.tsx, globals.css)
- [ ] .gitignore 설정 (.env, .next, node_modules, prisma/*.db)
- [ ] .env.example 생성
- [ ] Git 커밋: [Phase 2] 프로젝트 초기화 완료

## Phase 3: 백엔드 구현 (backend-dev)
- [x] 타입 정의 (types/dday.ts - DDay, Category, Milestone 인터페이스)
- [x] 유틸리티 함수 (lib/date-utils.ts - D-Day 계산, 마일스톤 생성)
- [x] 로컬스토리지 헬퍼 (lib/storage.ts - CRUD 함수)
- [x] API 라우트: GET /api/ddays (목록 조회)
- [x] API 라우트: POST /api/ddays (생성)
- [x] API 라우트: GET /api/ddays/[id] (상세 조회)
- [x] API 라우트: PUT /api/ddays/[id] (수정)
- [x] API 라우트: DELETE /api/ddays/[id] (삭제)
- [x] API 라우트: DELETE /api/ddays (전체 삭제)
- [x] 에러 핸들링 (공통 에러 응답 유틸)
- [ ] Git 커밋: [Phase 3] 백엔드 구현 완료

## Phase 4: 프론트엔드 구현 (frontend-dev)
### 공통 UI 컴포넌트
- [ ] PageHeader 컴포넌트 (뒤로가기 + 제목 + 액션)
- [ ] Button 컴포넌트 (Primary, Secondary, Ghost, Danger 변형)
- [ ] Modal 컴포넌트 (오버레이 + 모달 본체)
- [ ] Toast 컴포넌트 (성공/에러 알림)
- [ ] EmptyState 컴포넌트 (빈 상태 안내)

### 기능 컴포넌트
- [ ] DdayCard 컴포넌트 (카테고리별 그라데이션 카드)
- [ ] HeroCard 컴포넌트 (메인 상단 하이라이트)
- [ ] CategoryFilter 컴포넌트 (카테고리 필터 칩)
- [ ] SortSelector 컴포넌트 (정렬 옵션)
- [ ] EmojiPicker 컴포넌트 (카테고리별 이모지 선택)
- [ ] MilestoneTimeline 컴포넌트 (마일스톤 타임라인)
- [ ] ThemeToggle 컴포넌트 (라이트/다크/시스템)
- [ ] DeleteConfirmDialog 컴포넌트 (삭제 확인)

### 페이지 구현
- [ ] 메인 페이지 (/) - D-Day 카드 리스트 + 히어로 카드
- [ ] 추가 페이지 (/new) - D-Day 생성 폼
- [ ] 상세 페이지 (/detail/[id]) - 상세 정보 + 마일스톤
- [ ] 설정 페이지 (/settings) - 테마 + 데이터 관리

### 반응형 처리
- [ ] 모바일 레이아웃 (< 640px, 1열)
- [ ] 태블릿 레이아웃 (640px~, 2열)
- [ ] 데스크톱 레이아웃 (1024px~, 3열)

### 다크모드
- [ ] 시스템 설정 자동 감지
- [ ] 수동 토글 구현
- [ ] 모든 컴포넌트 다크모드 대응

- [ ] Git 커밋: [Phase 4] 프론트엔드 구현 완료

## Phase 5: 빌드 & Git Push
- [ ] TypeScript 타입 체크 통과 (npx tsc --noEmit)
- [ ] ESLint 검사 통과 (npm run lint)
- [ ] 전체 빌드 성공 (npm run build)
- [ ] 빌드 에러 수정 (있는 경우)
- [ ] Git add + commit: [Phase 5] 빌드 성공, 배포 준비 완료
- [ ] Git push to main

## Phase 6: 배포 확인
- [ ] GitHub 저장소에 코드 Push 확인
- [ ] Vercel 자동 배포 트리거 확인
- [ ] Vercel 빌드 로그 확인
- [ ] 배포 URL 접속 테스트
- [ ] 모바일 브라우저 테스트
- [ ] 배포 URL: (여기에 기록)

---

## 블로커
(없음)

---

## 변경 이력

| 날짜 | Phase | 내용 |
|------|-------|------|
| 2026-02-28 | Phase 1 | 기획 문서 7종 생성 완료 |
| 2026-02-28 | Phase 3 | 타입 정의, 유틸리티, 로컬스토리지 CRUD, API 라우트 스텁 구현 완료 |
