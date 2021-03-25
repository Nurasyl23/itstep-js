/*Добавить новую фигуру на основаниии треугольника - Равносторонний треугольник (EquilateralTriangle) // Метод perimeter и area - остаются от треугольника // Метод log - делем собственный "Равносторонний треугольник: 100"

Добавить "статический" метод Rectangle.areEqual (равны?), для проверки равенства треугльников

проверить что оба аргумента Triangle
сравнить все стороны a=a b=b c=c 3.* сравнить стороны без учета порядка Triangle(1, 2, 3) === Triangle(3, 2, 1);
В продолжение яблок 3.1 Первратить ящик Box в полноценный объект с конструктором и прототипом

3.2 Добавить метод getQuantityString на основании nWord

Первый вариант const appleBox = new Box(["яблоко", "яблока", "яблок"]);

Второй вариант const appleBox = new Box(nWord((["яблоко", "яблока", "яблок"]));

appleBox.getQuantityString(10) // 10 яблок

.... const pearBox = new Box(["груша", "груши", "груш"]);*/
class Rectangle {

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  print() {
    console.log("Прямоугольник: " + this.width + ", " + this.height);
  };

  get perimeter() {
    return (this.width + this.height) * 2;
  };
  
  get area() {
    return this.width * this.height;
  }
}



class Square extends Rectangle { 
  constructor(width) {
    super(width, width);
  }

  print() {
    console.log("Квадрат: " + this.width);
  };
}


class Circle {
  radius = 0;

  constructor(radius) {
    this.radius = radius;  
  }
  
  print() {
    console.log("Круг: " + this.radius)
  };

  get perimeter() {
    return 2 * Math.PI * this.radius;
  };
  
  get area() {
    return Math.PI * this.radius * this.radius;
  };
  

}

class Triangle {

  constructor(a = 0, b = 0, c = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  print() {
    console.log("Треугольник: " + this.a + ", " + this.b + ", " + this.c);
  }

  get perimeter() {
    return this.a + this.b + this.c;
  }

  get area() {
    const p = this.perimeter / 2;
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
  }
  
}

const shapes = [
  new Rectangle(200, 50),
  new Rectangle(150, 20), 
  new Square(100),
  new Square(150), 
  new Circle(100), 
  new Circle(200), 
  new Triangle(100, 150, 200), 
  new Triangle(300, 400, 500),
];



console.log(shapes);

shapes.forEach(shape => shape.print());

console.log("Периметры:", shapes.map(shape => shape.perimeter));

console.log("Площади:", shapes.map(shape => shape.area));


// const sortedShapes = shapes.slice();

// sortedShapes.sort(Shape.comaparePerimeters);
// console.log(sortedShapes);
