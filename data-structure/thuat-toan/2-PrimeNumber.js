/* 

  Problem : Give a natural number 'n', determine if the number is prime or not.
  A prime number is a natural number greater than 1 that is not a product of two smaller natural number.

  EX : isPrime(5) = true (1*5 or 5*1)
  isPrime(4) = false; (1*4 or 2*2 or 4*1)

  Big - O => O(n)

  Optimized :  Big O is O(sqrt(n))

  Integers larger than the square root do not need to be checked because,
  whenever 'n=a*b' , one of the two factors 'a' and 'b' is less than or equal to the square root of 'n'

  ex : n = 24, a = 4 , b = 6,
  square root of 24 is  4.89

  4 is less than 4.89 

*/

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrime(1));
console.log(isPrime(5));
console.log(isPrime(4));

console.log("==================== Optimized =================");

function isPrimeOptimized(n) {
  if (n < 2) return false;
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrimeOptimized(1));
console.log(isPrimeOptimized(5));
console.log(isPrimeOptimized(4));
