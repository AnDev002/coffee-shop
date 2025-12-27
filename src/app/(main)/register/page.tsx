// src/app/(main)/register/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import RegisterPage from '@/modules/auth/RegisterPage';

export const metadata: Metadata = {
  title: 'Register - N.S Coffee',
  description: 'Create your N.S Coffee account',
};

export default function Page() {
  return <RegisterPage />;
}