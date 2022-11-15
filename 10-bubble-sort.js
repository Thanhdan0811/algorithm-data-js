/* 
    -Bubble sort : have two loop, start at begin , if item1 smaller than item2 then swap
    - after thes first loop the biggest item will be in last index.=

*/

console.log("========= bubbleSort : smallest to biggest ===========");

function bubbleSort(arr) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  /* 
        for (let i = arr.length; i > 0 ; i--) {
            for (let j = 0; j < i - 1 ; j++) {
            
        similar below.
    */

  for (let i = 0; i < arr.length; i++) {
    let noSwap = true;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwap = false;
      }
    }

    if (noSwap) break;
  }

  return arr;
}

console.log("bubbleSort : ", bubbleSort([38, 22, -1, 89, 12, 4, 5, 8]));
console.log("bubbleSort : ", bubbleSort([2,1]));
console.log("bubbleSort : ", bubbleSort([0, 1, 3, 2, -11, 4, 5, 6])); // if dont use noSwap will loop all .

console.log("========= bubbleSortReverse : biggest to smallest ===========");

function bubbleSortReverse(arr) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  /* 
    for (let i = arr.length; i > 0 ; i--) {
        for (let j = 0; j < i - 1 ; j++) {
            
        similar below.
        */

  for (let i = 0; i < arr.length; i++) {
    let noSwap = true;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] < arr[j + 1]) {
        // swap
        swap(arr, j, j + 1);
        noSwap = false;
      }
    }
    if (noSwap) break;
  }

  return arr;
}

console.log("bubbleSortReverse : ", bubbleSortReverse([38, 22, -1, 89, 12, 4, 5, 8]));
