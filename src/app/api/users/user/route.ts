import { connect } from '@/db-config/db-config';
import { getDataFromToken } from '@/helpers/token-extract';
import User from '@/models/users.models';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');
    return NextResponse.json({
      message: 'User found',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
