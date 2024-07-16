"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@/hooks/useAuth';
import { userSelector } from '@/store/atoms/userSelector';
import Link from 'next/link';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  address: Address;
  phoneNumber: string;
}

const Signup: React.FC = () => {
  const router = useRouter();

  const user = useRecoilValue(userSelector);
  const { logout } = useAuth();

  useEffect(()=>{
    if (user) {
      router.push('/');
    }
  },[user])

  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    fullName: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    phoneNumber: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      router.push('/login');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className='text-6xl font-bold text-white mt-6'>Join Scribble3d</h1>
      <h1 className='text-center text-2xl text-white mt-2'>Sign Up</h1>
      <div className='w-[25%] mt-4'>
        <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg space-y-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-2">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-white mb-2">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="street" className="block text-white mb-2">Street</label>
            <input
              id="street"
              name="street"
              type="text"
              value={formData.address.street}
              onChange={handleAddressChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-white mb-2">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.address.city}
              onChange={handleAddressChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-white mb-2">State</label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.address.state}
              onChange={handleAddressChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zipCode" className="block text-white mb-2">Zip Code</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              value={formData.address.zipCode}
              onChange={handleAddressChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-white mb-2">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              value={formData.address.country}
              onChange={handleAddressChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-white mb-2">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
          >
            Sign Up
          </button>
        </form>
        <div className='bg-black px-8 rounded'>
        <p>Don't have a account!</p>
          <Link href='/login'>
            <button
              type="button"
              className="w-full px-3 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 mt-4"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;