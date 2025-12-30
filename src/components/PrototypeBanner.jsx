import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PrototypeBanner = () => {
    return (
        <div className="bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-md text-amber-400 px-4 py-2.5 text-xs md:text-sm font-bold tracking-wide text-center flex items-center justify-center gap-2.5 relative z-50">
            <AlertTriangle size={16} className="text-amber-500 animate-pulse" />
            <span>
                <span className="uppercase text-amber-500 mr-1.5 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] tracking-wider">Prototype Mode</span>
                Data is simulated for demonstration purposes.
            </span>
        </div>
    );
};

export default PrototypeBanner;
