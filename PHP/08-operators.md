# Arithmetic Operators (+ - \* / % \*\*)

- Ngoài chức năng cơ bản arithmetic còn có công dụng khác.

- Convert string to number: `+, -` có thể convert string thành number.

```
$x = '10';
var_dump(+$x); => 10 int
var_dump(-$x); => -10 int
```

- Nếu chia cho 0 thì sẽ báo lỗi hoặc warning. nếu show waring thì sẽ trả về `INF`.

```
$x = 10;
$y = 0;

var_dump($x / $y);
var_dump(fdiv($x, $y)); => float(INF) : hàm fdiv sẽ ko show warning hay erros

```

- Về phép `%`, nếu số là float thì sẽ bị cast về integer, phầ float sẽ bị bỏ đi

```

$x = 10.5;
$y = 2.9;
var_dump($x % $y); => int(0)
var_dump(fmod($x, $y)); => mod theo float => 1.800000000000003

// nếu số có dấu thì sẽ lấy dầy của phàn tử, phần mẫu bỏ qua.
$y = -10;
$z = 3;
var_dump($y / $z); => -1;
$y = 10;
$z = -3;
var_dump($y / $z); => 1; // bỏ qua dấu ở mẫu số.
$y = -10;
$z = -3;
var_dump($y / $z); => -1; // bỏ qua dấu ở mẫu số.

```

# Assignment Operators (= += -= _= /= _= \*\*=)

# Comparsion operators (== === != <> !== < > <= >= <=> ?? ?:)

$x = 5;$y = '5';
var_dump($x == $y); // => true
var_dump($x === $y); // false

- <> cũng giống với !=
- <=> spaceship trả về -1 , 0, 1 cho sort.
  $x <=> $y : if $x < $y then return -1, 0 for equal, 1 for other case.

- Từ php8, nếu so sánh number và string, nếu string ko thể numberic thì về còn lại sẽ chuyển thành string.
  var_dump(0 == 'hello'); // vì 'hello' không thể thành number, nên 1 sẽ thành '1'.
  Nhửng ở php 7, thì var_dump(0 == 'hello'); lại trả về true vì ''hello' sẽ được chuyển về là 0.

- ?:
  $x = 'Hello world';
$y = strpos($x, 'H');

$result = $y === false ? 'H not found' : 'H found at index ' . $x;

echo $result;

- ??
  $x = null;
$y = $x ?? 'Hello'; // only null is ignore.

var_dump($y); // => 'Hello'

# String Operators (. .=)

$x .= 'Hello';
$x .= $x + ' World!';

# Error Control Operators (@).

$x = file('foo.txt'); // if file not found then 
$x = @file('foo.txt'); // sẽ ko show error nữa.

# Incremnet/Decrement Operator (++ --)

# Logical Operators (&& || ! and or xor)

# Bitwise operators (& | ^ - << >>)

# Array Operators ( + == === != <> !== )

$x = ['a', 'b', 'c'];
$x = ['d', 'e', 'f'];

$z =
