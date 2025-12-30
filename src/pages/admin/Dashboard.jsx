import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, TrendingUp, DollarSign, Calendar, ArrowUpRight, Activity, Bell } from 'lucide-react';

const AdminDashboard = () => {
    // Mock Data
    const stats = [
        { label: 'Total Students', value: '2,543', change: '+12.5%', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Programs Active', value: '856', change: '+3.2%', icon: BookOpen, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Scholarships', value: '42', change: 'New', icon: GraduationCap, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'System Load', value: '98%', change: 'Stable', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    ];

    const navigate = useNavigate();

    const quickActions = [
        { label: 'Add New Program', icon: BookOpen, path: '/admin/programs?action=add' },
        { label: 'Post Scholarship', icon: GraduationCap, path: '/admin/scholarships?action=add' },
        { label: 'Update Exchange Rates', icon: DollarSign, path: '/admin/costs' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
                    <p className="text-zinc-400 font-medium">Overview of your platform's performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-amber-500 rounded-full border border-zinc-800"></span>
                    </button>
                    <div className="px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center gap-2 text-sm font-bold text-zinc-300">
                        <Calendar size={16} />
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid - High Contrast & Warm */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#18181b] p-6 rounded-[1.5rem] border border-zinc-800 shadow-sm hover:border-zinc-700 hover:shadow-lg transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px] font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                {stat.change}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
                            <p className="text-sm font-semibold text-zinc-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area - e.g. Chart Placeholder */}
                <div className="lg:col-span-2 bg-[#18181b] rounded-[2rem] border border-zinc-800 p-8 shadow-sm h-[400px] flex flex-col relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp size={20} className="text-amber-500" />
                            Engagement Overview
                        </h3>
                        <select className="bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-300 rounded-lg px-3 py-1.5 outline-none hover:border-zinc-600 cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    {/* Placeholder Chart Lines */}
                    <div className="flex-1 flex items-end gap-2 px-2 pb-2 relative z-10 opacity-80">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-zinc-800 to-amber-500/80 rounded-t-lg hover:to-amber-400 transition-all duration-500 group-hover:scale-y-105 origin-bottom" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>

                    {/* Background Glow */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                </div>

                {/* Quick Actions & Recent */}
                <div className="space-y-6">
                    <div className="bg-[#18181b] rounded-[2rem] border border-zinc-800 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <div className="space-y-3">
                                {quickActions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => navigate(action.path)}
                                        className="w-full p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 transition-all group flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-colors">
                                                <action.icon size={18} />
                                            </div>
                                            <span className="font-bold text-zinc-300 group-hover:text-white text-sm">{action.label}</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:border-amber-500/50 group-hover:text-amber-500 text-xs font-bold bg-zinc-800">
                                            +
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
