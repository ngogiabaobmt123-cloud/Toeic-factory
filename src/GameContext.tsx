import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { UserStats, UserFactory, FACTORY_TEMPLATES, DailyQuest, Achievement, DifficultyLevel } from './types';
import { getUpdatedActivePool } from './vocabService';
import { supabase } from './lib/supabase';

const INITIAL_QUESTS: DailyQuest[] = [
  { id: 'q1', title: 'Điểm danh hằng ngày', reward: 10, rewardDiamonds: 1, completed: false, claimed: false, type: 'login' },
  { id: 'q3', title: 'Đúng 3 câu liên tiếp', reward: 10, rewardDiamonds: 1, completed: false, claimed: false, type: 'streak_3' },
  { id: 'q4', title: 'Đúng 5 câu liên tiếp', reward: 20, rewardDiamonds: 2, completed: false, claimed: false, type: 'streak_5' },
  { id: 'q5', title: 'Đúng 10 câu liên tiếp', reward: 30, rewardDiamonds: 3, completed: false, claimed: false, type: 'streak_10' },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'a_top3', title: 'Đạt Top 3 Bảng xếp hạng', rewardDiamonds: 5, completed: false, claimed: false, type: 'top_3' },
  { id: 'a_top2', title: 'Đạt Top 2 Bảng xếp hạng', rewardDiamonds: 10, completed: false, claimed: false, type: 'top_2' },
  { id: 'a_top1', title: 'Đạt Top 1 Bảng xếp hạng', rewardDiamonds: 15, completed: false, claimed: false, type: 'top_1' },
  { id: 'a_c100', title: 'Đúng tổng cộng 100 câu', rewardDiamonds: 5, completed: false, claimed: false, type: 'correct_100' },
  { id: 'a_c500', title: 'Đúng tổng cộng 500 câu', rewardDiamonds: 10, completed: false, claimed: false, type: 'correct_500' },
  { id: 'a_c1000', title: 'Đúng tổng cộng 1000 câu', rewardDiamonds: 20, completed: false, claimed: false, type: 'correct_1000' },
  { id: 'a_w50', title: 'Sai tổng cộng 50 câu', rewardDiamonds: 5, completed: false, claimed: false, type: 'wrong_50' },
  { id: 'a_w100', title: 'Sai tổng cộng 100 câu', rewardDiamonds: 10, completed: false, claimed: false, type: 'wrong_100' },
  { id: 'a_f1', title: 'Sở hữu 1 nhà máy', rewardDiamonds: 1, completed: false, claimed: false, type: 'factory_1' },
  { id: 'a_f2', title: 'Sở hữu 2 nhà máy', rewardDiamonds: 2, completed: false, claimed: false, type: 'factory_2' },
  { id: 'a_f3', title: 'Sở hữu 3 nhà máy', rewardDiamonds: 3, completed: false, claimed: false, type: 'factory_3' },
  { id: 'a_f4', title: 'Sở hữu 4 nhà máy', rewardDiamonds: 4, completed: false, claimed: false, type: 'factory_4' },
  { id: 'a_f5', title: 'Sở hữu 5 nhà máy', rewardDiamonds: 5, completed: false, claimed: false, type: 'factory_5' },
  { id: 'a_f6', title: 'Sở hữu 6 nhà máy', rewardDiamonds: 6, completed: false, claimed: false, type: 'factory_6' },
  { id: 'a_f7', title: 'Sở hữu 7 nhà máy', rewardDiamonds: 7, completed: false, claimed: false, type: 'factory_7' },
  { id: 'a_f8', title: 'Sở hữu 8 nhà máy', rewardDiamonds: 8, completed: false, claimed: false, type: 'factory_8' },
  { id: 'a_f9', title: 'Sở hữu 9 nhà máy', rewardDiamonds: 9, completed: false, claimed: false, type: 'factory_9' },
  { id: 'a_f10', title: 'Sở hữu 10 nhà máy', rewardDiamonds: 10, completed: false, claimed: false, type: 'factory_10' },
  { id: 'a_l1', title: 'Đạt Cấp độ 1', rewardDiamonds: 1, completed: false, claimed: false, type: 'level_1' },
  { id: 'a_l10', title: 'Đạt Cấp độ 10', rewardDiamonds: 5, completed: false, claimed: false, type: 'level_10' },
  { id: 'a_l20', title: 'Đạt Cấp độ 20', rewardDiamonds: 10, completed: false, claimed: false, type: 'level_20' },
  { id: 'a_l50', title: 'Đạt Cấp độ 50', rewardDiamonds: 20, completed: false, claimed: false, type: 'level_50' },
];

interface GameContextType {
  user: UserStats | null;
  register: (id: string, pass: string, displayName: string) => void;
  login: (id: string, pass: string) => void;
  logout: () => void;
  addMoney: (amount: number) => void;
  onAnswer: (isCorrect: boolean, wordId?: string, customMoney?: number, customXP?: number) => void;
  buyFactory: (factoryId: string) => void;
  upgradeFactory: (factoryId: string, upgradeType: 'income' | 'storage') => void;
  collectIncome: (factoryId?: string) => void;
  buyAction: (actionId: 'charity' | 'crisis' | 'capitalist' | 'lucky' | 'intern') => void;
  claimQuest: (questId: string) => void;
  claimAchievement: (achievementId: string) => void;
  factorySeconds: number; // Global time 0-59 for all factories
  currentWeek: number;
  notification: string | null;
  leaderboard: { id: string; name: string, balance: number, level: number, isUser?: boolean, rank: number, isSeparator?: boolean }[];
  myRank: number;
  taxSubRate: number; // Tax (-) or Subsidy (+) rate
  showLevelUp: {from: number, to: number} | null;
  setShowLevelUp: React.Dispatch<React.SetStateAction<{from: number, to: number} | null>>;
  leaderboardLastUpdated: Date | null;
  totalUsers: number;
  fetchLeaderboard: () => Promise<void>;
  setDifficulty: (level: DifficultyLevel) => void;
  loginAnonymously?: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserStats | null>(null);
  const userRef = useRef<UserStats | null>(null);
  const leaderboardRef = useRef<any[]>([]);
  const [leaderboardLastUpdated, setLeaderboardLastUpdated] = useState<Date | null>(null);
  const [userRank, setUserRank] = useState<number>(0);
  
  const lastSyncTimeRef = useRef<number>(Date.now());
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    const handleUnload = () => {
        if (syncTimeoutRef.current && userRef.current) {
            clearTimeout(syncTimeoutRef.current);
            // Can't easily use fetch/beacon with full supabase client inside unload, 
            // but we can try immediate local save if possible, or trust synchronous network in some cases.
            // Normally, sending a beacon is best, but standard sync is better than nothing.
            syncToSupabase(userRef.current, true);
        }
    };
    
    window.addEventListener('pagehide', handleUnload);
    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') handleUnload();
    });

    return () => {
        window.removeEventListener('pagehide', handleUnload);
        window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const [loadingAuth, setLoadingAuth] = useState(true);

  const getGameDocId = (sbUser: any) => {
    return sbUser?.id;
  };

  const syncToSupabase = async (updatedUser: UserStats, force: boolean = false) => {
    // Always clear existing timeout to debounce logic
    if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = null;
    }
    
    // If not forced, debounce the write by 3 seconds
    if (!force) {
        syncTimeoutRef.current = setTimeout(() => {
            // Use the latest user data available in the ref, fallback to passed data
            if (userRef.current) {
                syncToSupabase(userRef.current, true);
            }
        }, 3000);
        return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const docId = getGameDocId(session?.user);
    if (!docId) return;
    
    lastSyncTimeRef.current = Date.now();

    const payload = JSON.parse(JSON.stringify(updatedUser));
    
    // Remove fields that shouldn't be in the DB
    delete payload.recentWordIds;
    
    // Ensure id is present for upsert
    payload.id = docId;

    const performUpsert = async (retryCount = 0, currentPayload = payload) => {
      try {
        const { error } = await supabase.from('users').upsert(currentPayload, { onConflict: 'id' });
        if (error) throw error;
        console.log(`[Supabase Sync] Success for ${docId}${force ? ' (Forced)' : ''}`);
      } catch (err: any) {
        console.error(`[Supabase Sync] Failed for ${docId}:`, err);
        if (err?.code === 'PGRST205' || err?.code === 'PGRST204') {
            console.error('Missing DB columns. You need to run ALTER TABLE users ADD COLUMN "diamonds" numeric DEFAULT 0...');
            // Prevent spamming the alert
            if (!window.sessionStorage.getItem('db_column_error_shown')) {
                window.alert('⚠️ CƠ SỞ DỮ LIỆU CHƯA ĐƯỢC CẬP NHẬT!\n\nBạn chưa thêm cột cho các tính năng mới. Vui lòng vào SQL Editor của Supabase để chạy lệnh:\n\nALTER TABLE users ADD COLUMN IF NOT EXISTS "internCost" numeric, ADD COLUMN IF NOT EXISTS "internBuffExpiresAt" numeric, ADD COLUMN IF NOT EXISTS "diamonds" numeric DEFAULT 0, ADD COLUMN IF NOT EXISTS "totalWrongCount" numeric DEFAULT 0, ADD COLUMN IF NOT EXISTS "achievements" jsonb, ADD COLUMN IF NOT EXISTS "lastSeasonReset" text;\n\nHệ thống sẽ tạm thời lưu ở bộ nhớ trình duyệt để bảo toàn tiến trình của bạn.');
                window.sessionStorage.setItem('db_column_error_shown', 'true');
            }
            // Tối giản hóa payload chỉ giữ lại các cột mặc định chắc chắn tồn tại trên DB cũ
            const fallbackPayload = { 
                id: currentPayload.id,
                displayName: currentPayload.displayName,
                balance: currentPayload.balance,
                xp: currentPayload.xp,
                level: currentPayload.level,
                incomePerMinute: currentPayload.incomePerMinute,
                factories: currentPayload.factories,
                completedQuestions: currentPayload.completedQuestions,
                lastLogin: currentPayload.lastLogin,
                dailyQuests: currentPayload.dailyQuests,
                currentStreak: currentPayload.currentStreak,
                dailyCorrectCount: currentPayload.dailyCorrectCount,
                lastQuestReset: currentPayload.lastQuestReset,
            };
            if (retryCount < 2) {
                setTimeout(() => performUpsert(retryCount + 1, fallbackPayload), 1000);
            }
            return;
        }
        if (retryCount < 2) {
            setTimeout(() => performUpsert(retryCount + 1, currentPayload), 1000);
        }
      }
    };

    await performUpsert();
  };

  useEffect(() => {
    // Connection test
    const testConnection = async () => {
      try {
        await supabase.from('users').select('id').limit(1);
      } catch (error: any) {
        console.error("Please check your Supabase configuration.", error);
      }
    };
    testConnection();

    supabase.auth.onAuthStateChange((event, session) => {
        if (!session?.user) {
            setUser(null);
            setLoadingAuth(false);
        }
    });
  }, []);

  // Handle current user document sync
  useEffect(() => {
    let subscription: any = null;
    
    const setupListener = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const docId = getGameDocId(session?.user);
        if (!docId) return;

        // Fetch initial data
        const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', docId)
            .single();

        if (userData) {
            console.log(`[Supabase] Data loaded from server (${docId})`);
            // Merge with defaults to ensure all fields exist even if DB columns are missing
            // Migrate old wordProgress into per-difficulty if needed
            const savedDifficulty: DifficultyLevel | undefined = userData.currentDifficulty || undefined;
            let savedWPByDifficulty = userData.wordProgressByDifficulty || { easy: {}, intermediate: {}, hard: {} };
            // If there's old wordProgress but no per-difficulty data, migrate it
            if (userData.wordProgress && Object.keys(userData.wordProgress).length > 0 && savedDifficulty) {
                const hasAnyPerDiff = Object.values(savedWPByDifficulty).some((v: any) => Object.keys(v || {}).length > 0);
                if (!hasAnyPerDiff) {
                    savedWPByDifficulty[savedDifficulty] = userData.wordProgress;
                }
            }
            const activeWP = savedDifficulty ? (savedWPByDifficulty[savedDifficulty] || {}) : (userData.wordProgress || {});
            const savedQIByDifficulty = userData.currentQuestionIndexByDifficulty || { easy: 0, intermediate: 0, hard: 0 };
            const activeQI = savedDifficulty ? (savedQIByDifficulty[savedDifficulty] || 0) : (userData.currentQuestionIndex || 0);

            const mergedUser: UserStats = {
                uid: docId,
                displayName: userData.displayName || (session?.user.email?.split('@')[0] || "Người chơi mới"),
                balance: userData.balance || 0,
                diamonds: userData.diamonds !== undefined ? Number(userData.diamonds) : 0,
                xp: userData.xp || 0,
                level: userData.level || 0,
                incomePerMinute: userData.incomePerMinute || 0,
                factories: userData.factories || [],
                completedQuestions: userData.completedQuestions || 0,
                totalWrongCount: userData.totalWrongCount || 0,
                lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : new Date(),
                dailyQuests: INITIAL_QUESTS.map(baseQ => {
                    const existingQ = (userData.dailyQuests || []).find((q: any) => q.id === baseQ.id);
                    return existingQ ? { ...baseQ, completed: existingQ.completed, claimed: existingQ.claimed } : baseQ;
                }),
                achievements: INITIAL_ACHIEVEMENTS.map(baseAch => {
                    const existingAch = (userData.achievements || []).find((a: any) => a.id === baseAch.id);
                    return existingAch ? { ...baseAch, completed: existingAch.completed, claimed: existingAch.claimed } : baseAch;
                }),
                currentStreak: userData.currentStreak || 0,
                dailyCorrectCount: userData.dailyCorrectCount || 0,
                lastQuestReset: userData.lastQuestReset || new Date().toDateString(),
                missedWordIds: userData.missedWordIds || [],
                charityCount: userData.charityCount || 0,
                lastPayoutTimestamp: userData.lastPayoutTimestamp || Date.now(),
                activeWordIds: userData.activeWordIds || [],
                wordProgress: activeWP,
                wordProgressByDifficulty: savedWPByDifficulty,
                currentQuestionIndex: activeQI,
                currentQuestionIndexByDifficulty: savedQIByDifficulty,
                recentWordIds: [],
                capitalistBuffExpiresAt: userData.capitalistBuffExpiresAt || 0,
                capitalistCost: userData.capitalistCost || 500,
                luckyBuffExpiresAt: userData.luckyBuffExpiresAt || 0,
                luckyCost: userData.luckyCost || 100,
                internBuffExpiresAt: userData.internBuffExpiresAt || 0,
                internCost: userData.internCost || 100,
                lastSeasonReset: userData.lastSeasonReset || new Date().toISOString().slice(0, 7),
                currentDifficulty: savedDifficulty
            };
            setUser(mergedUser);
        } else {
            // First time logic
            const fallbackName = session?.user.email?.split('@')[0] || "Người chơi mới";
            const newUser: UserStats = {
                uid: docId,
                displayName: session?.user.user_metadata?.displayName || fallbackName,
                balance: 0,
                diamonds: 0,
                xp: 0,
                level: 0,
                incomePerMinute: 0,
                factories: [],
                completedQuestions: 0,
                totalWrongCount: 0,
                lastLogin: new Date(),
                dailyQuests: INITIAL_QUESTS,
                achievements: INITIAL_ACHIEVEMENTS,
                currentStreak: 0,
                dailyCorrectCount: 0,
                lastQuestReset: new Date().toDateString(),
                missedWordIds: [],
                charityCount: 0,
                lastPayoutTimestamp: Date.now(),
                activeWordIds: [],
                wordProgress: {},
                wordProgressByDifficulty: { easy: {}, intermediate: {}, hard: {} },
                currentQuestionIndex: 0,
                currentQuestionIndexByDifficulty: { easy: 0, intermediate: 0, hard: 0 },
                recentWordIds: [],
                capitalistBuffExpiresAt: 0,
                capitalistCost: 500,
                luckyBuffExpiresAt: 0,
                luckyCost: 100,
                internBuffExpiresAt: 0,
                internCost: 100,
                lastSeasonReset: new Date().toISOString().slice(0, 7),
                currentDifficulty: undefined
            };
            setUser(newUser);
            syncToSupabase(newUser, true); // Force sync for new user creation
        }

        setLoadingAuth(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
            setupListener();
        } else {
            setLoadingAuth(false);
        }
    });

    return () => {
        authListener.subscription.unsubscribe();
    };
  }, []);
  
  const [currentWeek] = useState(1);
  const [factorySeconds, setFactorySeconds] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState<{from: number, to: number} | null>(null);
  
  // Real Supabase Leaderboard
  const [globalLeaderboard, setGlobalLeaderboard] = useState<{ id: string, name: string, balance: number, level: number, rank: number }[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchLeaderboard = async () => {
      const u = userRef.current;
      if (!u) return;
      try {
          // Get Top 3, Bottom 5, and My Rank in parallel
          const [topRes, bottomRes, countRes, aboveCountRes] = await Promise.all([
              supabase.from('users').select('id, displayName, balance, level').order('balance', { ascending: false }).limit(3),
              supabase.from('users').select('id, displayName, balance, level').order('balance', { ascending: true }).limit(5),
              supabase.from('users').select('*', { count: 'exact', head: true }),
              supabase.from('users').select('*', { count: 'exact', head: true }).gt('balance', u.balance)
          ]);
              
          if (topRes.data && bottomRes.data) {
              const total = countRes.count || 0;
              setTotalUsers(total);
              const currentRank = (aboveCountRes.count || 0) + 1;
              setUserRank(currentRank);

              const top3 = topRes.data.map((d, i) => ({
                  id: d.id,
                  name: d.displayName,
                  balance: d.balance || 0,
                  level: d.level || 0,
                  rank: i + 1
              }));

              const b5Data = [...bottomRes.data].reverse();
              const bottom5 = b5Data.map((d, i) => ({
                  id: d.id,
                  name: d.displayName,
                  balance: d.balance || 0,
                  level: d.level || 0,
                  rank: total - (b5Data.length - 1 - i)
              }));

              // User's own entry
              const meEntry = {
                  id: u.uid,
                  name: u.displayName || "Bạn",
                  balance: u.balance,
                  level: u.level,
                  rank: currentRank
              };

              // Combine and remove duplicates
              const combined = [...top3];
              [...bottom5, meEntry].forEach(b => {
                  if (!combined.some(t => t.id === b.id)) {
                      combined.push(b);
                  }
              });

              combined.sort((a,b) => a.rank - b.rank); // Sort by rank
              setGlobalLeaderboard(combined);
              setLeaderboardLastUpdated(new Date());
          }
      } catch (err) {
          console.error("Leaderboard error:", err);
      }
  };

  useEffect(() => {
    if (!user) {
        setGlobalLeaderboard([]);
    }
  }, [user?.uid]);

  // Provide full ranks before slicing:
  let fullRankedLeaderboard = globalLeaderboard.map(p => ({
      ...p,
      isUser: user ? p.id === user.uid : false
  }));

  // Slicing logic for display: Top 3 ... User ... Bottom 5
  const displayLeaderboard: any[] = [];
  if (fullRankedLeaderboard.length > 0) {
      const top3 = fullRankedLeaderboard.filter(p => p.rank <= 3);
      const bottom5 = fullRankedLeaderboard.filter(p => p.rank > 3 && p.rank > totalUsers - 5);
      const me = fullRankedLeaderboard.find(p => p.isUser);

      displayLeaderboard.push(...top3);

      if (me && me.rank > 3 && me.rank <= totalUsers - 5) {
          if (me.rank > 4) {
              displayLeaderboard.push({ id: 'sep1', name: '...', balance: -1, level: -1, rank: -1, isSeparator: true });
          }
          displayLeaderboard.push(me);
          if (me.rank < totalUsers - 5) {
              displayLeaderboard.push({ id: 'sep2', name: '...', balance: -1, level: -1, rank: -1, isSeparator: true });
          }
      } else {
          // If the user isn't in top 3 or bottom 5, and the above condition didn't catch them, 
          // we might need a generic separator if there's a gap
          if (top3.length > 0 && bottom5.length > 0 && bottom5[0].rank > top3[top3.length-1].rank + 1) {
              displayLeaderboard.push({ id: 'sep-mid', name: '...', balance: -1, level: -1, rank: -1, isSeparator: true });
          }
      }

      displayLeaderboard.push(...bottom5);
  }

  useEffect(() => {
    leaderboardRef.current = fullRankedLeaderboard;
  }, [fullRankedLeaderboard]);

  // Tax/Subsidy Logic
  const getTaxSubRate = (rank: number, total: number) => {
    if (rank <= 0) return 0;
    if (rank === 1) return -0.5;
    if (rank === 2) return -0.4;
    if (rank === 3) return -0.3;
    // Subsidy for bottom 5
    if (rank > 3 && rank > total - 5) return 0.2; 
    return 0;
  };

  const myRank = userRank;
  const taxSubRate = getTaxSubRate(myRank, totalUsers);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Global factory timer and payout (real-time and offline)
  useEffect(() => {
    if (!user) return;

    // Data fix: ensure incomePerMinute is always in sync with factory templates
    const correctIncome = calculateTotalIncome(user.factories);
    if (Math.abs(user.incomePerMinute - correctIncome) > 0.001) {
        setUser(prev => {
            if (!prev) return null;
            const updated = { ...prev, incomePerMinute: correctIncome };
            syncToSupabase(updated);
            return updated;
        });
    }

    const interval = setInterval(() => {
        // ALWAYS use userRef.current to avoid stale closures
        const currentUser = userRef.current;
        if (!currentUser) return;

        const now = Date.now();
        const lastPayout = currentUser.lastPayoutTimestamp || now;
        const diffMs = now - lastPayout;
        const elapsedS = Math.floor(diffMs / 1000);
        
        // Update the UI progress bar (0-59s)
        setFactorySeconds(elapsedS % 60);

        // If at least 1 minute has passed, trigger a payout
        if (elapsedS >= 60) {
            const minutesToPay = Math.floor(elapsedS / 60);
            
            setUser(u => {
                if (!u) return null;
                // Double check diff inside the updater with the MOST recent state
                const actualLastPayout = u.lastPayoutTimestamp || now;
                const actualElapsedS = Math.floor((now - actualLastPayout) / 1000);
                const actualMinsToPay = Math.floor(actualElapsedS / 60);

                if (actualMinsToPay <= 0) return u; // Already paid by another tick

                const levelBonusPct = u.level * 0.01;
                
                // Rank-based multiplier (Tax/Subsidy) - ALWAYS use the latest from Ref
                const latestLeaderboard = leaderboardRef.current;
                const currentRank = latestLeaderboard.findIndex(p => p.id === u.uid) + 1;
                const rate = getTaxSubRate(currentRank, latestLeaderboard.length);

                const isCapitalistActive = !!u.capitalistBuffExpiresAt && u.capitalistBuffExpiresAt > Date.now();
                const totalMultiplier = 1 + levelBonusPct + rate + (isCapitalistActive ? 0.5 : 0);
                
                const updatedFactories = u.factories.map(f => {
                    const upgradedBaseIncome = f.baseIncome * (1 + (f.upgradeLevel || 0) * 0.25);
                    const fPayoutPerMin = upgradedBaseIncome * totalMultiplier;
                    const fTotalAdded = fPayoutPerMin * actualMinsToPay;
                    const maxStorage = f.cost * 0.25 * (1 + (f.storageUpgradeLevel || 0));
                    const currentUncollected = f.uncollectedIncome || 0;
                    
                    const newUncollected = Math.min(currentUncollected + fTotalAdded, maxStorage);
                    return { ...f, uncollectedIncome: newUncollected };
                });

                const updated = { 
                    ...u, 
                    factories: updatedFactories,
                    // Move the timestamp forward exactly by the minutes paid
                    lastPayoutTimestamp: actualLastPayout + (actualMinsToPay * 60000)
                };
                return updated;
            });
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [user?.uid, user?.factories?.length]);

  // Quest reset Daily logic
  useEffect(() => {
    if (!user) return;
    const today = new Date().toDateString();
    if (user.lastQuestReset !== today) {
        setUser(prev => {
            if (!prev) return null;
            const updatedQuests = INITIAL_QUESTS.map(q => 
                q.type === 'login' ? { ...q, completed: true } : q
            );
            const updated = { 
                ...prev, 
                lastQuestReset: today, 
                dailyQuests: updatedQuests,
                currentStreak: 0,
                dailyCorrectCount: 0,
            };
            syncToSupabase(updated);
            return updated;
        });
    }
  }, [user?.uid]);

  // Seasonal reset (Monthly on the first day of each month) logic
  useEffect(() => {
    if (!user) return;
    const currentMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-05"
    if (user.lastSeasonReset !== currentMonth) {
        setUser(prev => {
            if (!prev) return null;
            // "kho vẫn giữ nguyên để hệ thống ghi lại những từ đã học chứ không học lại từ đầu chỉ có mọi trạng thái nhà máy xóa hết"
            // Reset achievements so players can claim seasonal rewards again
            const updated = { 
                ...prev, 
                lastSeasonReset: currentMonth,
                factories: [],
                incomePerMinute: 0,
                achievements: INITIAL_ACHIEVEMENTS,
            };
            syncToSupabase(updated);
            return updated;
        });
    }
  }, [user?.uid]);

  // ...

  useEffect(() => {
    //
  }, []);

  const register = async (id: string, pass: string, displayName: string) => {
    try {
      if (pass.length < 6) {
        alert("Mật khẩu phải từ 6 ký tự trở lên!");
        return;
      }
      const cleanId = id.trim().replace(/\s+/g, '');
      if (!cleanId) return alert("ID không hợp lệ!");
      
      const email = `${cleanId.toLowerCase()}@toeic-factory.app`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            displayName: displayName
          }
        }
      });
      
      if (error) throw error;
      if (!data.user) throw new Error("No user returned");

      const uid = data.user.id;

      const newUser: UserStats = {
        uid: uid,
        displayName,
        balance: 0,
        diamonds: 0,
        xp: 0,
        level: 0,
        incomePerMinute: 0,
        factories: [],
        completedQuestions: 0,
        totalWrongCount: 0,
        lastLogin: new Date(),
        dailyQuests: INITIAL_QUESTS.map(q => q.type === 'login' ? {...q, completed: true} : q),
        achievements: INITIAL_ACHIEVEMENTS,
        currentStreak: 0,
        dailyCorrectCount: 0,
        lastQuestReset: new Date().toDateString(),
        missedWordIds: [],
        charityCount: 0,
        lastPayoutTimestamp: Date.now(),
        activeWordIds: [],
        wordProgress: {},
        wordProgressByDifficulty: { easy: {}, intermediate: {}, hard: {} },
        currentQuestionIndex: 0,
        currentQuestionIndexByDifficulty: { easy: 0, intermediate: 0, hard: 0 },
        recentWordIds: [],
        capitalistBuffExpiresAt: 0,
        capitalistCost: 500,
        luckyBuffExpiresAt: 0,
        luckyCost: 100,
        internBuffExpiresAt: 0,
        internCost: 100,
        lastSeasonReset: new Date().toISOString().slice(0, 7),
        currentDifficulty: undefined
      };
      
      setUser(newUser);
      syncToSupabase(newUser);
    } catch (error: any) {
      if (error.message?.includes('already registered')) {
        alert('Đăng kí thất bại: ID này đã được sử dụng, vui lòng chọn ID khác.');
      } else {
        alert('Đăng kí thất bại: ' + error.message);
      }
    }
  };

  const login = async (id: string, pass: string) => {
    try {
      const cleanId = id.trim().replace(/\s+/g, '');
      if (!cleanId) return alert("ID không hợp lệ!");
      const email = `${cleanId.toLowerCase()}@toeic-factory.app`;
      const { error } = await supabase.auth.signInWithPassword({
          email,
          password: pass
      });
      if (error) throw error;
    } catch (err: any) {
      alert('Đăng nhập thất bại: Sai ID hoặc mật khẩu');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const addMoney = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, balance: prev.balance + amount };
      syncToSupabase(updated, true); // Force sync on reward
      return updated;
    });
  };

  const claimQuest = (questId: string) => {
    setUser(prev => {
        if (!prev) return null;
        const quest = prev.dailyQuests.find(q => q.id === questId);
        if (!quest || !quest.completed || quest.claimed) return prev;

        const updatedQuests = prev.dailyQuests.map(q => 
            q.id === questId ? { ...q, claimed: true } : q
        );
        const updated = {
            ...prev,
            balance: prev.balance + quest.reward,
            diamonds: prev.diamonds + (quest.rewardDiamonds || 0),
            dailyQuests: updatedQuests
        };
        syncToSupabase(updated, true); // Force sync on claim
        return updated;
    });
  };

  const claimAchievement = (achievementId: string) => {
    setUser(prev => {
        if (!prev) return null;
        const ach = prev.achievements.find(a => a.id === achievementId);
        if (!ach || !ach.completed || ach.claimed) return prev;

        const updatedAchs = prev.achievements.map(a => 
            a.id === achievementId ? { ...a, claimed: true } : a
        );
        const updated = {
            ...prev,
            diamonds: prev.diamonds + ach.rewardDiamonds,
            achievements: updatedAchs
        };
        syncToSupabase(updated, true); // Force sync on claim
        return updated;
    });
  };

  // Rank check logic
  useEffect(() => {
    if (!user || myRank === 0) return;
    
    // If rank is top 1, 2, or 3, complete those quests
    setUser(prev => {
        if (!prev) return null;
        let changed = false;
        const newQuests = prev.dailyQuests.map(q => {
            if (myRank === 1 && q.type === 'top_1' && !q.completed) { changed = true; return { ...q, completed: true }; }
            if (myRank <= 2 && q.type === 'top_2' && !q.completed) { changed = true; return { ...q, completed: true }; }
            if (myRank <= 3 && q.type === 'top_3' && !q.completed) { changed = true; return { ...q, completed: true }; }
            
            // Climb rank quests
            if (myRank <= 5 && q.type === 'climb_1' && !q.completed) { changed = true; return { ...q, completed: true }; }
            if (myRank <= 2 && q.type === 'climb_10' && !q.completed) { changed = true; return { ...q, completed: true }; }
            return q;
        });

        if (changed) {
            const updated = { ...prev, dailyQuests: newQuests };
            syncToSupabase(updated);
            return updated;
        }
        return prev;
    });
  }, [user?.uid, myRank]);

  const onAnswer = (isCorrect: boolean, wordId?: string, customMoney?: number, customXP?: number) => {
    setUser(prev => {
        if (!prev) return null;
        
        let newMissedIds = [...prev.missedWordIds];
        let newQuests = [...prev.dailyQuests];
        let newXP = prev.xp;
        let newLevel = prev.level;
        let leveledUp = false;
        let newDailyCorrectCount = prev.dailyCorrectCount;
        let newWordProgress = prev.wordProgress ? { ...prev.wordProgress } : {};
        const currentIdx = prev.currentQuestionIndex || 0;
        const nextIdx = currentIdx + 1;

        // Audio and Logic
        const xpToNext = 100 + prev.level * 10;
        
        if (!isCorrect) {
            // Need to play audio
            const wrongAudio = new Audio('/sounds/wrong.mp3');
            wrongAudio.play().catch(() => {});
            
            if (wordId && !newMissedIds.includes(wordId)) {
                newMissedIds.push(wordId);
            }
            
            if (wordId) {
                const currentProg = newWordProgress[wordId] || { consecutiveCorrect: 0, seenCount: 0, lastSeen: 0, cooldown: 0 };
                newWordProgress[wordId] = {
                    ...currentProg,
                    consecutiveCorrect: 0, // Reset N = 0 on fail
                    seenCount: currentProg.seenCount + 1,
                    lastSeen: currentIdx,
                    cooldown: 1 // 2^0 = 1
                };
            }
            
            let xpGained = customXP !== undefined ? customXP : 0; // sai không cho xp
            newXP += xpGained;
            if (newXP >= xpToNext) {
                newXP -= xpToNext;
                newLevel += 1;
                leveledUp = true;
            }

            // Also update per-difficulty storage
            let newWPByDiff = { ...(prev.wordProgressByDifficulty || { easy: {}, intermediate: {}, hard: {} }) };
            let newQIByDiff = { ...(prev.currentQuestionIndexByDifficulty || { easy: 0, intermediate: 0, hard: 0 }) };
            if (prev.currentDifficulty) {
                newWPByDiff[prev.currentDifficulty] = newWordProgress;
                newQIByDiff[prev.currentDifficulty] = nextIdx;
            }

            const updatedPool = getUpdatedActivePool(prev.activeWordIds, newWordProgress);
            const newRecentWordIds = [wordId, ...(prev.recentWordIds || [])].slice(0, 15);
            const updated: UserStats = { 
                ...prev, 
                currentStreak: 0, 
                missedWordIds: newMissedIds,
                xp: newXP,
                level: newLevel,
                totalWrongCount: prev.totalWrongCount + 1,
                wordProgress: newWordProgress,
                wordProgressByDifficulty: newWPByDiff,
                activeWordIds: updatedPool,
                currentQuestionIndex: nextIdx,
                currentQuestionIndexByDifficulty: newQIByDiff,
                recentWordIds: newRecentWordIds as string[]
            };
            syncToSupabase(updated);
            return updated;
        }

        // Correct answer logic
        const correctAudio = new Audio('/sounds/correct.mp3');
        correctAudio.play().catch(() => {});

        const newStreak = prev.currentStreak + 1;
        newDailyCorrectCount += 1;

        if (wordId) {
            const currentProg = newWordProgress[wordId] || { consecutiveCorrect: 0, seenCount: 0, lastSeen: 0, cooldown: 0 };
            const newConsecutive = (currentProg.consecutiveCorrect || 0) + 1;
            
            // Distance = 2^N
            // We store it in cooldown field for reference, though getNextWord calculates it dynamically
            const nextCooldown = Math.pow(2, newConsecutive);

            newWordProgress[wordId] = {
                ...currentProg,
                consecutiveCorrect: newConsecutive,
                seenCount: (currentProg.seenCount || 0) + 1,
                lastSeen: currentIdx,
                cooldown: nextCooldown
            };
        }

        const levelBonus = prev.level * 0.5;
        let moneyGained = customMoney !== undefined ? customMoney : (1 + levelBonus);
        
        const isLuckyActive = !!prev.luckyBuffExpiresAt && prev.luckyBuffExpiresAt > Date.now();
        if (isLuckyActive) {
            moneyGained *= 2;
        }
        
        let xpGained = customXP !== undefined ? customXP : 5;
        const isInternActive = !!prev.internBuffExpiresAt && prev.internBuffExpiresAt > Date.now();
        if (isInternActive) {
            xpGained *= 2;
        }

        if (wordId && newMissedIds.includes(wordId)) {
            newMissedIds = newMissedIds.filter(id => id !== wordId);
            const fixQuest = newQuests.find(q => q.type === 'fix_error');
            if (fixQuest && !fixQuest.completed) fixQuest.completed = true;
        }
        
        const q2 = newQuests.find(q => q.type === 'answer');
        if (q2 && !q2.completed && newDailyCorrectCount >= 10) q2.completed = true;

        // Check streaks
        const streaks = [
            { type: 'streak_3', val: 3 },
            { type: 'streak_5', val: 5 },
            { type: 'streak_10', val: 10 }
        ];
        streaks.forEach(s => {
            if (newStreak >= s.val) {
                const quest = newQuests.find(q => q.type === s.type);
                if (quest && !quest.completed) quest.completed = true;
            }
        });

        const updatedPool = getUpdatedActivePool(prev.activeWordIds, newWordProgress);
        const newRecentWordIds = [wordId, ...(prev.recentWordIds || [])].slice(0, 15);

        newXP += xpGained;
        while (newXP >= (100 + newLevel * 10)) {
            newXP -= (100 + newLevel * 10);
            newLevel += 1;
            leveledUp = true;
            // Play level up sound
            const levelUpAudio = new Audio('/sounds/levelup.mp3');
            levelUpAudio.play().catch(() => {});
        }

        // Also update per-difficulty storage
        let newWPByDiff = { ...(prev.wordProgressByDifficulty || { easy: {}, intermediate: {}, hard: {} }) };
        let newQIByDiff = { ...(prev.currentQuestionIndexByDifficulty || { easy: 0, intermediate: 0, hard: 0 }) };
        if (prev.currentDifficulty) {
            newWPByDiff[prev.currentDifficulty] = newWordProgress;
            newQIByDiff[prev.currentDifficulty] = nextIdx;
        }

        const updated: UserStats = {
            ...prev,
            balance: prev.balance + moneyGained,
            xp: newXP,
            level: newLevel,
            currentStreak: newStreak,
            dailyCorrectCount: newDailyCorrectCount,
            completedQuestions: prev.completedQuestions + 1,
            dailyQuests: newQuests,
            missedWordIds: newMissedIds,
            wordProgress: newWordProgress,
            wordProgressByDifficulty: newWPByDiff,
            activeWordIds: updatedPool,
            currentQuestionIndex: nextIdx,
            currentQuestionIndexByDifficulty: newQIByDiff,
            recentWordIds: newRecentWordIds as string[]
        };
        
        // Sync on significant change (level up) or debounced
        syncToSupabase(updated, leveledUp);
        return updated;
    });
  };

  const calculateTotalIncome = (factories: UserFactory[]) => {
    return factories.reduce((acc, f) => {
        const upgradedBaseIncome = f.baseIncome * (1 + (f.upgradeLevel || 0) * 0.25);
        return acc + upgradedBaseIncome; 
    }, 0);
  };

  const buyFactory = (factoryId: string) => {
    const template = FACTORY_TEMPLATES.find(t => t.id === factoryId);
    if (!template || !user) return;

    const alreadyOwned = user.factories.some(f => f.id === factoryId);
    if (alreadyOwned) {
      notify('Bạn đã sở hữu cơ sở kinh doanh này rồi.');
      return;
    }

    const currentFactoryCount = user.factories.length;
    const allowedCount = 1 + Math.floor(user.level / 5);
    if (currentFactoryCount >= allowedCount) {
        const nextLevelNeeded = (Math.floor(user.level / 5) + 1) * 5;
        notify(`Bạn cần lên level ${nextLevelNeeded} để mua thêm 1 nhà máy.`);
        return;
    }

    if (user.balance < template.cost) {
      notify('Không đủ tiền!');
      return;
    }

    setUser(prev => {
        if (!prev) return null;
        const updatedFactories = [...prev.factories];
        updatedFactories.push({ 
            ...template, 
            count: 1, 
            upgradeLevel: 0,
            storageUpgradeLevel: 0,
            uncollectedIncome: 0
        } as UserFactory);

        const totalIncome = calculateTotalIncome(updatedFactories);

        const updated = {
            ...prev,
            balance: prev.balance - template.cost,
            factories: updatedFactories,
            incomePerMinute: totalIncome
        };
        
        syncToSupabase(updated, true); // Force sync on purchase
        return updated;
    });
  };

  const upgradeFactory = (factoryId: string, upgradeType: 'income' | 'storage') => {
    setUser(prev => {
        if (!prev) return null;
        const factoryIndex = prev.factories.findIndex(f => f.id === factoryId);
        if (factoryIndex === -1) return prev;

        const factory = prev.factories[factoryIndex];
        
        if (upgradeType === 'income') {
            if (factory.upgradeLevel >= 4) {
                notify('Nhà máy đã đạt cấp tối đa!');
                return prev;
            }
            const cost = factory.cost;
            if (prev.balance < cost) {
                notify(`Không đủ tiền! Cần $${cost.toLocaleString()} để nâng cấp.`);
                return prev;
            }
            
            const updatedFactories = [...prev.factories];
            updatedFactories[factoryIndex] = { ...factory, upgradeLevel: (factory.upgradeLevel || 0) + 1 };
            const totalIncome = calculateTotalIncome(updatedFactories);
            
            const updated = {
                ...prev,
                balance: prev.balance - cost,
                factories: updatedFactories,
                incomePerMinute: totalIncome
            };
            syncToSupabase(updated, true);
            notify('Nâng cấp nhà máy thành công!');
            return updated;
        } else {
            const storageLevel = factory.storageUpgradeLevel || 0;
            if (storageLevel >= 3) {
                notify('Kho chứa đã đạt cấp tối đa!');
                return prev;
            }
            const cost = factory.cost * 0.25;
            if (prev.balance < cost) {
                notify(`Không đủ tiền! Cần $${cost.toLocaleString()} để nâng cấp kho.`);
                return prev;
            }
            
            const updatedFactories = [...prev.factories];
            updatedFactories[factoryIndex] = { ...factory, storageUpgradeLevel: storageLevel + 1 };
            
            const updated = {
                ...prev,
                balance: prev.balance - cost,
                factories: updatedFactories
            };
            syncToSupabase(updated, true);
            notify('Nâng cấp kho chứa thành công!');
            return updated;
        }
    });
  };

  const collectIncome = (factoryId?: string) => {
    setUser(prev => {
        if (!prev) return null;
        let totalCollected = 0;
        const updatedFactories = prev.factories.map(f => {
            if (factoryId && f.id !== factoryId) return f;
            if (!f.uncollectedIncome || f.uncollectedIncome <= 0) return f;
            
            totalCollected += f.uncollectedIncome;
            return { ...f, uncollectedIncome: 0 };
        });

        if (totalCollected === 0) {
            notify('Không có tiền để thu hoạch.');
            return prev; // No sync needed
        }

        const updated = {
            ...prev,
            balance: prev.balance + totalCollected,
            factories: updatedFactories
        };
        syncToSupabase(updated, true);
        
        // Play audio
        const coinAudio = new Audio('/sounds/coin.mp3');
        coinAudio.play().catch(() => {});
        
        notify(`Thu hoạch thành công $${totalCollected.toFixed(2)}`);
        return updated;
    });
  };

  // Auto-complete Achievements when metrics change
  useEffect(() => {
    if (!user) return;
    let changed = false;
    const updatedAchievements = user.achievements.map(a => {
      if (a.completed) return a;
      let shouldComplete = false;
      if (a.type === 'top_1' && myRank === 1) shouldComplete = true;
      if (a.type === 'top_2' && myRank > 0 && myRank <= 2) shouldComplete = true;
      if (a.type === 'top_3' && myRank > 0 && myRank <= 3) shouldComplete = true;
      if (a.type === 'correct_100' && user.completedQuestions >= 100) shouldComplete = true;
      if (a.type === 'correct_500' && user.completedQuestions >= 500) shouldComplete = true;
      if (a.type === 'correct_1000' && user.completedQuestions >= 1000) shouldComplete = true;
      if (a.type === 'wrong_50' && user.totalWrongCount >= 50) shouldComplete = true;
      if (a.type === 'wrong_100' && user.totalWrongCount >= 100) shouldComplete = true;
      if (a.type === 'factory_1' && user.factories.length >= 1) shouldComplete = true;
      if (a.type === 'factory_2' && user.factories.length >= 2) shouldComplete = true;
      if (a.type === 'factory_3' && user.factories.length >= 3) shouldComplete = true;
      if (a.type === 'factory_4' && user.factories.length >= 4) shouldComplete = true;
      if (a.type === 'factory_5' && user.factories.length >= 5) shouldComplete = true;
      if (a.type === 'factory_6' && user.factories.length >= 6) shouldComplete = true;
      if (a.type === 'factory_7' && user.factories.length >= 7) shouldComplete = true;
      if (a.type === 'factory_8' && user.factories.length >= 8) shouldComplete = true;
      if (a.type === 'factory_9' && user.factories.length >= 9) shouldComplete = true;
      if (a.type === 'factory_10' && user.factories.length >= 10) shouldComplete = true;
      if (a.type === 'level_1' && user.level >= 1) shouldComplete = true;
      if (a.type === 'level_10' && user.level >= 10) shouldComplete = true;
      if (a.type === 'level_20' && user.level >= 20) shouldComplete = true;
      if (a.type === 'level_50' && user.level >= 50) shouldComplete = true;
      
      if (shouldComplete) {
        changed = true;
        return { ...a, completed: true };
      }
      return a;
    });

    if (changed) {
      setUser(prev => prev ? { ...prev, achievements: updatedAchievements } : null);
    }
  }, [user?.completedQuestions, user?.totalWrongCount, user?.level, user?.factories?.length, myRank]);

  const buyAction = (actionId: 'charity' | 'crisis' | 'capitalist' | 'lucky' | 'intern') => {
    if (!user) return;
    
    if (actionId === 'charity') {
        const cost = 500 + (user.charityCount * 100);
        if (user.balance < cost) { 
            notify(`Không đủ tiền! Bạn cần $${cost} để đi học nghề.`); 
            return; 
        }
        
        setUser(prev => {
            if (!prev) return null;
            let newXP = prev.xp + 100;
            let newLevel = prev.level;
            while (newXP >= (100 + newLevel * 10)) {
                newXP -= (100 + newLevel * 10);
                newLevel += 1;
            }
            const updated = { 
                ...prev, 
                balance: prev.balance - cost, 
                xp: newXP, 
                level: newLevel,
                charityCount: prev.charityCount + 1
            };
            syncToSupabase(updated, true); // Force sync on purchase
            notify(`Đã đi học! Bạn nhận được 100 XP. Lần tới sẽ giá $${cost + 100}.`);
            return updated;
        });
    } else if (actionId === 'capitalist') {
        const costDiamonds = 10;
        if (user.diamonds < costDiamonds) {
            notify(`Cần 10 Kim Cương để kích hoạt Tư bản bốc lột!`);
            return;
        }

        setUser(prev => {
            if (!prev) return null;
            const updated = {
                ...prev,
                diamonds: prev.diamonds - costDiamonds,
                capitalistBuffExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
            };
            syncToSupabase(updated, true); // Force sync on purchase
            notify(`Đã kích hoạt Tư bản bốc lột! Công suất tăng 50% trong 24 giờ.`);
            return updated;
        });
    } else if (actionId === 'lucky') {
        const costDiamonds = 10;
        if (user.diamonds < costDiamonds) {
            notify(`Cần 10 Kim Cương để kích hoạt Khung giờ vàng!`);
            return;
        }

        setUser(prev => {
            if (!prev) return null;
            const updated = {
                ...prev,
                diamonds: prev.diamonds - costDiamonds,
                luckyBuffExpiresAt: Date.now() + 1 * 60 * 60 * 1000 // 1 hour from now
            };
            syncToSupabase(updated, true); // Force sync on purchase
            notify(`Đã kích hoạt Khung giờ vàng! Nhân đôi tiền thưởng cày cuốc trong 1 giờ.`);
            return updated;
        });
    } else if (actionId as string === 'intern') {
        const costDiamonds = 10;
        if (user.diamonds < costDiamonds) {
            notify(`Cần 10 Kim Cương để kích hoạt Sức mạnh thực tập sinh!`);
            return;
        }

        setUser(prev => {
            if (!prev) return null;
            const updated = {
                ...prev,
                diamonds: prev.diamonds - costDiamonds,
                internBuffExpiresAt: Date.now() + 1 * 60 * 60 * 1000 // 1 hour from now
            };
            syncToSupabase(updated, true); // Force sync on purchase
            notify(`Đã kích hoạt Sức mạnh thực tập sinh! Nhân đôi XP nhận được trong 1 giờ.`);
            return updated;
        });
    } else if (actionId === 'crisis') {
        notify('Tính năng gây khủng hoảng kinh tế đã bị gỡ bỏ.');
    }
  };

  const setDifficulty = (level: DifficultyLevel) => {
      setUser(prev => {
          if (!prev) return null;
          const oldDifficulty = prev.currentDifficulty;
          
          // Save current wordProgress into the old difficulty slot
          let newWPByDiff = { ...(prev.wordProgressByDifficulty || { easy: {}, intermediate: {}, hard: {} }) };
          let newQIByDiff = { ...(prev.currentQuestionIndexByDifficulty || { easy: 0, intermediate: 0, hard: 0 }) };
          
          if (oldDifficulty) {
              newWPByDiff[oldDifficulty] = prev.wordProgress || {};
              newQIByDiff[oldDifficulty] = prev.currentQuestionIndex || 0;
          }
          
          // Load the new difficulty's wordProgress
          const newWP = newWPByDiff[level] || {};
          const newQI = newQIByDiff[level] || 0;
          
          const updated = {
              ...prev,
              currentDifficulty: level,
              wordProgress: newWP,
              wordProgressByDifficulty: newWPByDiff,
              currentQuestionIndex: newQI,
              currentQuestionIndexByDifficulty: newQIByDiff,
              recentWordIds: [], // Reset recent words on switch
          };
          syncToSupabase(updated, true);
          return updated;
      });
  };

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center text-white font-black">Đang tải dữ liệu...</div>;
  }

  return (
    <GameContext.Provider value={{ 
        user, register, login, logout, addMoney, onAnswer, buyFactory, upgradeFactory, collectIncome,
        buyAction, claimQuest, claimAchievement, factorySeconds, currentWeek, notification,
        leaderboard: displayLeaderboard, myRank, taxSubRate, showLevelUp, setShowLevelUp,
        leaderboardLastUpdated, totalUsers, fetchLeaderboard, setDifficulty
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
