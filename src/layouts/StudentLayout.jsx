import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';

const StudentLayout = () => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-500/30 relative overflow-x-hidden">
            {/* Global Fixed Background Pattern to reduce "whiteness" */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-indigo-50/50 blur-[120px] rounded-full mix-blend-multiply opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50/50 blur-[100px] rounded-full mix-blend-multiply opacity-70"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
            
            <ChatWidget />
        </div>
    );
};

export default StudentLayout;