import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/User';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    if (!user.salt || !user.hash) {
      console.error('User salt or hash is undefined');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // Hash the provided password with the stored salt
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');

    if (hash !== user.hash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Exclude the hash and salt fields from the response
    const { hash: _, salt: __, ...userWithoutSensitiveData } = user.toObject();

    return NextResponse.json(userWithoutSensitiveData, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
