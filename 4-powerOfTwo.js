/* 
    - Give a positive integer 'n', determine if the number is a power of 2 or not.
    - An integer is a power of two if there exist an integer 'x' such that 'n' === 2.
    Ex : isPowerOfTwo(1) = true (2^0)
*/


// Big-O O(log(n))
function isPowerOfTwo(n) {
    if (n < 1) return false;
    while (n > 1) {
        if (n % 2 !== 0) {
            return false;
        }
        n = n / 2;
    }
    return true;
}

console.log(isPowerOfTwo(1));
console.log(isPowerOfTwo(2));
console.log(isPowerOfTwo(3));
console.log(isPowerOfTwo(5));
console.log("==========================");

/* 
    - turn to binary number
    1 -> 1 ; 2 -> 10 ; 3 => 100
    if use bitwise & with n and n - 1
    1 - 0001
    0 - 0000
    --------
    0 - 0000  ;


    2 - 0010
    1 - 0001
    --------
    0 - 0000;

    3 - 0011
    2 - 0010
    --------
    0 - 0001; different to 0
*/

function isPowerOfTwoBitWise(n) {
    if (n < 1) return false;
    return (n & (n - 1)) === 0;
}

console.log(isPowerOfTwoBitWise(1));
console.log(isPowerOfTwoBitWise(2));
console.log(isPowerOfTwoBitWise(3));
console.log(isPowerOfTwoBitWise(5));