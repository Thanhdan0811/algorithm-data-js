- Create : `flutter create first_app`;


- debugShowCheckedModeBanner: false => ẩn show thanh debug.
- Mọi thứ đều là widgets (vật dụng, tiện ích)

```
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          backgroundColor: Colors.deepPurple[200],
          appBar: AppBar(
            title: Center(
                child: Text("My App", style: TextStyle(color: Colors.white))),
            backgroundColor: Colors.deepPurple,
            elevation: 0,
            leading: Icon(Icons.menu, color: Colors.white,),
            actions: [
              IconButton(onPressed: () {}, icon: Icon(Icons.logout, color: Colors.white,))
            ],
          ),
          body: Center(
            child: Container(
              height: 300,
              width: 300,
              // padding: EdgeInsets.symmetric(horizontal: 25, vertical: 50),
              decoration: BoxDecoration(
                  color: Colors.green,
                  // border radius
                  borderRadius: BorderRadius.circular(20)),
              padding: EdgeInsets.all(25),
              // child: Text("Thanh Dân", style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold),),
              child: Icon(
                Icons.favorite,
                color: Colors.white,
                size: 64,
              ),
            ),
          ),
        ));
  }
}


```

# expanded widget

```
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: Column(
            // mainAxisAlignment: MainAxisAlignment.spaceAround,
            // crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            // 1 st box
            Expanded(
              child: Container(
                color: Colors.deepPurple[400],
              ),
            ),
            Expanded(
              flex: 2,
              child: Container(
                color: Colors.deepPurple[400],
              ),
            ),
            // Expanded mở rộng cho fill vùng trống.
            Expanded(
              child: Container(
                color: Colors.deepPurple[200],
              ),
            ),
          ],)
        ));
  }
}

```

- Column nếu set cứng sẽ không fit hết và ko scroll, kể cả với Row
- Chuyển qua ListView.

```
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: ListView(
            scrollDirection: Axis.horizontal,
            // mainAxisAlignment: MainAxisAlignment.spaceAround,
            // crossAxisAlignment: CrossAxisAlignment.start,
            children: [
            // 1 st box
            Container(
              width: 350,
              color: Colors.deepPurple,
            ),
            Container(
              width: 350,
              color: Colors.deepPurple[400],
            ),
            Container(
              width: 350,
              color: Colors.deepPurple[200],
            ),
          ],)
        ));
  }
}

```

# Tạo index list
```
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: ListView.builder(
            itemCount: 10,
            itemBuilder: (context, index) => ListTile(
            title: Text(index.toString()),
          ))
        ));
  }
}

```

# Tạo index names

```
class MyApp extends StatelessWidget {
  MyApp({super.key});

  List names = ["Mitch", "Sharon", "Vinces"];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: ListView.builder(
            itemCount: names.length,
            itemBuilder: (context, index) => ListTile(
            title: Text(names[index]),
          ))
        ));
  }
}

```

# GridView
```
class MyApp extends StatelessWidget {
  MyApp({super.key});

  List names = ["Mitch", "Sharon", "Vinces"];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: GridView.builder(
            itemCount: 64,
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 8), itemBuilder: (context, index) => Container(
              color: Colors.deepPurple,
              margin: EdgeInsets.all(2),
            )),
        ));
  }
}

```

# Stack (chồng lên nhau)
```
class MyApp extends StatelessWidget {
  MyApp({super.key});

  List names = ["Mitch", "Sharon", "Vinces"];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: Stack(
            alignment: Alignment.bottomRight,
            children: [
              // big box
              Container(
                height: 300,
                width: 300,
                color: Colors.deepPurple,
              ),
              // meidum box
              Container(
                height: 200,
                width: 200,
                color: Colors.deepPurple[400],
              ),
              // small box
              Container(
                height: 100,
                width: 100,
                color: Colors.deepPurple[200],
              ),
            ],
          )
        ));
  }
}

```


# GestureDetector thêm sự kiện event : tap, double tap....

```
class MyApp extends StatelessWidget {
  MyApp({super.key});

  // Functions & methods
  void userTapped() {
    print("User tapped!!!");
  }

  List names = ["Mitch", "Sharon", "Vinces"];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
            debugShowCheckedModeBanner: false,
            home: Center(
              child: GestureDetector(
                onTap: userTapped,
                child: Container(
                  height: 200,
                  width: 200,
                  color: Colors.deepPurple[300],
                  child: Center(
                    child: Text("Tap me!!!"),
                  ),
                ),
              ),
            )
          );
  }
}


```