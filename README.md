# Graduation Invitation Website

Website thiệp mời lễ tốt nghiệp dạng static, phù hợp deploy miễn phí bằng GitHub Pages.

## Các file
- `index.html`: nội dung trang
- `style.css`: giao diện
- `script.js`: countdown

## Cần sửa trước khi deploy
Trong `index.html`:
- Tên `Nguyễn Văn A`
- Ngày, giờ lễ tốt nghiệp
- Địa điểm
- Link Google Maps
- Link Google Form RSVP

Trong `script.js`:
- Đổi `graduationDate` thành ngày giờ thật, ví dụ:
  `new Date("2026-09-20T09:00:00+07:00")`

## Deploy bằng GitHub Pages
1. Tạo repository mới, ví dụ `graduation-invitation`.
2. Upload 4 file này lên repository.
3. Vào `Settings > Pages`.
4. Ở phần Build and deployment, chọn `Deploy from a branch`.
5. Chọn branch `main` và thư mục `/ (root)` rồi Save.
6. Sau khi Pages bật, link thường có dạng:
   `https://USERNAME.github.io/graduation-invitation/`

# graduation-invitation
