## Bài tập: Tạo Sui Move contract "Hello World"

### Mục tiêu
Người học tạo một gói Sui Move với module `hello_world` có thể mint một `HelloWorldObject` chứa chuỗi "Hello World!" và chuyển cho người gọi.

### Yêu cầu đầu ra (kết quả mong muốn)
Module trong gói phải biên dịch được và có nội dung (tương đương) như sau:

```move
module 0x0::hello_world {
    public struct HelloWorldObject has store, key {
        id: // uid
        text // string 
    }

    public entry fun mint(... ) { // fill txContext

        let v_object = HelloWorldObject{
            id, // create_new_object
            text // I want utf8 Hell world, your name 
        };
        // write public transfer to sender 
    }
}
```

Lưu ý:  Bạn có thể dùng địa chỉ của chính bạn khi triển khai, nhưng bài nộp phải thể hiện đúng logic, cấu trúc và chữ "Hello World!" như trên.

### Cấu trúc thư mục yêu cầu (bên trong `module_1/`)
- `module_1/Move.toml`
- `module_1/sources/hello_world.move`
- (tuỳ chọn) `module_1/tests/hello_world_tests.move`

