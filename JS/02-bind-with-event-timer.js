/* 
    Khi không gọi trực tiếp function và js gọi thì this sẽ được tạo.
        Event Listeners
        Timers
        Callback Functions (map, filter, etc)

*/

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

// const bth = document.getElementById("clickMe");



// BigInt.addEventListener("click", conan.sing) // this lúc này sẽ là button.
// BigInt.addEventListener("click", conan.sing.bind(conan)) // this lúc này sẽ là conan object.



console.log("============== TImer ============");

class Counter {
    constructor(startingNum = 0, incrementAmt = 1) {
        this.count = startingNum;
        this.incrementAmt = incrementAmt;
    }

    start() {
        console.log("this class", this);
        setInterval(this.incrementAndPrint.bind(this), 1000);
        // setInterval(this.incrementAndPrint.bind(this), 1000);
    }

    incrementAndPrint() {
        console.log("this", this);
        // sẽ gặp lỗi
        // function test() {
        //     console.log("count value interval: ", this, this.count);
        //     this.count += this.incrementAmt;
        // } 

        // không gặp lỗi
        const test = () => {
            console.log("count value interval: ", this, this.count);
            this.count += this.incrementAmt;
        }
        test();
    }
}

const counterOne = new Counter(0 , 1);
counterOne.start();


console.log("===============Arrow function================");
console.log("===============");
/* 
    Arrow func không tạo this cho chính nó.???

*/