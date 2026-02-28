# 환경변수 설정 가이드

## 개요

Day Counter는 MVP 단계에서 브라우저 로컬스토리지를 사용하므로,
필수 환경변수가 최소화되어 있다. 로컬 개발 시 `.env.local` 파일을 생성하여 설정한다.

---

## 로컬 개발 (.env.local)

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 입력한다.

```env
# ==========================================
# Day Counter - 로컬 개발 환경변수
# ==========================================

# ----- 앱 설정 -----
NEXT_PUBLIC_APP_NAME="Day Counter"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ----- 데이터베이스 (로컬 개발 시 SQLite) -----
# Prisma를 사용한 API 테스트 시에만 필요
# MVP에서는 로컬스토리지를 사용하므로 선택사항
DATABASE_URL="file:./dev.db"
```

---

## Vercel 배포 시 (Vercel Dashboard에서 설정)

Vercel 프로젝트의 Settings > Environment Variables에서 아래 변수를 설정한다.

```env
# ==========================================
# Day Counter - Vercel 배포 환경변수
# ==========================================

# ----- 앱 설정 -----
NEXT_PUBLIC_APP_NAME="Day Counter"
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"

# ----- 데이터베이스 (확장 시) -----
# Vercel Postgres 사용 시 Vercel Dashboard에서 자동 설정됨
# DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# Supabase 사용 시
# DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

---

## 환경변수 목록

| 변수명 | 필수 | 공개 | 설명 | 로컬 기본값 |
|--------|------|------|------|-------------|
| `NEXT_PUBLIC_APP_NAME` | X | O | 앱 이름 (메타 태그 등에 사용) | "Day Counter" |
| `NEXT_PUBLIC_APP_URL` | X | O | 앱 URL (SEO 메타 태그 등에 사용) | "http://localhost:3000" |
| `DATABASE_URL` | X | X | DB 연결 문자열 (Prisma 사용 시) | "file:./dev.db" |

> `NEXT_PUBLIC_` 접두사가 있는 변수는 클라이언트 사이드에서도 접근 가능하다.
> DB 연결 문자열 등 민감한 정보에는 절대 `NEXT_PUBLIC_` 접두사를 사용하지 않는다.

---

## 환경별 설정 파일

| 파일명 | 용도 | Git 추적 |
|--------|------|---------|
| `.env` | 기본 환경변수 (모든 환경 공통) | O (민감 정보 없는 경우) |
| `.env.local` | 로컬 개발 전용 | X (gitignore) |
| `.env.production` | 프로덕션 전용 | X (gitignore) |

---

## .gitignore 확인사항

아래 항목이 `.gitignore`에 포함되어 있는지 반드시 확인한다.

```gitignore
# 환경변수
.env
.env.local
.env.production
.env*.local

# 데이터베이스
prisma/*.db
prisma/*.db-journal

# 빌드 결과물
.next/
out/

# 의존성
node_modules/
```

---

## 설정 순서

### 로컬 개발 시작

1. 프로젝트 클론
   ```bash
   git clone https://github.com/your-username/Day-Counter.git
   cd Day-Counter
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 환경변수 설정
   ```bash
   cp .env.example .env.local
   # .env.local 파일을 열어 필요한 값을 수정
   ```

4. (선택) Prisma 설정 (API 테스트 시)
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. 개발 서버 실행
   ```bash
   npm run dev
   ```

### Vercel 배포 시

1. GitHub에 코드 Push
2. Vercel Dashboard에서 프로젝트 Import
3. Environment Variables 탭에서 필요한 변수 설정
4. Deploy 실행
5. 배포 URL 확인 후 `docs/PROGRESS.md`에 기록

---

## 참고: .env.example 파일

프로젝트 루트에 `.env.example` 파일을 생성하여 팀원이 참조할 수 있도록 한다.
이 파일은 Git에 커밋한다 (실제 값이 아닌 예시 값만 포함).

```env
# Day Counter 환경변수 예시
# 이 파일을 .env.local로 복사한 후 실제 값을 입력하세요.

NEXT_PUBLIC_APP_NAME="Day Counter"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Prisma DB (로컬 개발 시 SQLite)
DATABASE_URL="file:./dev.db"
```
