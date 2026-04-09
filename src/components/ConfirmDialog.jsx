import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle } from 'lucide-react';

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (!isOpen) setBusy(false);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget && !busy) onClose();
    };

    const handleCancel = () => {
        if (!busy) onClose();
    };

    const handleConfirm = async () => {
        if (busy || !onConfirm) return;
        setBusy(true);
        try {
            await Promise.resolve(onConfirm());
            onClose();
        } catch {
            // Keep dialog open; caller may have shown an error
        } finally {
            setBusy(false);
        }
    };

    const dialogContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdrop}
        >
            <div
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
            >
                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 rounded-full shrink-0">
                            <AlertCircle className="text-amber-600" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 id="confirm-dialog-title" className="text-lg font-bold text-slate-800 mb-1">
                                {title}
                            </h3>
                            {message ? <p className="text-sm text-slate-600">{message}</p> : null}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            disabled={busy}
                            onClick={handleCancel}
                            className="flex-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors disabled:opacity-50"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            disabled={busy}
                            onClick={handleConfirm}
                            className="flex-1 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors shadow-md shadow-red-500/30 disabled:opacity-50"
                        >
                            {busy ? '…' : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(dialogContent, document.body);
};

export default ConfirmDialog;
