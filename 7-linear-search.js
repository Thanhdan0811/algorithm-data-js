/* 

    - Problem : Given an array of 'n' element and a target element 't' , 
    find index of 't' in the array. Return -1 if the target element is not found.

    Big-O Worse case is O(n)

*/

function linearSearch(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) return i;
    }
    return -1;
};

console.log(linearSearch([34, 56, 1, 2], 1));
console.log(linearSearch([34, 56, 1, 2], 12));