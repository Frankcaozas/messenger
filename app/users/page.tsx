'use client'
import React from 'react';
import EmptyState from '../components/EmptyState';
import { signOut } from 'next-auth/react';

const page = () => {
  return (
    <div className='hidden lg:block lg:pl-80 h-full'>
      <button onClick={()=>signOut()}>sign out</button>
      <EmptyState/>
    </div>

  );
};

export default page;