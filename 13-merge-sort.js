/* 

    - Merge sort là sự kết hợp cửa merging và sorting.
    -               [8,3,5,4,7,,6,1,2]
    =>            [8,3,5,4]  ,   [7,6,1,2]
    =>       [8,3] , [5,4]   ,  [7,6] , [1,2]
    =>      [8],[3],[5],[4]  , [7],[6],[1],[2]
    merge 
    =>        [3, 8],[4, 5]  ,  [6,7],[1,2]
    =>         [3,4,5,8]     ,  [1,2,6,7]
    =>              [1.2.3.4.5.6.7.8]

    Big O : 
    Time complexity Best : O(n log n);
    Time complexity average : O(n log n);
    Time complexity worst : O(n log n);
    space complexity  : O(n);

    log(n) là của chia array ra
    n là của việc merge 2 array lại với nhau
    = > n * log(n)
*/

// funciton merge two sorted array O(m + n)
// merge([1,10,50], [2,14,99,100]);
// merge([100], [1,2,3,4,5]);

function merge(arr1, arr2) {
    let results = [];
    let i = 0;
    let j = 0;
    while ( i < arr1.length && j < arr2.length ) {
        if (arr2[j] > arr1[i]) {
            results.push(arr1[i]);
            i++;
        } else {
            results.push(arr2[j]);
            j++;
        } 
    }
    while (i < arr1.length) {
        results.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        results.push(arr2[j]);
        j++;
    }

    return results;

};


function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    // console.log(mid, left, right);

    return merge(left, right);
}

console.log(mergeSort([10, 24, 76, 73, 71, 1, 9]));