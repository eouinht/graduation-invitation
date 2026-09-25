# 🎓 HUST Graduation Invitation

Một mẫu **thiệp mời lễ tốt nghiệp dạng website static**, có thể deploy miễn phí bằng **GitHub Pages**.

Mọi người có thể clone hoặc fork repository này để tự chỉnh sửa và tạo thiệp tốt nghiệp của riêng mình.

## Clone project

```bash
git clone <LINK_REPOSITORY>
cd graduation-invitation
```

Hoặc chọn **Fork** trực tiếp trên GitHub.

## Các file chính

```text
index-new.html
style-new.css
script-new.js
guests-new.json
```

- `index-new.html`: nội dung và cấu trúc thiệp
- `style-new.css`: giao diện và hiệu ứng
- `script-new.js`: ngày giờ, tên người mời và xử lý khách mời
- `guests-new.json`: danh sách khách mời

## Cá nhân hóa khách mời

Thêm khách vào `guests-new.json`, ví dụ:

```json
[
  {
    "id": "quyen",
    "name": "Quyền"
  }
]
```

Sau đó gửi link:

```text
https://USERNAME.github.io/graduation-invitation/index-new.html?guest=quyen
```

Nếu không có `?guest=` hoặc `id` không tồn tại, thiệp sẽ hiển thị lời chào chung.

## Deploy bằng GitHub Pages

Vào:

```text
Settings → Pages
```

Chọn:

```text
Deploy from a branch
main
/ (root)
```

Sau đó GitHub sẽ tạo link website cho repository.

## Tùy chỉnh

Bạn có thể tự thay đổi:

- Tên người tốt nghiệp
- Ngày giờ
- Nội dung lời mời
- Danh sách khách
- Hình ảnh
- Bản đồ
- Màu sắc và hiệu ứng

Feel free to clone, fork and customize it for your own graduation. 🎓
