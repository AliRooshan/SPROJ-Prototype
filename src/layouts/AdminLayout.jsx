import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen relative flex selection:bg-amber-500 selection:text-white overflow-hidden bg-[#0f1012] font-sans text-slate-100">
            {/* Global Background - Warmer & Lighter Dark Mode */}
            <div className="fixed inset-0 z-0">
                {/* Warm Noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>

                {/* Background Gradient - Zinc/Stone tones (Warmer) */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#131416] to-[#0f1012]"></div>

                {/* Ambient Warm Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>
            </div>

            <AdminSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0 relative z-10 h-screen overflow-hidden transition-all duration-300">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center p-4 border-b border-white/5 bg-[#18181b]/80 backdrop-blur-xl sticky top-0 z-40">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-3 font-bold text-lg text-zinc-100">Admin Panel</span>
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 pb-20 md:pb-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
