/* 

    - Binary search only works on sorted arrays.
    - Big-O is O(log(n))
*/

function binarySearch(arr, elem) {
    let start = 0;
    let end = arr.length - 1;
    let mid = Math.floor((start + end) / 2);

    while (arr[mid] !== elem && start <= end) {
        if (arr[mid] < elem) start = mid + 1;
        else end = mid - 1;
        mid = Math.floor((start + end) / 2);
        console.log(start, mid, end)
    }

    return arr[mid] == elem ? mid : -1;
}

console.log(binarySearch([1, 2, 4, 5, 9, 10, 15, 17, 22, 27, 28], 30));