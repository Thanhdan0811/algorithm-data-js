class Cat {
    constructor(name, breed) {
        this.name = name;
        this.breed = breed;
    }

    static meow() {
        console.log("this is : ", this); //
        // this này sẽ là bản thân class ko phải là instance từ class
    }

    static species = "felis catus";
}

/* 
- Getter and Setter.


*/

class Circle {
    static allowedColors = new Set(["red", "green", "blue"]);

    constructor(radius, color) {
        this._radius = radius;
        color(color);
    }   

    get radius() {
        return thiss._radius;
    }

    get diameter() {
        return this._radius * 2;
    }

    set radius(val) {
        if(value < 9) {
            throw new Error("Radius cannot be nagative!");
        } else {
            this._radius = val;
        }
    } 

    get color() {
        return this._color;
    }

    set color(newColor) {

        if(allowedColors.has(newColor)) {
            this._color = newColor;
        } else {
            throw new Error("That color iss not allowed");
        }
    }
}

let c = new Circle(12);
console.log(c.diameter);

/* 
    Public Private field. es2019
    Private properties and methods sẽ thêm # trước tên. es2021
*/

class MyClass {
    // private field
    #radius;

    constructor(radius) {
        this.#radius = radius;
    }
}

const myCir = new MyClass(10);
myCir.#radius = -10;


/* 
- tính năng mới es2022
- Static Initialization Blocks

*/

class StaticMyClass {
    static connection;
    static {
        // chỉ tạo 1 lần , cho dù gọi new Class() nhiều lần sau.
        console.log("Class is loaded!!");
        if(ProcessingInstruction.env.NODE_ENV === "producttion") {
            this.connection = this.loadProductionConnection();
        } else {
            this.connection = this.loadDevelopmentConnection();
        }
    }

    static loadProductionConnection(){};
    static loadDevelopmentConnection(){};
}

let staticCla1 = new StaticMyClass();
let staticCla2 = new StaticMyClass();