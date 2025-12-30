import React from 'react';
import { User, Bell, Shield, Key, Save } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
                <p className="text-zinc-400 font-medium">Manage your admin profile and system preferences.</p>
            </div>

            <div className="bg-[#18181b] rounded-[2rem] border border-zinc-800 overflow-hidden">
                {/* Tabs / Header */}
                <div className="p-2 border-b border-zinc-800 bg-zinc-900/50 flex gap-1 overflow-x-auto">
                    <button className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-bold text-sm shadow-sm">Profile</button>
                    <button className="px-6 py-3 rounded-xl hover:bg-zinc-800/50 text-zinc-400 hover:text-white font-bold text-sm transition-colors">Security</button>
                    <button className="px-6 py-3 rounded-xl hover:bg-zinc-800/50 text-zinc-400 hover:text-white font-bold text-sm transition-colors">Notifications</button>
                </div>

                <div className="p-8 md:p-10 space-y-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6 pb-8 border-b border-zinc-800">
                        <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-amber-500/50 p-1">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                                alt="Admin"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Admin User</h3>
                            <p className="text-zinc-500 text-sm mb-3">Super Administrator</p>
                            <button className="text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors border border-zinc-700">Change Avatar</button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input type="text" defaultValue="Ali Rooshan" className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">@</div>
                                <input type="email" defaultValue="admin@edvoyage.com" className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Role</label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input type="text" defaultValue="Manager" disabled className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-500 font-medium cursor-not-allowed" />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 flex justify-end">
                        <button className="flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
