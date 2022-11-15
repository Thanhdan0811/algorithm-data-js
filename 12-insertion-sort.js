/* 

    - Việc thự hiện sort sẽ chia theo nửa bên trái
    - 2 số đầu swap theo thứ tự
    - số thứ 3 sẽ sắp xếp dựa vào 2 số đầu.
    - tiếp tục số thứ 4 sắp xép vào 3 số vừa đc sắp xếp.

*/


function insertionSort(arr) {

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        for (j = i - 1; j >= 0 && arr[j] > current; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = current;
    }

    return arr;
}

console.log(insertionSort([2,1,9,7,67,4]))