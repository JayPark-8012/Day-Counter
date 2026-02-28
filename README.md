# 🚀 Auto Build \& Deploy Template

Claude Code 멀티 에이전트 시스템으로 아이디어 → 기획 → 개발 → 배포까지 자동화하는 템플릿

## 사용 방법

### 1\. 이 템플릿으로 새 프로젝트 만들기

위의 **"Use this template"** 버튼 클릭 → **"Create a new repository"** 선택

### 2\. 로컬에 클론

git clone https://github.com/JayPark-8012/\[새-프로젝트명].git
cd \[새-프로젝트명]

### 3\. Vercel 연결 (첫 번째만)

https://vercel.com/new 에서 이 저장소 연결

### 4\. VS Code에서 Claude Code 실행

/create-app \[앱 아이디어를 구체적으로 적기]

### 5\. 세션 끊기면

/resume

## 포함된 에이전트

|에이전트|역할|모델|
|-|-|-|
|planner|기획, PRD, API 스펙, DB 설계|Opus|
|backend-dev|API 라우트, DB 구현|Sonnet|
|frontend-dev|UI 컴포넌트, 페이지 구현|Sonnet|

## 기술 스택

Next.js 14 / TypeScript / Tailwind CSS / Prisma / Vercel

## 자동화 파이프라인

아이디어 입력 → 기획 → 백엔드 → 프론트엔드 → 빌드 → Git Push → Vercel 자동 배포

