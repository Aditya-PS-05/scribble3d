"use client";
import Link from "next/link";
import { userAtom } from "@/store/atoms/userAtom";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useAuth } from "@/hooks/useAuth";
import { userSelector } from "@/store/atoms/userSelector";

export default function Home() {
  const router = useRouter()
 
  const user = useRecoilValue(userSelector);
  const { logout } = useAuth()

  useEffect(()=>{
    if (!user) {
      router.push('/login');
    }
  },[user])
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="text-center">
        <div className="text-6xl font-bold mb-4">Welcome to Scribble3d</div>
        <button className="bg-gray-200 text-black p-2 rounded-md"><Link href="/products">All Products</Link></button>
      </div>
    </div>
  );
}
