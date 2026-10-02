import { AppTheme } from '../types';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  subtitle: string;
  coverBg: string;
  coverTexture: string;
  coverGoldColor: string;
  coverTextColor: string;
  pageBg: string;
  pageBorderColor: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  pageArabicColor: string;
  accentColor: string;
  spineColor: string;
  ribbonColor: string;
  glowEffect: string;
}

export const THEMES: Record<AppTheme, ThemeConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Zamrud Emas',
    subtitle: 'Klasik Madinah Al-Munawwarah',
    coverBg: 'bg-emerald-950',
    coverTexture: 'from-emerald-950 via-emerald-900 to-emerald-950',
    coverGoldColor: '#fbbf24',
    coverTextColor: 'text-amber-300',
    pageBg: 'bg-[#faf6ed]',
    pageBorderColor: 'border-amber-700/30',
    pageTextPrimary: 'text-stone-900',
    pageTextSecondary: 'text-stone-600',
    pageArabicColor: 'text-emerald-950',
    accentColor: '#10b981',
    spineColor: '#064e3b',
    ribbonColor: 'bg-emerald-700',
    glowEffect: 'shadow-[0_0_50px_rgba(16,185,129,0.15)]'
  },
  onyx: {
    id: 'onyx',
    name: 'Malam Onyx',
    subtitle: 'Mode Malam Nyaman Redup Cahaya',
    coverBg: 'bg-stone-950',
    coverTexture: 'from-stone-950 via-neutral-900 to-stone-950',
    coverGoldColor: '#d4af37',
    coverTextColor: 'text-amber-200',
    pageBg: 'bg-[#18181b]',
    pageBorderColor: 'border-amber-500/25',
    pageTextPrimary: 'text-stone-100',
    pageTextSecondary: 'text-stone-400',
    pageArabicColor: 'text-amber-100',
    accentColor: '#f59e0b',
    spineColor: '#09090b',
    ribbonColor: 'bg-amber-600',
    glowEffect: 'shadow-[0_0_50px_rgba(245,158,11,0.12)]'
  },
  parchment: {
    id: 'parchment',
    name: 'Naskah Kuno',
    subtitle: 'Perkamen Tradisi Utsmani',
    coverBg: 'bg-[#451a03]',
    coverTexture: 'from-[#451a03] via-[#78350f] to-[#451a03]',
    coverGoldColor: '#eab308',
    coverTextColor: 'text-amber-200',
    pageBg: 'bg-[#f4ede0]',
    pageBorderColor: 'border-amber-900/30',
    pageTextPrimary: 'text-[#292524]',
    pageTextSecondary: 'text-[#78716c]',
    pageArabicColor: 'text-[#1c1917]',
    accentColor: '#b45309',
    spineColor: '#291004',
    ribbonColor: 'bg-rose-900',
    glowEffect: 'shadow-[0_0_50px_rgba(180,83,9,0.15)]'
  },
  navy: {
    id: 'navy',
    name: 'Safir Kerajaan',
    subtitle: 'Lapis Lazuli & Rose Gold',
    coverBg: 'bg-slate-950',
    coverTexture: 'from-slate-950 via-blue-950 to-slate-950',
    coverGoldColor: '#f9a8d4',
    coverTextColor: 'text-rose-200',
    pageBg: 'bg-[#f8fafc]',
    pageBorderColor: 'border-blue-900/20',
    pageTextPrimary: 'text-slate-900',
    pageTextSecondary: 'text-slate-600',
    pageArabicColor: 'text-blue-950',
    accentColor: '#3b82f6',
    spineColor: '#0f172a',
    ribbonColor: 'bg-blue-800',
    glowEffect: 'shadow-[0_0_50px_rgba(59,130,246,0.15)]'
  },
  minimal: {
    id: 'minimal',
    name: 'Kasturi Putih',
    subtitle: 'Marmer Alabaster & Sage',
    coverBg: 'bg-stone-800',
    coverTexture: 'from-stone-800 via-stone-700 to-stone-800',
    coverGoldColor: '#6ee7b7',
    coverTextColor: 'text-emerald-300',
    pageBg: 'bg-[#ffffff]',
    pageBorderColor: 'border-stone-300',
    pageTextPrimary: 'text-stone-800',
    pageTextSecondary: 'text-stone-500',
    pageArabicColor: 'text-stone-900',
    accentColor: '#059669',
    spineColor: '#292524',
    ribbonColor: 'bg-emerald-600',
    glowEffect: 'shadow-[0_0_40px_rgba(0,0,0,0.1)]'
  }
};
