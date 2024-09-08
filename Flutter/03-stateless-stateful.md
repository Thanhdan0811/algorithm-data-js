- Stateless không thay đổi , giao diện tĩnh.
- Stateful thay đổi theo state và rebuld lại widget.


```
// counter_page.dart

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {

  // variables
  int _counter = 0;

  // methods
  void _incrementCounter() {
    setState(() {
      // setState rebuilds the widget.
      _counter++;
    });
  }

  // UI (user interface)
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // message
            Text("You pushed the button this many times"),

            // counter value
            Text(
              _counter.toString(),
              style: TextStyle(fontSize: 40)
            ),
            ElevatedButton(
              onPressed: _incrementCounter, 
              child: Text("Increment!")
            )
          ],
        ),
      )
    );
  }
}

// main.dart
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
            // home: FirstPage(),
            // routes: {
            //   '/firstpage': (context) => FirstPage(),
            //   '/secondpage': (context) => SecondPage(),
            //   '/homepage': (context) => HomePage(),
            //   '/settingspage': (context) => SettingsPage(),
            // },
            home: CounterPage(),
          );
  }
}

```