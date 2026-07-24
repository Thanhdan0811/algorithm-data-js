const addUpToLoop = (n) => {
    let total = 0;
    for(let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

const addUpToMath = (n) => {
    return n * (n + 1) / 2;
}


let t1 = performance.now();
// addUpToLoop(1000000000);
addUpToMath(1000000000);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
