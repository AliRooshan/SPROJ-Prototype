import React from 'react';
import { DollarSign, RefreshCw, Save, MapPin } from 'lucide-react';
import costsData from '../../data/costs.json';

const ManageCosts = () => {
    // Use real data from JSON
    const cities = costsData;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Cost Configuration</h1>
                    <p className="text-zinc-400 font-medium">Update base estimates for the Cost Estimator tool.</p>
                </div>
                <button
                    onClick={() => alert('Exchange rates synced successfully!')}
                    className="flex items-center gap-2 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl border border-zinc-700 shadow-sm transition-all active:scale-95"
                >
                    <RefreshCw size={18} />
                    <span>Sync Exchange Rates</span>
                </button>
            </div>

            <div className="bg-[#18181b] rounded-[2rem] border border-zinc-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-900/50 border-b border-zinc-800">
                                <th className="p-6 text-sm font-bold text-zinc-500 uppercase tracking-wider">City</th>
                                <th className="p-6 text-sm font-bold text-zinc-500 uppercase tracking-wider">Base Rent</th>
                                <th className="p-6 text-sm font-bold text-zinc-500 uppercase tracking-wider">Food Est.</th>
                                <th className="p-6 text-sm font-bold text-zinc-500 uppercase tracking-wider">Transport</th>
                                <th className="p-6 text-sm font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {cities.map((city, idx) => (
                                <tr key={idx} className="group hover:bg-zinc-800/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-zinc-800 rounded-lg text-amber-500 group-hover:text-amber-400">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <span className="block font-bold text-white text-lg">{city.city}</span>
                                                <span className="text-xs font-bold text-zinc-500 uppercase">{city.country}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 w-32 focus-within:border-amber-500 transition-colors">
                                            <span className="text-zinc-500 text-xs font-bold">{city.currency}</span>
                                            <input type="number" defaultValue={city.rent} className="bg-transparent text-white font-mono w-full outline-none" />
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 w-32 focus-within:border-amber-500 transition-colors">
                                            <span className="text-zinc-500 text-xs font-bold">{city.currency}</span>
                                            <input type="number" defaultValue={city.food} className="bg-transparent text-white font-mono w-full outline-none" />
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 w-32 focus-within:border-amber-500 transition-colors">
                                            <span className="text-zinc-500 text-xs font-bold">{city.currency}</span>
                                            <input type="number" defaultValue={city.transport} className="bg-transparent text-white font-mono w-full outline-none" />
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => alert(`Saved costs for ${city.city}!`)}
                                            className="p-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors shadow-lg shadow-amber-900/20 active:scale-95"
                                        >
                                            <Save size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCosts;
