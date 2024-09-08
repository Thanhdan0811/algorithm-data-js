
# Conver types
```
void main() {
  var a,b,c;

  // String to Int
  a = 40;
  b = "1";
  c = a + int.parse(b);
  print("$a + $b = $c");

  // String double
  var d,e,f;
  d = 40;
  e = "0.1";
  f = d + double.parse(e);
  print("$d + $e = $f");

  // int to String
  var g,h,i;
  g = 40;
  h = '1';
  i = g.toString() + h;
  print("$g + $h = $i");
}
```
# Type conver for user input.


```
// ignore_for_file: unused_local_variable

import 'dart:io';

void main() {
  print("Enter a Number:");

  // get user input
  var nummy = stdin.readLineSync();

  var num2 = int.parse(nummy ?? '0') + 10;

  print(num2);

}

```

# Fizzbuzz Exp

```
// ignore_for_file: unused_local_variable


void main() {
  int num = 1;


  // loop
  while(num <= 100) {
    print(num);

    if(num % 5 == 0 && num % 3 == 0) {
      print("$num, FizzBuzz");
    } else if (num % 3 == 0) {
      print("$num, Fizz");
    } else if (num % 5 == 0) {
      print("$num, Buzz");
    }

    // tăng num
    num++;
  }

}

```