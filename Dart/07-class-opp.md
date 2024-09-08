# with constructor

```
// ignore_for_file: unused_local_variable


void main() {
    //  Tạo Person Class
    Person dan = new Person("Dan", "male", 23);
    dan.showData();

    print(dan.name);

    // second
    Person dan2 = new Person("Mary", "Female", 12);
    dan2.showData();

} 

class Person {
  String? name, sex;
  int? age;

  // Constructor

  Person(String name, sex, int age) {
    this.name = name;
    this.sex = sex;
    this.age = age;
  } 

  // Method
  void showData() {
    print("Name = $name");
    print("Sex = $sex");
    print("Age = $age");

    print("The person's name is ${name} , with age ${age}");
  }

}

```

# no constructor