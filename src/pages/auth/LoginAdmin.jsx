import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, LayoutDashboard } from 'lucide-react';

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ adminId: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, validate credentials here.
        // For prototype, any input works or you can enforce 'admin' / 'admin123'
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                    alt="Office Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-slate-900/80 to-black/80"></div>

                {/* Animated decorative blobs */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">

                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 bg-indigo-500/20 rounded-2xl mb-6 ring-1 ring-indigo-500/40 shadow-lg shadow-indigo-900/50">
                            <Shield size={32} className="text-indigo-400" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Admin Portal</h1>
                        <p className="text-slate-400 font-medium text-sm tracking-wide uppercase">Restricted Access Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Admin ID</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="adminId"
                                    value={credentials.adminId}
                                    onChange={handleChange}
                                    placeholder="admin@edvoyage.com"
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-8 group"
                        >
                            <span>Access Dashboard</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-xs">
                            Authorized personnel only. <br /> Access attempts are logged.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
