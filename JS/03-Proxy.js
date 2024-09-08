
/* 
    const proxy = new Proxy(target, handler)
    target : object mà proxy sẽ wrap.
    hanlder: 1 object chứa các traps (functions) định nghĩa các behavior.
    traps : 
        + get : xử lý access property.
        + set : xử lý gán property.
        + has : xử lý tác vụ 'in' operator.
        + deleteProperty : xử lý delete property.
        + apply : xử lý việc gọi function.
        + construct : xử lý việc gọi từ khóa 'new' operator.
*/


// ============================= Khởi tạo cơ bản ===============================
// const target = {
//     name: "Dân",
//     age: 15
// }

// const hanlder = {
//     get : function(target, property, receiver) {
//         console.log(`Getting property ${property}`);
//         return target[property];
//     },
//     set: function(target, property, value, receiver) {
//         target[property] = value + "=12321";
//         return true;
//     }
// };

// const proxy = new Proxy(target, hanlder);

// console.log(proxy.name);

// proxy.age = 20;

// console.log(proxy.age);


// ============================= Dùng cho validation ===============================
// const user = {
//     name: '',
//     age: 0
// };

// const handler = {
//      set: function(target, property, value, receiver) {
//        if (property === 'age' && (typeof value !== 'number' || value < 0)) {
//          throw new Error('Age must be a non-negative number');
//        }
//        target[property] = value;
//        return true;
//      }
// };

// const proxy = new Proxy(user, handler);
// proxy.age = 25;  // Works fine
// proxy.age = -5;  // Throws an error: Age must be a non-negative number


// ============================= Dùng để data binding ===============================

// const data = {
//     text: 'Hello, world!'
// };

// const document = {
//     textContent : "old value",
// }

// const handler = {
//     set: function(target, property, value, receiver) {
//       target[property] = value;
//       document.textContent = value;
//       return true;
//     }
// };

// const proxy = new Proxy(data, handler);

// console.log("old vlaue: ", document.textContent);

// proxy.text = "new value for data and document";

// console.log("data.text: ", proxy.text);
// console.log("document.textContent: ", document.textContent);



// ============================= Dùng để Tracing ===============================


// const profile = {
//     name: 'John Doe',
//     email: 'john@example.com'
// };

// const handler = {
//     get: function(target, property, receiver) {
//       console.log(`Property ${property} accessed`);
//       return target[property];
//     },
//     set: function(target, property, value, receiver) {
//       console.log(`Property ${property} set to ${value}`);
//       target[property] = value;
//       return true;
//     }
// };

// const proxy = new Proxy(profile, handler);
// proxy.name;       // Logs: Property name accessed
// proxy.email = 'john.doe@example.com';  // Logs: Property email set to john.doe@example.com



// ============================= Dùng để Immutable ===============================
// - Tạo ra immutable object
// const target = {
//     name: 'Immutable Object'
// };
// const handler = {
//     set: function(target, property, value, receiver) {
//       console.log(`Cannot set property ${property} to ${value}. Object is immutable.`);
//       return false; // indicate failure to set property
//     }
// };

// const proxy = new Proxy(target, handler);
// proxy.name = 'New Name'; // Logs: Cannot set property name to New Name. Object is immutable.
// console.log(proxy.name); // Logs: Immutable Object


// ============================= Dùng để Meta programming ===============================
/* 
    Meta programming có nghĩa là program tại meta-level của js.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming
*/