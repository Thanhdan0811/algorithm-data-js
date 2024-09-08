- syntax : <?php /?>
- không có dấu đóng nếu toàn bộ file là php.

```
<?php
    echo 'Hello world';
    echo print 'Hello world'; => Hello world1

    echo 'Hello', ' ', 'World' => sẽ tự concat lại , print thì ko.
```

- print sẽ trả về 1 khác với echo.
- print có thể dùng với expression.
- prirt và echo để có thể dùng với cặp dấu ().
- echo sẽ nhanh hơn print.

# Variable nên bắt đầu với $
```
<?php

$name = 'Gio';

echo "Joe's Invoice";
echo $name;

```

# Tham chiếu và value

```
<?php
    $x = 1;
    $y = $x;
    $x = 2;
    echo $y => 1 , vì lúc này sẽ gán value

```
- để gán tham chiếu ta thêm __&__ vào trước.

```
<?php
    $x = 1;
    $y = &$x;
    $x = 2;
    echo $y => 2 , vì lúc này sẽ gán chiếu

```

# biến trong text.
```
<?php
    $firstName = 'DAN';

    echo "Hello $firstName";
    echo 'Hello ' . $firstName;

```

- phải dùng double quotes mới có thể nhúng biến vào text.

# PHP in HTML

```
<!DOCTYPE html>
<html>
    <body>
        <h1
            <?php
                $x = 2;
                $y = 4;
                echo '<p>' . $x . ', ' . $y . '</p>'
            ?>
            <?= 'My first Heading' ?>
        </h1>
        <p>My first Paragraph</p>
    </body>
</html>

```

- chí có 1 line nên ko cần ;


# Comment

- dùng // hoặc # hoặc /* */

# Constansts
- Có 2 cách define constants
    + define('STATUS_PAID', 'paid')  // (name, value)
    + echo defined('STATUS_PAID')  // 1 nếu đã defined , 0 nếu chưa.
    + const STATUS_PAID = 'paid';

- const sẽ được definec tại compiler time
- define function sẽ được define tại runtime.

```
if(true) {
    const FOO = 'bar'; // => const không thể khai báo trong control.
    define('STATUS_PAID', 9);
}

```

- dynamic constants

```
$paid = 'PAID';

define('STATUS_' . $paid, 4);

echo STATUS_PAID;
echo PHP_VERSION; // Predefined Constants
echo __LINE__; // Magic constants.

```

- có các constants được định nghĩa sẵn : Predefined Constants, Magic constants.
- https://www.php.net/manual/en/reserved.constants.php
- https://www.php.net/manual/en/language.constants.magic.php


# Variable Variables

```
$foo = 'bar';
$$foo = 'baz';

echo $foo, $bar; => barbaz
echo "$foo, ${$foo}" => bar, baz => chứ ý dùng double quotes.

=> $bar = 'baz';

```

# Data types and Type casting.
- PHP là dynamic types : type checking xảy ra ở runtime .
- Scalar types : bool (true/false), int, float, string
- Compound types : array, object, callable, iterable
- Special types : resource, null


```
<!-- true print 1, false print blank -->
$completed = true;
$score = 75;
$price = 0.99;
$greeting = 'Hello Gio';

echo $completed . '<br />';
echo $score . '<br />';
echo $price . '<br />';
echo $greeting . '<br />';

var_dump($completed) => boolean(true)
echo getType($score); => boolean

```

- __getType()__ trả về type của nó var.
- __var_dump()__ in ra tất cả thông tin về expression được đưa vào.



```
$companies = [1,2,23,4,2, 'A']

echo $companies; // => Array
print_r($companies);

```

- __print_r()__ : in ra mảng array.
- PHP sẽ tự động xác định type của var trong runtime.


```
declare(strict_types=1);

function sum(int $x, int $y) {
    var_dump($x, $y);
    return $x + $y;
}

echo sum(2, '3');

```

- PHP sẽ tự chuyển kiểu sang int.
- declare(strict_types=1); => sẽ báo lỗi khi truyền vào type khác type đã định nghĩa.
- declare(strict_types=1); sẽ không áp dụng với int và float, mong muốn truyền vào float nhưng nếu truyền vào int vẫn đc.


```
$x = '5';
$y = (int) '8'

```
- Ép kiểu type.
- Type comparisions : https://www.php.net/manual/en/types.comparisons.php
- Type Juggling : https://www.php.net/manual/en/language.types.type-juggling.php








