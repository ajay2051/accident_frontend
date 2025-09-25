"use client"

import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

interface LogoutResponse {
    message?: string;
}

const logOut = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(
                error.response.data?.message || "Logout failed. Please try again."
            );
        } else if (error.request) {
            throw new Error("No response from server. Please try again.");
        } else {
            throw new Error("Network error occurred. Please try again.");
        }
    }
};


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    const logoutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: (data: LogoutResponse) => {
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_info");

            // Redirect to login page
            router.push("/auth/login");
        },
        onError: (error: Error) => {
            console.error("Logout Error", error.message || error);
            // Even if API call fails, clear localStorage and redirect
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_info");
            router.push("/auth/login");
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className="min-h-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-blue-600/10"></div>
            <div className="absolute inset-0 opacity-50 pointer-events-none"></div>

            <nav className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Shield className="w-8 h-8 text-blue-300 mr-3" />
                            <span className="text-xl font-bold">Accident Notification</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-gray-200 hover:text-white transition-colors duration-200">Home</a>
                            <a href="#features" className="text-gray-200 hover:text-white transition-colors duration-200">Features</a>
                            <a href="#about" className="text-gray-200 hover:text-white transition-colors duration-200">About</a>
                            <a href="#contact" className="text-gray-200 hover:text-white transition-colors duration-200">Contact</a>
                            <button
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                                className="bg-blue-500/70 hover:bg-blue-500/80 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                {logoutMutation.isPending ? "Logging out..." : "Logout"}
                            </button>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white p-2"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <a href="#home" className="block px-3 py-2 text-gray-200 hover:text-white">Home</a>
                                <a href="#features" className="block px-3 py-2 text-gray-200 hover:text-white">Features</a>
                                <a href="#about" className="block px-3 py-2 text-gray-200 hover:text-white">About</a>
                                <a href="#contact" className="block px-3 py-2 text-gray-200 hover:text-white">Contact</a>
                                <button
                                    onClick={handleLogout}
                                    disabled={logoutMutation.isPending}
                                    className="w-full mt-2 bg-blue-500/70 hover:bg-blue-500/80 px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}