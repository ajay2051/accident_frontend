"use client"

import React, { useState } from 'react';
import {
    Shield,
    Phone,
    MapPin,
    Users,
    Clock,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Menu,
    X
} from 'lucide-react';

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const features = [
        {
            icon: <AlertTriangle className="w-8 h-8" />,
            title: "Instant Alert System",
            description: "Report accidents instantly with GPS location tracking for immediate response."
        },
        {
            icon: <Phone className="w-8 h-8" />,
            title: "Emergency Services",
            description: "Direct connection to police, ambulance, and fire services with one tap."
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Real-time Location",
            description: "Precise location sharing helps emergency responders reach you faster."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community Network",
            description: "Connect with local authorities and community members for better safety."
        }
    ];

    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "500+", label: "Accidents Reported" },
        { number: "2 min", label: "Average Response Time" },
        { number: "99.9%", label: "System Uptime" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white font-['Poppins',sans-serif]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-blue-600/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>

            {/* Navigation */}
            <nav className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Shield className="w-8 h-8 text-blue-300 mr-3" />
                            <span className="text-xl font-bold">Accident Notification</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-gray-200 hover:text-white transition-colors duration-200">Home</a>
                            <a href="#features" className="text-gray-200 hover:text-white transition-colors duration-200">Features</a>
                            <a href="#about" className="text-gray-200 hover:text-white transition-colors duration-200">About</a>
                            <a href="#contact" className="text-gray-200 hover:text-white transition-colors duration-200">Contact</a>
                            <button className="bg-blue-500/70 hover:bg-blue-500/80 px-4 py-2 rounded-lg transition-colors duration-200">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white p-2"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
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

            {/* Hero Section */}
            <section id="home" className="relative z-10 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Emergency Response
                            <span className="block text-blue-300">Made Simple</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Report accidents instantly, connect with emergency services, and help create safer communities with our comprehensive notification system.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-blue-500/70 hover:bg-blue-500/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                                Start Reporting
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="bg-white/10 hover:bg-white/15 border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative z-10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-200 text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            Built with cutting-edge technology to ensure rapid response and seamless communication during emergencies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105"
                            >
                                <div className="text-blue-300 mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative z-10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            Three simple steps to report an accident and get help
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Report Incident",
                                description: "Quickly report the accident with location details and severity level"
                            },
                            {
                                step: "02",
                                title: "Automatic Dispatch",
                                description: "System automatically notifies relevant emergency services and authorities"
                            },
                            {
                                step: "03",
                                title: "Real-time Updates",
                                description: "Receive updates on response time and track help arrival"
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                                    <span className="text-2xl font-bold text-blue-300">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-gray-200 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who are helping create safer communities. Start reporting accidents and saving lives today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-blue-500/70 hover:bg-blue-500/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                                Get Started Now
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="bg-white/10 hover:bg-white/15 border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-white/20 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center mb-4">
                                <Shield className="w-8 h-8 text-blue-300 mr-3" />
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