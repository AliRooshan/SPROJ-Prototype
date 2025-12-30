import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Compass } from 'lucide-react';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header - Enhanced */}
            <header className="border-b border-indigo-100 sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all group-hover:scale-110 shadow-md">
                            <Compass className="text-white" size={24} strokeWidth={2.5} />
                        </div>
                        <span className="font-display font-black text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">EdVoyage</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/explore" className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">Explore Programs</Link>
                        <Link to="/login/student" className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all shadow-md hover:shadow-lg">Student Login</Link>
                        <Link to="/login/admin" className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">Admin Portal</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
