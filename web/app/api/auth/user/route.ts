// pages/api/user.ts

import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/libs/jwtToken';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    const user = await User.findById(decoded.userId).select('-hash -salt'); // Exclude sensitive data

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
