# Function
 

 ```
// ignore_for_file: unused_local_variable

void main() {
  // Function 
  myFunction() {
    // print("Hello Functions");
    return "Hello Functions";
  }

  var sth;

  sth = myFunction();

  // name2 is optional.
  func_num2(String name1, [name2]) {
    return "Hello $name1 ane $name2";
  }
  print(func_num2("Dan", "THanh"));
  print(func_num2("Dan"));

  // 
  func_num3(String name1, {name2="friends"}) {
    return "Hello $name1 ane $name2";
  }

 
  print(func_num3("Dan", name2: "Nguyen"));
  

}

 ```

 ```
 int add(int a, int b) {
  int sum = a + b;
  return sum;
 }

 ```