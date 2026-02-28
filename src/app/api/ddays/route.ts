import { NextRequest, NextResponse } from 'next/server';
import { VALID_CATEGORIES } from '@/types/dday';

/**
 * GET /api/ddays
 *
 * MVP 단계에서는 클라이언트의 로컬스토리지가 1차 저장소이다.
 * 이 API는 향후 서버 DB 전환을 대비한 인터페이스 스텁이다.
 *
 * Query Parameters:
 *   - category: 카테고리 필터 (anniversary | exam | travel | birthday | custom)
 *   - sort: 정렬 기준 (nearest | farthest | name | created)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') ?? 'nearest';

    // 카테고리 유효성 검증
    if (category && !VALID_CATEGORIES.includes(category as never)) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 카테고리입니다.' },
        { status: 400 }
      );
    }

    // MVP: 클라이언트 로컬스토리지를 사용하므로 빈 배열 반환
    // 향후 DB 연동 시 이 부분에서 실제 데이터를 조회한다
    return NextResponse.json(
      {
        success: true,
        data: [],
        meta: {
          note: 'MVP 단계에서는 클라이언트 로컬스토리지를 사용합니다.',
          category: category ?? 'all',
          sort,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/ddays] 오류:', error);
    return NextResponse.json(
      { success: false, error: 'D-Day 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ddays
 *
 * 새로운 D-Day를 생성한다.
 * MVP 단계에서는 요청 유효성 검증 후 클라이언트로 검증 결과만 반환한다.
 *
 * Request Body:
 *   - title: string (1~30자, 필수)
 *   - targetDate: string (YYYY-MM-DD, 필수)
 *   - category: string (anniversary | exam | travel | birthday | custom, 필수)
 *   - emoji: string (선택)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, targetDate, category, emoji } = body;

    // 제목 유효성 검증
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '제목을 입력해주세요.' },
        { status: 400 }
      );
    }
    if (title.trim().length > 30) {
      return NextResponse.json(
        { success: false, error: '제목은 1~30자 이내로 입력해주세요.' },
        { status: 400 }
      );
    }

    // 날짜 유효성 검증
    if (!targetDate || typeof targetDate !== 'string') {
      return NextResponse.json(
        { success: false, error: '날짜를 선택해주세요.' },
        { status: 400 }
      );
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(targetDate)) {
      return NextResponse.json(
        { success: false, error: '날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    // 카테고리 유효성 검증
    if (!category || !VALID_CATEGORIES.includes(category as never)) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 카테고리입니다.' },
        { status: 400 }
      );
    }

    // MVP: 클라이언트 로컬스토리지를 사용하므로 검증 통과 응답만 반환
    // 향후 DB 연동 시 이 부분에서 실제 데이터를 저장한다
    const now = new Date().toISOString();
    return NextResponse.json(
      {
        success: true,
        data: {
          id: 'client-side-managed',
          title: title.trim(),
          targetDate,
          category,
          emoji: emoji || null,
          createdAt: now,
          updatedAt: now,
          note: 'MVP 단계에서는 클라이언트 로컬스토리지에 저장됩니다.',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/ddays] 오류:', error);
    return NextResponse.json(
      { success: false, error: 'D-Day 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ddays
 *
 * 모든 D-Day를 삭제한다. (설정 페이지의 전체 삭제 기능)
 *
 * Request Body:
 *   - confirm: boolean (true여야 삭제 실행, 필수)
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { confirm } = body;

    if (confirm !== true) {
      return NextResponse.json(
        { success: false, error: '삭제 확인이 필요합니다.' },
        { status: 400 }
      );
    }

    // MVP: 클라이언트 로컬스토리지를 사용하므로 확인 응답만 반환
    // 향후 DB 연동 시 이 부분에서 실제 데이터를 삭제한다
    return NextResponse.json(
      {
        success: true,
        data: {
          deletedCount: 0,
          message: '모든 D-Day가 삭제되었습니다.',
          note: 'MVP 단계에서는 클라이언트 로컬스토리지에서 삭제합니다.',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[DELETE /api/ddays] 오류:', error);
    return NextResponse.json(
      { success: false, error: '전체 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
