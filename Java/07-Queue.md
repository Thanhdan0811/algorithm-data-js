- Queue : là 1 interface
- Các class implement Queue : `ArrayDeque, LinkedList, PriorityQueue`.
- Các Interfaces extend từ Queue : `Deque, BlockingQueue, BlockingDeque`

- Với Queue, elements được lưu và truy cập theo kiểu `First In, First Out`.
- Giống kiểu hàng đợi, người đầu tiên xếp hàng sẽ được xử lý trước.


```
// LinkedList implementation of Queue
Queue<String> animal1 = new LinkedList<>();

// Array implementation of Queue
Queue<String> animal2 = new ArrayDeque<>();

// Priority Queue implementation of Queue
Queue<String> animal 3 = new PriorityQueue<>();

```

# Queue - Methods.
- Có các methods : 
    + add() : chèn element vào queue, return true hoặc throws 1 exception.
    + offer() : chèn element vào queue, return true hoặc false
    + element() : return head của queue , throw exception nếu queue empty.
    + peek() : return head của queue , return null nếu queue empty.
    + remove() : return và remove head của queue, throw exception nếu queue empty.
    + poll() :return và remove head của queue, return null nếu queue empty.    



# PriorityQueue.
- Cung cấp chức năng cho `heap data structure`.
- Implements `Queue` Interface
- Được trả về dưới dạng `sorted order`. Elements có thể ko được sorted nhưng trả về smallest sẽ được đẩy lên head.
- `Không đảm bảo order`.
- Head của priority queue sẽ là nhỏ nhất , còn lại giữ theo thứ tự add.
- Được import từ `java.util.PriorityQueue`.

# PriorityQueue Insert, Access, Remove, Iterating
- Insert : `add(), offer()` (offer nếu full sẽ trả về false), 

```
// Tạo priority queue.
PriorityQueue<Integer> numbers = new PriorityQueue<>();

// dùng add
numbers.add(4);
numbers.add(2);
System.out.println("PriorityQueue: " + numbers);  // => PriorityQueue: [2, 4]

// dùng offer()
numbers.offer(1);
System.out.println("Updated PriorityQueue: " + numbers); // => Updated PriorityQueue: [1, 4, 2]

// Dù được thêm vào sau nhưng 2 và 1 lần lượt được đẩy lên head. smallest lên đầu tiên.

```

- Access : Dùng `peek()`

```
PriorityQueue<Integer> numbers = new PriorityQueue<>();
numbers.add(4);
numbers.add(2);
numbers.add(1);
System.out.println("PriorityQueue: " + numbers); // => PriorityQueue: [1, 4, 2]
// Không sắp xếp nhưng smallest lại được đẩy lên đầu.   

// dùng peek()
int number = numbers.peek();
System.out.println("Accessed Element: " + number); // => Accessed Element: 1

```

- Remove : Dùng `remove(), pull()`


```
// dùng remove
PriorityQueue<Integer> numbers = new PriorityQueue<>();
numbers.add(4);
numbers.add(2);
numbers.add(1);
boolean res = numbers.remove(2);
System.out.println("remove Element: " + res); // true
System.out.println("numbers after using remove ; " + numbers); // [1, 4]

// dùng poll()
int num = numbers.poll();
System.out.println("poll Element: " + num); // 1
System.out.println("numbers after using remove ; " + numbers); // [4]

```


- Iterating  : Dùng `iterator() được import từ java.util.Iterator`


```
numbers.add(4);
numbers.add(2);
numbers.add(1);
System.out.println("Priority Queue : " + numbers);

Iterator<Integer> iterate = numbers.iterator();
while (iterate.hasNext()) {
    System.out.println(iterate.next());
    System.out.println(", ");
}

// => 1, 4, 2

```

- Có thể dùng toArray r loop qua.

- Comparator : `PriorityQueue Comparator`



===================================================================================
# Deque
- Là Interface cung cấp chức năng của 1 double-ended queue. Extend từ Queue interface.






