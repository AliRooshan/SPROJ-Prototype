import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowRight, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import AuthService from '../../services/AuthService';

const LoginStudent = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 800));

            if (isLogin) {
                AuthService.login(formData.email, formData.password);
                navigate('/student/dashboard');
            } else {
                AuthService.register(formData);
                navigate('/student/profile-setup'); // Go to setup after signup
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-midnight">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow animate-bounce-slow">
                        <Compass className="text-white" size={36} />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-4xl font-black text-white tracking-tight text-glow">
                    {isLogin ? 'Welcome back' : 'Start your journey'}
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400 font-medium">
                    {isLogin ? 'Sign in to access your dashboard' : 'Create your student account'}
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="glass-card py-10 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/10 backdrop-blur-xl transition-all duration-300">

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm font-bold animate-in slide-in-from-top-2">
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="animate-in slide-in-from-top-4 fade-in duration-300">
                                <label htmlFor="fullName" className="block text-sm font-bold text-slate-300">
                                    Full Name
                                </label>
                                <div className="mt-2 relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required={!isLogin}
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="block w-full pl-10 sm:text-sm bg-midnight-paper border border-white/10 rounded-xl py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-slate-300">
                                Email address
                            </label>
                            <div className="mt-2 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 sm:text-sm bg-midnight-paper border border-white/10 rounded-xl py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="you@university.edu"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-slate-300">
                                Password
                            </label>
                            <div className="mt-2 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 sm:text-sm bg-midnight-paper border border-white/10 rounded-xl py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary focus:ring-primary border-white/20 bg-midnight-paper rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-bold text-primary hover:text-primary-light transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-glow text-sm font-bold text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? 'Processing...' : (isLogin ? 'Sign in' : 'Create Account')}
                                {!isLoading && <ArrowRight className="ml-2 -mr-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-midnight text-slate-500 font-medium">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary hover:text-primary-light font-bold transition-colors"
                            >
                                {isLogin ? 'Sign up for free' : 'Sign in to existing account'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginStudent;
