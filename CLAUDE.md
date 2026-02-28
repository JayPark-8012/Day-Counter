# Auto Build & Deploy System

## 개요
이 프로젝트는 아이디어 하나만 입력하면 기획 → 설계 → 구현 → 빌드 → GitHub Push → Vercel 배포까지 자동으로 수행하는 시스템이다.
모든 작업은 서브에이전트에게 위임되며, 메인 에이전트는 오케스트레이션만 담당한다.

## 기술 스택
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- Backend: Next.js API Routes
- Database: SQLite + Prisma ORM (프로토타입용)
- Auth: NextAuth.js (필요시)
- Package Manager: npm
- Version Control: Git + GitHub
- Deployment: Vercel (GitHub 연동 자동 배포)

## 프로젝트 구조 (생성 후)
```
src/
├── app/              # Next.js App Router 페이지
│   ├── layout.tsx    # 루트 레이아웃
│   ├── page.tsx      # 메인 페이지
│   └── api/          # API 라우트
├── components/       # 재사용 컴포넌트
│   ├── ui/           # 기본 UI 컴포넌트
│   └── features/     # 기능별 컴포넌트
├── lib/              # 유틸리티, DB 클라이언트
├── types/            # TypeScript 타입 정의
└── styles/           # 글로벌 스타일
```

## 문서 위치
- 기획서: `docs/PRD.md`
- API 스펙: `docs/api-spec.md`
- DB 스키마: `docs/db-schema.md`
- 디자인 가이드: `docs/design-guide.md`
- UI 참조: `docs/ui-reference.md`

## 진행 상태 추적
작업 진행 시 `docs/PROGRESS.md` 파일을 반드시 업데이트한다.
각 단계 완료 시 체크리스트를 갱신하여, 세션이 끊겨도 이어서 작업 가능하게 한다.

## 코드 컨벤션
- 컴포넌트: 함수형, PascalCase, 파일당 하나의 export default
- 파일명: kebab-case.tsx
- API 라우트: route.ts (Next.js App Router 규칙)
- Tailwind CSS만 사용, 인라인 스타일 금지
- 모든 함수/컴포넌트에 TypeScript 타입 명시
- 한국어 주석 사용 가능

## Git 규칙
- 각 Phase 완료 시 자동으로 git add, commit, push
- 커밋 메시지 형식: `[Phase X] 작업 내용 요약`
  - 예: `[Phase 1] 기획 문서 생성 완료`
  - 예: `[Phase 3] API 라우트 구현 완료`
  - 예: `[Phase 5] 빌드 성공, 배포 준비 완료`
- 브랜치: main
- .gitignore에 반드시 포함: node_modules, .env, .next, prisma/*.db

## Vercel 배포 규칙
- GitHub Push 시 Vercel이 자동으로 빌드 & 배포 (사전 연동 필요)
- 환경변수가 필요한 경우 `docs/ENV-SETUP.md`에 기록
- 배포 후 URL을 `docs/PROGRESS.md`에 기록
- SQLite는 Vercel 서버리스와 호환되지 않으므로, 배포용 DB는 아래 우선순위를 따른다:
  1. Vercel Postgres (Vercel 대시보드에서 생성)
  2. Supabase (무료 플랜)
  3. PlanetScale (무료 플랜)
  4. 프로토타입 단계에서는 DB 없이 로컬스토리지/목데이터로 대체 가능

## 에러 처리 규칙
- 빌드 에러 발생 시: 에러 메시지를 분석하고 직접 수정 후 재빌드
- 테스트 실패 시: 실패 원인을 파악하고 코드 수정 후 재실행
- 3회 이상 같은 에러 반복 시: PROGRESS.md에 블로커로 기록
- git push 실패 시: 원격 저장소 연결 상태 확인 후 재시도
