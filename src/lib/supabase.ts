import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client trực tiếp bằng cấu hình bạn vừa cung cấp
const supabaseUrl = 'https://qknytzufedomboijivgx.supabase.co';
const supabaseAnonKey = 'sb_publishable_H069s4y7q3a2iSsp22Xf0w_Ij7JpoyS';

if (!supabaseUrl) {
  console.warn('VITE_SUPABASE_URL is missing. Please add it to the environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
