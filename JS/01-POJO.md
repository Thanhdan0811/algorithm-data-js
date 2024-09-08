- `let obj = {}`;
- `let obj = new Object()`;

- properties không tồn tại sẽ trả về undefined.
- All keys sẽ là "stringified".
- `ob[1] , ob["1"]` là như nhau.
- `ob[true] => ob["true"]`

# Mixing data và functionality.


```
let myTri = {
    a: 3,
    b: 4,
    getArea: function() {
        return (this.a + this.b) / 2;
    },
    getHypotenuse: function() {
        return Math.sqrt(this.a ** 2 + this.b **2);
    }
}

```

# class

```
class Triangle {
    constructor(a, b) {
        if(!Number.isFinite(a) || a <= 0) {
            throw new Error(`Invalid a: ${a}`)
        }
        this.a = a;
        this.b = b;
    }
    getArea() {
        return (this.a + this.b) / 2;
    }

    getHypotenuse() {
        return Math.sqrt(this.a ** 2 + this.b **2);
    }
}

const myTri = new Triangle();
const newTri = new Triangle(2, 3);

```

- `typeof myTri; => object`
- `myTri instanceof Triangle => true`

- constructor function luôn return về undefined.

# static method, properties

```
class Cat {
    constructor(name, breed) {
        this.name = name;
        this.breed = breed;
    }

    static meow() {
        console.log("this is : ", this); //
        // this này sẽ là bản thân class ko phải là instance từ class
    }

    static species = "felis catus";
}

```


# Getter Setter

