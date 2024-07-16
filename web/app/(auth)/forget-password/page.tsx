import React from 'react';
import Link from 'next/link';

const ForgotPassword: React.FC = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-black flex-col">
      <h1 className='text-6xl font-bold'>Forgot Password</h1>
      This feature will be implemented in near by future.
      <Link href='/login'>
        <button>
          Login Now
        </button>
      </Link>
    </div>
  );
};

export default ForgotPassword;
