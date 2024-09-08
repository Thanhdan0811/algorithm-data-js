/*
    - properties nào không tồn tại sẽ trả về undefined.
    - tất cả các keys là bị string hóa.

*/

const key = "species";
const pet = {
    species: "DOG", name: "Elton", age: 1.5
};

pet[true] = "hello!!!";
console.log(pet[true] , pet["true"], " sẽ trả về cùng 1 value");


pet.bark = () => {
    return "Woof Woof!!!";
};