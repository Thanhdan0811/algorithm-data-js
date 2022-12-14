/*
  Give an integer 'n' find the factorial (lũy thừa) of that integer.
  
  In Mathematics , the factorial of non-negative integer 'n' , denoted n! , is the product of all positive integers less than or equal to 'n'.
  
  EX : 

  fatorial of zero is 1;
  factorial(4) = 4 * 3 * 2 * 1 = 24
  factorial(3) = 3 * 2 * 1 = 6
  factorial(3) = 2 * 1 = 2

  n * (n-1) 
  
  
  n^2 - n = 2
  n^3 -4n^2 + 2n = 6
  n^4 -6n^3 + 11n^2 - 6n = 24


  factorial(5) = 5 * 4 * 3 * 2 * 1 = 120

  BIG-O is O(n)

*/

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result = result * i;
  }

  return result;
}

console.log(factorial(0));
console.log(factorial(4));
console.log(factorial(5));
