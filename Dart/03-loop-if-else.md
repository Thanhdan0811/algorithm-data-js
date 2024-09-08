# Loop
```
// ignore_for_file: unused_local_variable

void main() {
// For loop
var num = 5;
for(var i = num; i >= 1; i--) {
  print(i);
}

// For in loop
var names = ["John", "Tina", "Steve"];
for(var name in names) {
  print(name);
}

// While loop

while(num >= 1) {
  print(num);
  num--;
}

}

```

# if else 
```
// ignore_for_file: unused_local_variable

void main() {
  var num = 5;
  if (num == 5) {
    print("The number is $num");
  } else if(num ==12) {
    print("The number is 12");
  } else {
    print("The Number is not 5, it is $num");
  }

}

```