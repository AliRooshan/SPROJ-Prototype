import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, BookOpen, CreditCard, Plane, User, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear pseudo-session
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
        <nav className="fixed top-0 w-full z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/student/dashboard" className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all group-hover:scale-110 shadow-md">
                                <Compass className="text-white" size={24} strokeWidth={2.5} />
                            </div>
                            <span className="font-display font-black text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">EdVoyage</span>
                        </Link>
                        <div className="hidden sm:ml-12 sm:flex sm:space-x-8">
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
                    <div className="flex items-center gap-6">
                        <Link to="/student/profile" aria-label="Student Profile" className="text-slate-600 hover:text-slate-900 transition-colors p-2 hover:bg-indigo-50 rounded-full">
                            <User size={20} />
                        </Link>
                        <button onClick={handleLogout} aria-label="Logout" className="text-slate-600 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
