/* 
    - Js không có function thật sự.
    - Mọi thứ được gọi trên 1 cái gì đó. như method.
    - kể cả khi định nghĩa 1 function thì function cũng đc gán vào 1 global object.
    - Như window.functionName()
    - Value của this keyword sẽ phụ thuộc vào object mà method đc gọi.

*/

const person = {
    name: "Conan",
    city: "Los Angeles",
    sing: function() {
        return `${this.name} sings La La La`;
    }
}
const newSing = person.sing;


// globalThis.name = "Dan";
var name = "Dan";

console.log(newSing());

class Cat {
    constructor(firstName) {
        this.firstName = firstName;
    }
    
    static getRandomCat() {
        console.log("This is : ", this); // this này sẽ trỏ về class Cat.
    }

    dance(styel = "Tango") {
        return `Meow I am ${this.firstName}`; // method được định nghĩa trong class , this sẽ được set về undefined, và chỉ gán cho instance được khởi tạo.
    }
}


const cat1 = new Cat("Danan anme");

const danceClone = cat1.dance;

danceClone() // show lỗi , không như cái ở trên.

/// ==========================
function whatIsThis() {
    console.log("The value of this is : ", this); // this này sẽ trỏ về global.
}

const obj = {
    color: "purple",
    age: 2,
    whatIsThis: whatIsThis // this trong function sẽ trỏ về object obj.
}