import { NextRequest, NextResponse } from 'next/server';
import { VALID_CATEGORIES } from '@/types/dday';

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/ddays/[id]
 *
 * 특정 D-Day의 상세 정보를 조회한다.
 * MVP 단계에서는 클라이언트의 로컬스토리지가 1차 저장소이다.
 * 이 API는 향후 서버 DB 전환을 대비한 인터페이스 스텁이다.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 ID입니다.' },
        { status: 400 }
      );
    }

    // MVP: 클라이언트 로컬스토리지를 사용하므로 스텁 응답 반환
    // 향후 DB 연동 시 이 부분에서 실제 데이터를 조회한다
    return NextResponse.json(
      {
        success: false,
        error: '해당 D-Day를 찾을 수 없습니다.',
        meta: {
          note: 'MVP 단계에서는 클라이언트 로컬스토리지를 사용합니다.',
          requestedId: id,
        },
      },
      { status: 404 }
    );
  } catch (error) {
    console.error('[GET /api/ddays/[id]] 오류:', error);
    return NextResponse.json(
      { success: false, error: 'D-Day 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/ddays/[id]
 *
 * 기존 D-Day 정보를 수정한다.
 * 전달된 필드만 수정된다 (Partial Update).
 *
 * Request Body (모두 선택):
 *   - title: string (1~30자)
 *   - targetDate: string (YYYY-MM-DD)
 *   - category: string (anniversary | exam | travel | birthday | custom)
 *   - emoji: string
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 ID입니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, targetDate, category, emoji } = body;

    // 제목 유효성 검증 (전달된 경우에만)
    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
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
    }

    // 날짜 유효성 검증 (전달된 경우에만)
    if (targetDate !== undefined) {
      if (typeof targetDate !== 'string') {
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
    }

    // 카테고리 유효성 검증 (전달된 경우에만)
    if (category !== undefined && !VALID_CATEGORIES.includes(category as never)) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 카테고리입니다.' },
        { status: 400 }
      );
    }

    // MVP: 클라이언트 로컬스토리지를 사용하므로 스텁 응답 반환
    // 향후 DB 연동 시 이 부분에서 실제 데이터를 수정한다
    return NextResponse.json(
      {
        success: false,
        error: '해당 D-Day를 찾을 수 없습니다.',
        meta: {
          note: 'MVP 단계에서는 클라이언트 로컬스토리지를 사용합니다.',
          requestedId: id,
          receivedFields: { title, targetDate, category, emoji },
        },
      },
      { status: 404 }
    );
  } catch (error) {
    console.error('[PUT /api/ddays/[id]] 오류:', error);
    return NextResponse.json(
      { success: false, error: 'D-Day 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ddays/[id]
 *
 * 특정 D-Day를 삭제한다.
 * MVP 단계에서는 클라이언트의 로컬스토리지가 1차 저장소이다.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 ID입니다.' },
        { status: 400 }
      );
    }

    // MVP: 클라이언트 로컬스토리지를 사용하므로 스텁 응답 반환
    // 향후 DB 연동 시 이 부분에서 실제 데이터를 삭제한다
    return NextResponse.json(
      {
        success: false,
        error: '해당 D-Day를 찾을 수 없습니다.',
        meta: {
          note: 'MVP 단계에서는 클라이언트 로컬스토리지를 사용합니다.',
          requestedId: id,
        },
      },
      { status: 404 }
    );
  } catch (error) {
    console.error('[DELETE /api/ddays/[id]] 오류:', error);
    return NextResponse.json(
      { success: false, error: 'D-Day 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
