"use client"

import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle, Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface PasswordResetConfirmRequest {
    new_password: string;
    confirm_password: string;
}

interface PasswordResetConfirmResponse {
    message: string;
    success: boolean;
}

const confirmPasswordReset = async (
    token: string,
    data: PasswordResetConfirmRequest
): Promise<PasswordResetConfirmResponse> => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password-confirm/${token}/`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

export default function PasswordResetConfirmPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: '',
        token: ''
    });
    const [token, setToken] = useState<string | null>(null);
    const [resetEmail, setResetEmail] = useState<string>('');

    useEffect(() => {
        // Get token and email from localStorage
        const storedToken = localStorage.getItem('passwordResetLink');

        if (!storedToken) {
            setErrors(prev => ({
                ...prev,
                token: 'No reset token found. Please request a new password reset.'
            }));
            return;
        }

        setToken(storedToken);
    }, []);

    const passwordResetMutation = useMutation({
        mutationFn: (data: PasswordResetConfirmRequest) => {
            if (!token) throw new Error('No reset token available');
            return confirmPasswordReset(token, data);
        },
        onSuccess: (data) => {
            console.log('Password reset successful:', data.message);
            // Clear stored reset data after successful reset
            localStorage.removeItem('passwordResetLink');

        },
        onError: (error: any) => {
            console.error('Password reset failed:', error);
        },
    });

    const validatePassword = (password: string): string => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters long';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        return '';
    };

    const validateConfirmPassword = (confirmPass: string, newPass: string): string => {
        if (!confirmPass) return 'Please confirm your password';
        if (confirmPass !== newPass) return 'Passwords do not match';
        return '';
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewPassword(value);
        if (errors.newPassword) {
            setErrors(prev => ({ ...prev, newPassword: validatePassword(value) }));
        }
        // Re-validate confirm password if it's already filled
        if (confirmPassword && errors.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirmPassword(confirmPassword, value)
            }));
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (errors.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirmPassword(value, newPassword)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPasswordError = validatePassword(newPassword);
        const confirmPasswordError = validateConfirmPassword(confirmPassword, newPassword);

        setErrors(prev => ({
            ...prev,
            newPassword: newPasswordError,
            confirmPassword: confirmPasswordError
        }));

        if (!newPasswordError && !confirmPasswordError && !errors.token) {
            passwordResetMutation.mutate({
                new_password: newPassword,
                confirm_password: confirmPassword
            });
        }
    };

    const handleBackToLogin = () => {
        window.location.href = '/auth/login';
    };

    const handleRequestNewReset = () => {
        window.location.href = '/auth/forgot_password_request';
    };

    // Extract error message for display
    const errorMessage = passwordResetMutation.error
        ? (passwordResetMutation.error as any)?.response?.data?.message ||
        (passwordResetMutation.error as any)?.message ||
        'Failed to reset password. Please try again.'
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
            {(errorMessage || errors.token) && (
                <div className="absolute top-4 right-4 z-20 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3 text-sm text-red-200 max-w-xs">
                    {errorMessage || errors.token}
                </div>
            )}

            {/* Password Reset Confirm Card */}
            <div className="w-full max-w-md relative z-10">
                {passwordResetMutation.isSuccess ? (
                    // Success State
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-500/20 backdrop-blur-md rounded-2xl border border-green-400/30 shadow-xl mx-auto mb-6 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-300" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Password Reset Successful!</h1>
                        <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                            Your password has been successfully updated.
                        </p>
                        <p className="text-gray-300 text-sm mb-8">
                            You can now log in with your new password.
                        </p>
                        <button
                            onClick={handleBackToLogin}
                            className="bg-blue-500/70 hover:bg-blue-500/80 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Login
                        </button>
                    </div>
                ) : errors.token ? (
                    // Token Error State
                    <div className="text-center">
                        <div className="w-20 h-20 bg-red-500/20 backdrop-blur-md rounded-2xl border border-red-400/30 shadow-xl mx-auto mb-6 flex items-center justify-center">
                            <AlertCircle className="w-10 h-10 text-red-300" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Invalid or Expired Link</h1>
                        <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                            {errors.token}
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={handleRequestNewReset}
                                className="w-full bg-blue-500/70 hover:bg-blue-500/80 px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Request New Reset
                            </button>
                            <button
                                onClick={handleBackToLogin}
                                className="w-full bg-gray-500/70 hover:bg-gray-500/80 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Login
                            </button>
                        </div>
                    </div>
                ) : (
                    // Reset Password Form
                    <>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl mx-auto mb-6 flex items-center justify-center">
                                <Lock className="w-10 h-10 text-blue-300" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Reset Your Password</h1>
                            <p className="text-gray-200 text-sm">
                                {resetEmail && `Resetting password for ${resetEmail}`}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* New Password Field */}
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            id="newPassword"
                                            name="newPassword"
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                            placeholder="Enter new password"
                                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                            required
                                            disabled={passwordResetMutation.isPending}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                                            disabled={passwordResetMutation.isPending}
                                        >
                                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.newPassword && (
                                        <p className="text-red-300 text-xs mt-1">{errors.newPassword}</p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            placeholder="Confirm new password"
                                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                            required
                                            disabled={passwordResetMutation.isPending}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                                            disabled={passwordResetMutation.isPending}
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-300 text-xs mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={passwordResetMutation.isPending || !newPassword || !confirmPassword}
                                    className="w-full bg-blue-500/70 backdrop-blur-sm hover:bg-blue-500/80 disabled:bg-gray-500/50 disabled:cursor-not-allowed border border-white/20 rounded-lg py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    {passwordResetMutation.isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Resetting Password...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </form>

                            {/* Back to Login */}
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleBackToLogin}
                                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                                    disabled={passwordResetMutation.isPending}
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