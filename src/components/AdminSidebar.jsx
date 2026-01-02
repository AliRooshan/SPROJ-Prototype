import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, DollarSign, Settings, LogOut, ShieldCheck } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        navigate('/');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/programs', icon: BookOpen, label: 'Programs' },
        { path: '/admin/scholarships', icon: GraduationCap, label: 'Scholarships' },
        { path: '/admin/costs', icon: DollarSign, label: 'Costs' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-[#18181b]/80 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-all duration-300">
            {/* Logo Area */}
            <div className="p-6 md:px-8 md:py-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20 shrink-0">
                    <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <div className="hidden md:block">
                    <h1 className="text-lg font-black text-zinc-100 tracking-tight leading-none">Admin<span className="text-amber-500">.</span></h1>
                    <p className="text--[10px] text-zinc-500 font-bold tracking-widest uppercase mt-1">Control Panel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 md:px-6 py-4 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 md:px-4 py-3.5 rounded-xl transition-all duration-200 group relative
                            ${isActive
                                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/50'
                                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={20} className={`shrink-0 transition-colors ${isActive ? 'text-amber-500' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                                <span className="hidden md:block font-bold text-sm tracking-wide">{item.label}</span>

                                {/* Active Indicator */}
                                {isActive && (
                                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-amber-500 hidden md:block shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout Area */}
            <div className="p-3 md:p-6 border-t border-white/5 bg-zinc-900/30">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all group font-bold text-sm"
                >
                    <LogOut size={20} className="shrink-0" />
                    <span className="hidden md:block">Sign Out</span>
                </button>
            </div>

            <ConfirmDialog
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={confirmLogout}
                title="Sign Out"
                message="Are you sure you want to sign out from the admin panel?"
                confirmText="Sign Out"
                cancelText="Cancel"
            />
        </aside>
    );
};

export default AdminSidebar;
