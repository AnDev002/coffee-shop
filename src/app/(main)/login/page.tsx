// src/app/(main)/login/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import LoginPage from '@/modules/auth/LoginPage';

export const metadata: Metadata = {
  title: 'Login - N.S Coffee',
  description: 'Login to your N.S Coffee account',
};

export default function Page() {
  return <LoginPage />;
}