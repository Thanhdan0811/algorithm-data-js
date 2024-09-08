/* 
    # call function : sẽ call function theo object.
    # apply function : ở đối số thứ 2 sẽ nhận vào 1 array các tham số.

*/


class Cat {
    constructor(firstName) {
        this.firstName = firstName;
    }
    
    static getRandomCat() {
        console.log("This is : ", this); 
    }

    dance(styel = "Tango") {
        return `Meow I am ${this.firstName} Im ${styel}`; 
    }

    danceArrow = () => {
        console.log("this is in arrow function is in class: , ", this);// trỏ đến instance của class.
        return `this in arrow function in a class ${this.name}`;
    }
}


const blue = new Cat("blue");
 blue.dance();

const blueFunc = blue.dance;

blueFunc.call(blue, "walking"); // value của this sẽ là blue object.
console.log("==========1=====================");
console.log(blueFunc.call(blue, "walking"));
console.log("==========2=====================");
console.log(blue.danceArrow());

// ========

const conan = {
    name: "Conan",
    city: "Los Angele",
    sing: function() {
        console.log("this in normal function: ", this);
        const tempFunc = () => {
            console.log("This is: ", this);
            return `${this.name} sings la la la`;
        }
        return tempFunc();
    },
    sang: () => {
        console.log("This is in arrow function.", this);
        return `${this.name} in arrow function`;
    }
};

const lisa = {
    name: "Liso",
    city: "New York"
};

console.log("==========3=====================");
console.log(conan.sing.call(lisa));;

console.log("==========4=====================");
const bindFunc = conan.sang.bind(lisa);

console.log("==========5=====================");
console.log(bindFunc());


console.log("=============APply function==========");

const ringo = {
    firstName: "Ringo",
    greet: function (...greeting) {
        console.log("ringo greet", this);
        console.log(`${this.firstName} says ${greeting[0]}`);
    }
}


const george = {
    firstName: "George",
    lastName: "Harrison",
}
george.textTr = () => {
    console.log("this ở ngoài", this, globalThis);
    const test = () => {
        console.log("This is sin sadfj;sà", this);
    }
    test();
}
george.textTr();

ringo.greet.apply(george, ["Hi There", "ádfs"]); 
console.log("=============123=============");
ringo.greet.apply(null, ["null sẽ gán this vào global object."]); 

/* 
    - Ví dự : const nums = [1,5,2,5,88,2];
    - Math.max.apply(null, nums); hoacwxj Math.max(...nums);
    - null ở đây là this sẽ bị gán vào null.
*/

console.log("=================Sums=====================");
const nums = [1,5,2,5,88,2];

const maximum = () => {
    console.log("arguments", arguments);
    return Math.max.apply(null, arguments);
}

const maximumRegular = function() {
    console.log("arguments", arguments);
    return Math.max.apply(null, arguments);
}

console.log("Maximumns: ", maximumRegular.apply(null,nums));
console.log("Maximumns: ", maximumRegular(...nums));

console.log("+++++++++++++ Bind +++++++++++++++++");
/* 
    - Bind sẽ permernant object cho this của function.
    - let beeterDan = fDance.bind(fluffy, );
*/

function applySalesTax(taxRate, price) {
    console.log("this is in bind with null contexxt", this);
    return price + price * taxRate;
}
 
const applyCASalesTax = applySalesTax.bind(null, 0.0725);// taxRate sẽ là 0.0725
const applyMTSalesTax = applySalesTax.bind(null, 0);

console.log(applyCASalesTax(100)); // price sẽ là 100

