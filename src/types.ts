/**
 * Types for TOEIC Factory App
 */

export interface Word {
  id: string;
  word: string;
  meaning: string;
  example: string;
  exampleVN?: string;
  week?: number;
  pos?: string;
}

export type QuestionType = 'mcq' | 'boolean' | 'matching' | 'fill' | 'spelling_builder';

export interface Question {
  id: string;
  type: QuestionType;
  wordId: string;
  text: string;
  options?: string[];
  pairs?: { id: string; left: string; right: string }[]; // For matching
  answer: string | boolean | Record<string, string>;
  explanation: string;
  correct_word?: string; // For spelling_builder
  slots?: number; // For spelling_builder
  letters?: string[]; // For spelling_builder
}

export interface DailyQuest {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
  claimed: boolean;
  type: 'login' | 'answer' | 'streak_3' | 'streak_5' | 'streak_10' | 'top_1' | 'top_2' | 'top_3' | 'fix_error' | 'climb_1' | 'climb_10';
}

export interface UserStats {
  uid: string;
  displayName: string;
  balance: number;
  xp: number;
  level: number;
  incomePerMinute: number;
  factories: UserFactory[];
  completedQuestions: number;
  lastLogin: Date;
  dailyQuests: DailyQuest[];
  currentStreak: number;
  dailyCorrectCount: number;
  lastQuestReset: string;
  missedWordIds: string[]; // Store IDs of words answered incorrectly
  charityCount: number; // Count of charity purchases
  lastPayoutTimestamp?: number; // For offline earnings
  capitalistBuffExpiresAt?: number;
  capitalistCost?: number;
  luckyBuffExpiresAt?: number;
  luckyCost?: number;
  internBuffExpiresAt?: number;
  internCost?: number;
  wordProgress?: Record<string, { 
    consecutiveCorrect: number; 
    seenCount: number; 
    lastSeen: number; 
    cooldown: number; 
  }>;
  activeWordIds?: string[];
  currentQuestionIndex?: number;
  recentWordIds?: string[];
}

export interface UserFactory {
  id: string;
  name: string;
  description: string;
  cost: number;
  baseIncome: number;
  count: number;
  upgradeLevel: number;
  storageUpgradeLevel?: number;
  iconName: string;
  uncollectedIncome?: number;
}

export const FACTORY_TEMPLATES: Omit<UserFactory, 'count' | 'upgradeLevel' | 'storageUpgradeLevel'>[] = [
  {
    id: 'f_noodle',
    name: 'Nhà máy Mì Tôm',
    description: 'Nguồn sống sinh viên. Kiếm $0.1/phút.',
    cost: 50,
    baseIncome: 0.1,
    iconName: 'Soup'
  },
  {
    id: 'f_sandal',
    name: 'Nhà máy Dép Tổ Ong',
    description: 'Huyền thoại bất tử. Kiếm $0.33/phút.',
    cost: 150,
    baseIncome: 0.33,
    iconName: 'Footprints'
  },
  {
    id: 'f_milktea',
    name: 'Trà sữa full topping',
    description: 'Trân châu đường đen. Kiếm $0.99/phút.',
    cost: 400,
    baseIncome: 0.99,
    iconName: 'Coffee'
  },
  {
    id: 'f_bread',
    name: 'Lò Bánh Mì Sài Gòn',
    description: 'Bánh mì đặc ruột 2 ngàn. Kiếm $2.2/phút.',
    cost: 800,
    baseIncome: 2.2,
    iconName: 'Croissant'
  },
  {
    id: 'f_omakase',
    name: 'Nhà hàng Omakase',
    description: 'Kỹ nghệ ẩm thực. Kiếm $6.1/phút.',
    cost: 2000,
    baseIncome: 6.1,
    iconName: 'Utensils'
  },
  {
    id: 'f_english',
    name: 'Trung tâm Tiếng Anh',
    description: 'Luyện thi TOEIC siêu tốc. Kiếm $16.9/phút.',
    cost: 5000,
    baseIncome: 16.9,
    iconName: 'Languages'
  },
  {
    id: 'f_beauty',
    name: 'Viện thẩm mỹ',
    description: 'Đẹp không tì vết. Kiếm $45.1/phút.',
    cost: 12000,
    baseIncome: 45.1,
    iconName: 'Sparkles'
  },
  {
    id: 'f_bank',
    name: 'Ngân hàng Tư nhân',
    description: 'Lãi mẹ đẻ lãi con. Kiếm $83.6/phút.',
    cost: 20000,
    baseIncome: 83.6,
    iconName: 'Landmark'
  },
  {
    id: 'f_steel',
    name: 'Nhà máy sản xuất thép',
    description: 'Sắt thép kiên cố. Kiếm $139.4/phút.',
    cost: 30000,
    baseIncome: 139.4,
    iconName: 'HardHat'
  },
  {
    id: 'f_chip',
    name: 'Nhà máy chip bán dẫn',
    description: 'Hạt nhân công nghệ cao. Kiếm $361.4/phút.',
    cost: 70000,
    baseIncome: 361.4,
    iconName: 'Cpu'
  }
];
