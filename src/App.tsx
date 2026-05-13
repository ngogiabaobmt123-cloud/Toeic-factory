import React, { useState, useEffect, useRef } from 'react';
import { GameProvider, useGame } from './GameContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Factory, 
  ShoppingBag, 
  BookOpen, 
  Target, 
  LogOut, 
  Coins, 
  TrendingUp, 
  User,
  Trophy,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Zap,
  ListTodo,
  Calendar,
  ChevronLeft,
  Flame,
  Award,
  Soup,
  Footprints,
  Coffee,
  Croissant,
  Bike,
  Smartphone,
  CarFront,
  Rocket,
  Sun,
  Infinity,
  ArrowUpCircle,
  HandHeart,
  ZapOff,
  Pickaxe,
  Briefcase,
  Landmark,
  RefreshCw,
  Volume2,
  Gem,
  ArrowLeftRight,
  Star,
  Shield,
  Crown
} from 'lucide-react';

import { generateQuestion, getAllWords, getNextWord, getWordsByDifficulty, EASY_WORDS, INTERMEDIATE_WORDS, HARD_WORDS } from './vocabService';
import { Question, FACTORY_TEMPLATES, DailyQuest, Word, DifficultyLevel } from './types';

export const playAudio = (text: string) => {
  if (!window.speechSynthesis) return;
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

// Emoji helper for factories - using widely-supported emojis
const FACTORY_EMOJI: Record<string, string> = {
    'Soup': '🍜',           // Mì Tôm
    'Footprints': '🩴',     // Dép tổ ong
    'Coffee': '🧋',         // Trà sữa
    'Croissant': '🥖',      // Bánh mì Sài Gòn
    'Landmark': '🏦',       // Ngân hàng
    'Utensils': '🍽️',      // Nhà hàng Omakase
    'Languages': '🎓',      // Trung tâm Tiếng Anh
    'Sparkles': '💄',       // Viện thẩm mỹ
    'HardHat': '🔩',       // Nhà máy thép
    'Cpu': '🔬',            // Nhà máy chip
    'Bike': '🚲',
    'Smartphone': '📱',
    'CarFront': '🚗',
    'Rocket': '🚀',
    'Sun': '☀️',
    'Infinity': '♾️',
};

const FactoryIcon = ({ name, size = 20, className = "" }: { name: string, size?: number, className?: string }) => {
    const emoji = FACTORY_EMOJI[name] || '🏭';
    const fontSize = size >= 28 ? 'factory-emoji-lg' : 'factory-emoji';
    return <span className={`${fontSize} ${className}`} role="img">{emoji}</span>;
};

const useCountdown = (targetDate?: number) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!targetDate) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft('');
                return;
            }

            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return timeLeft;
};

// --- AUTH COMPONENT --- Premium Redesign
const Auth = () => {
  const { register, login, loginAnonymously } = useGame();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ id: '', pass: '', confirmPass: '', displayName: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (formData.pass !== formData.confirmPass) return alert('Mật khẩu không khớp!');
      register(formData.id, formData.pass, formData.displayName);
    } else {
      login(formData.id, formData.pass);
    }
  };

  const floatingItems = ['🏭', '📚', '💎', '🏆', '⚡', '🎯', '🔥', '💰'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600 rounded-full blur-[150px] opacity-30 animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600 rounded-full blur-[150px] opacity-25" style={{ animationDelay: '1.5s', animation: 'float 4s ease-in-out infinite' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-15"></div>

      {floatingItems.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-10 pointer-events-none select-none"
          style={{ left: `${10 + (i * 12) % 80}%`, top: `${5 + (i * 17) % 85}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 4 + i * 0.5, delay: i * 0.3 }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-3xl blur-xl opacity-40"></div>
              <div className="relative p-5 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30">
                <span className="text-4xl">🏭</span>
              </div>
            </div>
          </motion.div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic text-gradient-rainbow pb-1 leading-tight">TOEIC Factory</h1>
          <p className="text-white/40 font-medium text-sm mt-2">Học tập đỉnh cao — Xây dựng đế chế 🚀</p>
        </div>
        
        <div className="glass-card p-8 rounded-[32px] card-shine">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black text-blue-300/60 ml-2 tracking-widest">🆔 ID Tài khoản</label>
              <input type="text" required placeholder="Nhập ID của bạn..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/10 transition-all text-sm font-medium placeholder-white/20"
                value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black text-blue-300/60 ml-2 tracking-widest">🔑 Mật khẩu</label>
              <input type="password" required placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/10 transition-all text-sm font-medium placeholder-white/20"
                value={formData.pass} onChange={e => setFormData({...formData, pass: e.target.value})}
              />
            </div>
            
            <AnimatePresence>
              {isRegister && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-black text-blue-300/60 ml-2 tracking-widest">🔒 Xác nhận mật khẩu</label>
                    <input type="password" required placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/10 transition-all text-sm font-medium placeholder-white/20"
                      value={formData.confirmPass} onChange={e => setFormData({...formData, confirmPass: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-black text-blue-300/60 ml-2 tracking-widest">👤 Tên hiển thị</label>
                    <input type="text" required placeholder="Biệt danh chiến trường..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:bg-white/10 focus:border-blue-400/50 focus:shadow-lg focus:shadow-blue-500/10 transition-all text-sm font-medium placeholder-white/20"
                      value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:opacity-90 text-white font-black py-4 rounded-2xl uppercase mt-4 shadow-xl shadow-purple-500/30 transition-all active:scale-95 text-sm tracking-wider"
            >
              {isRegister ? '🚀 Khởi tạo đế chế' : '⚡ Truy cập nhà máy'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-center text-sm font-medium text-white/30">
              {isRegister ? 'Đã có tài khoản?' : 'Người mới?'} 
              <button onClick={() => setIsRegister(!isRegister)}
                className="ml-2 text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 transition-colors"
              >
                {isRegister ? 'Đăng nhập ngay' : 'Đăng ký miễn phí'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface FactoryThemeConfig {
  gradient: string;
  glow: string;
  beltBg: string;
  beltBorder: string;
  textColor: string;
  productEmoji: string;
}

const FACTORY_THEMES: Record<string, FactoryThemeConfig> = {
  'f_noodle': {
    gradient: 'from-orange-500 to-red-600',
    glow: 'shadow-orange-500/30',
    beltBg: 'bg-orange-500/15',
    beltBorder: 'border-orange-500/30',
    textColor: 'text-orange-400',
    productEmoji: '🍜'
  },
  'f_sandal': {
    gradient: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/30',
    beltBg: 'bg-pink-500/15',
    beltBorder: 'border-pink-500/30',
    textColor: 'text-pink-400',
    productEmoji: '🩴'
  },
  'f_milktea': {
    gradient: 'from-emerald-400 to-teal-600',
    glow: 'shadow-emerald-500/30',
    beltBg: 'bg-emerald-500/15',
    beltBorder: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    productEmoji: '🧋'
  },
  'f_bread': {
    gradient: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/30',
    beltBg: 'bg-amber-500/15',
    beltBorder: 'border-amber-500/30',
    textColor: 'text-amber-400',
    productEmoji: '🥖'
  },
  'f_omakase': {
    gradient: 'from-rose-500 to-red-700',
    glow: 'shadow-rose-500/30',
    beltBg: 'bg-rose-500/15',
    beltBorder: 'border-rose-500/30',
    textColor: 'text-rose-400',
    productEmoji: '🍣'
  },
  'f_english': {
    gradient: 'from-purple-500 to-indigo-600',
    glow: 'shadow-purple-500/30',
    beltBg: 'bg-purple-500/15',
    beltBorder: 'border-purple-500/30',
    textColor: 'text-purple-400',
    productEmoji: '🎓'
  },
  'f_beauty': {
    gradient: 'from-fuchsia-500 to-pink-600',
    glow: 'shadow-fuchsia-500/30',
    beltBg: 'bg-fuchsia-500/15',
    beltBorder: 'border-fuchsia-500/30',
    textColor: 'text-fuchsia-400',
    productEmoji: '💄'
  },
  'f_bank': {
    gradient: 'from-yellow-400 to-amber-600',
    glow: 'shadow-yellow-500/30',
    beltBg: 'bg-yellow-500/15',
    beltBorder: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    productEmoji: '💎'
  },
  'f_steel': {
    gradient: 'from-slate-300 to-blue-400',
    glow: 'shadow-blue-400/30',
    beltBg: 'bg-blue-400/15',
    beltBorder: 'border-blue-400/30',
    textColor: 'text-blue-300',
    productEmoji: '🚀'
  },
  'f_chip': {
    gradient: 'from-cyan-400 to-blue-600',
    glow: 'shadow-cyan-500/30',
    beltBg: 'bg-cyan-500/15',
    beltBorder: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    productEmoji: '🔬'
  }
};

const getFactoryTheme = (id: string): FactoryThemeConfig => {
  return FACTORY_THEMES[id] || {
    gradient: 'from-blue-500 to-purple-600',
    glow: 'shadow-blue-500/30',
    beltBg: 'bg-blue-500/15',
    beltBorder: 'border-blue-500/30',
    textColor: 'text-blue-400',
    productEmoji: '📦'
  };
};


const Dashboard = () => {
  const { user, factorySeconds, myRank, taxSubRate, collectIncome } = useGame();
  if (!user) return null;

  const xpToNext = 100 + user.level * 10;
  const progress = (user.xp / xpToNext) * 100;
  const bonus = user.level; // 1% per level
  const isCapitalistActive = !!user?.capitalistBuffExpiresAt && user.capitalistBuffExpiresAt > Date.now();
  const netWelfare = bonus + taxSubRate * 100 + (isCapitalistActive ? 50 : 0);

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Top Status Header */}
      <div className="glass p-6 rounded-[32px] border border-white/10 flex flex-wrap items-center justify-between gap-6 card-shine relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 text-2xl">
                👤
            </div>
            <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{user.displayName}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black uppercase text-blue-400/60 tracking-widest">Đang trực tuyến</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
            </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 relative z-10">
            <div className="flex items-center gap-3 bg-yellow-500/10 px-5 py-3 rounded-2xl border border-yellow-500/20 neon-yellow">
                <span className="text-xl">💰</span>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-yellow-300/50 leading-none mb-1">Số dư</span>
                    <span className="text-lg font-black font-mono text-yellow-300">${user.balance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
            </div>
            <div className="flex items-center gap-3 bg-cyan-500/10 px-5 py-3 rounded-2xl border border-cyan-500/20 neon-cyan">
                <span className="text-xl animate-float">💎</span>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-cyan-300/50 leading-none mb-1">Kim Cương</span>
                    <span className="text-lg font-black font-mono text-cyan-300">{user.diamonds.toLocaleString()}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Main Stats Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* XP Card */}
            <div className="glass-card p-6 rounded-3xl neon-blue relative overflow-hidden group card-shine">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-black text-blue-300/60 block mb-1">⚡ Cấp độ</span>
                    <span className="text-3xl font-black italic tracking-tighter">Level {user.level}</span>
                  </div>
                  <div className="bg-blue-500/20 p-2.5 rounded-xl border border-blue-400/30 text-xl">
                    📊
                  </div>
               </div>
               <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10 mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  ></motion.div>
               </div>
               <div className="flex justify-between font-black text-[10px] uppercase tracking-wider text-blue-200/50">
                  <span>{user.xp} XP</span>
                  <span>{xpToNext} XP</span>
               </div>
            </div>

            {/* Profit Bonus Card */}
            <div className={`glass-card p-6 rounded-3xl relative overflow-hidden group card-shine ${netWelfare < 0 ? 'neon-red' : 'neon-green'}`}>
               <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${netWelfare < 0 ? 'bg-red-500/5' : 'bg-green-500/5'}`}></div>
               <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className={`text-[10px] uppercase font-black block mb-1 ${netWelfare < 0 ? 'text-red-300/60' : 'text-green-300/60'}`}>Phúc lợi tịnh (Net)</span>
                    <span className={`text-3xl font-black italic tracking-tighter ${netWelfare < 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {netWelfare > 0 ? '+' : ''}{netWelfare.toFixed(0)}%
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border text-xl ${netWelfare < 0 ? 'bg-red-500/20 border-red-400/30' : 'bg-green-500/20 border-green-400/30'}`}>
                    {netWelfare < 0 ? '📉' : '📈'}
                  </div>
               </div>
               <div className="space-y-2 relative z-10">
                    <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-tight">Kỹ năng càng cao, thu nhập càng lớn.</p>
                    <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-white/5">
                        <span className="text-[9px] font-black uppercase text-white/30">Từ cấp độ:</span>
                        <span className="text-[10px] font-black text-blue-400">+{bonus}%</span>
                    </div>
                    {taxSubRate !== 0 && (
                        <div className={`p-2 rounded-xl border flex items-center justify-between ${taxSubRate < 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                            <span className="text-[9px] font-black uppercase text-white/40">
                                {taxSubRate < 0 ? 'Thuế người giàu:' : 'Trợ cấp xã hội:'}
                            </span>
                            <span className={`text-[10px] font-black uppercase ${taxSubRate < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                {taxSubRate < 0 ? `${(taxSubRate * 100).toFixed(0)}%` : `+${(taxSubRate * 100).toFixed(0)}%`}
                            </span>
                        </div>
                    )}
                    {user?.capitalistBuffExpiresAt && user.capitalistBuffExpiresAt > Date.now() && (
                        <div className="p-2 rounded-xl border flex items-center justify-between bg-purple-500/10 border-purple-500/20 mt-1">
                            <span className="text-[9px] font-black uppercase text-white/40">
                                Tư bản bốc lột:
                            </span>
                            <span className="text-[10px] font-black uppercase text-purple-400">
                                +50% Hiệu suất
                            </span>
                        </div>
                    )}
               </div>
            </div>

            {/* Rank Card */}
            <div className={`glass-card p-6 rounded-3xl relative overflow-hidden transition-all flex flex-col justify-between items-center text-center card-shine ${myRank <= 3 ? 'neon-yellow bg-gradient-to-br from-yellow-500/10 to-transparent' : 'border border-white/5'}`}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <span className="text-[10px] uppercase font-black text-white/30 block mb-2 tracking-widest italic z-10 w-full text-left">🏆 Xếp hạng</span>
               <div className="flex-1 flex items-center justify-center relative z-10">
                  <span className={`text-6xl font-black italic tracking-tighter ${
                      myRank === 1 ? 'text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]' : 
                      myRank === 2 ? 'text-slate-300 drop-shadow-[0_0_15px_rgba(203,213,225,0.5)]' :
                      myRank === 3 ? 'text-amber-600 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]' :
                      'text-white/80'
                  }`}>
                      {myRank > 0 ? `#${myRank}` : '...'}
                  </span>
               </div>
            </div>

            {/* Answer Reward Card */}
            <div className="glass-card p-6 rounded-3xl neon-purple relative overflow-hidden group card-shine">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-black text-purple-300/60 block mb-1">🎯 Thưởng đáp đúng</span>
                    <span className="text-3xl font-black italic tracking-tighter text-purple-400">
                        {user.luckyBuffExpiresAt && user.luckyBuffExpiresAt > Date.now() ? (
                             <span className="text-yellow-400">+${((1 + user.level * 0.5) * 2).toFixed(1)} <span className="text-xs uppercase">(x2)</span></span>
                        ) : (
                            `+$${(1 + user.level * 0.5).toFixed(1)}`
                        )}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border text-xl ${user.luckyBuffExpiresAt && user.luckyBuffExpiresAt > Date.now() ? 'bg-yellow-500/20 border-yellow-400/30' : 'bg-purple-500/20 border-purple-400/30'}`}>
                    {user.luckyBuffExpiresAt && user.luckyBuffExpiresAt > Date.now() ? '🔥' : '🎯'}
                  </div>
               </div>
               <div className="space-y-4 relative z-10 mt-6">
                    <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-tight">Thưởng tăng cường mỗi câu đúng.</p>
               </div>
            </div>
        </div>

        {/* Passive Income Display */}
        <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent">
          <span className="text-[10px] uppercase font-black text-white/30 block mb-4 tracking-widest">Hiệu năng tài chính</span>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <TrendingUp className="text-green-400" size={28} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-white/30 block">Thu nhập thụ động</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-green-400 leading-none">
                        {(() => {
                            const isCapitalistActive = !!user.capitalistBuffExpiresAt && user.capitalistBuffExpiresAt > Date.now();
                            const multiplier = 1 + bonus/100 + taxSubRate + (isCapitalistActive ? 0.5 : 0);
                            let activeIncome = 0;
                            user.factories.forEach(f => {
                                const maxStorage = f.cost * 0.25 * (1 + (f.storageUpgradeLevel || 0));
                                if ((f.uncollectedIncome || 0) < maxStorage - 0.001) {
                                    activeIncome += f.baseIncome * (1 + (f.upgradeLevel || 0) * 0.25);
                                }
                            });
                            return `+$${(activeIncome * multiplier).toFixed(2)}`;
                        })()}
                    </span>
                    <span className="text-[10px] opacity-40 font-black uppercase">/phút</span>
                </div>
                {taxSubRate !== 0 && (
                    <span className={`text-[9px] font-black uppercase ${taxSubRate < 0 ? 'text-red-400' : 'text-green-400'} block mt-1`}>
                        {taxSubRate < 0 ? `Đã trừ ${(Math.abs(taxSubRate) * 100).toFixed(0)}% thuế người giàu` : `Đã cộng 20% trợ cấp`}
                    </span>
                )}
                {user.capitalistBuffExpiresAt && user.capitalistBuffExpiresAt > Date.now() && (
                    <span className="text-[9px] font-black uppercase text-purple-400 block mt-1">
                        +50% Tư bản bốc lột
                    </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Owned Factories */}
        {user.factories.length > 0 ? (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Cơ sở kinh doanh đang sở hữu
                    </h3>
                    {user.factories.some(f => (f.uncollectedIncome || 0) > 0) && (
                        <button 
                            onClick={() => collectIncome()}
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-xl font-black uppercase text-[10px] shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                        >
                            Thu hoạch tất cả
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {user.factories.map(f => {
                         const isCapitalistActive = !!user.capitalistBuffExpiresAt && user.capitalistBuffExpiresAt > Date.now();
                         const upgradedBaseIncome = f.baseIncome * (1 + (f.upgradeLevel || 0) * 0.25);
                         const factoryIncome = upgradedBaseIncome * (1 + bonus/100 + taxSubRate + (isCapitalistActive ? 0.5 : 0));
                         const theme = getFactoryTheme(f.id);
                         const maxStorage = f.cost * 0.25 * (1 + (f.storageUpgradeLevel || 0));
                         const currentUncollected = f.uncollectedIncome || 0;
                         const isFull = currentUncollected >= maxStorage - 0.001;

                         return (
                            <motion.div 
                               key={f.id} 
                               whileHover={{ scale: 1.01 }}
                               transition={{ duration: 0.2 }}
                               className={`glass-card p-5 rounded-3xl border group relative overflow-hidden transition-all duration-300 ${isCapitalistActive ? 'border-purple-500/30 bg-purple-500/5' : 'border-white/10 hover:border-white/20'}`}
                            >
                               {/* Subtle header glow */}
                               <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity pointer-events-none`} />

                               <div className="flex items-center justify-between mb-4 relative z-10">
                                  <div className="flex items-center gap-3">
                                     <div className={`p-2 rounded-xl border bg-gradient-to-br ${theme.gradient} shadow-md ${theme.glow} border-white/20`}>
                                        <FactoryIcon name={f.iconName} size={18} className="text-white" />
                                     </div>
                                     <div>
                                        <div className="font-black text-sm uppercase italic tracking-tight flex items-center gap-2">
                                            {f.name}
                                            {isCapitalistActive && (
                                                <span className="text-[8px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded-md border border-purple-500/30 font-black whitespace-nowrap animate-pulse">
                                                    +50% Buff
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-[9px] font-bold text-white/50 flex items-center gap-2">
                                            <span>Sản lượng: <span className="text-green-400 font-mono">+${factoryIncome.toFixed(2)}</span>/phút</span>
                                        </div>
                                     </div>
                                  </div>
                               </div>

                               {/* 1. ANIMATED CONVEYOR BELT */}
                               <div className="relative z-10">
                                   <div className={`relative w-full h-12 rounded-2xl ${theme.beltBg} border ${theme.beltBorder} overflow-hidden flex items-center shadow-inner`}>
                                       {/* Behind belt: factory-colored glow/shadow */}
                                       <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-10`} />

                                       {/* Conveyor belt loop track line texture */}
                                       <motion.div 
                                           className="absolute inset-0 opacity-25 pointer-events-none"
                                           style={{
                                               backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.3) 12px, rgba(255,255,255,0.3) 24px)',
                                               backgroundSize: '200% 100%'
                                           }}
                                           animate={{ backgroundPositionX: isFull ? '0%' : ['0%', '100%'] }}
                                           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                       />

                                       {/* Moving Products */}
                                       {!isFull ? (
                                           [0, 1, 2].map((idx) => (
                                               <div
                                                   key={idx}
                                                   className={`animate-stream-${idx}`}
                                               >
                                                   <span className="text-2xl transform -rotate-12 select-none inline-block animate-bounce filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" style={{ animationDuration: '1.5s' }}>
                                                       {theme.productEmoji}
                                                   </span>
                                               </div>
                                           ))
                                       ) : (
                                           <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px] z-20">
                                               <span className="text-[10px] font-black tracking-widest text-orange-400 uppercase animate-pulse">
                                                   ⚠️ KHO ĐẦY - DỪNG BĂNG CHUYỀN
                                               </span>
                                           </div>
                                       )}

                                       {/* Spark particles at the end */}
                                       {!isFull && (
                                           <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                               <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-yellow-300 opacity-80"></span>
                                               <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-400"></span>
                                           </div>
                                       )}

                                       {/* Overlay info directly on belt */}
                                       <div className="absolute inset-x-0 bottom-0 bg-black/50 backdrop-blur-[1px] px-2 py-0.5 flex justify-between items-center text-[8px] font-black tracking-wider text-white/90 z-20 border-t border-white/5">
                                           <span className={theme.textColor}>CẤP ĐỘ MÁY: {1 + (f.upgradeLevel || 0)}</span>
                                           <span className="font-mono text-yellow-300 flex items-center gap-1">
                                               ⏱️ {60 - factorySeconds}s
                                           </span>
                                       </div>
                                   </div>
                               </div>

                               {/* 2. WAREHOUSE STORAGE VISUAL */}
                               <div className={`mt-3 p-3 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.08] border border-white/10 relative overflow-hidden group/storage transition-all duration-300 ${theme.glow}`}>
                                   {/* Container inner glow */}
                                   <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-5 group-hover/storage:opacity-10 transition-opacity pointer-events-none`} />

                                   <div className="flex items-center justify-between relative z-10 mb-2">
                                       <div className="flex items-center gap-1.5">
                                           <span className="text-xs">📦</span>
                                           <span className={`text-[9px] font-black uppercase tracking-wider ${theme.textColor}`}>
                                               Thùng hàng dự trữ
                                           </span>
                                       </div>
                                       <span className="text-[9px] font-black text-white/40 uppercase font-mono">
                                           Tối đa: ${maxStorage.toFixed(2)}
                                       </span>
                                   </div>

                                   {/* Cute Container Box representation */}
                                   <motion.div 
                                       key={Math.floor(currentUncollected * 2)} // subtle bounce trigger
                                       initial={{ scale: 1 }}
                                       animate={{ scale: [1, 1.015, 1] }}
                                       transition={{ duration: 0.25 }}
                                       className={`w-full h-14 rounded-xl border-2 border-dashed ${theme.beltBorder} bg-black/30 flex flex-col justify-end p-1 relative overflow-hidden shadow-inner`}
                                   >
                                       {/* Optional inside sparkle particles */}
                                       <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
                                           <div className="absolute top-1 left-3 w-1 h-1 bg-white rounded-full animate-ping" />
                                           <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
                                           <div className="absolute bottom-3 left-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-bounce" />
                                       </div>

                                       {/* Items stacked inside (visual pile of products) */}
                                       <div className="absolute inset-x-0 bottom-1 flex flex-wrap-reverse items-center justify-center gap-1 px-2 max-h-full overflow-hidden opacity-60 select-none pointer-events-none">
                                           {Array.from({ length: Math.min(14, Math.ceil((currentUncollected / maxStorage) * 14)) }).map((_, i) => (
                                               <span 
                                                   key={i}
                                                   className="text-xs inline-block filter drop-shadow transform scale-90"
                                                   style={{ transform: `rotate(${(i * 55) % 60 - 30}deg)` }}
                                               >
                                                   {theme.productEmoji}
                                               </span>
                                           ))}
                                       </div>

                                       {/* Number badge floating showing current storage count */}
                                       <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-10">
                                           <span className={`text-base font-black tracking-tight drop-shadow-md font-mono ${isFull ? 'text-orange-400 animate-pulse scale-105' : 'text-white'}`}>
                                               ${currentUncollected.toFixed(2)}
                                           </span>
                                       </div>

                                       {/* Bottom fill glow bar */}
                                       <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/5 z-20">
                                           <div 
                                               className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-500 relative`}
                                               style={{ width: `${Math.min((currentUncollected / maxStorage) * 100, 100)}%` }}
                                           >
                                               {!isFull && <div className="absolute inset-0 bg-white/30 animate-pulse" />}
                                           </div>
                                       </div>
                                   </motion.div>

                                   {/* Upgrade button / Collect action */}
                                   <motion.button 
                                       whileHover={{ scale: currentUncollected > 0 ? 1.03 : 1 }}
                                       whileTap={{ scale: currentUncollected > 0 ? 0.95 : 1 }}
                                       onClick={() => collectIncome(f.id)}
                                       disabled={currentUncollected <= 0}
                                       className={`w-full mt-2.5 py-2.5 rounded-xl font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 tracking-wider ${
                                           currentUncollected <= 0 
                                           ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5 shadow-none'
                                           : isFull
                                           ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30 border border-orange-400/40 animate-pulse'
                                           : `bg-gradient-to-r ${theme.gradient} text-white shadow-lg ${theme.glow} border border-white/20`
                                       }`}
                                   >
                                       <Coins size={14} className={currentUncollected <= 0 ? 'opacity-30' : 'animate-bounce'} style={{ animationDuration: '2s' }} />
                                       {isFull ? '⚡ THU HOẠCH NGAY (KHO ĐẦY)' : 'THU HOẠCH THÀNH PHẨM'}
                                   </motion.button>
                               </div>
                            </motion.div>
                         )
                    })}
                </div>
            </div>
        ) : (
            <div className="p-12 glass rounded-3xl border border-white/5 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <FactoryIcon name="Building2" size={32} className="text-white/20" />
                </div>
                <h4 className="text-lg font-black uppercase italic text-white/40">Chưa sở hữu cơ sở nào</h4>
                <p className="text-xs text-white/20 font-bold mt-2 uppercase tracking-wider">Hãy vào cửa hàng để xây dựng đế chế của bạn</p>
            </div>
        )}
      </div>
    </div>
  );
};

const Leaderboard = () => {
    const { leaderboard, user, leaderboardLastUpdated, totalUsers, fetchLeaderboard } = useGame();
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    useEffect(() => {
        if (leaderboard.length === 0) {
            fetchLeaderboard();
        }
    }, [leaderboard.length, fetchLeaderboard]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await fetchLeaderboard();
        } finally {
            setTimeout(() => setIsRefreshing(false), 500); // UI feel
        }
    };
    
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-br from-white to-blue-400 bg-clip-text text-transparent pb-1 leading-tight">Bảng xếp hạng</h2>
                <div className="flex flex-col items-center gap-2 mt-2">
                    <p className="text-white/40 text-sm font-medium">Theo dõi thứ hạng của các tài phiệt trên toàn quốc.</p>
                    <div className="flex items-center gap-3">
                        {leaderboardLastUpdated && (
                            <span className="text-[10px] font-black uppercase text-blue-400/50 italic tracking-widest">
                                Cập nhật cuối: {leaderboardLastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                        )}
                        <button 
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="bg-white/5 hover:bg-white/10 active:scale-95 text-blue-400 p-2 rounded-xl transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-[40px] overflow-hidden border border-white/5">
                <div className="grid grid-cols-12 bg-white/5 p-6 border-b border-white/10">
                    <div className="col-span-2 text-[10px] font-black uppercase text-white/30">Hạng</div>
                    <div className="col-span-5 text-[10px] font-black uppercase text-white/30">Người chơi</div>
                    <div className="col-span-2 text-[10px] font-black uppercase text-white/30">Cấp độ</div>
                    <div className="col-span-3 text-right text-[10px] font-black uppercase text-white/30">Tài sản</div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
                    {leaderboard.map((p) => {
                        if (p.isSeparator) {
                            return (
                                <div key={p.id} className="p-4 text-center">
                                    <span className="text-white/20 font-black tracking-widest">•••</span>
                                </div>
                            );
                        }
                        
                        const isSocialSubsidy = p.rank > 3 && p.rank > totalUsers - 5;

                        return (
                            <div 
                                key={p.id} 
                                className={`grid grid-cols-12 p-6 items-center border-b border-white/5 hover:bg-white/[0.02] transition-colors
                                    ${p.isUser ? 'bg-blue-600/10 border-blue-500/20' : ''}
                                `}
                            >
                                <div className="col-span-2">
                                    <span className={`w-10 h-10 flex items-center justify-center rounded-2xl text-sm font-black shadow-lg
                                        ${p.rank === 1 ? 'bg-yellow-400 text-black shadow-yellow-400/20 ring-4 ring-yellow-400/10' : 
                                          p.rank === 2 ? 'bg-slate-300 text-black shadow-slate-300/20 ring-4 ring-slate-300/10' : 
                                          p.rank === 3 ? 'bg-amber-600 text-white shadow-amber-600/20 ring-4 ring-amber-600/10' : 
                                          isSocialSubsidy ? 'bg-green-600/20 text-green-400 border border-green-500/30' :
                                          'bg-white/5 text-white/40'}
                                    `}>
                                        {p.rank}
                                    </span>
                                </div>
                                <div className="col-span-5 flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p.isUser ? 'bg-blue-500' : 'bg-white/5 overflow-hidden'}`}>
                                        {p.isUser ? <User size={16} className="text-white" /> : <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`font-black text-sm italic tracking-tight ${p.isUser ? 'text-blue-400' : ''}`}>
                                            {p.name} {p.isUser && '(Bạn)'}
                                        </span>
                                        {p.rank > 0 && p.rank <= 3 && (
                                            <span className="text-[8px] font-black uppercase text-red-400/80 tracking-wider">
                                                Thuế: -{p.rank === 1 ? '50%' : p.rank === 2 ? '40%' : '30%'}
                                            </span>
                                        )}
                                        {isSocialSubsidy && (
                                            <span className="text-[8px] font-black uppercase text-green-400/80 tracking-wider">
                                                An sinh xã hội: +20%
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-xs font-black uppercase text-white/50 tracking-tighter">LV. {p.level}</span>
                                </div>
                                <div className="col-span-3 text-right">
                                    <span className={`font-mono font-black text-sm ${p.isUser ? 'text-blue-400' : p.rank <= 3 ? 'text-white' : 'text-white/70'}`}>
                                        ${p.balance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tax Info Helper */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass p-5 rounded-3xl border border-red-500/10">
                    <h4 className="text-[10px] font-black uppercase text-red-400 mb-2">Chính sách thuế</h4>
                    <p className="text-[9px] text-white/30 font-bold uppercase leading-relaxed">Top 1: 50% | Top 2: 40% | Top 3: 30%. Thuế đánh vào toàn bộ thu nhập thụ động mỗi phút.</p>
                </div>
                <div className="glass p-5 rounded-3xl border border-green-500/10">
                    <h4 className="text-[10px] font-black uppercase text-green-400 mb-2">An sinh xã hội</h4>
                    <p className="text-[9px] text-white/30 font-bold uppercase leading-relaxed">5 người chơi bét bảng xếp hạng sẽ được nhận trợ cấp 20% thu nhập thụ động.</p>
                </div>
            </div>
        </div>
    );
};


const Shop = () => {
  const { buyFactory, upgradeFactory, buyAction, user, collectIncome } = useGame();
  const [tab, setTab] = useState<'factories' | 'actions'>('factories');
  const capitalistTimeLeft = useCountdown(user?.capitalistBuffExpiresAt);
  const luckyTimeLeft = useCountdown(user?.luckyBuffExpiresAt);
  const internTimeLeft = useCountdown(user?.internBuffExpiresAt);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-br from-white to-orange-300 bg-clip-text text-transparent pb-1 leading-tight">Trung Tâm Thương Mại</h2>
        <p className="text-white/40 text-sm font-medium">Đầu tư vào sản xuất hoặc sử dụng các quyền năng đặc biệt.</p>
      </div>

      <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-2 max-w-sm mx-auto">
        <button 
            onClick={() => setTab('factories')}
            className={`flex-1 py-3 rounded-xl font-black uppercase text-xs transition-all ${tab === 'factories' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
        >
            Nhà máy
        </button>
        <button 
            onClick={() => setTab('actions')}
            className={`flex-1 py-3 rounded-xl font-black uppercase text-xs transition-all ${tab === 'actions' ? 'bg-orange-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
        >
            Phép bổ trợ
        </button>
      </div>

      {tab === 'factories' && user && (
          <div className="text-center mb-6 flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-blue-400">Cơ sở sở hữu:</span>
                  <span className="text-sm font-black text-white">{user.factories.length} / {1 + Math.floor(user.level / 5)}</span>
              </div>
              <p className="text-[10px] text-white/30 italic font-medium uppercase tracking-wider">Mở thêm vị trí mới mỗi 5 cấp độ</p>
          </div>
      )}

      {tab === 'factories' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FACTORY_TEMPLATES.map(item => {
            const owned = user?.factories.find(f => f.id === item.id);
            const isCapitalistActive = !!user?.capitalistBuffExpiresAt && user.capitalistBuffExpiresAt > Date.now();
            const currentIncome = owned ? (owned.baseIncome * (isCapitalistActive ? 1.5 : 1)) : 0;
            
            return (
                <motion.div 
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className={`glass-card p-6 rounded-[32px] border flex flex-col justify-between group overflow-hidden relative ${owned && isCapitalistActive ? 'border-purple-500/20 bg-purple-500/5' : 'border-white/5'}`}
                >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>
                
                <div className="z-10">
                    <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-xl font-black uppercase italic tracking-tight">{item.name}</h3>
                        <div className="flex gap-2 mt-1">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-green-500/50 text-green-400 bg-green-500/10">
                                Sản xuất tiền
                            </span>
                            {owned && (
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-blue-500/50 text-blue-400 bg-blue-500/10 whitespace-nowrap">
                                    Đã sở hữu
                                </span>
                            )}
                            {owned && isCapitalistActive && (
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-purple-500/50 text-purple-400 bg-purple-500/10 whitespace-nowrap hidden sm:inline-block">
                                    +50% Buff
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={`p-3 rounded-2xl border transition-colors ${owned && isCapitalistActive ? 'bg-purple-500/20 border-purple-500/30' : 'bg-white/5 border-white/10 group-hover:bg-blue-500/20'}`}>
                        <FactoryIcon name={item.iconName} size={24} className={owned && isCapitalistActive ? 'text-purple-400' : 'text-white'} />
                    </div>
                    </div>
                    <p className="text-white/50 text-sm font-medium mb-4 leading-relaxed">{item.description}</p>
                    
                    <div className={`rounded-2xl p-4 mb-6 border ${owned && isCapitalistActive ? 'bg-purple-500/10 border-purple-500/20' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex justify-between items-center mb-1">
                            <span className={`text-[10px] font-black uppercase ${owned && isCapitalistActive ? 'text-purple-400/80' : 'text-white/30'}`}>Hiệu suất cơ bản</span>
                            <span className={`text-[10px] font-black uppercase text-blue-400/80`}>Kho: ${(item.cost * 0.25 * (1 + ((owned?.storageUpgradeLevel) || 0))).toFixed(2)}</span>
                        </div>
                        <div className={`text-lg font-black ${owned && isCapitalistActive ? 'text-purple-400' : 'text-white'}`}>${(item.baseIncome * (1 + ((owned?.upgradeLevel) || 0) * 0.25)).toFixed(2)} <span className={`text-[10px] ${owned && isCapitalistActive ? 'text-purple-400/60' : 'text-white/40'}`}>/ phút</span></div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-3 border-t border-white/5 pt-5 z-10">
                    <div className="flex items-center gap-3">
                        {!owned ? (
                            <button 
                                onClick={() => buyFactory(item.id)}
                                disabled={(user?.balance || 0) < item.cost}
                                className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl font-black uppercase transition-all shadow-lg ${
                                (user?.balance || 0) < item.cost 
                                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20 active:scale-95'
                                }`}
                            >
                                <span className="text-[10px] opacity-60">Sở hữu ngay</span>
                                <span className="text-sm">${item.cost.toLocaleString()}</span>
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={() => upgradeFactory(item.id, 'income')}
                                    disabled={(user?.balance || 0) < item.cost || (owned.upgradeLevel || 0) >= 4}
                                    className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-2xl font-black uppercase transition-all shadow-lg ${
                                    (owned.upgradeLevel || 0) >= 4
                                    ? 'bg-white/5 text-white/30 cursor-default border border-white/5'
                                    : (user?.balance || 0) < item.cost
                                    ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20 active:scale-95'
                                    }`}
                                >
                                    <span className="text-[10px] opacity-60">Nâng cấp ({owned.upgradeLevel || 0}/4)</span>
                                    <span className="text-xs">{(owned.upgradeLevel || 0) >= 4 ? 'MAX' : `$${item.cost.toLocaleString()}`}</span>
                                </button>
                                <button 
                                    onClick={() => upgradeFactory(item.id, 'storage')}
                                    disabled={(user?.balance || 0) < (item.cost * 0.25) || (owned.storageUpgradeLevel || 0) >= 3}
                                    className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-2xl font-black uppercase transition-all shadow-lg ${
                                    (owned.storageUpgradeLevel || 0) >= 3
                                    ? 'bg-white/5 text-white/30 cursor-default border border-white/5'
                                    : (user?.balance || 0) < (item.cost * 0.25)
                                    ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20 active:scale-95'
                                    }`}
                                >
                                    <span className="text-[10px] opacity-60">Nâng kho ({owned.storageUpgradeLevel || 0}/3)</span>
                                    <span className="text-xs">{(owned.storageUpgradeLevel || 0) >= 3 ? 'MAX' : `$${(item.cost * 0.25).toLocaleString()}`}</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                </motion.div>
            );
            })}
        </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Study Action (formerly Charity) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="glass-card p-6 rounded-[32px] border border-orange-500/10 flex flex-col justify-between group overflow-hidden relative"
              >
                  <div className="z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-orange-400">Đi Học Nghề</h3>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-orange-500/50 text-orange-400 bg-orange-500/10 mt-1 inline-block">
                                Phép bổ trợ XP
                            </span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-orange-500/20 transition-colors">
                            <BookOpen size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed">Đầu tư vào tri thức không bao giờ lỗ. Đóng học phí để nhận ngay 100 XP (KHÔNG GIỚI HẠN). Giá sẽ tăng $100 sau mỗi khóa học.</p>
                  </div>
                  <button 
                    onClick={() => buyAction('charity')}
                    disabled={(user?.balance || 0) < (500 + (user?.charityCount || 0) * 100)}
                    className={`w-full flex flex-col items-center justify-center py-4 rounded-2xl font-black uppercase transition-all shadow-lg ${
                        (user?.balance || 0) < (500 + (user?.charityCount || 0) * 100)
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-500 shadow-orange-500/20 active:scale-95'
                    }`}
                  >
                        <span className="text-[10px] opacity-60">Đóng học phí</span>
                        <span className="text-sm">${(500 + (user?.charityCount || 0) * 100).toLocaleString()}</span>
                  </button>
              </motion.div>

              {/* Capitalist Action */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="glass-card p-6 rounded-[32px] border border-purple-500/10 flex flex-col justify-between group overflow-hidden relative"
              >
                  <div className="z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-purple-400">Tư Bản Bóc Lột</h3>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-purple-500/50 text-purple-400 bg-purple-500/10 mt-1 inline-block">
                                Thu nhập +50% (24 giờ)
                            </span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-purple-500/20 transition-colors">
                            <Briefcase size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-white/50 text-sm font-medium mb-2 leading-relaxed">Ép nhân viên làm thêm giờ phi mã. Tăng 50% thu nhập thụ động mảng nhà máy kinh doanh trong 24 giờ. (Giá cố định: 10 Kim Cương).</p>
                    {capitalistTimeLeft && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-xl mt-2 mb-4">
                            <Clock size={12} className="text-purple-400 animate-pulse" />
                            <span className="text-xs font-black italic tracking-wider text-purple-400">{capitalistTimeLeft}</span>
                        </div>
                    )}
                  </div>
                  <button 
                    onClick={() => buyAction('capitalist')}
                    disabled={(user?.diamonds || 0) < 10}
                    className={`w-full flex flex-col items-center justify-center py-4 rounded-2xl font-black uppercase transition-all shadow-lg ${
                        (user?.diamonds || 0) < 10
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-500/20 active:scale-95'
                    }`}
                  >
                        <span className="text-[10px] opacity-60">Kích hoạt</span>
                        <span className="text-sm flex items-center gap-1.5 text-cyan-300">
                            <Gem size={14} className="animate-pulse" /> 10
                        </span>
                  </button>
              </motion.div>

              {/* Lucky Action (Khung Giờ Vàng) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="glass-card p-6 rounded-[32px] border border-yellow-500/10 flex flex-col justify-between group overflow-hidden relative md:col-span-2 lg:col-span-1"
              >
                  <div className="z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-yellow-400">Khung Giờ Vàng</h3>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-yellow-500/50 text-yellow-400 bg-yellow-500/10 mt-1 inline-block">
                                Thưởng x2 Cày Cuốc (1 giờ)
                            </span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-yellow-500/20 transition-colors">
                            <Flame size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-white/50 text-sm font-medium mb-2 leading-relaxed">May mắn tới liên tục. Gấp đôi số tiền thưởng sau mỗi câu trả lời đúng trong 1 giờ. (Giá cố định: 10 Kim Cương).</p>
                    {luckyTimeLeft && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-xl mt-2 mb-4">
                            <Clock size={12} className="text-yellow-400 animate-pulse" />
                            <span className="text-xs font-black italic tracking-wider text-yellow-400">{luckyTimeLeft}</span>
                        </div>
                    )}
                  </div>
                  <button 
                    onClick={() => buyAction('lucky')}
                    disabled={(user?.diamonds || 0) < 10}
                    className={`w-full flex flex-col items-center justify-center py-4 rounded-2xl font-black uppercase transition-all shadow-lg ${
                        (user?.diamonds || 0) < 10
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-yellow-600 text-white hover:bg-yellow-500 shadow-yellow-500/20 active:scale-95'
                    }`}
                  >
                        <span className="text-[10px] opacity-60">Kích hoạt</span>
                        <span className="text-sm flex items-center gap-1.5 text-cyan-300">
                            <Gem size={14} className="animate-pulse" /> 10
                        </span>
                  </button>
              </motion.div>

              {/* Intern Action (Sức Mạnh Thực Tập Sinh) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="glass-card p-6 rounded-[32px] border border-blue-500/10 flex flex-col justify-between group overflow-hidden relative md:col-span-2 lg:col-span-1"
              >
                  <div className="z-10">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-blue-400">Sức Mạnh Thực Tập Sinh</h3>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-blue-500/50 text-blue-400 bg-blue-500/10 mt-1 inline-block">
                                Thưởng x2 XP (1 giờ)
                            </span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-blue-500/20 transition-colors">
                            <Briefcase size={24} className="text-white" />
                        </div>
                    </div>
                    <p className="text-white/50 text-sm font-medium mb-2 leading-relaxed">Bị bóc lột nhưng bù lại học được nhiều. Gấp đôi XP nhận được mỗi câu đúng trong 1 giờ. (Giá cố định: 10 Kim Cương).</p>
                    {internTimeLeft && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-xl mt-2 mb-4">
                            <Clock size={12} className="text-blue-400 animate-pulse" />
                            <span className="text-xs font-black italic tracking-wider text-blue-400">{internTimeLeft}</span>
                        </div>
                    )}
                  </div>
                  <button 
                    onClick={() => buyAction('intern')}
                    disabled={(user?.diamonds || 0) < 10}
                    className={`w-full flex flex-col items-center justify-center py-4 rounded-2xl font-black uppercase transition-all shadow-lg ${
                        (user?.diamonds || 0) < 10
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20 active:scale-95'
                    }`}
                  >
                        <span className="text-[10px] opacity-60">Kích hoạt</span>
                        <span className="text-sm flex items-center gap-1.5 text-cyan-300">
                            <Gem size={14} className="animate-pulse" /> 10
                        </span>
                  </button>
              </motion.div>
          </div>
      )}
    </div>
  );
};

const MatchingGame = ({ question, onComplete }: { question: Question, onComplete: (isCorrect: boolean) => void, key?: any }) => {
    const [leftItems, setLeftItems] = useState<{ id: string, text: string }[]>([]);
    const [rightItems, setRightItems] = useState<{ id: string, text: string }[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [selectedRight, setSelectedRight] = useState<string | null>(null);
    const [matches, setMatches] = useState<string[]>([]); // Array of correctly matched IDs
    const [errorIds, setErrorIds] = useState<{ left: string | null, right: string | null }>({ left: null, right: null });

    useEffect(() => {
        if (question.pairs) {
            const left = [...question.pairs].map(p => ({ id: p.id, text: p.left })).sort(() => Math.random() - 0.5);
            const right = [...question.pairs].map(p => ({ id: p.id, text: p.right })).sort(() => Math.random() - 0.5);
            setLeftItems(left);
            setRightItems(right);
            setMatches([]);
            setSelectedLeft(null);
            setSelectedRight(null);
        }
    }, [question.id]);

    const handleSelectLeft = (id: string) => {
        if (matches.includes(id) || errorIds.left || errorIds.right) return;
        if (selectedLeft === id) {
            setSelectedLeft(null);
            return;
        }
        setSelectedLeft(id);
        if (selectedRight) {
            checkMatch(id, selectedRight);
        }
    };

    const handleSelectRight = (id: string) => {
        if (matches.includes(id) || errorIds.left || errorIds.right) return;
        if (selectedRight === id) {
            setSelectedRight(null);
            return;
        }
        setSelectedRight(id);
        if (selectedLeft) {
            checkMatch(selectedLeft, id);
        }
    };

    const checkMatch = (leftId: string, rightId: string) => {
        if (leftId === rightId) {
            const newMatches = [...matches, leftId];
            setMatches(newMatches);
            setSelectedLeft(null);
            setSelectedRight(null);
            
            // Audio feedback
            const correctAudio = new Audio('/sounds/correct.mp3');
            correctAudio.play().catch(() => {});

            if (newMatches.length === 3) {
                setTimeout(() => onComplete(true), 800);
            }
        } else {
            setErrorIds({ left: leftId, right: rightId });
            // Audio feedback
            const wrongAudio = new Audio('/sounds/wrong.mp3');
            wrongAudio.play().catch(() => {});
            
            setTimeout(() => {
                setErrorIds({ left: null, right: null });
                setSelectedLeft(null);
                setSelectedRight(null);
            }, 500);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg mx-auto">
            <div className="space-y-3">
                <div className="text-[10px] font-black uppercase text-blue-400/50 mb-2 text-center tracking-widest">Tiếng Anh</div>
                {leftItems.map(item => {
                    const isMatched = matches.includes(item.id);
                    const isError = errorIds.left === item.id;
                    const isSelected = selectedLeft === item.id;
                    
                    return (
                        <motion.button
                            key={item.id}
                            whileHover={!isMatched ? { scale: 1.02 } : {}}
                            whileTap={!isMatched ? { scale: 0.98 } : {}}
                            animate={isError ? { x: [0, -5, 5, -5, 5, 0] } : isMatched ? { scale: [1, 1.05, 1] } : {}}
                            onClick={() => handleSelectLeft(item.id)}
                            className={`w-full py-4 pl-4 pr-12 rounded-3xl border-2 transition-all font-black text-xs sm:text-sm uppercase italic min-h-[64px] flex items-center justify-center text-center relative
                                ${isMatched ? 'bg-green-500/20 border-green-500/50 text-green-400 cursor-default' :
                                  isError ? 'bg-red-500/20 border-red-500 text-red-400' :
                                  isSelected ? 'bg-blue-500/40 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' :
                                  'bg-white/5 border-white/10 hover:border-white/30 text-white/80'}
                            `}
                        >
                            <span>{item.text}</span>
                            {!isMatched && (
                                <div 
                                    onClick={(e) => { e.stopPropagation(); playAudio(item.text); }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                                    title="Nghe phát âm"
                                >
                                    <Volume2 size={16} />
                                </div>
                            )}
                        </motion.button>
                    )
                })}
            </div>
            <div className="space-y-3">
                <div className="text-[10px] font-black uppercase text-blue-400/50 mb-2 text-center tracking-widest">Nghĩa Tiếng Việt</div>
                {rightItems.map(item => {
                    const isMatched = matches.includes(item.id);
                    const isError = errorIds.right === item.id;
                    const isSelected = selectedRight === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            whileHover={!isMatched ? { scale: 1.02 } : {}}
                            whileTap={!isMatched ? { scale: 0.98 } : {}}
                            animate={isError ? { x: [0, -5, 5, -5, 5, 0] } : isMatched ? { scale: [1, 1.05, 1] } : {}}
                            onClick={() => handleSelectRight(item.id)}
                            className={`w-full p-4 rounded-3xl border-2 transition-all font-black text-[10px] sm:text-xs uppercase italic min-h-[64px] flex items-center justify-center text-center leading-tight
                                ${isMatched ? 'bg-green-500/20 border-green-500/50 text-green-400 cursor-default' :
                                  isError ? 'bg-red-500/20 border-red-500 text-red-400' :
                                  isSelected ? 'bg-blue-500/40 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' :
                                  'bg-white/5 border-white/10 hover:border-white/30 text-white/80'}
                            `}
                        >
                            {item.text}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    );
};

const SpellingBuilderGame = ({ question, onComplete }: { question: Question, onComplete: (isCorrect: boolean) => void, key?: any }) => {
    const [filledIndices, setFilledIndices] = useState<number[]>([]);
    const [errorIndex, setErrorIndex] = useState<number | null>(null);

    // Ensure we have spelling_builder specific fields
    const correctWord = question.correct_word || '';
    const letters = question.letters || [];
    const expectedChar = correctWord[filledIndices.length];

    const handleSelectLetter = (index: number) => {
        if (filledIndices.includes(index) || errorIndex !== null) return;
        
        const clickedChar = letters[index];
        
        if (clickedChar.toLowerCase() === expectedChar?.toLowerCase()) {
            const newFilled = [...filledIndices, index];
            setFilledIndices(newFilled);
            
            const correctAudio = new Audio('/sounds/correct.mp3');
            correctAudio.play().catch(() => {});
            
            if (newFilled.length === question.slots) {
                setTimeout(() => onComplete(true), 800);
            }
        } else {
            setErrorIndex(index);
            const wrongAudio = new Audio('/sounds/wrong.mp3');
            wrongAudio.play().catch(() => {});
            
            setTimeout(() => {
                setErrorIndex(null);
            }, 800);
        }
    };

    return (
        <motion.div 
            animate={errorIndex !== null ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-lg mx-auto flex flex-col items-center p-6 rounded-3xl transition-colors duration-300 ${errorIndex !== null ? 'bg-red-500/20' : 'bg-transparent'}`}
        >
            {/* Nghĩa hiển thị bự bự như MCQ */}
            <div className="mb-8 text-center px-4">
                <span className="text-[10px] font-black uppercase text-blue-400/50 tracking-widest block mb-2">Ý NGHĨA</span>
                <h3 className="text-xl sm:text-2xl font-black italic text-white leading-tight">
                    "{question.text}"
                </h3>
            </div>

            {/* Slots */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {Array.from({ length: question.slots || 0 }).map((_, i) => {
                    const isFilled = i < filledIndices.length;
                    const char = isFilled ? letters[filledIndices[i]] : '';
                    const isCurrent = i === filledIndices.length;
                    return (
                        <div 
                            key={i} 
                            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-black text-xl sm:text-2xl uppercase rounded-xl border-2 transition-all
                                ${isFilled ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 
                                  isCurrent ? 'bg-white/10 border-white/40 ring-2 ring-white/20' : 
                                  'bg-white/5 border-white/10'}
                            `}
                        >
                            {char}
                        </div>
                    );
                })}
            </div>

            {/* Letter Bank */}
            <div className="flex flex-wrap justify-center gap-3">
                {letters.map((char, index) => {
                    const isUsed = filledIndices.includes(index);
                    const isError = errorIndex === index;
                    return (
                        <motion.button
                            key={index}
                            whileHover={!isUsed ? { scale: 1.05 } : {}}
                            whileTap={!isUsed ? { scale: 0.95 } : {}}
                            animate={isError ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                            disabled={isUsed}
                            onClick={() => handleSelectLetter(index)}
                            className={`w-12 h-12 sm:w-14 sm:h-14 font-black text-2xl uppercase flex items-center justify-center rounded-2xl border-2 transition-all
                                ${isUsed ? 'bg-transparent border-transparent text-white/10 cursor-default shadow-none pointer-events-none' : 
                                  isError ? 'bg-red-500 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
                                  'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 shadow-lg'}
                            `}
                        >
                            {char}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
};

const EarnMoney = () => {
  const { onAnswer, user } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [status, setStatus] = useState<'answering' | 'correct' | 'wrong' | 'penalty'>('answering');
  const [selected, setSelected] = useState<string | null>(null);
  const [penaltyTime, setPenaltyTime] = useState(0);

  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const startNextQuestion = (lastWordId?: string) => {
    const currentUser = userRef.current;
    const wordProgress = currentUser?.wordProgress || {};
    const activeWordIds = currentUser?.activeWordIds || [];
    const recentWordIds = currentUser?.recentWordIds || [];
    const currentStreak = currentUser?.currentStreak || 0;
    
    const word = getNextWord(wordProgress, lastWordId, activeWordIds, currentUser?.currentQuestionIndex || 0, recentWordIds, currentStreak, currentUser?.currentDifficulty);
    setCurrentQuestion(generateQuestion(word, currentUser?.wordProgress, currentUser?.currentDifficulty));
    setStatus('answering');
    setSelected(null);
  };

  useEffect(() => {
    if (!currentQuestion) {
       startNextQuestion();
    }
  }, []);

  useEffect(() => {
    if (status === 'answering' && currentQuestion) {
      if (currentQuestion.type === 'matching' && currentQuestion.pairs) {
        const textToRead = currentQuestion.pairs.map(p => p.left).join(', ');
        playAudio(textToRead);
      } else {
        const targetW = getAllWords().find(w => w.id === currentQuestion.wordId);
        if (targetW) {
          playAudio(targetW.word);
        }
      }
    }
  }, [currentQuestion, status]);

  const handleMCQ = (ans: string | boolean) => {
    if (status !== 'answering' || !currentQuestion) return;
    
    setSelected(String(ans));
    const isCorrect = ans === currentQuestion.answer;
    const answeredWordId = currentQuestion.wordId; // Capture ID before timeout

    const isInternActive = !!user?.internBuffExpiresAt && user.internBuffExpiresAt > Date.now();

    if (isCorrect) {
      const xpReward = 5;
      setStatus('correct');
      onAnswer(true, answeredWordId, undefined, xpReward);
      setTimeout(() => startNextQuestion(answeredWordId), 1200);
    } else {
      const xpReward = 0;
      setStatus('wrong');
      onAnswer(false, answeredWordId, undefined, xpReward);
      setTimeout(() => {
        setStatus('penalty');
        setPenaltyTime(5);
        const timer = setInterval(() => {
          setPenaltyTime(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              startNextQuestion(answeredWordId);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1000);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="mb-6 flex justify-center items-center px-4">
          <div className="text-xs font-black uppercase text-blue-400 italic bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              <Infinity size={14} className="inline mr-2" />
              Chế độ Cày cuốc Vô tận
          </div>
      </div>

      <div className="glass-card p-10 rounded-[40px] min-h-[450px] flex flex-col justify-center relative overflow-hidden text-white border border-white/10">
        
        {/* Correct Result Overlay */}
        <AnimatePresence>
          {status === 'correct' && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-blue-600/95 z-30 flex flex-col items-center justify-center text-center p-6"
             >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    className="p-6 rounded-full bg-white/20 mb-6 border border-white/20"
                >
                  <CheckCircle2 size={70} className="text-white" />
                </motion.div>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">CHÍNH XÁC!</h2>
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="glass p-4 rounded-3xl col-span-2 sm:col-span-1 border border-white/10">
                    <div className="text-[10px] uppercase font-black opacity-50 mb-1">Thu nhập</div>
                    <div className="flex flex-col items-center justify-center gap-1">
                      {user?.luckyBuffExpiresAt && user.luckyBuffExpiresAt > Date.now() ? (
                        <>
                          <div className="text-2xl font-black text-yellow-400">+${(1 + user!.level * 0.5) * 2}</div>
                          <div className="flex flex-col items-center gap-0.5 mt-1 border-t border-white/10 pt-1">
                            <span className="text-[10px] font-bold text-white/60">+${(1 + (user!.level) * 0.5)} (Cơ bản)</span>
                            <span className="text-[10px] font-bold text-yellow-400/80 mb-0.5">
                                +${(1 + (user!.level) * 0.5)} (Thời tới)
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl font-black">+${(1 + user!.level * 0.5)}</div>
                      )}
                    </div>
                  </div>
                  <div className="glass p-4 rounded-3xl col-span-2 sm:col-span-1 flex flex-col justify-center">
                    <div className="text-[10px] uppercase font-black opacity-50 mb-1">Kinh nghiệm</div>
                    <div className="flex flex-col items-center justify-center gap-1">
                      {(user?.internBuffExpiresAt && user.internBuffExpiresAt > Date.now()) ? (
                        <>
                          <div className="text-3xl font-black text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">+10 XP</div>
                          <div className="flex flex-col items-center gap-1 mt-2 border-t border-white/20 pt-2 w-full">
                            <span className="text-[10px] font-black text-white px-2 py-0.5 bg-white/10 rounded break-all whitespace-normal">Cơ bản: +5 XP</span>
                            <span className="text-[10px] font-black text-blue-200 px-2 py-0.5 bg-blue-500/20 rounded break-all whitespace-normal">
                                TTS: +5 XP
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl font-black">+5 XP</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="glass p-6 w-full max-w-sm rounded-3xl text-left border border-white/20">
                   <p className="text-white/80 font-medium leading-relaxed italic text-sm whitespace-pre-wrap">{currentQuestion?.explanation}</p>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {status === 'penalty' && (
          <div className="absolute inset-0 bg-red-600/95 flex flex-col items-center justify-center p-10 text-center z-30">
            <Clock size={60} className="text-white mb-6 animate-bounce" />
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">THÔNG TIN SAI!</h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <p className="text-white/80 font-bold text-sm uppercase flex items-center gap-2 whitespace-nowrap">
                  Án treo: <span className="p-2 rounded-xl bg-white text-red-600 font-mono">{penaltyTime}s</span>
                </p>
            </div>
            <div className="glass p-8 w-full rounded-3xl text-left border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={20} className="text-white" />
                <div className="text-[10px] uppercase font-black text-white/50">Lẽ ra phải là:</div>
              </div>
              <div className="text-2xl font-black text-white mb-4 italic">
                {typeof currentQuestion?.answer === 'boolean' ? (currentQuestion.answer ? 'Đúng' : 'Sai') : String(currentQuestion?.answer)}
              </div>
              <div className="h-px bg-white/10 w-full mb-4"></div>
              <p className="text-white font-medium leading-relaxed italic text-sm whitespace-pre-wrap">{currentQuestion?.explanation}</p>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <div className="flex justify-between items-center opacity-40">
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">
               LOẠI HÌNH: {currentQuestion?.type.toUpperCase()}
             </span>
             <div className="flex gap-2">
                <Flame size={14} className={user && user.currentStreak > 0 ? 'text-orange-500' : ''} />
                <span className="text-[10px] font-black">{user?.currentStreak || 0} Chuỗi</span>
             </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-black text-white text-center leading-[1.2] px-4 italic">
                &ldquo;{currentQuestion?.text}&rdquo;
            </h2>
            {currentQuestion?.type !== 'matching' && (() => {
               const targetW = getAllWords().find(w => w.id === currentQuestion?.wordId);
               if (targetW) {
                 return (
                    <button 
                         onClick={() => playAudio(targetW.word)}
                         className="p-3 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/30 rounded-full text-blue-300 transition-colors"
                         title="Nghe phát âm"
                     >
                         <Volume2 size={24} />
                     </button>
                 );
               }
               return null;
            })()}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion?.type === 'mcq' || currentQuestion?.type === 'fill' ? (
              currentQuestion.options?.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleMCQ(opt)}
                    disabled={status !== 'answering'}
                    className={`
                      w-full p-5 rounded-2xl border transition-all text-left font-black text-sm relative group
                      ${selected === opt 
                          ? (status === 'correct' ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400') 
                          : (status !== 'answering' && opt === currentQuestion.answer ? 'bg-green-500/20 border-green-400' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20')}
                    `}
                  >
                    <span className="flex justify-between items-center relative z-10 capitalize">
                      {opt}
                      {selected === opt && (status === 'correct' ? <CheckCircle2 size={18} /> : <XCircle size={18} />)}
                    </span>
                  </button>
                ))
              ) : currentQuestion?.type === 'boolean' ? (
                <div className="grid grid-cols-2 gap-4">
                    <button 
                         onClick={() => handleMCQ(true)}
                         disabled={status !== 'answering'}
                         className="p-8 rounded-3xl bg-green-600/20 border border-green-500/30 hover:bg-green-600/40 font-black text-2xl uppercase italic"
                    >
                        Đúng
                    </button>
                    <button 
                         onClick={() => handleMCQ(false)}
                         disabled={status !== 'answering'}
                         className="p-8 rounded-3xl bg-red-600/20 border border-red-500/30 hover:bg-red-600/40 font-black text-2xl uppercase italic"
                    >
                        Sai
                    </button>
                </div>
            ) : currentQuestion?.type === 'matching' ? (
                <MatchingGame 
                    key={currentQuestion.id}
                    question={currentQuestion} 
                    onComplete={(isCorrect) => handleMCQ(isCorrect ? "completed" : "wrong")} 
                />
            ) : currentQuestion?.type === 'spelling_builder' ? (
                <SpellingBuilderGame 
                    key={currentQuestion.id}
                    question={currentQuestion} 
                    onComplete={(isCorrect) => handleMCQ(isCorrect ? (currentQuestion.correct_word || currentQuestion.answer as string) : "wrong")} 
                />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const Quests = () => {
    const { user, claimQuest, claimAchievement } = useGame();
    if (!user) return null;

    return (
        <div className="space-y-12">
            {/* Daily Quests Section */}
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-br from-white to-blue-300 bg-clip-text text-transparent pb-1 leading-tight">Nhiệm vụ Ngày</h2>
                    <p className="text-white/40 text-sm font-medium">Hoàn thành để nhận thưởng Tiền USD và Kim Cương. (Reset mỗi ngày)</p>
                </div>

                <div className="space-y-4">
                    {user.dailyQuests.map(q => (
                        <div key={q.id} className={`glass-card p-6 rounded-[32px] flex items-center justify-between border-2 transition-all ${q.claimed ? 'border-white/5 opacity-40' : q.completed ? 'border-green-500/50 bg-green-500/10' : 'border-white/5 opacity-60 hover:opacity-100'}`}>
                            <div className="flex items-center gap-5">
                                <div className={`p-4 rounded-2xl ${q.claimed ? 'bg-white/5 text-white/20' : q.completed ? 'bg-green-600 text-white' : 'bg-white/5 text-white/50'}`}>
                                    {q.type === 'login' ? <Calendar size={20}/> : q.type === 'answer' ? <Target size={20}/> : q.type === 'fix_error' ? <AlertCircle size={20}/> : <Flame size={20}/>}
                                </div>
                                <div>
                                    <h3 className={`font-black uppercase tracking-tight text-lg italic ${q.claimed ? 'text-white/20' : q.completed ? 'text-white' : 'text-white/50'}`}>{q.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-1">
                                        <span className={`text-xs font-black uppercase ${q.claimed ? 'text-white/20' : 'text-yellow-400'}`}>+${q.reward}</span>
                                        {!!q.rewardDiamonds && (
                                            <>
                                                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                                <span className={`text-xs font-black uppercase flex items-center gap-1 ${q.claimed ? 'text-white/20' : 'text-cyan-300'}`}>
                                                    +{q.rewardDiamonds} <Gem size={12} className="inline" />
                                                </span>
                                            </>
                                        )}
                                        <div className="w-1 h-1 rounded-full bg-white/20"></div>
                                        <span className={`text-[10px] font-black uppercase ${q.claimed ? 'text-white/10' : 'text-white/30'}`}>Hằng ngày</span>
                                    </div>
                                </div>
                            </div>
                            {q.claimed ? (
                                <div className="flex items-center gap-2 text-white/20 font-black text-[10px] uppercase italic">
                                    <CheckCircle2 size={12} /> Đã nhận
                                </div>
                            ) : q.completed ? (
                                <button 
                                    onClick={() => claimQuest(q.id)}
                                    className="bg-green-500 hover:bg-green-400 text-white font-black text-xs uppercase italic px-6 py-2.5 rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                                >
                                    Nhận thưởng
                                </button>
                            ) : (
                                <div className="text-white/20 font-black text-[10px] uppercase italic">Đang thực hiện...</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Seasonal Achievements Section */}
            <div className="space-y-6 pt-6 border-t border-white/5">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-3">
                        <Trophy size={12} /> Hệ thống Mùa giải
                    </div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-br from-white to-cyan-300 bg-clip-text text-transparent pb-1 leading-tight">Thành tựu Mùa</h2>
                    <p className="text-white/40 text-sm font-medium">Cột mốc vinh quang mang lại lượng lớn Kim Cương. (Reset theo mùa)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(user.achievements || []).map(ach => (
                        <div key={ach.id} className={`glass-card p-5 rounded-[28px] flex flex-col justify-between border-2 transition-all relative overflow-hidden ${ach.claimed ? 'border-white/5 opacity-40' : ach.completed ? 'border-cyan-500/50 bg-cyan-500/5 group' : 'border-white/5 opacity-60 hover:opacity-100'}`}>
                            {ach.completed && !ach.claimed && (
                                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                            )}
                            <div className="flex items-start gap-4 mb-4 relative z-10">
                                <div className={`p-3 rounded-2xl shrink-0 mt-0.5 ${ach.claimed ? 'bg-white/5 text-white/20' : ach.completed ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' : 'bg-white/5 text-white/40'}`}>
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h3 className={`font-black uppercase tracking-tight text-base italic leading-tight mb-1 ${ach.claimed ? 'text-white/20' : ach.completed ? 'text-white' : 'text-white/70'}`}>{ach.title}</h3>
                                    <p className="text-xs text-white/40 font-medium leading-relaxed">{ach.desc}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/5 relative z-10 mt-auto">
                                <div className="flex items-center gap-1.5 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20 text-cyan-300 font-black text-xs">
                                    +{ach.rewardDiamonds} <Gem size={12} className="animate-pulse" />
                                </div>

                                {ach.claimed ? (
                                    <div className="flex items-center gap-1 text-white/20 font-black text-[10px] uppercase italic">
                                        <CheckCircle2 size={12} /> Đã nhận
                                    </div>
                                ) : ach.completed ? (
                                    <button 
                                        onClick={() => claimAchievement(ach.id)}
                                        className="bg-cyan-500 hover:bg-cyan-400 text-white font-black text-xs uppercase italic px-5 py-2 rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                                    >
                                        Nhận thưởng
                                    </button>
                                ) : (
                                    <div className="text-white/20 font-black text-[10px] uppercase italic">Chưa đạt</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DIFFICULTY_CONFIG: Record<DifficultyLevel, { label: string; desc: string; color: string; gradient: string; border: string; bg: string; icon: React.ReactNode; wordCount: number; badge: string }> = {
    easy: { label: 'Easy', desc: 'A1–A2 • Từ vựng cơ bản cho người mất gốc', color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-600', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', icon: <Star size={24} className="text-emerald-400" />, wordCount: EASY_WORDS.length, badge: 'bg-emerald-500' },
    intermediate: { label: 'Intermediate', desc: 'B1–B2 • Từ vựng trung cấp cho kỳ thi TOEIC', color: 'text-blue-400', gradient: 'from-blue-500 to-indigo-600', border: 'border-blue-500/30', bg: 'bg-blue-500/10', icon: <Shield size={24} className="text-blue-400" />, wordCount: INTERMEDIATE_WORDS.length, badge: 'bg-blue-500' },
    hard: { label: 'Hard', desc: 'C1+ • Từ vựng nâng cao', color: 'text-rose-400', gradient: 'from-rose-500 to-purple-600', border: 'border-rose-500/30', bg: 'bg-rose-500/10', icon: <Crown size={24} className="text-rose-400" />, wordCount: HARD_WORDS.length, badge: 'bg-rose-500' },
};

const MasteryCircle = ({ progress, size = 60, color, label }: { progress: number; size?: number; color: string; label?: string }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    return (
        <div className="relative flex flex-col items-center gap-1">
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size/2} cy={size/2} r={radius} strokeWidth={4} stroke="rgba(255,255,255,0.1)" fill="none" />
                <circle cx={size/2} cy={size/2} r={radius} strokeWidth={4} stroke={color} fill="none"
                    strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                    className="transition-all duration-700"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-white">{Math.round(progress)}%</span>
            </div>
            {label && <span className="text-[9px] font-black uppercase text-white/40 tracking-wider">{label}</span>}
        </div>
    );
};

const Library = () => {
    const { user, setDifficulty } = useGame();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewLevel, setViewLevel] = useState<DifficultyLevel | null>(null);
    
    const wpByDiff = user?.wordProgressByDifficulty || { easy: {}, intermediate: {}, hard: {} };

    // Calculate mastery for each level
    const getMastery = (level: DifficultyLevel) => {
        const pool = getWordsByDifficulty(level);
        const wp = wpByDiff[level] || {};
        const mastered = pool.filter(w => (wp[w.id]?.consecutiveCorrect || 0) >= 5).length;
        return { mastered, total: pool.length, percent: pool.length > 0 ? (mastered / pool.length) * 100 : 0 };
    };

    const getProgressColorForWord = (consecutiveCorrect: number) => {
        if (consecutiveCorrect >= 5) return 'text-green-500';
        if (consecutiveCorrect >= 3) return 'text-yellow-400';
        if (consecutiveCorrect >= 1) return 'text-orange-400';
        return 'text-white/20';
    };

    const getProgressPercentForWord = (consecutiveCorrect: number) => {
        if (consecutiveCorrect >= 5) return 100;
        if (consecutiveCorrect >= 3) return 60;
        if (consecutiveCorrect >= 1) return 30;
        return 0;
    };

    // If viewing a specific level's word list
    if (viewLevel) {
        const config = DIFFICULTY_CONFIG[viewLevel];
        const wp = wpByDiff[viewLevel] || {};
        const pool = getWordsByDifficulty(viewLevel);
        const filteredWords = pool.filter(w => {
            const wordText = w.word || '';
            const meaningText = w.meaning || '';
            return wordText.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   meaningText.toLowerCase().includes(searchTerm.toLowerCase());
        });
        const mastery = getMastery(viewLevel);

        return (
            <div className="space-y-6">
                <button 
                    onClick={() => { setViewLevel(null); setSearchTerm(''); }}
                    className="flex items-center gap-2 text-white/50 hover:text-white font-black text-sm uppercase transition-colors"
                >
                    <ChevronLeft size={16} /> Quay lại kho từ vựng
                </button>

                <div className={`glass-card p-6 rounded-[32px] border-2 ${config.border} ${config.bg}`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
                                {config.icon}
                            </div>
                            <div>
                                <h2 className={`text-2xl font-black uppercase italic tracking-tighter ${config.color}`}>{config.label}</h2>
                                <p className="text-white/40 text-xs font-medium">{config.desc} • {config.wordCount} từ</p>
                            </div>
                        </div>
                        <MasteryCircle 
                            progress={mastery.percent} 
                            color={viewLevel === 'easy' ? '#34d399' : viewLevel === 'intermediate' ? '#60a5fa' : '#fb7185'}
                            label={`${mastery.mastered}/${mastery.total}`}
                        />
                    </div>
                </div>

                <div className="max-w-md mx-auto">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm từ vựng hoặc nghĩa..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 font-medium focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2 max-w-4xl mx-auto">
                    {filteredWords.map((w, index) => {
                        const wordProg = wp[w.id];
                        const cc = wordProg?.consecutiveCorrect || 0;
                        const pPercent = getProgressPercentForWord(cc);
                        const pColor = getProgressColorForWord(cc);
                        const radius = 9;
                        const circumference = 2 * Math.PI * radius;
                        const offset = circumference - (pPercent / 100) * circumference;

                        return (
                            <motion.div 
                                key={w.id} 
                                initial={{ opacity: 0, y: 5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`py-3 px-4 rounded-xl border flex flex-col gap-0.5 hover:bg-white/10 transition-colors bg-white/5 border-white/5`}
                            >
                                <div className="flex items-center gap-3 flex-wrap">
                                    <svg width={22} height={22} className="-rotate-90">
                                        <circle cx={11} cy={11} r={radius} strokeWidth={2.5} stroke="rgba(255,255,255,0.1)" fill="none" />
                                        <circle cx={11} cy={11} r={radius} strokeWidth={2.5} stroke="currentColor" fill="none"
                                            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                                            className={`${pColor} transition-all duration-500`}
                                        />
                                    </svg>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-blue-300 text-base">{index + 1}. {w.word}</span>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); playAudio(w.word); }}
                                            className="p-1 bg-white/5 hover:bg-white/10 rounded-full text-blue-300/70 hover:text-blue-300 transition-colors"
                                            title="Nghe phát âm"
                                        >
                                            <Volume2 size={14} />
                                        </button>
                                    </div>
                                    {w.pos && <span className="text-white/40 text-xs font-mono">{w.pos}</span>}
                                    <span className="text-white/80 font-medium text-sm ml-1">{w.meaning}</span>
                                    {cc >= 5 && <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-md border border-green-500/30">MASTER</span>}
                                </div>
                                <div className="pl-9 text-white/50 text-xs italic">
                                    {w.example}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                {filteredWords.length === 0 && (
                    <div className="text-center text-white/30 font-bold uppercase py-10 italic">
                        Không tìm thấy từ vựng nào.
                    </div>
                )}
            </div>
        );
    }

    // Main level selector view
    return (
        <div className="space-y-8">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter bg-gradient-to-br from-white to-blue-300 bg-clip-text text-transparent underline decoration-blue-500/30 underline-offset-8 pb-1 leading-tight">KHO TỪ VỰNG</h2>
                <p className="text-white/40 text-sm font-medium mt-4">Chọn kho từ vựng phù hợp với trình độ của bạn. Tổng cộng {getAllWords().length} từ.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {(['easy', 'intermediate', 'hard'] as DifficultyLevel[]).map(level => {
                    const config = DIFFICULTY_CONFIG[level];
                    const mastery = getMastery(level);
                    const isActive = user?.currentDifficulty === level;

                    return (
                        <motion.div
                            key={level}
                            whileHover={{ scale: 1.02 }}
                            className={`glass-card p-6 rounded-[32px] border-2 flex flex-col justify-between relative overflow-hidden group transition-all ${isActive ? `${config.border} ${config.bg} shadow-lg` : 'border-white/10 hover:border-white/20'}`}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <div className={`absolute top-4 right-4 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white ${config.badge}`}>
                                    Đang Triển
                                </div>
                            )}
                            
                            {/* Decorative glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20 ${config.bg}`}></div>

                            <div className="relative z-10">
                                {/* Icon & Title */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
                                        {config.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-black uppercase italic tracking-tight ${config.color}`}>{config.label}</h3>
                                        <span className="text-white/30 text-[10px] font-black uppercase">{config.wordCount} từ vựng</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-white/50 text-sm font-medium mb-6 leading-relaxed">{config.desc}</p>

                                {/* Mastery Circle */}
                                <div className="flex items-center justify-center mb-6">
                                    <MasteryCircle
                                        progress={mastery.percent}
                                        size={80}
                                        color={level === 'easy' ? '#34d399' : level === 'intermediate' ? '#60a5fa' : '#fb7185'}
                                        label={`${mastery.mastered}/${mastery.total} thành thạo`}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 relative z-10">
                                <button
                                    onClick={() => { setDifficulty(level); }}
                                    className={`w-full py-3 rounded-2xl font-black uppercase text-xs transition-all shadow-lg active:scale-95 ${
                                        isActive 
                                            ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg` 
                                            : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                                    }`}
                                >
                                    {isActive ? '✓ Đang Triển Kho Này' : 'Triển'}
                                </button>
                                <button
                                    onClick={() => setViewLevel(level)}
                                    className="w-full py-2.5 rounded-2xl font-black uppercase text-[10px] bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                >
                                    Xem danh sách từ →
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// --- MAIN APP ---

const GameApp = () => {
  const { user, logout, notification, showLevelUp, setShowLevelUp, setDifficulty } = useGame();
  const [activeTab, setActiveTab] = useState<'dash' | 'shop' | 'earn' | 'quest' | 'lib' | 'rank'>('dash');
  const [showDifficultySwitch, setShowDifficultySwitch] = useState(false);

  if (!user) return <Auth />;

  return (
    <div className="min-h-screen pb-32 pt-6 relative px-4">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
         <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] transition-all"></div>
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] transition-all"></div>
      </div>

      {/* Global Notification Overlay */}
      <AnimatePresence>
        {notification && (
            <motion.div 
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, x: '-50%' }}
                className="fixed bottom-28 left-1/2 z-[100] pointer-events-none"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm font-black uppercase italic tracking-tight text-white/90">{notification}</span>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Global Overlay */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-yellow-500 to-amber-600 p-10 rounded-[40px] text-center text-white border-4 border-white shadow-2xl"
            >
              <Award size={100} className="mx-auto mb-6 animate-bounce" />
              <h2 className="text-6xl font-black italic uppercase mb-2">LÊN CẤP!</h2>
              <p className="text-2xl font-black mb-8">Cấp {showLevelUp.from} {'->'} {showLevelUp.to}</p>
              <button 
                  onClick={() => setShowLevelUp(null)}
                  className="bg-white text-yellow-600 font-black px-10 py-4 rounded-2xl text-xl uppercase italic shadow-lg active:scale-95 transition-all"
              >
                  Tuyệt vời!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Difficulty Switch Modal */}
      <AnimatePresence>
        {showDifficultySwitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 flex items-center justify-center p-6"
            onClick={() => setShowDifficultySwitch(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-8 rounded-[32px] max-w-md w-full border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-center mb-6">Đổi Kho Từ Vựng</h3>
              <div className="space-y-3">
                {(['easy', 'intermediate', 'hard'] as DifficultyLevel[]).map(level => {
                  const config = DIFFICULTY_CONFIG[level];
                  const isActive = user.currentDifficulty === level;
                  return (
                    <button
                      key={level}
                      onClick={() => { setDifficulty(level); setShowDifficultySwitch(false); }}
                      className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all border-2 active:scale-95 ${
                        isActive
                          ? `${config.border} ${config.bg} shadow-lg`
                          : 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${config.gradient}`}>
                        {config.icon}
                      </div>
                      <div className="text-left flex-1">
                        <div className={`font-black uppercase italic text-sm ${config.color}`}>{config.label}</div>
                        <div className="text-white/30 text-[10px] font-bold">{config.wordCount} từ</div>
                      </div>
                      {isActive && <span className="text-[9px] font-black uppercase text-white/40">Đang triển</span>}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setShowDifficultySwitch(false)}
                className="w-full mt-4 py-3 bg-white/5 text-white/50 rounded-2xl font-black uppercase text-xs hover:bg-white/10 transition-all"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className="flex justify-between items-center glass p-6 rounded-[32px] px-8">
            <div className="flex items-center gap-3">
                {/* Đổi kho button */}
                {user.currentDifficulty && (
                    <button
                        onClick={() => setShowDifficultySwitch(true)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all active:scale-95 hover:bg-white/10 ${
                            user.currentDifficulty === 'easy' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                            user.currentDifficulty === 'intermediate' ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' :
                            'border-rose-500/30 bg-rose-500/10 text-rose-400'
                        }`}
                        title="Đổi kho từ vựng"
                    >
                        <ArrowLeftRight size={16} />
                        <span className="text-[10px] font-black uppercase hidden sm:inline">{DIFFICULTY_CONFIG[user.currentDifficulty].label}</span>
                    </button>
                )}
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-600/30 text-xl">
                    🏭
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tighter italic hidden sm:block text-gradient-rainbow">TOEIC Factory</h1>
            </div>
            <div className="flex items-center gap-4">
                {/* Global Currency Display */}
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-1.5 text-yellow-400 font-mono font-black text-sm sm:text-base" title="Số dư Tiền USD">
                        <span>💰</span>
                        <span>${user.balance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10"></div>
                    <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-black text-sm sm:text-base" title="Kim Cương">
                        <span className="animate-float">💎</span>
                        <span>{user.diamonds.toLocaleString()}</span>
                    </div>
                </div>

                <button onClick={logout} className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-500/20 hover:border-red-500/30 transition-all text-white active:scale-95" title="Đăng xuất">
                    <span className="text-lg">🚪</span>
                </button>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto">
        {/* Keep EarnMoney mounted so its internal states do not reset when switching tabs */}
        <div className={activeTab === 'earn' ? 'block animate-in fade-in slide-in-from-bottom-4 duration-500' : 'hidden'}>
            {!user.currentDifficulty ? (
                <div className="max-w-lg mx-auto mt-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-10 rounded-[40px] border border-white/10"
                    >
                        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                            <BookOpen size={40} className="text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-3">Chọn level mà bạn muốn</h2>
                        <p className="text-white/40 text-sm font-medium mb-8">Hãy vào <strong className="text-blue-400">Kho từ vựng</strong> để chọn trình độ trước khi bắt đầu cày cuốc.</p>
                        <button
                            onClick={() => setActiveTab('lib')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                        >
                            Đến Kho Từ Vựng →
                        </button>
                    </motion.div>
                </div>
            ) : (
                <EarnMoney />
            )}
        </div>

        {activeTab !== 'earn' && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                {activeTab === 'dash' && <Dashboard />}
                {activeTab === 'shop' && <Shop />}
                {activeTab === 'quest' && <Quests />}
                {activeTab === 'lib' && <Library />}
                {activeTab === 'rank' && <Leaderboard />}
              </motion.div>
            </AnimatePresence>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-white/5 backdrop-blur-3xl border border-white/10 p-2 flex justify-around rounded-[32px] shadow-2xl z-50">
        {[
            { id: 'dash', icon: '📊', label: 'Trạng thái' },
            { id: 'rank', icon: '🏆', label: 'Xếp hạng' },
            { id: 'shop', icon: '🛍️', label: 'Cửa hàng' },
            { id: 'earn', icon: '⛏️', label: 'Cày cuốc' },
            { id: 'quest', icon: '📝', label: 'Nhiệm vụ' },
            { id: 'lib', icon: '📚', label: 'Kho từ vựng' }
        ].map(tab => (
            <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center gap-0.5 flex-1 transition-all py-2.5 px-2 rounded-2xl relative
                    ${activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}
                `}
            >
                <div className={`text-xl ${activeTab === tab.id ? 'scale-125 drop-shadow-glow' : 'grayscale opacity-60'} transition-all duration-200`}>
                    {tab.icon}
                </div>
                <span className="text-[8px] font-black uppercase tracking-tight italic hidden md:block">{tab.label}</span>
                {activeTab === tab.id && (
                    <motion.div layoutId="nav-glow" className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-[2px] opacity-80" />
                )}
            </button>
        ))}
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
}
