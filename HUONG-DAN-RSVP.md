# Nhận xác nhận tham dự vào Google Sheet

Làm một lần, khoảng 10 phút.

## 1. Tạo Sheet
Vào https://sheets.new, đặt tên bất kỳ, ví dụ `Thiệp mời tốt nghiệp`.

## 2. Gắn script
Trong Sheet: menu **Tiện ích mở rộng > Apps Script**.
Xoá hết nội dung mẫu, dán toàn bộ file `Code.gs` vào, rồi bấm lưu.

Muốn nhận email báo mỗi lượt xác nhận thì sửa dòng đầu:
```
const NOTIFY_EMAIL = "email-cua-ban@gmail.com";
```

## 3. Deploy
- Bấm **Triển khai (Deploy) > Tùy chọn triển khai mới**.
- Chọn loại: **Ứng dụng web (Web app)**.
- Thực thi với tư cách: **Tôi**.
- Người có quyền truy cập: **Bất kỳ ai** — bắt buộc, nếu để "Chỉ mình tôi" thì khách bấm nút sẽ không gửi được.
- Bấm Triển khai, chấp nhận các bước cấp quyền.
- Copy đường dẫn Web app, dạng `https://script.google.com/macros/s/..../exec`.

## 4. Dán vào thiệp
M�� `script-new.js`, sửa dòng:
```js
const RSVP_ENDPOINT = "";
```
thành
```js
const RSVP_ENDPOINT = "https://script.google.com/macros/s/..../exec";
```

Đồng thời đổi luôn `RSVP_PHONE` thành số thật — dùng khi mạng lỗi.

## 5. Kiểm tra
M�� thiệp với một id thật, ví dụ `?guest=quyen`, bấm "Mình sẽ tới".
Sheet phải xuất hiện thêm một dòng.

## Lưu ý
- Mỗi lần sửa `Code.gs` phải **Deploy lại** (tạo phiên bản mới), không thì bản cũ vẫn chạy.
- Đường dẫn này lộ trong mã nguồn trang, đó là điều bình thường với web tĩnh. Nó chỉ cho phép thêm dòng vào Sheet, không đọc được gì.
- Chưa dán endpoint thì nút xác nhận tự chuyển sang mở tin nhắn, trang vẫn dùng được.
