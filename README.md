# Thiệp mời lễ tốt nghiệp - HUST

Website thiệp mời dạng static, deploy miễn phí bằng GitHub Pages.

Repo chứa **hai bản**, dùng chung một thư mục nhưng hoàn toàn độc lập:

| Bản | File | Mô tả |
|---|---|---|
| Ổn định | `index.html`, `style.css`, `script.js`, `guests.json` | Bản gốc đã sửa hết lỗi, không có hiệu ứng |
| New | `index-new.html`, `style-new.css`, `script-new.js`, `guests-new.json` | Bản đang dùng: hiệu ứng, bản đồ, nút xác nhận |

Sửa bản này không ảnh hưởng bản kia.

## Cần sửa trước khi gửi thiệp

Trong `script-new.js` (khối cấu hình ở đầu file):
- `GRADUATION_DATE_ISO` - ngày giờ lễ. Script tự điền luôn phần Ngày / Thời gian trong trang, không phải sửa chỗ nào khác.
- `HOST_NAME` - tên người mời, hiện ở phần ký tên.
- `RSVP_PHONE` - số điện thoại dự phòng khi gửi xác nhận lỗi.
- `RSVP_ENDPOINT` - link Google Apps Script, xem `HUONG-DAN-RSVP.md`. Để trống thì nút xác nhận chuyển sang mở tin nhắn.

Trong `index-new.html`:
- Kiểm tra link nút "Mở Google Maps" có dẫn đúng chỗ không.
- Địa chỉ và số điện thoại ở mục Liên hệ.

Trong `guests-new.json`:
- Danh sách khách. `id` viết thường, không dấu, không khoảng trắng.

## Gửi thiệp riêng cho từng người

Thêm `?guest=` kèm `id` vào cuối link:

```
https://USERNAME.github.io/graduation-invitation/index-new.html?guest=quyen
```

Không có hoặc sai `?guest=` thì thiệp hiện lời chào chung "Quý khách".

## Deploy bằng GitHub Pages

1. Tạo repository mới, ví dụ `graduation-invitation`.
2. Upload toàn bộ file lên repository, gồm cả `ban-do-hust.jpg`.
3. Vào `Settings > Pages`.
4. Build and deployment: chọn `Deploy from a branch`.
5. Chọn branch `main`, thư mục `/ (root)`, rồi Save.

Muốn bản new thành trang chính thì đổi tên `index-new.html` thành `index.html` (nhớ sao lưu bản cũ trước), và sửa lại các dòng `href`/`src` bên trong cho khớp.

## Lưu ý

- GitHub Pages phân biệt hoa thường trong tên file. Sai một chữ là ảnh hoặc CSS không hiện.
- `Code.gs` không cần upload lên repo, nó dùng cho Google Apps Script.
