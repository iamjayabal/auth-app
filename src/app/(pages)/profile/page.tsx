'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing');
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/user');
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className='p-1 rounded bg-green-500'>
        {data === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <Button onClick={logout}>Logout</Button>

      <Button onClick={getUserDetails}>GetUser Details</Button>
    </div>
  );
}
