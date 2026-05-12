import { Word } from './types';

export const chunk20_raw: Omit<Word, 'id'>[] = [
  { word: "prospective", meaning: "tiềm năng", example: "We are meeting a prospective client today.", exampleVN: "Chúng tôi sẽ gặp một khách hàng tiềm năng vào hôm nay." },
  { word: "take place", meaning: "diễn ra", example: "The book reading is going to take place at the library.", exampleVN: "Buổi đọc sách sẽ diễn ra tại thư viện." },
  { word: "client", meaning: "khách hàng", example: "The client visited our office.", exampleVN: "Khách hàng đã ghé văn phòng chúng tôi." },
  { word: "policy", meaning: "chính sách", example: "The company introduced new hiring policies.", exampleVN: "Công ty đã giới thiệu các chính sách tuyển dụng mới." },
  { word: "set up", meaning: "thiết lập, sắp xếp", example: "We are going to set up a new office.", exampleVN: "Chúng tôi dự định thiết lập một văn phòng mới." },
  { word: "attend", meaning: "tham dự", example: "Many employees attend the session.", exampleVN: "Nhiều nhân viên tham dự buổi họp." },
  { word: "supplies", meaning: "đồ dùng, vật tư", example: "The office supplies are in the storage room.", exampleVN: "Văn phòng phẩm nằm ở trong phòng kho." },
  { word: "promote", meaning: "thăng chức, quảng bá", example: "She was promoted to marketing manager.", exampleVN: "Cô ấy đã được thăng chức lên quản lý tiếp thị." },
  { word: "schedule", meaning: "lên lịch, lịch trình", example: "Let's schedule a meeting for next Monday.", exampleVN: "Hãy lên lịch một cuộc họp vào thứ Hai tới." },
  { word: "update", meaning: "cập nhật", example: "I need to update my records.", exampleVN: "Tôi cần cập nhật hồ sơ của mình." },
  { word: "intern", meaning: "thực tập sinh", example: "How is the new group of interns doing?", exampleVN: "Nhóm thực tập sinh mới làm việc thế nào rồi?" },
  { word: "advertisement", meaning: "quảng cáo", example: "I saw an advertisement for a new job.", exampleVN: "Tôi đã thấy một mẩu quảng cáo cho một công việc mới." },
  { word: "assistant", meaning: "trợ lý", example: "The manager is looking for a new assistant.", exampleVN: "Người quản lý đang tìm kiếm một trợ lý mới." },
  { word: "reschedule", meaning: "đổi lịch, sắp xếp lại", example: "The meeting has been rescheduled.", exampleVN: "Cuộc họp đã được thay đổi lịch trình." },
  { word: "overseas", meaning: "ở nước ngoài", example: "I heard you’re going to be working overseas.", exampleVN: "Tôi nghe nói bạn sắp đi làm việc ở nước ngoài." },
  { word: "vendor", meaning: "nhà cung cấp", example: "We need to review some vendor contracts.", exampleVN: "Chúng ta cần xem lại một vài hợp đồng nhà cung cấp." },
  { word: "clarify", meaning: "làm rõ", example: "The manager clarified the new company policy.", exampleVN: "Quản lý đã làm rõ chính sách mới của công ty." },
  { word: "temporary", meaning: "tạm thời", example: "They are looking for a temporary job.", exampleVN: "Họ đang tìm kiếm một công việc tạm thời." },
  { word: "potential", meaning: "tiềm năng", example: "I have a meeting with a potential client.", exampleVN: "Tôi có một cuộc họp với một khách hàng tiềm năng." },
  { word: "be supposed to", meaning: "được cho là, phải làm gì", example: "The meeting was supposed to start ten minutes ago.", exampleVN: "Cuộc họp đáng lẽ phải bắt đầu từ mười phút trước." },
  { word: "budget", meaning: "ngân sách", example: "The council will vote on the budget next week.", exampleVN: "Hội đồng sẽ bỏ phiếu về ngân sách vào tuần tới." },
  { word: "agenda", meaning: "chương trình nghị sự", example: "The agenda was changed.", exampleVN: "Chương trình đã được thay đổi." },
  { word: "supply", meaning: "vật tư, đồ dùng", example: "We need more office supplies.", exampleVN: "Chúng ta cần thêm vật tư văn phòng." },
  { word: "complete", meaning: "hoàn thành", example: "Please complete the task by noon.", exampleVN: "Vui lòng hoàn thành nhiệm vụ trước trưa." },
  { word: "meeting", meaning: "cuộc họp", example: "I’m about to start a meeting.", exampleVN: "Tôi sắp bắt đầu cuộc họp." },
  { word: "shift", meaning: "ca làm việc", example: "His shift ends at five.", exampleVN: "Ca làm việc của anh ấy kết thúc lúc 5 giờ." },
  { word: "prepare", meaning: "chuẩn bị", example: "We must prepare for the meeting.", exampleVN: "Chúng ta phải chuẩn bị cho cuộc họp." }
];

export function processChunk20(): Word[] {
  return chunk20_raw.map((w, index) => {
    return {
      ...w,
      id: `c20_${index}`,
      pos: '(n/a)'
    };
  });
}
