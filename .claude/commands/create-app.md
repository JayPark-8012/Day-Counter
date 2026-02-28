# /create-app 커맨드

사용자가 앱 아이디어를 제시하면, 아래 파이프라인을 순서대로 실행하여
기획부터 Vercel 배포까지 자동으로 완료한다.

사용자 입력: $ARGUMENTS

---

## 실행 전 확인

1. `docs/PROGRESS.md`가 이미 존재하는지 확인
2. 존재하면: PROGRESS.md를 읽고 미완료 단계부터 이어서 진행
3. 존재하지 않으면: Phase 1부터 시작

---

## Phase 1: 기획 (planner 서브에이전트)

planner 서브에이전트에게 다음을 위임한다:

> 사용자 아이디어: "$ARGUMENTS"
>
> 이 아이디어를 기반으로 다음 문서를 모두 생성하라:
> 1. docs/PRD.md - 앱 기획서
> 2. docs/api-spec.md - API 스펙
> 3. docs/db-schema.md - DB 스키마
> 4. docs/design-guide.md - 디자인 가이드
> 5. docs/ui-reference.md - UI 참조 문서
> 6. docs/ENV-SETUP.md - 환경변수 가이드
> 7. docs/PROGRESS.md - 진행 상황 체크리스트
>
> MVP 범위에 집중하라. 페이지는 3~5개 이내. Vercel 배포를 전제로 설계.

**완료 확인**: docs/ 폴더에 7개 파일이 모두 존재하는지 확인

---

## Phase 2: 프로젝트 초기화 (직접 수행)

### 2-1. Next.js 프로젝트 생성
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --use-npm
```

### 2-2. 추가 패키지 설치
```bash
npm install prisma @prisma/client
npm install -D @types/node
```

### 2-3. 설정 파일
- `tailwind.config.ts`에 docs/design-guide.md의 커스텀 컬러 적용
- `src/app/globals.css` 기본 스타일 설정
- tsconfig.json paths alias 확인 (`@/*` → `./src/*`)

### 2-4. Git 초기화 및 .gitignore 설정
```bash
git init
```

`.gitignore` 내용 확인 (없으면 생성):
```
node_modules/
.next/
.env
.env.local
prisma/*.db
prisma/*.db-journal
*.tsbuildinfo
```

### 2-5. 첫 커밋
```bash
git add -A
git commit -m "[Phase 2] 프로젝트 초기화 완료"
```

**완료 확인**: `npm run build`가 에러 없이 완료되는지 확인
에러 발생 시 수정 후 재빌드 (최대 3회)

Phase 2 완료 후 `docs/PROGRESS.md` 업데이트

---

## Phase 3: 백엔드 구현 (backend-dev 서브에이전트)

backend-dev 서브에이전트에게 다음을 위임한다:

> docs/api-spec.md, docs/db-schema.md, docs/ENV-SETUP.md를 읽고,
> 모든 API 엔드포인트와 DB를 구현하라.
> Vercel 서버리스 환경 호환을 보장하라.
> 완료 후 docs/PROGRESS.md를 업데이트하라.

**완료 확인**:
- `npx prisma db push` 정상 실행
- API 라우트 파일들이 src/app/api/ 하위에 존재

완료 후:
```bash
git add -A
git commit -m "[Phase 3] 백엔드 API 구현 완료"
```

Phase 3 완료 후 `docs/PROGRESS.md` 업데이트

---

## Phase 4: 프론트엔드 구현 (frontend-dev 서브에이전트)

frontend-dev 서브에이전트에게 다음을 위임한다:

> docs/ui-reference.md, docs/design-guide.md를 읽고,
> 모든 UI 컴포넌트와 페이지를 구현하라.
> API 연동은 docs/api-spec.md를 참고하라.
> 완료 후 docs/PROGRESS.md를 업데이트하라.

**완료 확인**:
- src/components/ui/ 폴더에 기본 컴포넌트 존재
- src/app/ 하위에 모든 페이지 파일 존재

완료 후:
```bash
git add -A
git commit -m "[Phase 4] 프론트엔드 UI 구현 완료"
```

Phase 4 완료 후 `docs/PROGRESS.md` 업데이트

---

## Phase 5: 빌드 & Git Push (직접 수행)

### 5-1. 빌드 테스트
```bash
npm run build
```

에러 발생 시:
1. 에러 메시지 분석
2. 해당 파일 수정
3. 재빌드
4. 최대 5회 반복
5. 5회 초과 시 PROGRESS.md에 블로커 기록

### 5-2. 빌드 성공 시 - GitHub Push
```bash
git add -A
git commit -m "[Phase 5] 빌드 성공, 배포 준비 완료"
git push origin main
```

**git push 실패 시**:
- 원격 저장소가 설정되어 있는지 확인: `git remote -v`
- 설정되어 있지 않으면 사용자에게 안내:
  > ⚠️ GitHub 원격 저장소가 연결되지 않았습니다.
  > 다음 명령어로 연결해주세요:
  > ```
  > git remote add origin https://github.com/[username]/[repo-name].git
  > git push -u origin main
  > ```
  > GitHub에서 새 저장소를 먼저 생성해주세요.

Phase 5 완료 후 `docs/PROGRESS.md` 업데이트

---

## Phase 6: 배포 확인 (직접 수행)

### Vercel 연동이 되어 있는 경우
GitHub push가 성공하면 Vercel이 자동으로 빌드 & 배포한다.
사용자에게 다음을 안내한다:

> ✅ 앱 개발 및 GitHub Push 완료!
>
> 🌐 Vercel 배포 상태:
> - Vercel 대시보드에서 배포 진행 상태를 확인하세요
> - 배포 완료 후 앱 URL: https://[프로젝트명].vercel.app
>
> 📋 구현된 기능:
> [docs/PRD.md에서 P0/P1 기능 목록 나열]
>
> 📁 프로젝트 구조:
> [주요 파일/폴더 구조 간략히 표시]
>
> 📄 문서:
> - docs/PRD.md: 기획서
> - docs/api-spec.md: API 스펙
> - docs/ENV-SETUP.md: 환경변수 설정 가이드
> - docs/PROGRESS.md: 진행 상황

### Vercel 연동이 안 되어 있는 경우
사용자에게 Vercel 연동 방법을 안내한다:

> 📦 GitHub Push는 완료되었습니다!
> Vercel 자동 배포를 위해 다음 단계를 진행해주세요:
>
> 1. https://vercel.com 에 로그인 (GitHub 계정으로)
> 2. "Add New Project" 클릭
> 3. 방금 push한 GitHub 저장소 선택
> 4. Framework Preset: Next.js (자동 감지됨)
> 5. 환경변수 설정 (docs/ENV-SETUP.md 참고)
> 6. "Deploy" 클릭
>
> 이후부터는 git push만 하면 자동 배포됩니다!

### Vercel Deploy 스킬 사용 (가능한 경우)
Vercel Deploy 스킬이 설치되어 있으면 직접 배포:
```bash
# Vercel CLI가 설치되어 있는 경우
npx vercel --yes
```

Phase 6 완료 후 `docs/PROGRESS.md` 최종 업데이트 (배포 URL 포함)

---

## 에러 복구 규칙

- 빌드 에러: 에러 로그를 읽고 직접 수정, 재빌드
- TypeScript 에러: 타입 정의 수정 또는 추가
- Import 에러: 경로 확인 및 수정
- Prisma 에러: 스키마 확인 후 `npx prisma db push` 재실행
- 모듈 미설치: `npm install [패키지]` 후 재빌드
- Vercel 빌드 에러: `next.config.js` 설정 확인, 환경변수 확인

## 세션 복구 규칙

이 커맨드가 다시 실행되었을 때:
1. docs/PROGRESS.md를 확인
2. 마지막으로 완료된 Phase 확인
3. 미완료 Phase부터 이어서 진행
4. 이미 생성된 파일은 덮어쓰지 않음 (수정 필요 시만 수정)
5. git log로 마지막 커밋 확인하여 코드 상태 파악
