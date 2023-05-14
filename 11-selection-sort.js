/* 

    - Sẽ tương tự như bubble sort 
    - nhưng ta sẽ lấy số nhỏ nhất 
    - ta chọn 1 số minimun và so sánh với các số còn lại
    - đên hết array và đặt số đó ở đầu.


*/

function selectionSort(arr) {
    
    for (let i = 0; i < arr.length; i++) {
        let minimun = i;

        for (j = i + 1; j < arr.length; j++) {
            if (arr[minimun] > arr[j]) {
                minimun = j;
            }
        }

        if (minimun == i) continue;

        let temp = arr[i];
        arr[i] = arr[minimun];
        arr[minimun] = temp;

    }

    return arr;
}

console.log(selectionSort([334, 22, 10, 19, 17, 4]));


for (let i = 0; i < arr.length; i++) {
    let minimum = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < minimum) {
            minimum = arr[j];
        }
    }

    // if (minimum == i) continue;
    let temp = minimum;
    minimum = arr[i];
    arr[i] = temp;

}

