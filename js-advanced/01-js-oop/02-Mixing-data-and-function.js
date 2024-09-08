/* 
    - các hàm liên quan đến nhau có thể được mix lại với nhau.
    - bất lợi : nếu ta mún nhiều hơn 1 triangle hay đối tượng thì phải tạo mới hoàn toàn.
    - khó kiểm soát quản lí.
    - lãng phí memory.

*/

// Area of right triangle
const getTriangleArea = (a,b) => {
    return (a*b) / 2;
} 

// Hypotenuse of right triangle
const getTriangleHypotenuse = (a, b) => {
    return Math.sqrt(a ** 2 + b ** 2);
}

console.log(getTriangleArea(3,4));

// Ta sẽ kết hợp thành oop

let myTri = {
    a: 3,
    b: 4,
    getArea: function () {
        return (this.a + this.b) / 2;
    },
    getHypotenuse: function () {
        return  Math.sqrt(this.a ** 2 + this.b ** 2);
    }
}

// call từ object.

console.log(myTri.getArea());

