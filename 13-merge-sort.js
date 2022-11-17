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
        results.push(arr1[j]);
        i++;
    }

    return results;

}