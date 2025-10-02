"use client"

import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
    return (
        <div className="min-h-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-blue-600/10"></div>
            <div className="absolute inset-0 opacity-50 pointer-events-none"></div>

            <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-white/20 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center mb-4">
                                <img
                                    src="/acc_logo.png"
                                    alt="Accident Logo"
                                    className="w-8 h-8 mr-3"
                                />
                                <span className="text-xl font-bold">Accident Notification</span>
                            </div>
                            <p className="text-gray-300 max-w-md">
                                Making emergency response faster and more efficient through innovative technology and community collaboration.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/20 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Accident Notification. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}