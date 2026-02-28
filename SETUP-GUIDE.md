# 🚀 Auto Build & Deploy System v2 - 설치 및 사용 가이드

## 이 시스템이 하는 일

아이디어 하나만 입력하면 Claude Code가 알아서:
1. **기획** - PRD, API 스펙, DB 스키마, 디자인 가이드, UI 참조, 환경변수 문서 자동 생성
2. **백엔드 구현** - API 라우트, DB 모델, 에러 핸들링
3. **프론트엔드 구현** - 컴포넌트, 페이지, API 연동, 반응형 처리
4. **빌드 & Git Push** - 에러 자동 수정, GitHub에 코드 push
5. **Vercel 자동 배포** - 실제 URL로 접근 가능한 라이브 앱

---

## 📦 사전 준비 (한번만 하면 됨)

### 필수 설치
- [x] VS Code (https://code.visualstudio.com)
- [x] Claude Code 확장 프로그램 (VS Code Marketplace)
- [x] Node.js 18+ (https://nodejs.org)
- [x] Git (https://git-scm.com)

### GitHub 설정
1. GitHub 계정 생성/로그인 (https://github.com)
2. SSH 키 또는 Personal Access Token 설정
3. 새 저장소 생성법 숙지

### Vercel 설정 (한번만)
1. https://vercel.com 접속
2. **"Continue with GitHub"**으로 로그인
3. GitHub 계정 연결 완료

이후에는 GitHub에 push하면 자동으로 배포됩니다.

---

## 📂 파일 구조

새 프로젝트 폴더에 아래 파일들을 복사합니다:

```
my-new-app/
├── CLAUDE.md                          # 프로젝트 지시서 (핵심!)
├── .claude/
│   ├── agents/
│   │   ├── planner.md                 # 기획자 에이전트
│   │   ├── backend-dev.md             # 백엔드 개발자 에이전트
│   │   └── frontend-dev.md            # 프론트엔드 개발자 에이전트
│   └── commands/
│       ├── create-app.md              # 앱 생성 커맨드
│       └── resume.md                  # 세션 이어하기 커맨드
└── SETUP-GUIDE.md                     # 이 문서
```

---

## 🎯 사용 방법

### 새 앱 만들기

#### 1단계: 프로젝트 폴더 준비
```bash
mkdir my-awesome-app
cd my-awesome-app
# 위의 파일들을 이 폴더에 복사
```

#### 2단계: GitHub 저장소 연결
```bash
# GitHub에서 새 저장소 생성 후
git init
git remote add origin https://github.com/[username]/my-awesome-app.git
```

#### 3단계: Claude Code에서 실행
```
/create-app 할일 관리 앱. 카테고리별 분류, 우선순위(높음/중간/낮음),
마감일 설정, 완료 체크, 대시보드에서 통계 확인
```

#### 4단계: 기다리기
Claude Code가 자동으로:
- 기획서 생성 → 백엔드 구현 → 프론트엔드 구현 → 빌드 → Git Push

#### 5단계: Vercel에서 배포 (첫 번째만 수동)
1. https://vercel.com/new 접속
2. 방금 push한 GitHub 저장소 선택
3. "Deploy" 클릭
4. 배포 완료! → https://my-awesome-app.vercel.app

**이후부터는 git push만 하면 자동 배포됩니다.**

### 세션이 끊겼을 때

```
/resume
```

### 더 상세한 아이디어 예시

```
/create-app 반려동물 건강 관리 앱.
- 반려동물 프로필 등록 (이름, 종류, 나이)
- 예방접종 일정 관리
- 병원 방문 기록
- 체중 변화 추이
- 여러 마리 등록 가능
- 깔끔한 대시보드에서 한눈에 확인
```

```
/create-app 독서 기록 앱.
- 읽고 있는 책 / 읽은 책 / 읽고 싶은 책 분류
- 독서 메모 및 인용구 저장
- 별점 및 한줄평
- 월별 독서 통계
- 검색 및 태그 기능
```

---

## 🔄 전체 파이프라인

```
[제이님] "반려동물 건강 관리 앱 만들어줘"
    │
    ▼
[/create-app 실행]
    │
    ▼
[Phase 1: planner] ──→ docs/ 폴더에 7개 문서 자동 생성
    │
    ▼
[Phase 2: 초기화] ──→ Next.js + Prisma + Tailwind + Git init
    │                    git commit "[Phase 2] 프로젝트 초기화"
    ▼
[Phase 3: backend-dev] ──→ API + DB 구현
    │                        git commit "[Phase 3] 백엔드 완료"
    ▼
[Phase 4: frontend-dev] ──→ UI + 페이지 구현
    │                         git commit "[Phase 4] 프론트엔드 완료"
    ▼
[Phase 5: 빌드 & Push]
    │   ├── 빌드 실패 → 자동 수정 → 재빌드 (최대 5회)
    │   └── 빌드 성공 → git push origin main
    ▼
[Phase 6: 배포]
    │   └── Vercel이 자동으로 빌드 & 배포
    ▼
✅ https://my-awesome-app.vercel.app 에서 앱 확인!
```

---

## 🔧 커스터마이즈

### 기술 스택 변경
CLAUDE.md의 "기술 스택" 섹션을 수정하면 됩니다.
서브에이전트 파일들도 해당 스택에 맞게 수정해주세요.

### 에이전트 추가
`.claude/agents/` 폴더에 새 마크다운 파일을 추가하면 됩니다.

예시:
- `qa-tester.md` - 테스트 자동화
- `ui-designer.md` - UI/UX 설계 전문
- `devops.md` - CI/CD, 인프라 설정

### 배포 플랫폼 변경
Vercel 대신 다른 플랫폼을 쓰고 싶으면:
- **Netlify**: GitHub 연동 방식 유사
- **Railway**: 백엔드 + DB 함께 호스팅
- **Fly.io**: 서버 사이드 앱에 적합

create-app.md의 Phase 6을 해당 플랫폼에 맞게 수정하면 됩니다.

---

## ⚠️ 알아두실 점

### 잘 되는 것
- 3~5페이지 규모의 CRUD 앱 (할일, 메모, 일정관리 등)
- 대시보드, 리스트, 폼 기반의 앱
- API + DB 연동이 있는 풀스택 앱
- Vercel 자동 배포

### 주의할 점
- **DB**: SQLite는 로컬에서만 동작. Vercel 배포 시 Vercel Postgres 또는 Supabase로 전환 필요
- **실시간 기능**: WebSocket은 Vercel 서버리스와 호환되지 않음. Pusher/Ably 등 별도 서비스 필요
- **파일 업로드**: Vercel 서버리스는 파일 저장 불가. Uploadthing/S3 등 별도 서비스 필요
- **인증**: 기본 NextAuth.js 제공. 소셜 로그인은 각 서비스의 API 키 설정 필요

### 비용 정리
| 도구 | 비용 | 용도 |
|---|---|---|
| Claude.ai Pro | $20/월 | 기획, 프로토타입 |
| Claude Code (Max) | $100~200/월 | 개발 자동화 |
| GitHub | 무료 | 코드 저장 |
| Vercel Hobby | 무료 | 배포 & 호스팅 |
| **합계** | **$120~220/월** | **전체 파이프라인** |

### 팁
1. **아이디어는 구체적일수록 좋습니다**
2. **처음에는 3페이지짜리 간단한 앱으로 시작하세요**
3. **PROGRESS.md로 항상 진행 상태를 확인할 수 있습니다**
4. **planner가 만든 문서가 맘에 안 들면 직접 수정 후 다음 Phase를 진행해도 됩니다**
5. **Vercel 첫 연결만 수동이고, 이후부터는 git push만으로 자동 배포됩니다**

---

## 🔄 다른 프로젝트에서 재사용

1. 새 폴더 생성
2. `CLAUDE.md`와 `.claude/` 폴더를 복사
3. `git init` + GitHub 원격 저장소 연결
4. Vercel에서 새 프로젝트로 GitHub 저장소 연결
5. `/create-app [새 아이디어]` 실행

한번 Vercel + GitHub 연결 패턴을 익혀두면 매번 5분이면 새 프로젝트를 시작할 수 있습니다.
