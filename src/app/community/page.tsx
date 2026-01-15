'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CommunityRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-secondary">Redirecting to home...</p>
      </div>
    </div>
  );
}
