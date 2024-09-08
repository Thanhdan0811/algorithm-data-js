/* 

    - Sẽ tương tự như bubble sort 
    - nhưng ta sẽ lấy số nhỏ nhất 
    - ta chọn 1 số minimun và so sánh với các số còn lại
    - đên hết array và đặt số đó ở đầu.
    - O(n^2), space O(1), 


*/

const arr = [334, -12,34, 22, 10, 19, 17, 4];

// function selectionSort(arr) {
    
//     for (let i = 0; i < arr.length; i++) {
//         let minimun = i;

//         for (j = i + 1; j < arr.length; j++) {
//             if (arr[minimun] > arr[j]) {
//                 minimun = j;
//             }
//         }

//         if (minimun == i) continue;

//         let temp = arr[i];
//         arr[i] = arr[minimun];
//         arr[minimun] = temp;

//     }

//     return arr;
// }

function selectionSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        let min_idx = i;
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if(min_idx == i) continue;

        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

console.log(selectionSort([334, 22, 10, 19, 17, 4]));

// let tongLoop = 0;

// for (let i = 0; i < arr.length - 1; i++) {
//     let max = i;

//     tongLoop++;

//     for(let j = i + 1; j < arr.length; j++) {
//         max = arr[max] < arr[j] ? j : max;
//         tongLoop++;
//     }

//     // if(max === i) continue;

//     let temp = arr[i];
//     arr[i] = arr[max];
//     arr[max] = temp;

// }

// console.log(arr, tongLoop);