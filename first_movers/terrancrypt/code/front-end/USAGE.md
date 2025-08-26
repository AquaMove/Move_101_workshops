# Sui Blog dApp - Hướng dẫn sử dụng

## Tổng quan

Sui Blog dApp là một ứng dụng blog phi tập trung được xây dựng trên blockchain Sui. Ứng dụng cho phép người dùng tạo, chỉnh sửa, thích, chia sẻ và quản lý các bài viết blog một cách an toàn và minh bạch.

## Tính năng chính

### 1. Tạo Blog Post
- Viết nội dung blog trong form tạo blog
- Nhấn "Create Blog Post" để đăng bài
- Giao dịch sẽ được thực hiện trên blockchain Sui

### 2. Xem Blog Posts
- **Tab "All Blogs"**: Xem tất cả blog posts đã được đăng
- **Tab "My Blogs"**: Xem chỉ những blog posts của bạn

### 3. Tương tác với Blog Posts

#### Like Blog
- Nhấn nút "Like" để thích một blog post
- Số lượt thích sẽ được cập nhật real-time

#### Edit Blog (Chỉ tác giả)
- Nhấn nút "Edit" để chỉnh sửa nội dung
- Chỉ tác giả mới có quyền chỉnh sửa
- Nhấn "Save" để lưu thay đổi hoặc "Cancel" để hủy

#### Transfer Blog (Chỉ tác giả)
- Nhấn nút "Transfer" để chuyển quyền sở hữu
- Nhập địa chỉ ví của người nhận
- Xác nhận chuyển giao

#### Share Blog (Chỉ tác giả)
- Nhấn nút "Share" để chia sẻ blog công khai
- Blog sẽ có thể đọc được bởi tất cả mọi người
- Tác giả vẫn giữ quyền chỉnh sửa

#### Delete Blog (Chỉ tác giả)
- Nhấn nút "Delete" để xóa blog
- Xác nhận xóa trong popup
- Blog sẽ bị xóa vĩnh viễn khỏi blockchain

## Smart Contract

### Thông tin Contract
- **Package ID**: `0x95075dfcffccd0e65994bb9d7aeecf5f55ca447d176a17811d255c4b3217ccfa`
- **Module**: `blog`
- **Network**: Sui Testnet

### Các Function chính

```move
// Tạo blog mới
create_blog(content: String)

// Thích blog
like_blog(blog: &mut Blog)

// Chỉnh sửa nội dung (chỉ tác giả)
edit_content(blog: &mut Blog, new_content: String)

// Chuyển quyền sở hữu (chỉ tác giả)
transfer_blog(blog: Blog, recipient: address)

// Chia sẻ công khai (chỉ tác giả)
share_blog(blog: Blog)

// Xóa blog (chỉ tác giả)
delete_blog(blog: Blog)
```

## Cách sử dụng

### Bước 1: Kết nối Ví
1. Mở dApp trong trình duyệt
2. Nhấn nút "Connect" ở góc trên bên phải
3. Chọn ví Sui (Sui Wallet, Suiet, etc.)
4. Phê duyệt kết nối

### Bước 2: Tạo Blog Post
1. Điền nội dung blog vào form "Create New Blog Post"
2. Nhấn "Create Blog Post"
3. Phê duyệt giao dịch trong ví
4. Đợi giao dịch được xác nhận

### Bước 3: Quản lý Blog
1. Chuyển sang tab "My Blogs" để xem blog của bạn
2. Sử dụng các nút tương tác để quản lý blog
3. Chỉ tác giả mới có quyền chỉnh sửa, chuyển giao, chia sẻ và xóa

### Bước 4: Tương tác với Blog khác
1. Chuyển sang tab "All Blogs" để xem tất cả blog
2. Nhấn "Like" để thích blog posts
3. Xem nội dung và thông tin tác giả

## Lưu ý quan trọng

### Bảo mật
- Chỉ tác giả mới có quyền chỉnh sửa, chuyển giao, chia sẻ và xóa blog
- Mọi thay đổi đều được ghi lại trên blockchain
- Không thể hoàn tác các thao tác đã thực hiện

### Phí giao dịch
- Mỗi thao tác đều cần phí giao dịch Sui
- Đảm bảo ví có đủ SUI để thực hiện giao dịch

### Network
- Hiện tại dApp hoạt động trên Sui Testnet
- Để sử dụng trên Mainnet, cần deploy contract và cập nhật cấu hình

## Troubleshooting

### Lỗi kết nối ví
- Kiểm tra xem ví đã được cài đặt chưa
- Đảm bảo ví đang kết nối với Sui Testnet
- Thử refresh trang và kết nối lại

### Lỗi giao dịch
- Kiểm tra số dư SUI trong ví
- Đảm bảo đã phê duyệt giao dịch trong ví
- Kiểm tra kết nối mạng

### Blog không hiển thị
- Nhấn nút "Refresh" để tải lại danh sách
- Kiểm tra xem đã chọn đúng tab chưa
- Đợi một chút để blockchain đồng bộ

## Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console của trình duyệt để xem lỗi
2. Đảm bảo đang sử dụng phiên bản mới nhất của dApp
3. Liên hệ team phát triển để được hỗ trợ
