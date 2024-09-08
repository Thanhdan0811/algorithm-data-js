

```
$firstName = 'Will';
$lastName = "$firstName  Smith"; // có thể dùng với variables

$name = $firstName . ' ' . $lastName;

echo $lastName;

echo $name[1]; // => i
echo $name[-2]; // => i

$name[1] = 'I';

```

# heredoc và nowdoc
- heredoc có thể nhúng variable vào. và giữ đúng định dạng.

```
$x = 1;
$y = 2;
// heredoc 
$text = <<<TEXT
    Hello world 
    $x 
TEXT;

// nowdoc
$text = <<<'TEXT'
    Hello world 
    $x 
TEXT;

```
