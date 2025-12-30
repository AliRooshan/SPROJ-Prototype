import React from 'react';
import { Users, GraduationCap, Award, TrendingUp, DollarSign, Calendar, ArrowUpRight, Activity } from 'lucide-react';

const AdminDashboard = () => {
    // Mock Data
    const stats = [
        { label: 'Total Students', value: '2,543', change: '+12%', icon: Users, color: 'from-blue-500 to-indigo-600' },
        { label: 'Applications', value: '856', change: '+5%', icon: GraduationCap, color: 'from-violet-500 to-purple-600' },
        { label: 'Scholarships', value: '42', change: '+2', icon: Award, color: 'from-fuchsia-500 to-pink-600' },
        { label: 'Active Sessions', value: '128', change: '+18%', icon: Activity, color: 'from-emerald-400 to-teal-600' },
    ];

    const quickActions = [
        { label: 'Add Program', icon: GraduationCap, color: 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white' },
        { label: 'Post Scholarship', icon: Award, color: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500 hover:text-white' },
        { label: 'Update Costs', icon: DollarSign, color: 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white' },
        { label: 'View Reports', icon: TrendingUp, color: 'bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-white' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-900/40 border border-white/10 shadow-2xl p-10 md:p-14">
                {/* Abstract BG */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-indigo-900/80 to-transparent"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white">Admin</span>
                        </h1>
                        <p className="text-slate-300 text-lg font-medium max-w-xl">
                            Here's what's happening across the platform today.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Calendar size={18} className="text-indigo-300" />
                        <span className="text-slate-300 font-bold text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-[2rem] bg-slate-800/50 hover:bg-slate-800 transition-all border border-white/5 hover:border-white/10 p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                        <div className={`absolute top-0 right-0 p-16 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:opacity-20 transition-opacity`}></div>

                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-indigo-900/20`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                {stat.change} <TrendingUp size={12} />
                            </span>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-slate-400 font-medium text-sm">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Area Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {quickActions.map((action, idx) => (
                            <button key={idx} className={`p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 transition-all duration-300 group ${action.color}`}>
                                <action.icon size={28} className="group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm text-center">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity / Table Placeholder */}
                <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center min-h-[300px]">
                    <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 animate-pulse">
                        <Activity size={32} className="text-slate-600" />
                    </div>
                    <h3 className="text-slate-300 font-bold text-lg">System Status</h3>
                    <p className="text-slate-500 max-w-sm mt-2">All systems are running smoothly. Real-time updates and logs will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
