import React, { useState } from 'react';
import { User, Bell, Shield, Key, Save, Upload, Lock, Mail } from 'lucide-react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop');
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        newApplications: true,
        systemUpdates: false,
        weeklyReports: true
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a local URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('avatar-upload').click();
    };

    const handleNotificationToggle = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
                <p className="text-zinc-400 font-medium">Manage your admin profile and system preferences.</p>
            </div>

            <div className="bg-[#18181b] rounded-[2rem] border border-zinc-800 overflow-hidden">
                {/* Tabs / Header */}
                <div className="p-2 border-b border-zinc-800 bg-zinc-900/50 flex gap-1 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-zinc-800 text-white shadow-sm'
                                : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-white'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-8 md:p-10 space-y-8">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <>
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6 pb-8 border-b border-zinc-800">
                                <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-amber-500/50 p-1">
                                    <img
                                        src={avatarUrl}
                                        alt="Admin"
                                        className="w-full h-full rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Admin User</h3>
                                    <p className="text-zinc-500 text-sm mb-3">Super Administrator</p>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={triggerFileInput}
                                        className="text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors border border-zinc-700 flex items-center gap-2"
                                    >
                                        <Upload size={14} />
                                        Change Avatar
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <input type="text" defaultValue="Admin User" className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <input type="email" defaultValue="admin@voyage.com" className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Role</label>
                                    <div className="relative">
                                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                        <input type="text" defaultValue="Super Administrator" disabled className="w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-500 font-medium cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="pt-6 flex justify-end">
                                <button
                                    onClick={() => alert('Profile updated successfully!')}
                                    className="flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Change Password</h3>
                                    <p className="text-sm text-zinc-500">Update your password to keep your account secure.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Current Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                            <input type="password" placeholder="Enter current password" className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">New Password</label>
                                        <div className="relative">
                                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                            <input type="password" placeholder="Enter new password" className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Confirm New Password</label>
                                        <div className="relative">
                                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                            <input type="password" placeholder="Confirm new password" className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        onClick={() => alert('Password updated successfully!')}
                                        className="flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <Save size={18} />
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Notification Preferences</h3>
                                    <p className="text-sm text-zinc-500">Manage how you receive notifications and updates.</p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive email notifications for important updates' },
                                        { key: 'newApplications', label: 'New Applications', description: 'Get notified when students submit new applications' },
                                        { key: 'systemUpdates', label: 'System Updates', description: 'Receive notifications about system maintenance and updates' },
                                        { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get weekly summary reports via email' }
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white text-sm mb-0.5">{item.label}</h4>
                                                <p className="text-xs text-zinc-500">{item.description}</p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationToggle(item.key)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[item.key] ? 'bg-amber-500' : 'bg-zinc-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        onClick={() => alert('Notification preferences saved!')}
                                        className="flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        <Save size={18} />
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
