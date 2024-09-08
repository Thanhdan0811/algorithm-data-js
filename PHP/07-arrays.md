


```
// $ls = array('PHP', 'JAVA, 'PYTHON'); // cách cũ
$ls = ['PHP', 'JAVA, 'PYTHON'];

$name = 'Gio';

echo $name[1];
echo $name[-1]; // có thể dùng -1 để lấy phần tử cuối.

echo ls[0];
echo ls[-1]; // sẽ báo lỗi, không thể dùng -1 đối với array.

isset($ls[-1]) // Check xem có phần tử nào tại index -1 không, không thì trả về false , có thì trả về true.

echo count($ls); // trả về length của array.


// push vào end của array.
ls[] = "C++"; // sẽ tự động thêm vào cuối array.

// hoặc dùng 
array_push($ls, 'C++', 'C#');

// Custom key trong array
$ls = [
    'php' => '8.0',
    'python' => '3.9'
];

// access
echo $ls['php'];
// in ra array
print_r($ls);


// key phải là string hoặc number
$arr = [true => 'a', 1 => 'b', '1' => 'c', 1.8 => 'd'] // $arr sẽ chỉ còn lại là [1 => 'd'] do cái sau override cái trước.
// key mà là null thì sẽ chuyển thành empty string '' => $arr['']


// Remove từ array, từ cuối
echo array_pop($arr);

// remove từ đầu của array
echo array_shift($arr);


// remove element tại index bất kỳ.
unset($arr[2], $arr[5]);
// Nếu dùng unset thì index sẽ ko bị đánh dấu lại.


// ép kiểu array 

$x = 1;
var_dump((array) $x); // chuyển $x trở thành phần tử đầu của array.

// check xem key có tồn tại không.

var_dump(array_key_exists('a', $arr));

// điểm khác biệt với isset() là isset() sẽ check có tồn tại và không null
// arrray_key_exists sẽ check có tồn tại và giá trị có thể là null.



```