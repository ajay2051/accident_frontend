"use client"

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";

export default function GoogleCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            const error = searchParams.get('error');

            if (error) {
                console.error('Google Sign-In error:', error);
                router.push('/auth/login?error=google_signin_failed');
                return;
            }

            if (code) {
                try {
                    // Exchange code for tokens
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/google/callback/`,
                        { params: { code } }
                    );

                    const data = response.data;

                    // Store tokens properly
                    localStorage.setItem("token", data.tokens.access_token);
                    localStorage.setItem("refresh_token", data.tokens.refresh_token);

                    // Store user info
                    localStorage.setItem("user_info", JSON.stringify({
                        user_id: data.user.id,
                        email: data.user.email,
                        user_role: data.user.role,
                        picture: data.user_info.picture,
                        name: data.user_info.name
                    }));

                    router.push("/main/landing");
                } catch (err) {
                    console.error('Token exchange error:', err);
                    router.push('/auth/login?error=google_signin_failed');
                }
            }
        };

        handleCallback();
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
            <div className="text-white text-xl">Processing Google Sign-In...</div>
        </div>
    );
}
