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
- [x] Next.js 16 프로젝트 생성 (App Router, TypeScript, Tailwind CSS v4)
- [x] 의존성 설치 (lucide-react)
- [x] 디렉토리 구조 생성 (components/ui, components/features, lib, types)
- [x] 글로벌 레이아웃 설정 (layout.tsx, globals.css)
- [x] .gitignore 설정 (.env, .next, node_modules, prisma/*.db)
- [x] .env.example 생성
- [x] Git 커밋: [Phase 2] 프로젝트 초기화 완료

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
- [x] Git 커밋: [Phase 3] 백엔드 구현 완료

## Phase 4: 프론트엔드 구현 (frontend-dev)
### 공통 UI 컴포넌트
- [x] PageHeader 컴포넌트 (뒤로가기 + 제목 + 액션)
- [x] Button 컴포넌트 (Primary, Secondary, Ghost, Danger 변형)
- [x] Modal 컴포넌트 (오버레이 + 모달 본체)
- [x] Toast 컴포넌트 (성공/에러 알림)
- [x] EmptyState 컴포넌트 (빈 상태 안내)

### 기능 컴포넌트
- [x] DdayCard 컴포넌트 (카테고리별 그라데이션 카드)
- [x] HeroCard 컴포넌트 (메인 상단 하이라이트)
- [x] CategoryFilter 컴포넌트 (카테고리 필터 칩)
- [x] SortSelector 컴포넌트 (정렬 옵션)
- [x] EmojiPicker 컴포넌트 (카테고리별 이모지 선택)
- [x] MilestoneTimeline 컴포넌트 (마일스톤 타임라인)
- [x] ThemeToggle 컴포넌트 (라이트/다크/시스템)
- [x] DeleteConfirmDialog 컴포넌트 (삭제 확인)

### 페이지 구현
- [x] 메인 페이지 (/) - D-Day 카드 리스트 + 히어로 카드
- [x] 추가 페이지 (/new) - D-Day 생성 폼
- [x] 상세 페이지 (/detail/[id]) - 상세 정보 + 마일스톤
- [x] 설정 페이지 (/settings) - 테마 + 데이터 관리

### 반응형 처리
- [x] 모바일 레이아웃 (< 640px, 1열)
- [x] 태블릿 레이아웃 (640px~, 2열)
- [x] 데스크톱 레이아웃 (1024px~, 3열)

### 다크모드
- [x] 시스템 설정 자동 감지
- [x] 수동 토글 구현
- [x] 모든 컴포넌트 다크모드 대응

- [x] Git 커밋: [Phase 4] 프론트엔드 구현 완료

## Phase 5: 빌드 & Git Push
- [x] 전체 빌드 성공 (npm run build)
- [x] Git add + commit
- [x] Git push to main

## Phase 6: 배포 확인
- [x] GitHub 저장소에 코드 Push 확인
- [ ] Vercel 자동 배포 트리거 확인
- [ ] 배포 URL 접속 테스트
- [ ] 배포 URL: (여기에 기록)

---

## 블로커
(없음)

---

## 변경 이력

| 날짜 | Phase | 내용 |
|------|-------|------|
| 2026-02-28 | Phase 1 | 기획 문서 7종 생성 완료 |
| 2026-02-28 | Phase 2 | Next.js 16 프로젝트 초기화 완료 |
| 2026-02-28 | Phase 3 | 타입 정의, 유틸리티, 로컬스토리지 CRUD, API 라우트 스텁 구현 완료 |
| 2026-02-28 | Phase 4 | 전체 UI 컴포넌트 및 4개 페이지 구현 완료, 빌드 성공 |
| 2026-02-28 | Phase 5 | 빌드 성공, GitHub Push 완료 |
