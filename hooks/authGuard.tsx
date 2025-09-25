// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthGuard = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/auth/login');
            return;
        }

        // Optional: Add token expiry check
        const userInfo = localStorage.getItem('user_info');
        if (!userInfo) {
            localStorage.removeItem('access_token');
            router.push('/auth/login');
        }
    }, [router]);
};