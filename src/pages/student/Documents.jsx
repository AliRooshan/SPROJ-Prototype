import React from 'react';
import DocumentChecklist from '../../components/DocumentChecklist';
import { FileText } from 'lucide-react';

const Documents = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Header */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white shadow-xl">
                <div className="absolute top-0 right-0 p-20 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                        <FileText size={32} className="text-blue-200" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">My Documents</h1>
                        <p className="text-blue-200/80 font-medium">Manage and track your required application documents.</p>
                    </div>
                </div>
            </div>

            <DocumentChecklist compact={false} />
        </div>
    );
};

export default Documents;
