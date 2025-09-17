"use client"

import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                            <button className="bg-blue-500/70 hover:bg-blue-500/80 px-4 py-2 rounded-lg transition-colors duration-200">
                                Logout
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
                                <button className="w-full mt-2 bg-blue-500/70 hover:bg-blue-500/80 px-4 py-2 rounded-lg transition-colors duration-200">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}