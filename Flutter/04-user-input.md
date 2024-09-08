

```
// todo_page.dart

class TodoPage extends StatefulWidget {
  const TodoPage({super.key});

  @override
  State<TodoPage> createState() => _TodoPageState();
}

class _TodoPageState extends State<TodoPage> {

  // text editing controller to get access to what the user typed

  TextEditingController myController = TextEditingController();

  // greeting message variable
  String greetingMesssage = '';

  // 

  // greet user =method
  void greetUser() {
    String userName = myController.text;
   setState(() {
     greetingMesssage = 'Hello, ' + userName;
   }); 
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(25.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // greeting user message
              Text(greetingMesssage) ,  
              // text field
              TextField(
                controller: myController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: "Type your name..."
                ),
              ),
          
              // button
              ElevatedButton(
                onPressed: greetUser, 
                child: Text("Tap")
              )
            ],
          ),
        ),
      ),
    );
  }
}

```