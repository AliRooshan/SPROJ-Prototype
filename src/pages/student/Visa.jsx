import React, { useState, useEffect } from 'react';
import { Plane, FileText, CheckCircle, Calendar, Globe, ArrowRight, Shield, Download, AlertCircle, Landmark, GraduationCap, Stethoscope, Banknote, Square, CheckSquare } from 'lucide-react';

const VisaGuidance = () => {
    const [selectedCountry, setSelectedCountry] = useState('UK');
    const [checkedItems, setCheckedItems] = useState({});

    const countries = ['UK', 'USA', 'Canada', 'Australia', 'Germany'];

    const countryData = {
        'UK': {
            steps: [
                { id: 1, title: 'Acceptance & CAS', description: 'Receive unconditional offer and CAS number from university.', duration: '2-4 weeks', icon: <GraduationCap size={24} />, color: 'from-blue-600 to-indigo-600' },
                { id: 2, title: 'Prepare Finances', description: 'Show tuition + living costs held for 28 consecutive days.', duration: '1 month', icon: <Banknote size={24} />, color: 'from-indigo-600 to-violet-600' },
                { id: 3, title: 'Health Surcharge', description: 'Pay Immigration Health Surcharge (IHS) for healthcare access.', duration: 'Online', icon: <Stethoscope size={24} />, color: 'from-violet-600 to-purple-600' },
                { id: 4, title: 'Biometrics', description: 'Book appointment for fingerprints and photo.', duration: '1 day', icon: <Shield size={24} />, color: 'from-purple-600 to-fuchsia-600' },
                { id: 5, title: 'Receive Decision', description: 'Wait for passport return with vignette sticker.', duration: '3 weeks', icon: <Plane size={24} />, color: 'from-fuchsia-600 to-pink-600' },
            ],
            documents: ['Valid Passport', 'CAS Statement', 'Bank Statements (28 days)', 'TB Test Certificate', 'Academic Transcripts', 'ATAS Certificate (if applicable)']
        },
        'USA': {
            steps: [
                { id: 1, title: 'I-20 Form', description: 'Receive Form I-20 from your university after acceptance.', duration: '2-3 weeks', icon: <FileText size={24} />, color: 'from-blue-600 to-indigo-600' },
                { id: 2, title: 'SEVIS Fee', description: 'Pay the I-901 SEVIS fee online before visa interview.', duration: 'Online', icon: <Banknote size={24} />, color: 'from-indigo-600 to-violet-600' },
                { id: 3, title: 'DS-160 Form', description: 'Complete the Online Nonimmigrant Visa Application.', duration: '2-3 hours', icon: <Globe size={24} />, color: 'from-violet-600 to-purple-600' },
                { id: 4, title: 'Visa Interview', description: 'Attend mandatory interview at US Embassy/Consulate.', duration: '1 day', icon: <Landmark size={24} />, color: 'from-purple-600 to-fuchsia-600' },
                { id: 5, title: 'Passport Return', description: 'Collect passport with F-1 visa stamp.', duration: '3-5 days', icon: <Plane size={24} />, color: 'from-fuchsia-600 to-pink-600' },
            ],
            documents: ['Valid Passport', 'Form I-20', 'DS-160 Confirmation', 'SEVIS Fee Receipt', 'Financial Support Proof', 'Academic Transcripts']
        },
        'Canada': {
            steps: [
                { id: 1, title: 'Acceptance Letter', description: 'Receive Letter of Acceptance from DLI (Designated Learning Institution).', duration: 'VARIES', icon: <GraduationCap size={24} />, color: 'from-blue-600 to-indigo-600' },
                { id: 2, title: 'Medical Exam', description: 'Complete medical exam with panel physician (if required).', duration: '1 day', icon: <Stethoscope size={24} />, color: 'from-indigo-600 to-violet-600' },
                { id: 3, title: 'Apply Online', description: 'Submit Study Permit application via IRCC portal.', duration: 'Online', icon: <Globe size={24} />, color: 'from-violet-600 to-purple-600' },
                { id: 4, title: 'Biometrics', description: 'Give fingerprints and photo at VAC.', duration: '1 day', icon: <Shield size={24} />, color: 'from-purple-600 to-fuchsia-600' },
                { id: 5, title: 'Passport Request', description: 'Submit passport for stamping upon approval.', duration: '2-3 weeks', icon: <Plane size={24} />, color: 'from-fuchsia-600 to-pink-600' },
            ],
            documents: ['Valid Passport', 'Letter of Acceptance', 'Proof of Funds (GIC helpful)', 'Medical Exam Proof', 'Digital Photo', 'Study Plan Statement']
        },
        'Australia': {
            steps: [
                { id: 1, title: 'CoE Issue', description: 'Receive Confirmation of Enrolment (CoE) from university.', duration: '1-2 weeks', icon: <FileText size={24} />, color: 'from-blue-600 to-indigo-600' },
                { id: 2, title: 'OSHC Insurance', description: 'Purchase Overseas Student Health Cover for full duration.', duration: 'Online', icon: <Stethoscope size={24} />, color: 'from-indigo-600 to-violet-600' },
                { id: 3, title: 'ImmiAccount', description: 'Create account and lodge Subclass 500 visa application.', duration: 'Online', icon: <Globe size={24} />, color: 'from-violet-600 to-purple-600' },
                { id: 4, title: 'Biometrics/Medical', description: 'Complete health checks and biometrics if requested.', duration: '2 weeks', icon: <Shield size={24} />, color: 'from-purple-600 to-fuchsia-600' },
                { id: 5, title: 'Visa Grant', description: 'Receive digital visa grant notification (e-visa).', duration: '1-4 weeks', icon: <Plane size={24} />, color: 'from-fuchsia-600 to-pink-600' },
            ],
            documents: ['Valid Passport', 'CoE Code', 'OSHC Certificate', 'GTE Statement', 'English Test Results', 'Financial Capacity Proof']
        },
        'Germany': {
            steps: [
                { id: 1, title: 'Admission Letter', description: 'Receive admission letter from German university.', duration: 'VARIES', icon: <GraduationCap size={24} />, color: 'from-blue-600 to-indigo-600' },
                { id: 2, title: 'Blocked Account', description: 'Open "Sperrkonto" and deposit required living funds.', duration: '1 week', icon: <Banknote size={24} />, color: 'from-indigo-600 to-violet-600' },
                { id: 3, title: 'Health Insurance', description: 'Get student health insurance valid in Germany.', duration: 'Online', icon: <Stethoscope size={24} />, color: 'from-violet-600 to-purple-600' },
                { id: 4, title: 'Embassy Appointment', description: 'Book and attend interview at German mission.', duration: '1 day', icon: <Landmark size={24} />, color: 'from-purple-600 to-fuchsia-600' },
                { id: 5, title: 'Visa Stamping', description: 'Passport returned with national student visa.', duration: '4 weeks', icon: <Plane size={24} />, color: 'from-fuchsia-600 to-pink-600' },
            ],
            documents: ['Valid Passport', 'Admission Letter', 'Blocked Account Confirmation', 'Health Insurance Proof', 'Biometric Photos', 'Motivation Letter']
        }
    };

    const currentData = countryData[selectedCountry];

    const toggleItem = (doc) => {
        const key = `${selectedCountry}-${doc}`;
        setCheckedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Reset checklist when country changes? No, let's keep state unique per country

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl group min-h-[300px] flex items-end">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
                        alt="Visa Process"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-slate-900/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 p-10 md:p-14 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-black uppercase tracking-widest shadow-lg mb-4">
                                <Plane size={12} className="text-blue-300" />
                                Travel Ready
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-4 drop-shadow-xl">
                                Visa <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Guidance</span>
                            </h1>
                            <p className="text-blue-100/90 text-lg font-medium max-w-xl leading-relaxed">
                                Step-by-step roadmap to securing your student visa for <span className="text-white border-b border-blue-400">{selectedCountry}</span>.
                            </p>
                        </div>

                        {/* Country Selector */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex gap-1 overflow-x-auto max-w-full">
                            {countries.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setSelectedCountry(c)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCountry === c
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-blue-100 hover:bg-white/10'
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">

                {/* Timeline Steps - Colorful Cards */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-3 mb-2 px-2">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                            <Calendar size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Application Timeline</h2>
                    </div>

                    <div className="space-y-4">
                        {currentData.steps.map((step, index) => (
                            <div key={step.id} className={`relative overflow-hidden rounded-[2rem] p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl group bg-gradient-to-br ${step.color} text-white`}>
                                {/* Texture */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                <div className="absolute top-0 right-0 p-20 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-inner">
                                        {step.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold mb-1 text-white">{step.title}</h3>
                                            <span className="text-xs font-black bg-white/20 px-2 py-1 rounded-lg backdrop-blur-md uppercase tracking-wider">{step.duration}</span>
                                        </div>
                                        <p className="text-blue-50/90 font-medium leading-relaxed max-w-lg">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar - Interactive Checklist */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2 px-2">
                        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                            <FileText size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Required Documents</h2>
                    </div>

                    <div className="bg-white glass-card p-6 rounded-[2.5rem] shadow-xl border border-slate-100">
                        <div className="mb-4 pb-4 border-b border-slate-100">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Checklist for {selectedCountry}</h3>
                        </div>
                        <div className="space-y-3">
                            {currentData.documents.map((doc, i) => {
                                const isChecked = checkedItems[`${selectedCountry}-${doc}`];
                                return (
                                    <div
                                        key={i}
                                        onClick={() => toggleItem(doc)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl transition-all group cursor-pointer border ${isChecked ? 'bg-indigo-50 border-indigo-100' : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'}`}
                                    >
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-300 group-hover:bg-slate-200'}`}>
                                            {isChecked ? <CheckCircle size={14} className="stroke-[3]" /> : <Square size={14} className="stroke-[3]" />}
                                        </div>
                                        <span className={`font-bold transition-colors ${isChecked ? 'text-indigo-800 line-through decoration-2 decoration-indigo-300' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                            {doc}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3 text-amber-800 text-sm mb-4">
                                <AlertCircle size={20} className="shrink-0" />
                                <p className="font-medium leading-tight">Requirements change frequently. Always verify.</p>
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2 group">
                                <Download size={18} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaGuidance;
