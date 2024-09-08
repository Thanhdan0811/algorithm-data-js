# Navigate basic

```
// first_page.dart
// ignore_for_file: prefer_const_constructors

import 'package:first_app/pages/second_page.dart';
import 'package:flutter/material.dart';


class FirstPage extends StatelessWidget {
  const FirstPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(
          child: Text("1st page"),
          ),
          ),
      body: Center(
        child: ElevatedButton(child: Text("Go To Second Page"), onPressed: () {
          // navigate to second page.
          Navigator.push(
            context, 
            MaterialPageRoute(
              builder: (content) => SecondPage(),
            )
          );
        },),
      ),
    );
  }
}

```
# Cách 2

```
/// main.dart
void main() {
  runApp(MyApp());
}

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
            home: FirstPage(),
            routes: {
              '/firstpage': (context) => FirstPage(),
              '/secondpage': (context) => SecondPage()
            },
          );
  }
}

// first_page.dart
class FirstPage extends StatelessWidget {
  const FirstPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold( 
      appBar: AppBar(
        title: Center(
          child: Text("1st page"),
          ),
          ),
      body: Center(
        child: ElevatedButton(child: Text("Go To Second Page"), onPressed: () {
          // navigate to second page.
          Navigator.pushNamed(context, '/secondpage');
        },),
      ),
    );
  }
}
```

# Navigate in drawer (mở thanh menu bên trái)
```
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
            home: FirstPage(),
            routes: {
              '/firstpage': (context) => FirstPage(),
              '/secondpage': (context) => SecondPage(),
              '/homepage': (context) => HomePage(),
              '/settingspage': (context) => SettingsPage(),
            },
          );
  }
}


// first_page.dart

class FirstPage extends StatelessWidget {
  const FirstPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(
          child: Text("1st page"),
          ),
          ),
      drawer: Drawer(
        backgroundColor: Colors.deepPurple[100],
        child: Column(
          children: [
            // common to place a drawer header here
            DrawerHeader(
              child: Icon(
                Icons.favorite,
                size: 48
              ) 
            ),

            // home page list title
            ListTile(
              leading: Icon(Icons.home),
              title: Text("H O M E"),
              onTap: () {
                // pop drawer
                Navigator.pop(context);
                // go to home page
                Navigator.pushNamed(context, "/homepage");
              },
            ),
            // setting page list title
            ListTile(
              leading: Icon(Icons.settings),
              title: Text("S E T T I N G S"),
               onTap: () {
                // pop drawer
                Navigator.pop(context);
                // go to settings page
                 Navigator.pushNamed(context, "/settingspage");
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

# Bottom Navigation
```
// first_page.dart chuyển thành statefull , tạo 3 file home, profile, settings page.
class FirstPage extends StatefulWidget {
  FirstPage({super.key});

  @override
  State<FirstPage> createState() => _FirstPageState();
}

class _FirstPageState extends State<FirstPage> {
  // this keep track of the selected index
  int _selectedIndex = 0;

  // mehtod updates the new selected index
  void _navigateBottomBar(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  // pages in our app
  final List _pages = [
    // homepage 
    HomePage(),

    // Profile page
    ProfilePage(),

    // settings page
    SettingsPage()

  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(
          child: Text("1st page"),
        ),
        backgroundColor: Colors.blue[400],
      ),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _navigateBottomBar,
        items: [
          // home
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          // profile
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),

          // settings
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }
}

// main.dart
void main() {
  runApp(MyApp());
}

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
            home: FirstPage(),
            routes: {
              '/firstpage': (context) => FirstPage(),
              '/secondpage': (context) => SecondPage(),
              '/homepage': (context) => HomePage(),
              '/settingspage': (context) => SettingsPage(),
            },
          );
  }
}

```