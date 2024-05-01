'use client';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    redirect('/table');
  }, []);
  return <></>;
};

export default HomePage;
