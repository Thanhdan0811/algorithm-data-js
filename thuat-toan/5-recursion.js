/* 
    Recursion is a problem solving technique where the solution depends on solutions to smaller
    instances of the same problem

    Recursion is When a function call itself.


*/

// Recursion fibonacci sequence
/* 
    Fn = F(n-1) +  F(n -2);
    F2 = F1 + F0 <=> 1 + 0;
    F2 = 1; 
*/

function recursionFibonacci(n) {
    console.log('call n before if : ', n);
    if (n < 2) return n;
    console.log('call n after if : ', n);
    return recursionFibonacci(n - 1) + recursionFibonacci(n - 2);
}

/* 

n = 4 
- first call; n = 4 => n-1 = 3
- second call : n = 3 => n -1 = 2
- third call : n = 2 => n - 1 = 1
- fourth call : n = 1 => return 1 to the third call;

- at third call : (n-1) call is 1, 

- fifth call (n-2) of third call :  n = 2 => n - 2 = 0
- sixth call => return  0 to the fifth call;


- So at third call : return 1 + 0 is 1

- Second call of (n-1) is 1



- With this recursion big-O is O(2^n)

- n-1 will cal many time 
- n - 2 will call many time.

*/

// console.log(recursionFibonacci(0));
// console.log(recursionFibonacci(1));
console.log(recursionFibonacci(4)); //=> 3
// console.log(recursionFibonacci(6));