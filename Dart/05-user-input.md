```
// ignore_for_file: unused_local_variable

import 'dart:io';

void main() {
  // User input
  print("Enter your Name: ");

  // allow the user enter
  // readLineSync trả về String hoặc null, nên không thể định nghĩa là String.
  // var name = stdin.readLineSync();
  String? name = stdin.readLineSync();

  print("Hello $name");
  

}

```