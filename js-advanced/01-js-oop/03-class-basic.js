/* 
    - classes là bản ghi(blueprint) của functionality.
    - firstTry instanceof Triangle => true;
    - Js biết nó là 1 instance của Triangle class.
    - typeof firstTy => "object"

*/

class Triangle {
    getArea() {
        return (this.a * this.b) / 2;
    }

    getHypotenuse() {
        return Math.sqrt(this.a ** 2 + this.b ** 2);
    }
}

const firstTri = new Triangle();
firstTri.getArea(); // => undefined
firstTri.a = 3;
firstTri.b = 4;
firstTri.getArea(); // result.