setTimeout(() => {
    console.log("B");
}, 100);


setTimeout(() => {
    console.log("C");
    for (let i = 0; i < 100000000000; i++) {}
    console.log("D");
}, 100)


console.log("A");