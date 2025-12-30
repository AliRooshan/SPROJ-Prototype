import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, Filter, MoreHorizontal, BookOpen, MapPin, X } from 'lucide-react';
import universitiesData from '../../data/universities.json';

const ManagePrograms = () => {
    // attributes in universities.json: id, university, program, country, deadline, tuition, currency, image, logo
    const allPrograms = universitiesData.map(item => ({
        id: item.id,
        name: item.program,
        universityName: item.university,
        location: item.country,
        uniImage: item.logo || item.image, // Use logo if available, else campus image
        fees: `${item.currency}${item.tuition.toLocaleString()}`,
        duration: '2 Years' // Default/Placeholder as it's not in the JSON
    }));



    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localPrograms, setLocalPrograms] = useState(allPrograms);

    // Check for URL action
    useEffect(() => {
        if (searchParams.get('action') === 'add') {
            setIsModalOpen(true);
        }
    }, [searchParams]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearchParams({}); // Clear query params
    };

    const handleAddProgram = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newProgram = {
            id: Math.random(), // Temporary ID
            name: formData.get('programName'),
            universityName: formData.get('university'),
            location: formData.get('country'),
            uniImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f', // Placeholder
            fees: `$${formData.get('tuition')}`,
            duration: '2 Years'
        };

        setLocalPrograms([newProgram, ...localPrograms]);
        handleCloseModal();
    };

    const filteredPrograms = localPrograms.filter(prog =>
        prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.universityName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Programs</h1>
                    <p className="text-zinc-400 font-medium">Manage university programs and details.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Plus size={18} />
                    <span>Add Program</span>
                </button>
            </div>

            {/* Filters Section */}
            <div className="bg-[#18181b] p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search programs, universities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-300 font-bold hover:bg-zinc-800 flex items-center gap-2">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Content List as Cards */}
            <div className="grid grid-cols-1 gap-4">
                {filteredPrograms.map((prog, idx) => (
                    <div key={idx} className="group bg-[#18181b] p-6 rounded-2xl border border-zinc-800 hover:border-amber-500/30 hover:bg-zinc-800/80 transition-all shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-start gap-5">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{prog.name}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400 font-medium">
                                    <span className="flex items-center gap-1.5 ">
                                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                                        {prog.universityName}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={14} /> {prog.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-800 pt-4 md:pt-0">
                            <div className="text-right">
                                <span className="block text-white font-bold text-lg">{prog.fees}</span>
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{prog.duration}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredPrograms.length === 0 && (
                    <div className="p-12 text-center text-zinc-500">
                        No programs found matching your search.
                    </div>
                )}
            </div>

            {/* Add Program Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#18181b] w-full max-w-lg rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                            <h2 className="text-xl font-black text-white">Add New Program</h2>
                            <button onClick={handleCloseModal} className="text-zinc-500 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddProgram} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-1.5">Program Name</label>
                                <input name="programName" required type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g. MSc Computer Science" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-1.5">University</label>
                                <input name="university" required type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g. Stanford University" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-400 mb-1.5">Country</label>
                                    <input name="country" required type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="e.g. USA" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-400 mb-1.5">Tuition (USD)</label>
                                    <input name="tuition" required type="number" className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-amber-500 transition-colors" placeholder="50000" />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-bold hover:bg-zinc-700 transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors">Create Program</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePrograms;
