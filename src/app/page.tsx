'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  const hadleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      HOME PAGE
      <Link href='/profile'>Profile page</Link>
      <Button onClick={hadleLogout}>Logout</Button>
    </main>
  );
}
