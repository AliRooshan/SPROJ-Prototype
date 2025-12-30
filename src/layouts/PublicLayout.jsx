import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

const PublicLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header - Enhanced */}
            <header className="border-b border-indigo-100 sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all group-hover:scale-110 shadow-md">
                            <Compass className="text-white" size={24} strokeWidth={2.5} />
                        </div>
                        <span className="font-display font-black text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">EdVoyage</span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/explore" className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">Explore Programs</Link>
                        <Link to="/login/student" className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all shadow-md hover:shadow-lg">Student Login</Link>
                        <Link to="/login/admin" className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">Admin Portal</Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-indigo-100 shadow-2xl animate-in slide-in-from-top-5 duration-200">
                        <div className="pt-4 pb-6 px-4 space-y-3">
                            <Link
                                to="/explore"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                            >
                                Explore Programs
                            </Link>
                            <Link
                                to="/login/student"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                            >
                                Student Login
                            </Link>
                            <Link
                                to="/login/admin"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                            >
                                Admin Portal
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
