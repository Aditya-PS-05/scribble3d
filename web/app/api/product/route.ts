import Product from '../../../models/Product';
import connectMongoDB from '@/libs/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res:NextApiResponse) {
    let output = []
  try {
    await connectMongoDB();

    const questions = await Product.find();
    output = questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  return NextResponse.json(output);
}