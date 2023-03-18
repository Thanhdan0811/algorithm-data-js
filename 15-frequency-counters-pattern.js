

/* 
    - Cho 2 array , check xem số phần tử array là như nhau 
    - và giá trị của 1 value trong array sẽ là bình phương của 1 value trong array thứ 2.

*/


// Cách 1 : cách thông thường.

let sameArr_1 = (arr1, arr2) => {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        let correctIdx = arr2.indexOf(arr1[i] ** 2);
        if (correctIdx === -1) return false;
        arr2.splice(correctIdx, 1);
    }
    return true;
}

let arr1 = [1,2,3,4];
let arr2 = [4,9,1,16];

console.log("So sánh cách 1 : ", sameArr_1(arr1, arr2));


// Cách 2 : dúng 2 vòng loop riêng lẻ.

/* 
    frequencyCounters1 => {1 : 1, 2 : 2 , 3 : 3 , 4 : 4};

    object sẽ có dạng là key sẽ là value của array, và value sẽ là số lần value trong array xuất hiện.

*/


let sameArr_2 = (arr1, arr2) => {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
    if (arr1.length !== arr2.length) return false;

    let frequencyCounters1 = {};
    let frequencyCounters2 = {};

    for (let val of arr1) {
        frequencyCounters1[val] = (frequencyCounters1[val] || 0) + 1;
    }
    for (let val of arr2) {
        frequencyCounters2[val] = (frequencyCounters2[val] || 0) + 1;
    }

    for (let key in frequencyCounters1) {
        // mũ 2 nhưng ko tồn tại trong frequencyCounters2
        if (!(key ** 2 in frequencyCounters2)) return false;
        // số lượng mũ 2 trong frequencyCounters2 khác số lượng trong frequencyCounters1
        if (frequencyCounters2[key ** 2] !== frequencyCounters1[key]) return false;
    }

    return true;
}

let arr3 = [1,2,3,4];
let arr4 = [4,9,1,16];
console.log("So sánh cách 2 : ", sameArr_2(arr3, arr4));