"use client"

import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2, CheckCircle, Lock } from 'lucide-react';
import axios from "axios";
import {useMutation} from "@tanstack/react-query";

interface ForgotPasswordRequest {
    email: string;
}

interface ForgotPasswordResponse {
    message: string;
    link: string;
}

const requestPasswordReset = async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const response = await axios.post<ForgotPasswordResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const forgotPasswordMutation = useMutation({
        mutationFn: requestPasswordReset,
        onSuccess: (data) => {
            // Handle success - maybe show success message
            console.log('Password reset email sent:', data.message);
            if (data.link) {
                localStorage.setItem('passwordResetLink', data.link);
            }
        },
        onError: (error: any) => {
            // Error is handled by the mutation state
            console.error('Password reset failed:', error);
        },
    });

    const validateEmail = (email: string): string => {
        if (!email) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (emailError) {
            setEmailError(validateEmail(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateEmail(email);
        setEmailError(validationError);

        if (!validationError) {
            forgotPasswordMutation.mutate({ email });
        }
    };

    const handleBackToLogin = () => {
        window.location.href = '/auth/login';
    };

    const errorMessage = forgotPasswordMutation.error
        ? (forgotPasswordMutation.error as any)?.response?.data?.message ||
        (forgotPasswordMutation.error as any)?.message ||
        'Failed to send reset email. Please try again.'
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden font-sans flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-blue-600/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

            {/* Error Message - Top Right Corner */}
            {errorMessage && (
                <div className="absolute top-4 right-4 z-20 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3 text-sm text-red-200 max-w-xs">
                    {errorMessage}
                </div>
            )}

            {/* Forgot Password Card */}
            <div className="w-full max-w-md relative z-10">
                {forgotPasswordMutation.isSuccess ? (
                    // Success State
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-500/20 backdrop-blur-md rounded-2xl border border-green-400/30 shadow-xl mx-auto mb-6 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-300" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
                        <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                            We've sent a password reset link to <span className="font-semibold text-blue-300">{email}</span>
                        </p>
                        <p className="text-gray-300 text-sm mb-8">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        <button
                            onClick={handleBackToLogin}
                            className="bg-blue-500/70 hover:bg-blue-500/80 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Login
                        </button>
                    </div>
                ) : (
                    // Request Form
                    <>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl mx-auto mb-6 flex items-center justify-center">
                                <Lock className="w-10 h-10 text-blue-300" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                            <p className="text-gray-200 text-sm">Enter your email to receive a reset link</p>
                        </div>

                        {/* Form */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            placeholder="Enter your email"
                                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                            required
                                            disabled={forgotPasswordMutation.isPending}
                                        />
                                    </div>
                                    {emailError && (
                                        <p className="text-red-300 text-xs mt-1">{emailError}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={forgotPasswordMutation.isPending || !email}
                                    className="w-full bg-blue-500/70 backdrop-blur-sm hover:bg-blue-500/80 disabled:bg-gray-500/50 disabled:cursor-not-allowed border border-white/20 rounded-lg py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    {forgotPasswordMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending Reset Link...
                                        </>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </button>
                            </form>

                            {/* Back to Login */}
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleBackToLogin}
                                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                                    disabled={forgotPasswordMutation.isPending}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Copyright */}
                <div className="text-center mt-8 text-xs text-gray-400">
                    © 2025 Accident Notification. All rights reserved.
                </div>
            </div>
        </div>
    );
}