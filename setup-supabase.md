# Hướng dẫn chuyển đổi sang Supabase

Ứng dụng của bạn đã được chuyển từ Firebase sang Supabase! 
Để sử dụng được, bạn cần thiết lập Supabase theo các bước sau:

## 1. Tạo dự án Supabase
Truy cập [Supabase](https://supabase.com) và tạo một dự án mới (New Project).

## 2. Tìm thông tin API Keys
Trong dự án của bạn ở Supabase, vào mục **Project Settings -> API**. Copy 2 mã:
- Project URL (VITE_SUPABASE_URL)
- anon / public key (VITE_SUPABASE_ANON_KEY)

## 3. Thêm cấu hình vào ứng dụng
Mở ứng dụng TOEIC Factory này, tìm mục **Settings (Cài đặt) -> Environment Variables (Biến môi trường)**, sau đó thêm vào (hoặc sửa file `.env` nếu bạn chạy local):
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`

## 4. Tắt yêu cầu cấu hình xác thực Email
Trong Supabase, vào mục **Authentication -> Email Templates**. Hãy chắc chắn tắt **"Confirm email"** (Tạm tắt yêu cầu xác thực email khi đăng kí mới).

## 5. Khởi tạo Database (SQL)
Mở mục **SQL Editor** trên Supabase, dán và chạy đoạn mã SQL dưới đây để khởi tạo cơ sở dữ liệu và bảo mật (RLS) cho người chơi:

```sql
create table users (
  id uuid references auth.users(id) primary key,
  "displayName" text,
  uid text,
  balance numeric default 0,
  xp numeric default 0,
  level numeric default 0,
  "incomePerMinute" numeric default 0,
  "completedQuestions" numeric default 0,
  "lastLogin" text,
  "dailyQuests" jsonb[],
  "currentStreak" numeric default 0,
  "dailyCorrectCount" numeric default 0,
  "lastQuestReset" text,
  "missedWordIds" jsonb default '[]'::jsonb,
  "charityCount" numeric default 0,
  "lastPayoutTimestamp" numeric default 0,
  "activeWordIds" jsonb default '[]'::jsonb,
  "wordProgress" jsonb default '{}'::jsonb,
  "capitalistCost" numeric,
  "luckyCost" numeric,
  "internCost" numeric,
  "capitalistBuffExpiresAt" numeric,
  "luckyBuffExpiresAt" numeric,
  "internBuffExpiresAt" numeric,
  "currentQuestionIndex" numeric default 0,
  factories jsonb[] default '{}'::jsonb[]
);

-- Cho phép Realtime cho bảng users để bảng xếp hạng cập nhật liên tục:
alter publication supabase_realtime add table users;

-- Bật Row Level Security để bảo vệ dữ liệu:
alter table users enable row level security;

-- Ai cũng có thể đọc dữ liệu để lấy bảng xếp hạng:
create policy "Users can read all users" on users for select using (true);

-- Mỗi người chơi chỉ được chỉnh sửa hoặc thêm dữ liệu của riêng bản thân mình:
create policy "Users can update their own data" on users for update using (auth.uid() = id);

create policy "Users can insert their own data" on users for insert with check (auth.uid() = id);
```

Vậy là xong! Ứng dụng sẽ hoạt động trên hệ thống API và Database mới hoàn toàn miễn phí mà không lo bị hạn chế băng thông do hết giới hạn Firebase Quota nhé.
