- Java REPL (Read Eval Print Loop)
- Jshell cho phép chạy code java ngay lập tức:  jshell /help intro

- `/exit` để thoát jshell

- 5 (operands) * (operator) 5 (operands)
- literals là số không đổi.


# print 
- `System.out.println(3*4)`;
- new line : `\n`
- `Math.random()`
- `Math.min(a, b)`
- `Math.max(a, b)`


# printf
- `System.out.printf(" 5 * 2 = %d", 5 *10, 12).println()` : Dư thì ko s mà truyền thiếu thì báo lỗi.
- `System.out.printf("String %s", "Dânnn");`
- Tương tự cho số float : là `%f`


# Primitive types
- `int` (32 bits), `byte`(8 bits -128 -> 127), `short` (16 bits -32,768 -> 32,767), `long` (64 bits) : integer data.
- `float f = 4.0f` (32 bits), `double d = 67.0` (64 bits) => `double` có độ chính xác cao hơn.
- `char c = 'A;` (16 bíts \u0000 -> \uffff)
- `boolean isTrue = false;` (true false)
- Dùng `BigDecimal` để tính toán cho các số tài chính cần độ chính xác cao.

