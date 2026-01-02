import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, BookOpen, CreditCard, Plane, User, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Explore', path: '/student/explore', icon: <Compass size={18} /> },
        { name: 'Scholarships', path: '/student/scholarships', icon: <BookOpen size={18} /> },
        { name: 'Tracker', path: '/student/tracker', icon: <BookOpen size={18} /> },
        { name: 'Cost Est.', path: '/student/cost', icon: <CreditCard size={18} /> },
        { name: 'Visa', path: '/student/visa', icon: <Plane size={18} /> },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/student/dashboard" className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all group-hover:scale-110 shadow-md">
                                <Compass className="text-white" size={24} strokeWidth={2.5} />
                            </div>
                            <span className="font-display font-black text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">EdVoyage</span>
                        </Link>
                        {/* Desktop Nav */}
                        <div className="hidden lg:ml-12 lg:flex lg:space-x-8">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `inline-flex items-center px-1 pt-1 text-sm font-bold transition-all duration-200 gap-2 border-b-2 ${isActive
                                            ? 'border-primary text-slate-900'
                                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                                        }`
                                    }
                                >
                                    {item.icon}
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-6">
                            <Link to="/student/profile" aria-label="Student Profile" className="text-slate-600 hover:text-slate-900 transition-colors p-2 hover:bg-indigo-50 rounded-full">
                                <User size={20} />
                            </Link>
                            <button onClick={handleLogout} aria-label="Logout" className="text-slate-600 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full">
                                <LogOut size={20} />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center lg:hidden">
                            <Link to="/student/profile" aria-label="Student Profile" className="text-slate-600 hover:text-slate-900 transition-colors p-2 hover:bg-indigo-50 rounded-full mr-2">
                                <User size={20} />
                            </Link>
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
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-indigo-100 shadow-2xl animate-in slide-in-from-top-5 duration-200">
                    <div className="pt-2 pb-4 space-y-1 px-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 gap-3 ${isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`
                                }
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        ))}
                        <div className="border-t border-slate-100 my-2 pt-2">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all gap-3"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={confirmLogout}
                title="Sign Out"
                message="Are you sure you want to sign out? You'll need to log in again to access your account."
                confirmText="Sign Out"
                cancelText="Cancel"
            />
        </nav>
    );
};

export default Navbar;
