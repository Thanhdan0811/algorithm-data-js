# Buffers ??

- buffer để xử lý binary 0 | 1 bằng node.
- Cần hiểu các khái niệm : binary numbers, Hexadecimal numbers, Character Sets/Encodings.

## Binary numbers.

1 bit => 0 | 1;
1 byte === 8 bits;
01011 => từ phải sang trái => (1 _ 2 ^ 0) + (1 _ 2 ^ 1) .... = 11.

- bit đầu tiên bên phải đc gọi là : LSB(Least Significant Bit) hoặc LSD(Least Significant Digit)
- Bit cuối cùng bên trái được gọi là : MSB(Most Significant Bit) hoặc MSD(Most Significant Digit)

## Hexadecimal Numbers.

0x456 : 0x diễn đạt là 1 số hexadecimal.
4 bits có thể được biểu diễn bởi 1 số hexadecimal.

## Character Encodings.

- ta sẽ map từ ký tự sang số.
- Unicode là chuẩn hiển thị và mã hóa ký tự cho hầu hết các hệ thống. Nó định nghĩa hơn 149,813 ký tự.
- Ví dụ : 's' => là 115
- ASCII : định nghĩa 128 ký tự. lowercase, uppercase, a-z, 0-9, punctuations($, !, @...) và 1 số phim control.
- ASCII chỉ cần dùng 8 bits 2 hexadecimals để biểu diễn các ký tự.
- ASCII có cùng number với Unicode. Tức là Unicode bao bọc Ascii.

- Encoders và Decoders.
- encoders chuyển từ thứ có nghĩa sang 01.
- decoders chuyển từ 01 sang thứ có nghĩa.
- Character encodings là 1 hệ thống gán các chuỗi bytes thành characters.
- Phổ biến nhất là utf-8, định nghĩa bởi Unicode Standard, do đó số ký tự trùng với Unicode.
- Ví dụ: s => 0111 0011 được chuyển đổi thành bit bởi utf-8.

## Buffers

- Buffer là container memory.Ví dụ 1 buffer có kích thước 4 bytes.
- Buffers khá giống array. Có index, khi tạo buffer thì tất cả sẽ được điền vào là bit 0.
- Trong Nodejs, mỗi element sẽ có 8 bits và không thay đổi đc.
- Ví dụ 1 buffer 4 bytes, index 0 sẽ là 8 bits đầu.
- Nếu điền vào 36 bits thì nó sẽ tự động bỏ đi 4 bits.
- Buffers là 1 data structure. design để work with binary data.
-

# Tra mã các symbols

- (symbl.cc)[symbl.cc]

- Khi gõ vào bất cứ ký tự nào khác ascii thì url khi gửi qua network sẽ chuyển thành hexa dựa vào encoding.

# đơn vị KiB là nhân 1000 thay vì 1024.

- Buffer.poolSize hiển thị ra size được allocation sẵn khi node chạy.
- Nếu dùng .allocUnsafe và nhỏ ơn 8 KiB thì nó sẽ dùng 8 KiB được cấp sẵn ở RAM khi node chạy.
-
