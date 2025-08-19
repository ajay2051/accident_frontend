"use client"

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin, UserCheck, Loader2 } from 'lucide-react';
import {string} from "postcss-selector-parser";


interface RegisterCredentials {
    first_name: string
    last_name: string
    email: string
    role: string
    phone_number: number
    address: string
    password: string
}

interface RegisterResponse {
    first_name: string
    last_name: string
    email: string
    role: string
    phone_number: number
    address: string
    longitude: number
    latitude: number
    id: number
    is_verified: boolean
    created_at: string
    updated_at: string
}

export default function RegisterPage() {
    const router = useRouter();
    const[credentials, setCredentials] = useState<RegisterCredentials>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        phone_number: 0,
        address: "",
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");
    const [addressError, setAddressError] = useState<string>("");

    const validateFirstName = (first_name: string): string => {
        if (first_name.length > 10) return "First Name cannot be more than 10 characters";
        if (/(?=.*\d)/.test(first_name)) return "First Name cannot contain number";
        if (/(?=.*[@$!%*?&])/.test(first_name)) return "First Name cannot contain special characters";
        return "";
    }

    const validateLastName = (last_name: string): string => {
        if (last_name.length > 10) return "Last Name cannot be more than 10 characters";
        if (/(?=.*\d)/.test(last_name)) return "Last Name cannot contain number";
        if (/(?=.*[@$!%*?&])/.test(last_name)) return "Last Name cannot contain special characters";
        return "";
    }

    const validatePassword = (password: string): string => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters long";
        if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
        if (!/(?=.*[@$!%*?&])/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
        return "";
    };

    const validateEmail = (email: string): string => {
        if (!email) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validateAddress = (address: string): string => {
        if (address.length > 20) return "Address cannot be more than 20 characters";
        if (/(?=.*\d)/.test(address)) return "Address cannot contain number";
        if (/(?=.*[@$!%*?&])/.test(address)) return "Address cannot contain special characters";
        return ""
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
        if (error) setError(null);

        if (name === 'first_name') {
            const firstNameValidationError = validateFirstName(value)
            setFirstNameError(firstNameValidationError)
        }
        if (error) setError(null);

        if (name === 'last_name') {
            const lastNameValidationError = validateLastName(value)
            setLastNameError(lastNameValidationError)
        }
        if (error) setError(null);

        if (name === 'email') {
            const emailValidationError = validateEmail(value)
            setEmailError(emailValidationError)
        }
        if (error) setError(null);

        if (name === 'address') {
            const addressValidationError = validateAddress(value)
            setAddressError(addressValidationError)
        }
        if (error) setError(null);

        if (name === 'password') {
            const passwordValidationError = validatePassword(value)
            setPasswordError(passwordValidationError)
        }
        if (error) setError(null);
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const response = await axios.post<RegisterResponse>(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/create_users/`,
                credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )

            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Registration Failed...");
                console.error("Registration Error", err.response?.data);
            } else {
                setError("An unexpected error occurred. Please try again")
                console.error("Registration Failed. Please try again", err);
            }

            // Clear error after 5 seconds
            setTimeout(() => {
                setError('');
            }, 5000);
        } finally {
            setLoading(false);
        }
    }

    // @ts-ignore
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

            {/* Register Card */}
            <div className="w-full max-w-2xl relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl mx-auto mb-6 flex items-center justify-center">
                        <UserCheck className="w-10 h-10 text-blue-300" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-gray-200 text-sm">Join our Accident Notification platform today</p>
                </div>

                {/* Register Form */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
                    <div className="space-y-6">
                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-3 text-sm text-green-200">
                                {success}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3 text-sm text-red-200">
                                {error}
                            </div>
                        )}

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium mb-2">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={credentials.first_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                {firstNameError && (
                                    <p className="text-red-300 text-xs mt-1">{firstNameError}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium mb-2">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={credentials.last_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                {lastNameError && (
                                    <p className="text-red-300 text-xs mt-1">{lastNameError}</p>
                                )}
                            </div>
                        </div>

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
                                    placeholder="Enter your email"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            {emailError && (
                                <p className="text-red-300 text-xs mt-1">{emailError}</p>
                            )}
                        </div>

                        {/* Phone and Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone_number" className="block text-sm font-medium mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="number"
                                        id="phone_number"
                                        name="phone_number"
                                        value={credentials.phone_number || ''}
                                        onChange={handleInputChange}
                                        placeholder="Enter phone number"
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium mb-2">
                                    Role
                                </label>
                                <div className="relative">
                                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <select
                                        id="role"
                                        name="role"
                                        value={credentials.role}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                        required
                                        disabled={loading}
                                    >
                                        <option value="" className="bg-gray-800">Select a role</option>
                                        <option value="admin" className="bg-gray-800">ADMIN</option>
                                        <option value="citizen" className="bg-gray-800">CITIZEN</option>
                                        <option value="police" className="bg-gray-800">POLICE</option>
                                        <option value="hospital" className="bg-gray-800">HOSPITAL</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium mb-2">
                                Address
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={credentials.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            {addressError && (
                                <p className="text-red-300 text-xs mt-1">{addressError}</p>
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
                                    placeholder="Enter your password"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="text-red-300 text-xs mt-1">{passwordError}</p>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start gap-3 text-sm">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 mt-0.5 text-blue-500 bg-white/10 border border-white/20 rounded focus:ring-blue-400/50 focus:ring-2"
                                disabled={loading}
                                required
                            />
                            <label htmlFor="terms" className="text-gray-200">
                                I agree to the{' '}
                                <a href="/terms" className="text-blue-300 hover:text-blue-200 transition-colors duration-200">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="/privacy" className="text-blue-300 hover:text-blue-200 transition-colors duration-200">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !credentials.first_name || !credentials.last_name || !credentials.email || !credentials.password || !credentials.role}
                            className="w-full bg-blue-500/70 backdrop-blur-sm hover:bg-blue-500/80 disabled:bg-gray-500/50 disabled:cursor-not-allowed border border-white/20 rounded-lg py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-gray-300 text-sm">
                        Already have an account?{' '}
                        <a
                            href="/auth/login"
                            target={'_blank'}
                            className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
                        >
                            Sign in here
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