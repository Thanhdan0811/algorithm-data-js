# Strings , Number, Boolean , Dynamic, Double

```
// ignore_for_file: unused_local_variable

void main() {
   // Data types
//    Numbers, Strings, Booleans, Lists, Maps, Dynamic

// Strings
String firstName = "Dan";
print("String : $firstName");

// Integers
int myNum = 28;
print("Integer: $myNum");

// Doubles
double otherNum = 19.95;
print("Double: $otherNum");

// Booleans
bool myBool = false;
print("Boolean: $myBool");

// Dynamic : Khi ta không biết ta cần kiểu gì thì dùng dynamic
dynamic fullName = "Thah Dan";
print("Dynamic: $fullName");

}

```

# Lists type

```


// ignore_for_file: unused_local_variable

void main() {
// Lists
var myList = [1,2,3];
print("My List $myList");
print(myList[0]);

// Change an item
myList[0] = 41;
print("Change an item : $myList");

// Create An Empty List
var emptyList = [];
print("Create Empty List : $emptyList");

// Add to empty list
emptyList.add(41);
print("Add to empty list $emptyList");

// Add multiple to empty list
emptyList.addAll(([1,5,6]));
print("Add Multiple to emptylisst $emptyList");

// Insert at specific position (position, item)
myList.insert(3, 890);
print("Insert at specific position : $myList");

// Insertmany
myList.insertAll(4, [123, 123]);
print("Insert multiple : $myList");

// Mixed Lists
var mixedList = [1,2,3,"Dan", "adfsaf"];
print("Mixed List : $mixedList");

// Remove From List
mixedList.remove(1);
print("Remove from list : $mixedList" );

// Remove From Specific Location
mixedList.removeAt(1); // 1 is index to remove.
print("remove at specific position : $mixedList");

}


List<int> numbers = [1,2,3,4];

void printNums() {
   for(int i = 0; i < names.length; i++) {
      print(numbers[i]);
   }
}

```

# Set

```
// unorder collection
Set<String> uniqueNames = {"Mitch", "Sharon", "Vince"};



```

# Maps
