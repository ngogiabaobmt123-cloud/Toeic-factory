import { Word, Question, QuestionType } from './types';
import { chunk2, processChunk2 } from './chunk2';
import { chunk3, processChunk3 } from './chunk3';
import { chunk4, processChunk4 } from './chunk4';
import { chunk5, processChunk5 } from './chunk5';
import { chunk6, processChunk6 } from './chunk6';
import { chunk7, processChunk7 } from './chunk7';
import { chunk8, processChunk8 } from './chunk8';
import { chunk9, processChunk9 } from './chunk9';
import { chunk10, processChunk10 } from './chunk10';
import { chunkMochi, processChunkMochi } from './chunkMochi';
import { chunkAdvanced, processChunkAdvanced } from './chunkAdvanced';
import { chunkEasy } from './chunkEasy';
import { chunkHardExtra } from './chunkHardExtra';
import { chunkHard2 } from './chunkHard2';

import { chunk11, processChunk11 } from './chunk11';
import { chunk12, processChunk12 } from './chunk12';
import { chunk13, processChunk13 } from './chunk13';
import { chunk14, processChunk14 } from './chunk14';
import { processChunk15 } from './chunk15';
import { processChunk16 } from './chunk16';
import { processChunk17 } from './chunk17';
import { processChunk18 } from './chunk18';
import { processChunk19 } from './chunk19';
import { processChunk20 } from './chunk20';
import { processChunk21 } from './chunk21';
import { processChunk22 } from './chunk22';
import { processChunk23 } from './chunk23';
import { processChunk24 } from './chunk24';
import { chunkEasy } from './chunkEasy';
import { chunkHardExtra } from './chunkHardExtra';

export const initialWords: Word[] = [
  { id: '1', word: 'achieve', meaning: 'đạt được', example: 'We expect to achieve our targets.', exampleVN: 'Chúng tôi mong đợi đạt được các mục tiêu của mình.' },
  { id: '2', word: 'acquire', meaning: 'đạt được, mua lại', example: 'The company will acquire a new subsidiary.', exampleVN: 'Công ty sẽ mua lại một công ty con mới.' },
  { id: '3', word: 'address', meaning: 'giải quyết, địa chỉ', example: 'We need to address this issue.', exampleVN: 'Chúng ta cần giải quyết vấn đề này.' },
  { id: '4', word: 'adjust', meaning: 'điều chỉnh', example: 'Please adjust your seat.', exampleVN: 'Vui lòng điều chỉnh ghế của bạn.' },
  { id: '5', word: 'advance', meaning: 'tiến bộ', example: 'Technology has advanced rapidly.', exampleVN: 'Công nghệ đã tiến bộ nhanh chóng.' },
  { id: '6', word: 'allocate', meaning: 'phân bổ', example: 'We must allocate our resources carefully.', exampleVN: 'Chúng ta phải phân bổ nguồn lực của mình một cách cẩn thận.' },
  { id: '7', word: 'alter', meaning: 'thay đổi', example: 'Do not alter the document.', exampleVN: 'Đừng thay đổi tài liệu.' },
  { id: '8', word: 'announce', meaning: 'thông báo', example: 'They will announce the winner tomorrow.', exampleVN: 'Họ sẽ thông báo người chiến thắng vào ngày mai.' },
  { id: '9', word: 'anticipate', meaning: 'dự đoán', example: 'We anticipate a drop in sales.', exampleVN: 'Chúng tôi dự đoán doanh số sẽ giảm.' },
  { id: '10', word: 'appeal', meaning: 'hấp dẫn', example: 'The design will appeal to young people.', exampleVN: 'Thiết kế này sẽ hấp dẫn giới trẻ.' },
  { id: '11', word: 'appoint', meaning: 'bổ nhiệm', example: 'She was appointed manager.', exampleVN: 'Cô được bổ nhiệm làm quản lý.' },
  { id: '12', word: 'approve', meaning: 'chấp thuận', example: 'The board approved the budget.', exampleVN: 'Hội đồng quản trị đã phê duyệt ngân sách.' },
  { id: '13', word: 'arrange', meaning: 'sắp xếp', example: 'I will arrange a meeting.', exampleVN: 'Tôi sẽ sắp xếp một cuộc gặp.' },
  { id: '14', word: 'assemble', meaning: 'lắp ráp', example: 'Assemble the parts carefully.', exampleVN: 'Lắp ráp các bộ phận một cách cẩn thận.' },
  { id: '15', word: 'assess', meaning: 'đánh giá', example: 'We need to assess the damages.', exampleVN: 'Chúng ta cần đánh giá thiệt hại.' },
  { id: '16', word: 'assign', meaning: 'phân công', example: 'The manager will assign tasks.', exampleVN: 'Người quản lý sẽ phân công nhiệm vụ.' },
  { id: '17', word: 'assist', meaning: 'hỗ trợ', example: 'Can you assist me with this?', exampleVN: 'Bạn có thể giúp tôi việc này được không?' },
  { id: '18', word: 'attach', meaning: 'đính kèm', example: 'Please attach your resume.', exampleVN: 'Vui lòng đính kèm sơ yếu lý lịch của bạn.' },
  { id: '19', word: 'attend', meaning: 'tham dự', example: 'I cannot attend the seminar.', exampleVN: 'Tôi không thể tham dự hội thảo.' },
  { id: '20', word: 'attract', meaning: 'thu hút', example: 'The store attracts many tourists.', exampleVN: 'Cửa hàng thu hút nhiều khách du lịch.' },
  { id: '21', word: 'bargain', meaning: 'mặc cả', example: 'It was a real bargain.', exampleVN: 'Đó là một món hời thực sự.' },
  { id: '22', word: 'benefit', meaning: 'lợi ích', example: 'What is the benefit of joining?', exampleVN: 'Lợi ích của việc tham gia là gì?' },
  { id: '23', word: 'bid', meaning: 'đấu thầu', example: 'They made a bid for the project.', exampleVN: 'Họ đã đấu thầu dự án.' },
  { id: '24', word: 'cancel', meaning: 'hủy bỏ', example: 'The meeting was canceled.', exampleVN: 'Cuộc họp đã bị hủy bỏ.' },
  { id: '25', word: 'candidate', meaning: 'ứng viên', example: 'He is a strong candidate.', exampleVN: 'Anh ấy là một ứng cử viên nặng ký.' },
  { id: '26', word: 'capacity', meaning: 'sức chứa, năng lực', example: 'The factory is running at full capacity.', exampleVN: 'Nhà máy đang hoạt động hết công suất.' },
  { id: '27', word: 'cargo', meaning: 'hàng hóa', example: 'The ship carries cargo.', exampleVN: 'Con tàu chở hàng hóa.' },
  { id: '28', word: 'career', meaning: 'sự nghiệp', example: 'She has a successful career.', exampleVN: 'Cô ấy có một sự nghiệp thành công.' },
  { id: '29', word: 'category', meaning: 'danh mục', example: 'Choose a category from the list.', exampleVN: 'Chọn một danh mục từ danh sách.' },
  { id: '30', word: 'cater', meaning: 'phục vụ', example: 'They cater for all events.', exampleVN: 'Họ phục vụ cho tất cả các sự kiện.' },
  { id: '31', word: 'certify', meaning: 'chứng nhận', example: 'We certify that the product is safe.', exampleVN: 'Chúng tôi chứng nhận rằng sản phẩm an toàn.' },
  { id: '32', word: 'charge', meaning: 'tính phí', example: 'There is no extra charge.', exampleVN: 'Không có phí bổ sung.' },
  { id: '33', word: 'clarify', meaning: 'làm rõ', example: 'Could you clarify your point?', exampleVN: 'Bạn có thể làm rõ quan điểm của bạn?' },
  { id: '34', word: 'collaborate', meaning: 'hợp tác', example: 'We collaborate closely with partners.', exampleVN: 'Chúng tôi hợp tác chặt chẽ với các đối tác.' },
  { id: '35', word: 'collapse', meaning: 'sụp đổ', example: 'The building collapsed.', exampleVN: 'Tòa nhà sụp đổ.' },
  { id: '36', word: 'colleague', meaning: 'đồng nghiệp', example: 'Meet my colleague, John.', exampleVN: 'Gặp đồng nghiệp của tôi, John.' },
  { id: '37', word: 'combine', meaning: 'kết hợp', example: 'Combine all ingredients.', exampleVN: 'Kết hợp tất cả các thành phần.' },
  { id: '38', word: 'commute', meaning: 'đi lại (đi làm)', example: 'My commute takes an hour.', exampleVN: 'Việc đi lại của tôi mất một giờ.' },
  { id: '39', word: 'compensate', meaning: 'đền bù', example: 'We will compensate you for the loss.', exampleVN: 'Chúng tôi sẽ đền bù cho bạn sự mất mát.' },
  { id: '40', word: 'compete', meaning: 'cạnh tranh', example: 'We compete in a global market.', exampleVN: 'Chúng tôi cạnh tranh trong một thị trường toàn cầu.' },
  { id: '41', word: 'compile', meaning: 'biên soạn', example: 'Please compile a list of names.', exampleVN: 'Hãy biên soạn một danh sách các tên.' },
  { id: '42', word: 'complain', meaning: 'phàn nàn', example: 'She complained about the noise.', exampleVN: 'Cô phàn nàn về tiếng ồn.' },
  { id: '43', word: 'complete', meaning: 'hoàn thành', example: 'Complete the form below.', exampleVN: 'Hoàn thành mẫu dưới đây.' },
  { id: '44', word: 'comply', meaning: 'tuân thủ', example: 'You must comply with the rules.', exampleVN: 'Bạn phải tuân thủ các quy tắc.' },
  { id: '45', word: 'compose', meaning: 'soạn thảo', example: 'Compose a formal email.', exampleVN: 'Soạn một email chính thức.' },
  { id: '46', word: 'comprehend', meaning: 'hiểu', example: 'I cannot comprehend this manual.', exampleVN: 'Tôi không thể hiểu được hướng dẫn này.' },
  { id: '47', word: 'compromise', meaning: 'thỏa hiệp', example: 'We reached a compromise.', exampleVN: 'Chúng tôi đã đạt được thỏa hiệp.' },
  { id: '48', word: 'conceal', meaning: 'che giấu', example: 'He tried to conceal the truth.', exampleVN: 'Anh đã cố gắng che giấu sự thật.' },
  { id: '49', word: 'concentrate', meaning: 'tập trung', example: 'I need to concentrate on my study.', exampleVN: 'Tôi cần tập trung vào việc học của mình.' },
  { id: '50', word: 'conclude', meaning: 'kết luận', example: 'What can we conclude from this?', exampleVN: 'Chúng ta có thể kết luận gì từ điều này?' },
  { id: '51', word: 'conduct', meaning: 'tiến hành', example: 'We will conduct a survey.', exampleVN: 'Chúng tôi sẽ tiến hành một cuộc khảo sát.' },
  { id: '52', word: 'confirm', meaning: 'xác nhận', example: 'Please confirm your reservation.', exampleVN: 'Vui lòng xác nhận đặt phòng của bạn.' },
  { id: '53', word: 'connect', meaning: 'kết nối', example: 'Connect the cable here.', exampleVN: 'Kết nối cáp ở đây.' },
  { id: '54', word: 'consist', meaning: 'bao gồm', example: 'The team consists of 5 members.', exampleVN: 'Đội gồm có 5 thành viên.' },
  { id: '55', word: 'consult', meaning: 'tham khảo', example: 'Consult your doctor first.', exampleVN: 'Hãy tham khảo ý kiến ​​bác sĩ trước.' },
  { id: '56', word: 'consume', meaning: 'tiêu thụ', example: 'Car consumes a lot of gas.', exampleVN: 'Xe tiêu hao nhiều xăng.' },
  { id: '57', word: 'contain', meaning: 'chứa đựng', example: 'This box contains fragile items.', exampleVN: 'Hộp này chứa các mặt hàng dễ vỡ.' },
  { id: '58', word: 'contribute', meaning: 'đóng góp', example: 'Thank you for contributing.', exampleVN: 'Cảm ơn bạn đã đóng góp.' },
  { id: '59', word: 'control', meaning: 'kiểm soát', example: 'Take control of the situation.', exampleVN: 'Hãy kiểm soát tình hình.' },
  { id: '60', word: 'convince', meaning: 'thuyết phục', example: 'He convinced me to buy it.', exampleVN: 'Anh ấy đã thuyết phục tôi mua nó.' },
  { id: '61', word: 'cooperate', meaning: 'hợp tác', example: 'Lets cooperate on this.', exampleVN: 'Hãy hợp tác về việc này.' },
  { id: '62', word: 'coordinate', meaning: 'điều phối', example: 'Who will coordinate the event?', exampleVN: 'Ai sẽ điều phối sự kiện này?' },
  { id: '63', word: 'copy', meaning: 'sao chép', example: 'Make a copy for me.', exampleVN: 'Làm một bản sao cho tôi.' },
  { id: '64', word: 'correct', meaning: 'sửa chữa, đúng', example: 'Correct the errors.', exampleVN: 'Sửa các lỗi.' },
  { id: '65', word: 'cost', meaning: 'chi phí', example: 'The cost is high.', exampleVN: 'Chi phí cao.' },
  { id: '66', word: 'cover', meaning: 'bao phủ', example: 'Insurance covers the damage.', exampleVN: 'Bảo hiểm bao gồm các thiệt hại.' },
  { id: '67', word: 'create', meaning: 'tạo ra', example: 'Create a new file.', exampleVN: 'Tạo một tập tin mới.' },
  { id: '68', word: 'criticize', meaning: 'chỉ trích', example: 'Dont criticize him.', exampleVN: 'Đừng chỉ trích anh ấy' },
  { id: '69', word: 'decide', meaning: 'quyết định', example: 'I decided to go.', exampleVN: 'Tôi quyết định đi.' },
  { id: '70', word: 'decline', meaning: 'từ chối, suy giảm', example: 'Profits are declining.', exampleVN: 'Lợi nhuận đang giảm dần.' },
  { id: '71', word: 'decrease', meaning: 'giảm', example: 'Decrease the brightness.', exampleVN: 'Giảm độ sáng.' },
  { id: '72', word: 'deduct', meaning: 'khấu trừ', example: 'Tax will be deducted.', exampleVN: 'Thuế sẽ được khấu trừ.' },
  { id: '73', word: 'defend', meaning: 'bảo vệ', example: 'Defend your rights.', exampleVN: 'Bảo vệ quyền lợi của bạn.' },
  { id: '74', word: 'define', meaning: 'định nghĩa', example: 'Define the term.', exampleVN: 'Xác định thuật ngữ.' },
  { id: '75', word: 'delay', meaning: 'trì hoãn', example: 'The flight is delayed.', exampleVN: 'Chuyến bay bị trì hoãn.' },
  { id: '76', word: 'delete', meaning: 'xóa', example: 'Delete the file.', exampleVN: 'Xóa tập tin.' },
  { id: '77', word: 'deliver', meaning: 'giao hàng', example: 'Deliver the package.', exampleVN: 'Giao gói hàng.' },
  { id: '78', word: 'demand', meaning: 'yêu cầu', example: 'I demand an answer.', exampleVN: 'Tôi yêu cầu một câu trả lời.' },
  { id: '79', word: 'demonstrate', meaning: 'chứng minh', example: 'Demonstrate your skills.', exampleVN: 'Thể hiện kỹ năng của bạn.' },
  { id: '80', word: 'depart', meaning: 'khởi hành', example: 'Depart at 8 AM.', exampleVN: 'Khởi hành lúc 8 giờ sáng.' },
  { id: '81', word: 'depend', meaning: 'phụ thuộc', example: 'It depends on you.', exampleVN: 'Nó phụ thuộc vào bạn.' },
  { id: '82', word: 'describe', meaning: 'miêu tả', example: 'Describe the picture.', exampleVN: 'Mô tả bức tranh.' },
  { id: '83', word: 'design', meaning: 'thiết kế', example: 'Design a website.', exampleVN: 'Thiết kế một trang web.' },
  { id: '84', word: 'determine', meaning: 'xác định', example: 'Determine the cause.', exampleVN: 'Xác định nguyên nhân.' },
  { id: '85', word: 'develop', meaning: 'phát triển', example: 'Develop a strategy.', exampleVN: 'Phát triển một chiến lược.' },
  { id: '86', word: 'devise', meaning: 'nghĩ ra', example: 'Devise a plan.', exampleVN: 'Đưa ra một kế hoạch.' },
  { id: '87', word: 'direct', meaning: 'trực tiếp, chỉ đạo', example: 'He directs the movie.', exampleVN: 'Anh ấy đạo diễn bộ phim.' },
  { id: '88', word: 'discount', meaning: 'giảm giá', example: 'Get a 50% discount.', exampleVN: 'Nhận giảm giá 50%.' },
  { id: '89', word: 'discuss', meaning: 'thảo luận', example: 'Discuss the issue.', exampleVN: 'Thảo luận về vấn đề này.' },
  { id: '90', word: 'dismiss', meaning: 'sa thải, bác bỏ', example: 'Dismiss the meeting.', exampleVN: 'Giải tán cuộc họp.' },
  { id: '91', word: 'display', meaning: 'trưng bày', example: 'Display the artworks.', exampleVN: 'Trưng bày các tác phẩm nghệ thuật.' },
  { id: '92', word: 'dispose', meaning: 'vứt bỏ', example: 'Dispose of the trash.', exampleVN: 'Vứt bỏ thùng rác.' },
  { id: '93', word: 'distribute', meaning: 'phân phối', example: 'Distribute the flyers.', exampleVN: 'Phân phát tờ rơi.' },
  { id: '94', word: 'divide', meaning: 'chia', example: 'Divide into groups.', exampleVN: 'Chia thành các nhóm.' },
  { id: '95', word: 'donate', meaning: 'quyên góp', example: 'Donate blood.', exampleVN: 'Hiến máu.' },
  { id: '96', word: 'draft', meaning: 'bản nháp', example: 'Write a draft.', exampleVN: 'Viết một bản nháp.' },
  { id: '97', word: 'earn', meaning: 'kiếm được', example: 'Earn extra income.', exampleVN: 'Kiếm thêm thu nhập.' },
  { id: '98', word: 'edit', meaning: 'chỉnh sửa', example: 'Edit the photo.', exampleVN: 'Chỉnh sửa ảnh.' },
  { id: '99', word: 'educate', meaning: 'giáo dục', example: 'Educate students.', exampleVN: 'Giáo dục học sinh.' },
  { id: '100', word: 'eliminate', meaning: 'loại bỏ', example: 'Eliminate risks.', exampleVN: 'Loại bỏ rủi ro.' },
  { id: '101', word: 'emphasize', meaning: 'nhấn mạnh', example: 'Emphasize the importance.', exampleVN: 'Nhấn mạnh tầm quan trọng.' },
  { id: '102', word: 'employ', meaning: 'tuyển dụng', example: 'Employ talented staff.', exampleVN: 'Sử dụng nhân viên tài năng.' },
  { id: '103', word: 'enable', meaning: 'kích hoạt', example: 'Enable the feature.', exampleVN: 'Kích hoạt tính năng này.' },
  { id: '104', word: 'encourage', meaning: 'khuyến khích', example: 'Encourage learning.', exampleVN: 'Khuyến khích học tập.' },
  { id: '105', word: 'enforce', meaning: 'thi hành', example: 'Enforce the law.', exampleVN: 'Thi hành luật.' },
  { id: '106', word: 'enhance', meaning: 'nâng cao', example: 'Enhance your career.', exampleVN: 'Nâng cao sự nghiệp của bạn.' },
  { id: '107', word: 'enquire', meaning: 'hỏi thăm', example: 'Enquire about prices.', exampleVN: 'Hỏi về giá cả.' },
  { id: '108', word: 'enroll', meaning: 'đăng ký học', example: 'Enroll in college.', exampleVN: 'Ghi danh vào đại học.' },
  { id: '109', word: 'ensure', meaning: 'đảm bảo', example: 'Ensure quality.', exampleVN: 'Đảm bảo chất lượng.' },
  { id: '110', word: 'expand', meaning: 'mở rộng', example: 'Expand the market.', exampleVN: 'Mở rộng thị trường.' },
  { id: '111', word: 'contract', meaning: 'hợp đồng', example: 'Sign the contract now.', exampleVN: 'Hãy ký hợp đồng ngay bây giờ.' },
  { id: '112', word: 'deadline', meaning: 'hạn chót', example: 'The deadline is tomorrow.', exampleVN: 'Hạn chót là ngày mai.' },
  { id: '113', word: 'procedure', meaning: 'quy trình', example: 'Follow the safety procedure.', exampleVN: 'Thực hiện theo quy trình an toàn.' },
  { id: '114', word: 'process', meaning: 'quá trình', example: 'The data process is complex.', exampleVN: 'Quá trình xử lý dữ liệu rất phức tạp.' },
  { id: '115', word: 'department', meaning: 'phòng ban', example: 'She was promoted to head of the sales department.', exampleVN: 'Cô được thăng chức lên trưởng phòng kinh doanh.' },
  { id: '116', word: 'capital', meaning: 'tiền vốn', example: 'We need more capital to expand our operations.', exampleVN: 'Chúng tôi cần thêm vốn để mở rộng hoạt động.' },
  { id: '117', word: 'finance', meaning: 'tài chính', example: 'He works in corporate finance at a large bank.', exampleVN: 'Anh ấy làm việc trong lĩnh vực tài chính doanh nghiệp tại một ngân hàng lớn.' },
  { id: '118', word: 'economy', meaning: 'kinh tế', example: 'The global economy is slowly recovering from the crisis.', exampleVN: 'Nền kinh tế toàn cầu đang dần hồi phục sau khủng hoảng.' },
  { id: '119', word: 'revenue', meaning: 'doanh thu', example: 'Our total tax revenue increased by five percent this year.', exampleVN: 'Tổng doanh thu thuế của chúng tôi đã tăng 5% trong năm nay.' },
  { id: '120', word: 'expense', meaning: 'chi phí', example: 'Traveling is our biggest business expense.', exampleVN: 'Du lịch là chi phí kinh doanh lớn nhất của chúng tôi.' },
  { id: '121', word: 'investment', meaning: 'đầu tư', example: 'Buying a house is usually a good long-term investment.', exampleVN: 'Mua nhà thường là một khoản đầu tư dài hạn tốt.' },
  { id: '122', word: 'profit', meaning: 'lợi nhuận', example: 'The company finally managed to make a profit this quarter.', exampleVN: 'Công ty cuối cùng đã kiếm được lợi nhuận trong quý này.' },
  { id: '123', word: 'quarter', meaning: 'quý', example: 'Profits grew significantly in the first quarter of the year.', exampleVN: 'Lợi nhuận quý 1 tăng trưởng đáng kể.' },
  { id: '124', word: 'budget', meaning: 'ngân sách', example: 'The marketing team had to work within a very tight budget.', exampleVN: 'Đội ngũ tiếp thị đã phải làm việc với ngân sách rất eo hẹp.' },
  { id: '125', word: 'audit', meaning: 'kiểm toán', example: 'The company undergoes a strict financial audit every year.', exampleVN: 'Công ty phải trải qua đợt kiểm toán tài chính nghiêm ngặt hàng năm.' },
  { id: '126', word: 'invoice', meaning: 'hóa đơn', example: 'Please send an invoice to our accounting department.', exampleVN: 'Vui lòng gửi hóa đơn đến bộ phận kế toán của chúng tôi.' },
  { id: '127', word: 'receipt', meaning: 'biên lai', example: 'Make sure you keep your receipt in case you want to return the item.', exampleVN: 'Hãy chắc chắn rằng bạn giữ lại biên nhận trong trường hợp bạn muốn trả lại hàng.' },
  { id: '128', word: 'tax', meaning: 'thuế', example: 'The government decided to raise the income tax rate.', exampleVN: 'Chính phủ quyết định tăng thuế suất thuế thu nhập.' },
  { id: '129', word: 'asset', meaning: 'tài sản', example: 'Her ability to speak three languages is a valuable asset to the team.', exampleVN: 'Khả năng nói ba thứ tiếng của cô ấy là tài sản quý giá đối với nhóm.' },
  { id: '130', word: 'liability', meaning: 'trách nhiệm pháp lý, nợ', example: 'The business has enough assets to cover its corporate liability.', exampleVN: 'Doanh nghiệp có đủ tài sản để trang trải trách nhiệm pháp lý của mình.' },
  { id: '131', word: 'equity', meaning: 'vốn chủ sở hữu', example: 'They have built a lot of brand equity over the years.', exampleVN: 'Họ đã xây dựng được rất nhiều tài sản thương hiệu trong những năm qua.' },
  { id: '132', word: 'dividend', meaning: 'cổ tức', example: 'The board decided not to pay a dividend to shareholders this year.', exampleVN: 'Hội đồng quản trị quyết định không chia cổ tức cho cổ đông trong năm nay.' },
  { id: '133', word: 'stock', meaning: 'cổ phiếu, hàng hóa', example: 'He invested most of his savings in the stock market.', exampleVN: 'Ông đầu tư phần lớn tiền tiết kiệm của mình vào thị trường chứng khoán.' },
  { id: '134', word: 'shareholder', meaning: 'cổ đông', example: 'The CEO will speak at the annual shareholder meeting.', exampleVN: 'Giám đốc điều hành sẽ phát biểu tại cuộc họp cổ đông thường niên.' },
  { id: '135', word: 'interest', meaning: 'lãi suất', example: 'The central bank decided to lower the interest rate.', exampleVN: 'Ngân hàng trung ương quyết định giảm lãi suất.' },
  { id: '136', word: 'loan', meaning: 'khoản vay', example: 'She applied for a bank loan to start her new business.', exampleVN: 'Cô đã nộp đơn xin vay ngân hàng để bắt đầu công việc kinh doanh mới của mình.' },
  { id: '137', word: 'mortgage', meaning: 'thế chấp', example: 'It will take them thirty years to pay off the mortgage.', exampleVN: 'Họ sẽ phải mất ba mươi năm để trả hết khoản thế chấp.' },
  { id: '138', word: 'deposit', meaning: 'tiền gửi, cọc', example: 'You will need to make a deposit when you rent the apartment.', exampleVN: 'Bạn sẽ phải đặt cọc khi thuê căn hộ.' },
  { id: '139', word: 'withdraw', meaning: 'rút tiền', example: 'I need to stop by the ATM to withdraw some cash.', exampleVN: 'Tôi cần ghé qua máy ATM để rút một ít tiền mặt.' },
  { id: '140', word: 'transaction', meaning: 'giao dịch', example: 'We use secure encryption for every online transaction.', exampleVN: 'Chúng tôi sử dụng mã hóa an toàn cho mọi giao dịch trực tuyến.' },
  { id: '141', word: 'bankrupt', meaning: 'phá sản', example: 'The company will go bankrupt if sales do not improve.', exampleVN: 'Công ty sẽ phá sản nếu doanh số bán hàng không được cải thiện.' },
  { id: '142', word: 'currency', meaning: 'tiền tệ', example: 'You should exchange your money into foreign currency before traveling.', exampleVN: 'Bạn nên đổi tiền của mình sang ngoại tệ trước khi đi du lịch.' },
  { id: '143', word: 'exchange', meaning: 'trao đổi', example: 'The exchange rate fluctuates daily based on the market.', exampleVN: 'Tỷ giá hối đoái biến động hàng ngày theo thị trường.' },
  { id: '144', word: 'inflation', meaning: 'lạm phát', example: 'High inflation is reducing the purchasing power of consumers.', exampleVN: 'Lạm phát cao đang làm giảm sức mua của người tiêu dùng.' },
  { id: '145', word: 'recession', meaning: 'suy thoái', example: 'Many small businesses were forced to close during the economic recession.', exampleVN: 'Nhiều doanh nghiệp nhỏ buộc phải đóng cửa trong thời kỳ suy thoái kinh tế.' },
  { id: '146', word: 'market', meaning: 'thị trường', example: 'They are planning to launch a new product in the free market.', exampleVN: 'Họ đang có kế hoạch tung ra một sản phẩm mới trên thị trường tự do.' },
  { id: '147', word: 'supply', meaning: 'nguồn cung', example: "The drought severely affected the city's water supply.", exampleVN: "Hạn hán đã tác động nghiêm trọng đến nguồn cung cấp nước của thành phố." },
  { id: '148', word: 'demand', meaning: 'nhu cầu', example: 'Prices are determined by the laws of supply and demand.', exampleVN: 'Giá cả được xác định bởi quy luật cung cầu.' },
  { id: '149', word: 'consumer', meaning: 'người tiêu dùng', example: 'The company manufactures a wide range of consumer goods.', exampleVN: 'Công ty sản xuất nhiều loại hàng tiêu dùng.' },
  { id: '150', word: 'customer', meaning: 'khách hàng', example: 'We offer special discounts to every loyal customer.', exampleVN: 'Chúng tôi cung cấp giảm giá đặc biệt cho mọi khách hàng trung thành.' }
];

const initialWordsWithPOS = initialWords.map(w => {
  const nouns = new Set(['candidate', 'capacity', 'cargo', 'career', 'category', 'colleague', 'department', 'capital', 'economy', 'revenue', 'expense', 'investment', 'quarter', 'invoice', 'receipt', 'asset', 'liability', 'equity', 'dividend', 'shareholder', 'mortgage', 'transaction', 'currency', 'inflation', 'recession', 'consumer', 'customer', 'procedure']);
  const both_nv = new Set(['address', 'bargain', 'benefit', 'bid', 'charge', 'cost', 'decline', 'delay', 'demand', 'discount', 'draft', 'exchange', 'finance', 'profit', 'budget', 'audit', 'tax', 'stock', 'interest', 'loan', 'deposit', 'market', 'supply', 'contract', 'deadline', 'process']);
  const adjs = new Set(['bankrupt']);
  
  let pos = '(v)';
  if (nouns.has(w.word)) pos = '(n)';
  else if (both_nv.has(w.word)) pos = '(n, v)';
  else if (adjs.has(w.word)) pos = '(adj)';

  return { ...w, pos };
});

const easyWordsWithPOS = chunkEasy.map(w => ({ ...w, pos: '(n)' as string }));
const hardExtraWithPOS = chunkHardExtra.map(w => ({ ...w, pos: '(adj)' as string }));
const hard2WithPOS = chunkHard2.map(w => ({ ...w, pos: '(adj)' as string }));

const toeicCoreWords = [
  ...initialWordsWithPOS,
  ...processChunk2(),
  ...processChunk3(),
  ...processChunk4(),
  ...processChunk5(),
  ...processChunk6(),
  ...processChunk7(),
  ...processChunk8(),
  ...processChunk9(),
  ...processChunk10(),
  ...processChunkMochi(),
  ...processChunkAdvanced(),
  ...processChunk11(),
  ...processChunk12(),
  ...processChunk13(),
  ...processChunk14(),
  ...processChunk15(),
  ...processChunk16(),
  ...processChunk17(),
  ...processChunk18(),
  ...processChunk19(),
  ...processChunk20(),
  ...processChunk21(),
  ...processChunk22(),
  ...processChunk23(),
  ...processChunk24()
];

const rawAllWords = [
  ...toeicCoreWords,
  ...easyWordsWithPOS,
  ...hardExtraWithPOS,
  ...hard2WithPOS
];

// Deduplicate by word (case insensitive)
const uniqueMap = new Map<string, Word>();
rawAllWords.forEach(w => {
  const key = w.word.toLowerCase().trim();
  if (!uniqueMap.has(key)) {
    uniqueMap.set(key, w);
  }
});

export const ALL_WORDS = Array.from(uniqueMap.values());

// Classify words by difficulty using ID prefix
// e* = easy (A1-A2), a*/h* = hard (C1+), everything else = intermediate (B1-B2)
export const EASY_WORDS = ALL_WORDS.filter(w => w.id.startsWith('e'));
export const HARD_WORDS = ALL_WORDS.filter(w => w.id.startsWith('a') || w.id.startsWith('h'));
export const INTERMEDIATE_WORDS = ALL_WORDS.filter(w => !w.id.startsWith('e') && !w.id.startsWith('a') && !w.id.startsWith('h'));

export const getWordsByDifficulty = (level?: 'easy' | 'intermediate' | 'hard'): Word[] => {
  if (level === 'easy') return EASY_WORDS;
  if (level === 'intermediate') return INTERMEDIATE_WORDS;
  if (level === 'hard') return HARD_WORDS;
  return ALL_WORDS;
};

export const getAllWords = () => ALL_WORDS;

export const getUpdatedActivePool = (
  currentPool: string[] | undefined,
  _wordProgress: Record<string, { consecutiveCorrect: number; seenCount: number; lastSeen: number; cooldown: number; }>
): string[] => {
  return currentPool || [];
};

/**
 * SRS - Spaced Repetition System
 *
 * Mỗi từ có:
 *   - consecutiveCorrect (N): số lần đúng liên tiếp
 *   - lastSeen: currentQuestionIndex lúc từ đó được hỏi lần gần nhất
 *
 * Interval = 2^N câu hỏi
 *   N=0 (mới hoặc vừa sai): interval = 1 → gặp lại sau 1 câu khác
 *   N=1 (đúng 1 lần):       interval = 2 → gặp lại sau 2 câu khác
 *   N=2: interval = 4,  N=3: 8,  N=4: 16, ...
 *
 * Ưu tiên khi có từ đến hạn:
 *   1. N nhỏ hơn trước (từ sai gần nhất cần ôn nhiều hơn)
 *   2. Nếu cùng N → lastSeen nhỏ hơn trước (chờ lâu hơn)
 *
 * Nếu không có từ đến hạn → lấy từ mới tiếp theo theo thứ tự kho từ vựng.
 */
export const getNextWord = (
  wordProgress: Record<string, { consecutiveCorrect: number; seenCount: number; lastSeen: number; cooldown: number; }>,
  _lastWordId?: string,
  _activeWordIds?: string[],
  currentIndex: number = 0,
  _recentWordIds: string[] = [],
  _currentStreak: number = 0,
  difficulty?: 'easy' | 'intermediate' | 'hard'
): Word => {
  const progress = wordProgress || {};
  const pool = getWordsByDifficulty(difficulty);

  type DueEntry = { word: Word; n: number; lastSeen: number };
  const dueWords: DueEntry[] = [];
  let firstNewWord: Word | null = null;

  for (const w of pool) {
    const p = progress[w.id];

    // Từ chưa gặp bao giờ → new word
    if (!p || p.seenCount === 0) {
      if (!firstNewWord) firstNewWord = w;
      continue;
    }

    const n = p.consecutiveCorrect ?? 0;
    const interval = Math.pow(2, n); // 2^N
    const questionsPassed = currentIndex - p.lastSeen;

    if (questionsPassed >= interval) {
      dueWords.push({ word: w, n, lastSeen: p.lastSeen });
    }
  }

  // Ưu tiên 1: có từ đến hạn
  if (dueWords.length > 0) {
    dueWords.sort((a, b) => {
      const aInterval = Math.pow(2, a.n);
      const bInterval = Math.pow(2, b.n);
      const aOverdue = (currentIndex - a.lastSeen) - aInterval;
      const bOverdue = (currentIndex - b.lastSeen) - bInterval;
      if (bOverdue !== aOverdue) return bOverdue - aOverdue; // Lớn hơn (overdue nhiều hơn) lên trước
      return a.lastSeen - b.lastSeen; // Nếu bằng nhau thì lastSeen nhỏ hơn (chờ lâu hơn) lên trước
    });
    return dueWords[0].word;
  }

  // Ưu tiên 2: không có từ đến hạn → từ mới tiếp theo
  if (firstNewWord) return firstNewWord;

  // Fallback: tất cả đều đã học, chưa có cái nào đến hạn → trả từ gần đến hạn nhất
  let soonest: { word: Word; remaining: number } | null = null;
  for (const w of pool) {
    const p = progress[w.id];
    if (!p) continue;
    const n = p.consecutiveCorrect ?? 0;
    const interval = Math.pow(2, n);
    const remaining = interval - (currentIndex - p.lastSeen);
    if (!soonest || remaining < soonest.remaining) {
      soonest = { word: w, remaining };
    }
  }
  return soonest?.word ?? pool[0] ?? ALL_WORDS[0];
};



export const generateQuestion = (
  targetWord?: Word, 
  wordProgress?: Record<string, { consecutiveCorrect: number; seenCount: number; lastSeen: number; cooldown: number; }>,
  difficulty?: 'easy' | 'intermediate' | 'hard'
): Question => {
  const pool = getWordsByDifficulty(difficulty);
  const word = targetWord || pool[Math.floor(Math.random() * pool.length)] || ALL_WORDS[0];
  
  // Question types: MCQ (60%), Boolean (15%), Matching (10%), Spelling Builder (15%).
  // Pick distractors from seen words if possible
  const seenWords = pool.filter(w => w.id !== word.id && wordProgress && wordProgress[w.id] && wordProgress[w.id].seenCount > 0);
  
  const randType = Math.random();
  let type: QuestionType;
  
  const isWordSeen = wordProgress && wordProgress[word.id] && wordProgress[word.id].seenCount > 0;

  if (randType < 0.6) {
    type = 'mcq';
  } else if (randType < 0.75) {
    type = 'boolean';
  } else if (randType < 0.85 && seenWords.length >= 2) {
    type = 'matching';
  } else if (randType >= 0.85 && isWordSeen) {
    type = 'spelling_builder';
  } else {
    type = 'mcq';
  }

  // Generate spelling_builder if selected
  if (type === 'spelling_builder') {
    const rawWord = word.word.toLowerCase();
    const correctLetters = rawWord.split('');
    const slots = rawWord.length;
    
    // 2-3 random decoy letters
    const allAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const numDecoys = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const decoys = [];
    for (let i = 0; i < numDecoys; i++) {
        const randLetter = allAlphabet[Math.floor(Math.random() * allAlphabet.length)];
        decoys.push(randLetter);
    }
    
    const letters = [...correctLetters, ...decoys].sort(() => 0.5 - Math.random());
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'spelling_builder',
      wordId: word.id,
      text: word.meaning,
      correct_word: rawWord,
      slots: slots,
      letters: letters,
      answer: rawWord,
      explanation: `"${word.word}": ${word.meaning}\nVí dụ: ${word.example}\nDịch: ${word.exampleVN || ''}`
    };
  }

  if (type === 'mcq') {
    const distractorPool = seenWords.length >= 3 ? seenWords : pool.filter(w => w.id !== word.id);
    
    const distractors = distractorPool
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.meaning);
    const options = [word.meaning, ...distractors].sort(() => 0.5 - Math.random());
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'mcq',
      wordId: word.id,
      text: `Từ "${word.word}" có nghĩa là gì?`,
      options,
      answer: word.meaning,
      explanation: `"${word.word}": ${word.meaning}\nVí dụ: ${word.example}\nDịch: ${word.exampleVN || ''}`
    };
  }

  if (type === 'matching') {
    const distractorPool = seenWords; // We already ensured seenWords.length >= 2

    const otherWords = distractorPool
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    
    const words = [word, ...otherWords];
    const pairs = words.map(w => ({
      id: w.id,
      left: w.word,
      right: w.meaning
    }));

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'matching',
      wordId: word.id,
      text: "Nối các từ tiếng Anh với nghĩa tiếng Việt tương ứng",
      pairs,
      answer: "completed", // Placeholder for logic
      explanation: words.map(w => `"${w.word}": ${w.meaning}`).join('\n')
    };
  }

  // Boolean type
  const isCorrect = Math.random() > 0.5;
  const otherWords = seenWords.length > 0 ? seenWords : pool.filter(w => w.id !== word.id);
  const randomWrongMeaning = otherWords[Math.floor(Math.random() * otherWords.length)]?.meaning || 'khác';
  const meaningToShow = isCorrect ? word.meaning : randomWrongMeaning;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'boolean',
    wordId: word.id,
    text: `Từ "${word.word}" có nghĩa là "${meaningToShow}"?`,
    answer: isCorrect,
    explanation: `"${word.word}": ${word.meaning}\nVí dụ: ${word.example}\nDịch: ${word.exampleVN || ''}`
  };
};