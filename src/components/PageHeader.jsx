import React from 'react';

const PageHeader = ({ title, subtitle, icon: Icon, actions }) => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-3xl rounded-2xl border border-white/40 shadow-xl shadow-purple-500/20 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
            
            {/* Mirror/Glossy light reflections */}
            {/* Top highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/5 to-transparent h-[45%] pointer-events-none"></div>
            
            {/* Diagonal glass cut */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 via-transparent to-transparent pointer-events-none transform translate-x-1/3 -skew-x-12"></div>

            {/* Ambient glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-400/40 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-300/50 transition-all duration-700"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/40 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-300/50 transition-all duration-700"></div>

            <div className="relative z-10 flex items-center gap-5 w-full">
                {Icon && (
                    <div className="p-3.5 bg-white/20 backdrop-blur-xl border border-white/50 text-white rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] shrink-0 group-hover:scale-105 transition-transform">
                        <Icon size={26} strokeWidth={2.5} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                    </div>
                )}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-purple-100 tracking-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-white/95 font-bold mt-0.5 line-clamp-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {actions && (
                <div className="relative z-10 flex items-center gap-3 shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
