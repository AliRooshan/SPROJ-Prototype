import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Users, BookOpen, GraduationCap, Calendar, Activity, Save, Plus, DollarSign, Trash2 } from 'lucide-react';
import api from '../../services/api';
import ConfirmDialog from '../../components/ConfirmDialog';

const AdminDashboard = () => {
    const [stats, setStats] = useState([
        { label: 'Total Programs', value: '—', change: '', icon: BookOpen, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Scholarships', value: '—', change: '', icon: GraduationCap, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Users', value: '—', change: '', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'System Status', value: 'Live', change: 'Stable', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    ]);

    const [rateRows, setRateRows] = useState([]);
    const [newRate, setNewRate] = useState({ currency: '', rate_to_usd: '' });
    const [rateErrorMsg, setRateErrorMsg] = useState('');
    const [rateToast, setRateToast] = useState(null);
    const rateToastTimerRef = useRef(null);
    const [ratePendingDelete, setRatePendingDelete] = useState(null);

    const showRateToast = useCallback((message) => {
        setRateToast(message);
        if (rateToastTimerRef.current) clearTimeout(rateToastTimerRef.current);
        rateToastTimerRef.current = setTimeout(() => setRateToast(null), 2800);
    }, []);

    const loadRates = useCallback(async () => {
        try {
            const ratesData = await api.get('/costs/currency-rates');
            setRateRows(
                ratesData.map((row) => ({
                    ...row,
                    currency: String(row.currency || '').trim().toUpperCase(),
                    rate_to_usd: Number(row.rate_to_usd ?? 0)
                }))
            );
        } catch {
            setRateRows([]);
        }
    }, []);

    useEffect(() => {
        Promise.allSettled([
            api.get('/programs'),
            api.get('/scholarships'),
            api.get('/users/admin/stats'),
        ]).then(([programs, scholarships, users]) => {
            const userStats = users.status === 'fulfilled' ? users.value : null;
            setStats([
                {
                    label: 'Total Programs',
                    value: programs.status === 'fulfilled' ? programs.value.length.toLocaleString() : '—',
                    change: programs.status === 'fulfilled' ? 'In DB' : 'Error',
                    icon: BookOpen, color: 'text-amber-400', bg: 'bg-amber-500/10'
                },
                {
                    label: 'Scholarships',
                    value: scholarships.status === 'fulfilled' ? scholarships.value.length.toLocaleString() : '—',
                    change: scholarships.status === 'fulfilled' ? 'In DB' : 'Error',
                    icon: GraduationCap, color: 'text-emerald-400', bg: 'bg-emerald-500/10'
                },
                {
                    label: 'Users',
                    value: userStats ? userStats.total_users.toLocaleString() : '—',
                    change: userStats ? `${userStats.student_users} students` : 'Error',
                    icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10'
                },
                {
                    label: 'System Status',
                    value: 'Live', change: 'Stable',
                    icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10'
                },
            ]);
        });

        loadRates();
    }, [loadRates]);

    useEffect(() => {
        return () => {
            if (rateToastTimerRef.current) clearTimeout(rateToastTimerRef.current);
        };
    }, []);

    const updateRateField = (currency, value) => {
        setRateRows((prev) =>
            prev.map((row) => (row.currency === currency ? { ...row, rate_to_usd: value } : row))
        );
    };

    const saveRateRow = async (row) => {
        try {
            await api.put(`/costs/currency-rates/${row.currency}`, {
                rate_to_usd: Number(row.rate_to_usd)
            });
            await loadRates();
            showRateToast(`Saved ${row.currency} rate.`);
        } catch (err) {
            alert(`Failed to save rate: ${err.message}`);
        }
    };

    const handleDeleteRate = async (row) => {
        try {
            await api.delete(`/costs/currency-rates/${row.currency}`);
            await loadRates();
            showRateToast(`Deleted ${row.currency}.`);
        } catch (err) {
            alert(`Failed to delete rate: ${err.message}`);
            throw err;
        }
    };

    const addRate = async () => {
        setRateErrorMsg('');
        const currency = String(newRate.currency || '').trim().toUpperCase();
        const rate = Number(newRate.rate_to_usd);
        if (!/^[A-Z]{3}$/.test(currency)) {
            setRateErrorMsg('Currency must be a 3-letter ISO code (e.g. USD).');
            return;
        }
        if (!Number.isFinite(rate) || rate <= 0) {
            setRateErrorMsg('Rate to USD must be a positive number.');
            return;
        }
        try {
            await api.post('/costs/currency-rates', { currency, rate_to_usd: rate });
            setNewRate({ currency: '', rate_to_usd: '' });
            await loadRates();
            showRateToast(`Added ${currency}.`);
        } catch (err) {
            setRateErrorMsg(err.message || 'Failed to add currency rate');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Dashboard</h1>
                    <p className="text-zinc-400 font-medium">Overview of your platform's performance.</p>
                </div>
                <div className="flex items-center gap-3 relative">

                    <div className="px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center gap-2 text-sm font-bold text-zinc-300">
                        <Calendar size={16} />
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="relative bg-[#18181b] p-3 sm:p-4 rounded-xl border border-zinc-800 shadow-sm hover:border-zinc-700 hover:shadow-md transition-all group flex flex-col items-center text-center gap-1.5">
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-105 transition-transform`}>
                            <stat.icon size={18} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                            {stat.value}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-zinc-400 leading-snug">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Currency rates — half width of dashboard content */}
            <section className="relative w-full lg:w-1/2 bg-[#18181b] rounded-[2rem] border border-zinc-800 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-900/40">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                            <DollarSign size={20} />
                        </div>
                        <h2 className="text-lg font-black text-white tracking-tight">Currency rates</h2>
                    </div>
                </div>
                <div className="max-h-[min(60vh,480px)] overflow-y-auto overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-zinc-900/95 border-b border-zinc-800 backdrop-blur-sm">
                                <th className="px-4 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Currency</th>
                                <th className="px-3 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Rate to USD</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-zinc-500 uppercase text-right min-w-[5.5rem]"> </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80">
                            <tr className="bg-amber-500/5 border-b border-zinc-800/80">
                                <td className="px-4 py-2 align-middle">
                                    <input
                                        value={newRate.currency}
                                        onChange={(e) => setNewRate((p) => ({ ...p, currency: e.target.value.toUpperCase() }))}
                                        placeholder="EUR"
                                        maxLength={3}
                                        className="w-16 px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-600 text-white uppercase font-mono text-sm text-center"
                                    />
                                </td>
                                <td className="px-3 py-2 align-middle">
                                    <input
                                        type="number"
                                        min="0.000001"
                                        step="0.000001"
                                        value={newRate.rate_to_usd}
                                        onChange={(e) => setNewRate((p) => ({ ...p, rate_to_usd: e.target.value }))}
                                        placeholder="1.0"
                                        className="w-full max-w-[8rem] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-600 text-white tabular-nums text-sm"
                                    />
                                </td>
                                <td className="px-4 py-2 text-right align-middle">
                                    <button
                                        type="button"
                                        onClick={addRate}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-amber-500 text-amber-400 hover:bg-amber-500/15 font-bold text-xs whitespace-nowrap"
                                    >
                                        <Plus size={13} />
                                        Add new
                                    </button>
                                </td>
                            </tr>
                            {rateRows.map((row) => (
                                <tr key={row.currency} className="hover:bg-zinc-800/25">
                                    <td className="px-4 py-2 font-mono font-semibold text-white align-middle">{row.currency}</td>
                                    <td className="px-3 py-2 align-middle">
                                        <input
                                            type="number"
                                            min="0.000001"
                                            step="0.000001"
                                            value={row.rate_to_usd}
                                            onChange={(e) => updateRateField(row.currency, e.target.value)}
                                            className="w-full max-w-[8rem] px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white tabular-nums text-sm"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-right align-middle">
                                        <div className="inline-flex items-center gap-1 justify-end">
                                            <button
                                                type="button"
                                                onClick={() => saveRateRow(row)}
                                                className="inline-flex p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black"
                                                title="Save"
                                            >
                                                <Save size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setRatePendingDelete(row)}
                                                className="inline-flex p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950/80 border border-zinc-600 hover:border-red-800 text-zinc-300 hover:text-red-300"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {rateErrorMsg && (
                    <p className="px-5 py-2 text-sm text-red-400 border-t border-zinc-800">{rateErrorMsg}</p>
                )}
                {rateToast && (
                    <div
                        role="status"
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-emerald-950/95 border border-emerald-700/80 text-emerald-200 text-sm font-semibold shadow-lg z-20 pointer-events-none animate-in fade-in zoom-in-95 duration-200"
                    >
                        {rateToast}
                    </div>
                )}
            </section>

            <ConfirmDialog
                isOpen={ratePendingDelete != null}
                onClose={() => setRatePendingDelete(null)}
                onConfirm={() => handleDeleteRate(ratePendingDelete)}
                title={
                    ratePendingDelete
                        ? `Delete ${ratePendingDelete.currency}?`
                        : 'Delete currency rate?'
                }
                confirmText="Delete"
                cancelText="Cancel"
                message="This action cannot be undone. Are you sure you want to delete this currency rate?"
            />
        </div>
    );
};

export default AdminDashboard;
