import React, { useState } from 'react';
import { X, Copy, Check, Download, Upload, ShieldCheck, RefreshCw, Smartphone, User } from 'lucide-react';
import { UserProfile } from '../types';
import { storageService } from '../services/storage';

interface AccountSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
}

export const AccountSyncModal: React.FC<AccountSyncModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [partnerSyncCode, setPartnerSyncCode] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(userProfile.name);
  const [userEmail, setUserEmail] = useState(userProfile.email);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userProfile.syncCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...userProfile,
      name: userName || 'Hamba Allah',
      email: userEmail || 'qari@mushaf3d.id',
      lastSyncedAt: new Date().toISOString()
    };
    storageService.saveUserProfile(updated);
    onUpdateProfile(updated);
    setIsEditingName(false);
    setSyncStatusMsg('Profil berhasil diperbarui!');
    setTimeout(() => setSyncStatusMsg(null), 3000);
  };

  const handleExportBackup = () => {
    const json = storageService.generateBackupJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mushaf-quran-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSyncStatusMsg('File cadangan (.json) berhasil diunduh!');
    setTimeout(() => setSyncStatusMsg(null), 3000);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = storageService.importBackupJSON(content);
        if (success) {
          const loadedProfile = storageService.getUserProfile();
          onUpdateProfile(loadedProfile);
          setSyncStatusMsg('Data dan progres berhasil disinkronkan dari file!');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setSyncStatusMsg('Gagal memuat file cadangan. Format tidak valid.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleConnectSyncCode = () => {
    if (!partnerSyncCode.trim()) return;
    setSyncStatusMsg(`Sinkronisasi dengan kode ${partnerSyncCode.toUpperCase()} berhasil dihubungkan!`);
    const updated = {
      ...userProfile,
      syncCode: partnerSyncCode.toUpperCase(),
      lastSyncedAt: new Date().toISOString()
    };
    storageService.saveUserProfile(updated);
    onUpdateProfile(updated);
    setPartnerSyncCode('');
    setTimeout(() => setSyncStatusMsg(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col rounded-xl border border-amber-500/30 bg-stone-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-100">
                Akun & Sinkronisasi Antar Perangkat
              </h2>
              <p className="text-xs text-stone-400">
                Jaga riwayat membaca, catatan tadabbur, dan target khatam Anda tetap aman
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {syncStatusMsg && (
            <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-3 text-xs text-emerald-200 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{syncStatusMsg}</span>
            </div>
          )}

          {/* User Profile Card */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-100 text-sm">{userProfile.name}</h3>
                  <p className="text-xs text-stone-400">{userProfile.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingName(!isEditingName)}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                {isEditingName ? 'Batal' : 'Ubah Profil'}
              </button>
            </div>

            {isEditingName && (
              <div className="space-y-2 border-t border-white/10 pt-3">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                />
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                />
                <button
                  onClick={handleSaveProfile}
                  className="w-full rounded-md bg-amber-500 py-1.5 text-xs font-semibold text-stone-950 hover:bg-amber-400 transition-colors"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-stone-400">
              <span>Status Penyimpanan:</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Tersinkronisasi Lokal & Cloud
              </span>
            </div>
          </div>

          {/* Sync Code Box */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300">
                Kode Sinkronisasi Perangkat Anda
              </span>
              <span className="text-[11px] text-stone-400">Gunakan di HP/Tablet</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-amber-500/40 bg-black/50 px-3 py-2.5">
              <span className="font-mono text-sm font-bold tracking-widest text-amber-200">
                {userProfile.syncCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 rounded bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-300 hover:bg-amber-500/30 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Masukkan kode ini pada perangkat lain Anda untuk menyelaraskan halaman terakhir dibaca, catatan tadabbur, dan target khatam secara otomatis.
            </p>
          </div>

          {/* Connect Another Device Sync Code */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2.5">
            <span className="text-xs font-semibold text-stone-200">
              Hubungkan ke Kode Perangkat Lain
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                value={partnerSyncCode}
                onChange={(e) => setPartnerSyncCode(e.target.value)}
                placeholder="Contoh: MSHF-892-XYZ"
                className="flex-1 rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 uppercase focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={handleConnectSyncCode}
                className="rounded-md bg-stone-800 border border-white/15 px-3 py-1.5 text-xs font-medium text-stone-200 hover:bg-stone-700 transition-colors"
              >
                Hubungkan
              </button>
            </div>
          </div>

          {/* Backup & Restore Export */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleExportBackup}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-stone-200 hover:bg-white/10 transition-colors"
            >
              <Download className="h-4 w-4 text-amber-400" />
              <span>Ekspor Cadangan (JSON)</span>
            </button>

            <label className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-stone-200 hover:bg-white/10 cursor-pointer transition-colors">
              <Upload className="h-4 w-4 text-emerald-400" />
              <span>Impor Cadangan</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
