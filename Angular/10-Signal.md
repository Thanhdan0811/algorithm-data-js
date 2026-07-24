- signal : detect thứ gì đã thay đổi mà không cần so sánh tất cả để xác định sự thay đổi.

- Khai báo : 
```
// file app.html
{{ counter() }}
<h1>Course title: {{ course().title }}</h1>
<h1>Courses: {{ courses().join(' ') }}</h1>


// file app.ts
counter = signal(0)
course = signal({
    id: 1,
    title: "Angular for beginners",
})
courses = signal([
    'Angular for beginner',
    'Reactive Angular course'
])
constructor() {
    const readOnlySignal = this.counter.asReadonly();

    /// readOnlySignal cannot change value.
}

increment() {
    this.counter.set(this.counter() + 1);
    // or
    this.counter.update(val => val + 1);

    // Change object or array.
    // Cách chưa đúng lắm. vì nó mutable và chỉ hoạt động với change detection mặc định.
    this.course().title = "Hello World Signal";
    this.courses().push('Angular core deep dive');

    // Cách immutable
    this.course.update((val) => {...val, title: 'Hello World Signal'});
    this.courses.udpate(courses => [...courses, 'Angular deep dive course']);

}

```


# Derived signals with compute() API.


```
// file app.html
{{ counter() }}
<h1>Derived value: {{ derivedCounter() }}</h1>


// file app.ts
counter = signal(0)

// tính toán từ counter signal , khi signal thay đổi.
// khi dùng computed(), derivedCounter sẽ không thể set hay update.
// Khi gọi lần đầu thì computed() sẽ tìm signal nào bên trong callback func, và để ý đến nó.
derivedCounter = computed(() => {
    const counter = this.counter();

    return counter * 10;
});

increment() {
    this.counter.update(val => val + 1);


}
```

- Lưu ý khi tạo computed, cần gán signal ở bên ngoài điều kiện if.

```
// file app.html
<h1>Counter value: {{ counter() }}</h1>
<h1>Derived value: {{ derivedCounter() }}</h1>
<h1>Multiplier value: {{ multiplier }}</h1>
<button (click)='increment()' >increment</button>
<button (click)='incrementMulti()' >increment multi</button>

// file app.ts
counter = signal(0);
  multiplier = 0;
  
  derivedCounter = computed(()=> {
    if ( this.multiplier < 10 ) { //  nếu đổi lại điều kiện là >= 10, thì dù tăng lmultiplier trên 10 thì cũng ko update đc counter, 
    // Vì khi chạy lần đầu nó đã không nhận biết được signal this.counter();
      const counter = this.counter();
      return counter * 10; 
    } else {
      return 0;
    }
  })


  increment() {
    this.counter.update(val => val + 1);
  }

  incrementMulti() {
    this.multiplier += 2;
  }

```


# Signal Effect API.

- Nên dùng để gọi API bên dưới ko ảnh hưởng UI.

```
// file app.html
<h1>Counter value: {{ counter() }}</h1>
<h1>Derived value: {{ derivedCounter() }}</h1>

// file app.ts

effectRef: EffectRef;

constructor() {
    this.effectRef = effect((onCleanup) => {

        onCleanup(() => {
            console.log('cleanup occurred!); // hàm onCleanup sẽ định nghĩa ở đây và được gọi khi thực hiện cleanup.
            // Khi clean up thì sẽ ko gọi các code dưới.
        })

        const counterValue = this.counter();
        const derivedCounterValue = this.derivedCounter();

        // Mỗi khi signal thay đổi thì effect sẽ được gọi 
        // Ta có thể thực hiện các effect tại đây.
        // Điều đó có nghĩa là ta không nên thay đổi signal trong này và cả trong computed.

        console.log(`COUNTER: `, counterValue);
    }, {
        allowSignalWrites: true, 
        manualCleanup: true,
        })
    // allowSignalWrites: true cho phép thay đổi signal nhưng không nên làm vậy, nếu không sẽ infinite loop.
}

  counter = signal(0);
  
  derivedCounter = computed(()=> {
      const counter = this.counter();
      return counter * 10; 
  })


  increment() {
    this.counter.update(val => val + 1);
  }

  onCleanup() {
    this.effectRef.destroy(); // cleanup 
  }

```

# Sign-based Services.
- khi muốn share signal qua các compenent.
- Khai báo signal ở service.
- 

```
// Việc chỉ cho phép readonly sẽ đảm bảo ít lỗi 
// counter.service.ts file
@Injectable({
    providedIn:  'root'
})
export class CounterService {
    private counterSignal = signal(0);

    readonly counter = this.counterSignal.asRaedonly();

    increament() {
        if (this.counter() > 10) {
            throw `Maximum value reached!`
        }
        this.counterSignal.update(val => val + 1);
    }

}

// app.ts file

constructor(public counterService: CounterService) {
    // public để dùng đc ở html.
}

derivedCounter = computed(() => {
    const counter = this.counterService.counter();
    return counter * 10;
})

```