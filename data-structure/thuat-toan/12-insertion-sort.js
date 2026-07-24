/* 

    - Việc thự hiện sort sẽ chia theo nửa bên trái
    - 2 số đầu swap theo thứ tự
    - số thứ 3 sẽ sắp xếp dựa vào 2 số đầu.
    - tiếp tục số thứ 4 sắp xép vào 3 số vừa đc sắp xếp.

*/

 
function insertionSort(arr) {

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = 0;
        for (j = i - 1; j >= 0 && arr[j] > current; j--) {
            arr[j + 1] = arr[j];
        }
        console.log("test: " , i, j, current, arr);
        
        arr[j + 1] = current;
    }

    return arr;
}

console.log(insertionSort([2,3, 1, 9]))

/* 
    [2, 1, 9, 7, 67, 4]
    current = 1 ; i = 1;
    j = 0, i = 1, 2 > 1, arr[j + 1] = arr[j] <=> [2, 2,9,7,67,4],
    j-- <=> j = -1, a[j + 1] = 1 => arr = [1,2,9,7,67,4]


    


*/