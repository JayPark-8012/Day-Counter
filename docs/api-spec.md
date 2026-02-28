# API 스펙

## 개요

Day Counter의 API는 Next.js App Router의 Route Handler를 사용한다.
모든 API는 `/api` 접두사 아래에 위치하며, RESTful 규칙을 따른다.

> **참고**: MVP 단계에서는 클라이언트 로컬스토리지를 1차 저장소로 사용하되,
> 향후 서버 DB 전환을 대비하여 API 인터페이스를 미리 정의한다.
> 로컬 개발 시 SQLite + Prisma로 API를 테스트할 수 있다.

## 공통 사항

### Base URL
- 로컬: `http://localhost:3000/api`
- 배포: `https://{app-domain}.vercel.app/api`

### 공통 응답 형식
```json
{
  "success": true,
  "data": { ... }
}
```

### 공통 에러 응답 형식
```json
{
  "success": false,
  "error": "에러 메시지"
}
```

### HTTP 상태 코드
| 코드 | 설명 |
|------|------|
| 200  | 성공 |
| 201  | 생성 성공 |
| 400  | 잘못된 요청 (유효성 검사 실패) |
| 404  | 리소스를 찾을 수 없음 |
| 500  | 서버 내부 오류 |

---

## D-Day 관리

### GET /api/ddays

- **설명**: 모든 D-Day 목록을 조회한다.
- **인증 필요 여부**: 불필요
- **Query Parameters**:
  | 파라미터 | 타입 | 필수 | 설명 | 기본값 |
  |---------|------|------|------|--------|
  | category | string | X | 카테고리 필터 (anniversary, exam, travel, birthday, custom) | 전체 |
  | sort | string | X | 정렬 기준 (nearest, farthest, name, created) | nearest |

- **Response (200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string - D-Day 고유 ID",
        "title": "string - D-Day 제목",
        "targetDate": "string - 대상 날짜 (ISO 8601, YYYY-MM-DD)",
        "category": "string - 카테고리 (anniversary | exam | travel | birthday | custom)",
        "emoji": "string - 선택한 이모지",
        "createdAt": "string - 생성일시 (ISO 8601)",
        "updatedAt": "string - 수정일시 (ISO 8601)"
      }
    ]
  }
  ```

- **Response (500)**:
  ```json
  {
    "success": false,
    "error": "D-Day 목록을 불러오는데 실패했습니다."
  }
  ```

---

### POST /api/ddays

- **설명**: 새로운 D-Day를 생성한다.
- **인증 필요 여부**: 불필요
- **Request Body**:
  ```json
  {
    "title": "string - D-Day 제목 (1~30자, 필수)",
    "targetDate": "string - 대상 날짜 (YYYY-MM-DD, 필수)",
    "category": "string - 카테고리 (anniversary | exam | travel | birthday | custom, 필수)",
    "emoji": "string - 선택한 이모지 (선택, 미입력 시 카테고리 기본 이모지)"
  }
  ```

- **Response (201)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string - 생성된 D-Day ID",
      "title": "string - D-Day 제목",
      "targetDate": "string - 대상 날짜 (YYYY-MM-DD)",
      "category": "string - 카테고리",
      "emoji": "string - 이모지",
      "createdAt": "string - 생성일시 (ISO 8601)",
      "updatedAt": "string - 수정일시 (ISO 8601)"
    }
  }
  ```

- **Response (400)**:
  ```json
  {
    "success": false,
    "error": "제목은 1~30자 이내로 입력해주세요."
  }
  ```
  ```json
  {
    "success": false,
    "error": "날짜를 선택해주세요."
  }
  ```
  ```json
  {
    "success": false,
    "error": "유효하지 않은 카테고리입니다."
  }
  ```

---

### GET /api/ddays/[id]

- **설명**: 특정 D-Day의 상세 정보를 조회한다.
- **인증 필요 여부**: 불필요
- **URL Parameters**:
  | 파라미터 | 타입 | 설명 |
  |---------|------|------|
  | id | string | D-Day 고유 ID |

- **Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string - D-Day 고유 ID",
      "title": "string - D-Day 제목",
      "targetDate": "string - 대상 날짜 (YYYY-MM-DD)",
      "category": "string - 카테고리",
      "emoji": "string - 이모지",
      "createdAt": "string - 생성일시 (ISO 8601)",
      "updatedAt": "string - 수정일시 (ISO 8601)",
      "milestones": [
        {
          "label": "string - 마일스톤 라벨 (예: D-100)",
          "date": "string - 마일스톤 날짜 (YYYY-MM-DD)",
          "daysLeft": "number - 해당 마일스톤까지 남은 일수",
          "isPassed": "boolean - 이미 지났는지 여부"
        }
      ]
    }
  }
  ```

- **Response (404)**:
  ```json
  {
    "success": false,
    "error": "해당 D-Day를 찾을 수 없습니다."
  }
  ```

---

### PUT /api/ddays/[id]

- **설명**: 기존 D-Day 정보를 수정한다.
- **인증 필요 여부**: 불필요
- **URL Parameters**:
  | 파라미터 | 타입 | 설명 |
  |---------|------|------|
  | id | string | D-Day 고유 ID |

- **Request Body**:
  ```json
  {
    "title": "string - D-Day 제목 (1~30자, 선택)",
    "targetDate": "string - 대상 날짜 (YYYY-MM-DD, 선택)",
    "category": "string - 카테고리 (선택)",
    "emoji": "string - 이모지 (선택)"
  }
  ```
  > 전달된 필드만 수정된다 (Partial Update).

- **Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string - D-Day ID",
      "title": "string - 수정된 제목",
      "targetDate": "string - 수정된 날짜",
      "category": "string - 수정된 카테고리",
      "emoji": "string - 수정된 이모지",
      "createdAt": "string - 생성일시",
      "updatedAt": "string - 수정일시 (갱신됨)"
    }
  }
  ```

- **Response (400)**:
  ```json
  {
    "success": false,
    "error": "제목은 1~30자 이내로 입력해주세요."
  }
  ```

- **Response (404)**:
  ```json
  {
    "success": false,
    "error": "해당 D-Day를 찾을 수 없습니다."
  }
  ```

---

### DELETE /api/ddays/[id]

- **설명**: 특정 D-Day를 삭제한다.
- **인증 필요 여부**: 불필요
- **URL Parameters**:
  | 파라미터 | 타입 | 설명 |
  |---------|------|------|
  | id | string | D-Day 고유 ID |

- **Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string - 삭제된 D-Day ID",
      "message": "D-Day가 삭제되었습니다."
    }
  }
  ```

- **Response (404)**:
  ```json
  {
    "success": false,
    "error": "해당 D-Day를 찾을 수 없습니다."
  }
  ```

---

## 데이터 관리

### DELETE /api/ddays

- **설명**: 모든 D-Day 데이터를 삭제한다. (설정 페이지의 전체 삭제 기능)
- **인증 필요 여부**: 불필요
- **Request Body**:
  ```json
  {
    "confirm": "boolean - true여야 삭제 실행 (필수)"
  }
  ```

- **Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "deletedCount": "number - 삭제된 D-Day 개수",
      "message": "모든 D-Day가 삭제되었습니다."
    }
  }
  ```

- **Response (400)**:
  ```json
  {
    "success": false,
    "error": "삭제 확인이 필요합니다."
  }
  ```

---

## 클라이언트 전용 유틸리티 (API 아님)

아래는 서버 API가 아닌, 클라이언트에서 직접 처리하는 로직이다.

### 날짜 계산 (lib/date-utils.ts)
- `calculateDday(targetDate: string): number` - 남은/지난 일수 계산
- `formatDday(days: number): string` - "D-30", "D-Day", "D+100" 형태로 포맷
- `generateMilestones(targetDate: string): Milestone[]` - 마일스톤 목록 생성

### 로컬스토리지 (lib/storage.ts)
- `getDdays(): DDay[]` - 로컬스토리지에서 전체 D-Day 목록 조회
- `getDday(id: string): DDay | null` - 특정 D-Day 조회
- `saveDday(dday: DDay): DDay` - D-Day 저장 (생성/수정)
- `deleteDday(id: string): void` - D-Day 삭제
- `deleteAllDdays(): void` - 전체 삭제
- `exportData(): string` - JSON 문자열로 내보내기
- `importData(json: string): void` - JSON 문자열에서 가져오기
