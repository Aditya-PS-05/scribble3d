"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@/hooks/useAuth';
import { userSelector } from '@/store/atoms/userSelector';
import Link from 'next/link';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter()
 
  const user = useRecoilValue(userSelector);
  const { logout } = useAuth()

  useEffect(()=>{
    if (user) {
      router.push('/');
    }
  },[user])
  
    const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = await axios.post('/api/auth/login', formData);
      console.log(response.data)
      const { userId } = response.data;
      console.log('Login successful, user ID stored in local storage');
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black flex-col">
      <h1 className='text-6xl font-bold'>Welcome to Scribble3d</h1>
      <h1 className='text-center text-2xl mt-2'>Login</h1>
      <div className='w-[25%] mt-4 '>
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded">
        <div className="mb-4"> 
          <label htmlFor="email" className="block text-white mb-2">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="mb-4 text-right">
          <a href="/forget-password" className="text-gray-500">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Login
        </button>
        
      </form>
      <div className='bg-black px-8 rounded'>
      <p>Don't have a account!</p>
        <Link href='/signup'>
          <button
            type="button"
            className="w-full px-3 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 mt-4"
          >
            Signup
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Login;