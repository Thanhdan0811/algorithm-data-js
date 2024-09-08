

```
PHP_INT_MAX // số max trong php
PHP_INT_MIN // số min trong php

$x = 5; // base 10
$y = 0x2A: // số hex
$z = 055: // octal number bắt đầu bằng số 0, => 45

$max = PHP_INT_MAX + 1 // chuyển sang float
$convert = (int) 5.98 // => 5, true => 1, false => 0, '12321asfasf' => 123321, 'adfasdf' => 0

// is_int($x) => true
// có thể viết là $z = 2_000_000; vẫn đc tùy version php.




```

# floats
- https://floating-point-gui.de/

```
$x = 13.5;
$y = 13.5e3; // => 13500
$y = 13.5e-3; // => 0.00135
$y = 13_000.5;
echo PHP_FLOAT_MAX;
// floor, ceil
$x = floor((0.1 + 0.7) * 10) // kết quả là 7, vì kết quả phép tính là 7.9999999991118, do số binary.
$x = ceil((0.1 + 0.2) * 10) // 0.300000000004 * 10 => 3.00000000000 => 4


var_dump($y);

echo $x;

```

- Không nên so sánh 2 số float với nhau : 0.27 !== 0.17 + 0.1
- `NAN` number

```
echo NAN; // not a number, kết quả 1 so phep tinh ko kqua
echo INF; // infinity PHP_FLOAT_MAX * 2;

$x = PHP_FLOAT_MAX * 2;
is_finite($x) // false nếu INF.
is_nan($x)

$x = 5;
var_dump((float) $x)
// convert string thì trả về 0; '15.5a' => '15.5'



```