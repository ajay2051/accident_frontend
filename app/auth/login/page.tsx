"use client"

import React, { useState } from 'react';
import axios from "axios"
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    id: number;
    access_token: string;
    refresh_token: string;
    user_id: number;
    email: string;
    user_role: string;
}

const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/token/`,
            credentials,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(
                error.response.data?.message || "Login Failed. Please check credentials"
            );
        } else if (error.request) {
            throw new Error("No response from server. Please try again.");
        } else {
            throw new Error("Network error occurred. Please try again.");
        }
    }
};

export default function LoginPage(){
    const router = useRouter();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: "",
        password: "",
    });
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data: LoginResponse) => {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("user_info", JSON.stringify({
                user_id: data.user_id,
                email: data.email,
                user_role: data.user_role
            }));
            router.push("/main/landing");
        },
        onError: (error: Error) => {
            console.error("Login Error", error.message || error);
            setTimeout(() => {
                loginMutation.reset();
            }, 5000);
        },
    })

    const validateEmail = (email: string): string => {
        if (!email) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (password: string): string => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters long";
        if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
        if (!/(?=.*[@$!%*?&])/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
        return "";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});

        if (name === 'email') {
            const emailValidationError = validateEmail(value)
            setEmailError(emailValidationError)
        }

        if (name === 'password') {
            const passwordValidationError = validatePassword(value)
            setPasswordError(passwordValidationError)
        }
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const emailValidationError = validateEmail(credentials.email)
        const passwordValidationError = validatePassword(credentials.password)

        setEmailError(emailValidationError)
        setPasswordError(passwordValidationError)

        if (!emailValidationError && !passwordValidationError) {
            loginMutation.mutate(credentials)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    // Get error message from mutation
    const getErrorMessage = () => {
        if (loginMutation.error instanceof Error) {
            return loginMutation.error.message;
        }
        return "An unexpected error occurred. Please try again";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden font-['Poppins',sans-serif] flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-blue-600/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

            {/* Error Message - Top Right Corner */}
            {loginMutation.isError && (
                <div className="absolute top-4 right-4 z-20 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3 text-sm text-red-200 max-w-xs">
                    {getErrorMessage()}
                </div>
            )}

            {/* Login Card */}
            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl mx-auto mb-6 flex items-center justify-center">
                        <Lock className="w-10 h-10 text-blue-300" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-200 text-sm">Login to Accident Notification</p>
                </div>

                {/* Login Form */}
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
                                    value={credentials.email}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Enter your email"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                    required
                                    disabled={loginMutation.isPending}
                                />
                            </div>
                            {emailError && (
                                <p className="text-red-300 text-xs mt-1">{emailError}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Enter your password"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                    required
                                    disabled={loginMutation.isPending}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                                    disabled={loginMutation.isPending}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="text-red-300 text-xs mt-1">{passwordError}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-500 bg-white/10 border border-white/20 rounded focus:ring-blue-400/50 focus:ring-2"
                                    disabled={loginMutation.isPending}
                                />
                                <span className="ml-2 text-gray-200">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-blue-300 hover:text-blue-200 transition-colors duration-200"
                                disabled={loginMutation.isPending}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loginMutation.isPending || !credentials.email || !credentials.password}
                            className="w-full bg-blue-500/70 backdrop-blur-sm hover:bg-blue-500/80 disabled:bg-gray-500/50 disabled:cursor-not-allowed border border-white/20 rounded-lg py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="px-4 text-gray-300 text-sm">or</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Social Login Options */}
                    <div className="space-y-3">
                        <button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/15 border border-white/20 rounded-lg py-3 font-medium transition-all duration-200 flex items-center justify-center gap-3">
                            <img src="/google.png" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>
                        {/*<button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/15 border border-white/20 rounded-lg py-3 font-medium transition-all duration-200 flex items-center justify-center gap-3">*/}
                        {/*    <img src="/fb.png" alt="Facebook" className="w-5 h-5" />*/}
                        {/*    Continue with Facebook*/}
                        {/*</button>*/}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-gray-300 text-sm">
                        Don't have an account?{' '}
                        <a
                            href="/auth/register"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
                        >
                            Sign up here
                        </a>
                    </p>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 text-xs text-gray-400">
                    © 2025 Accident Notification. All rights reserved.
                </div>
            </div>
        </div>
    );
}