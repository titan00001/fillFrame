// class Circle {
//   constructor(name, type) {
//     this.initial = {
//       name: name,
//       type: type,
      
//     };

//     this.temporal = [];
//     this.addTemporalProperty(0, 0, 10, 0, 0);
//     this.temporalPropertySize = 1;
//   }

//   clone() {
//     let clonedCircle = JSON.parse(JSON.stringify(this));
//     return clonedCircle;
//   }

//   addTemporalProperty(posX, posY, radius, time, temporalPropertyIndex = undefined) {
//     // add after temporalPropertIndex
//     if (temporalPropertyIndex === undefined)
//       temporalPropertyIndex = this.temporalPropertySize;

//     this.temporal.splice(temporalPropertyIndex, 0, {
//       posX: posX,
//       posY: posY,
//       time: time,
//       radius: radius
//     });
//     this.temporalPropertySize += 1;
//   }

//   getTemporalProperty(temporalPropertyIndex) {
//     return this.temporal[temporalPropertyIndex];
//   }

//   changeTemporalProperty(temporalPropertyIndex, newObject) {
//     this.temporal = Object.assign(
//       this.temporal[temporalPropertyIndex],
//       newObject
//     );
//   }

//   removeTemporalProperty(temporalPropertyIndex) {
//     this.temporal.splice(temporalPropertyIndex, 1);
//     this.temporalPropertySize -= 1;
//   }

//   changeInitialProperty(newProperty) {
//     this.initial = Object.assign(this.initial, newProperty);
//   }
// }

class Shape {

  constructor(name, type) {
    this.initial = {
      name: name,
      type: type,
    };
    this.temporal = [];
    this.temporalPropertySize = 0;
  }

  clone() {
    let clonedShape = JSON.parse(JSON.stringify(this));
    return clonedShape;
  }

  addTemporalProperty(temporalProperty, temporalPropertyIndex = undefined) {
    // add after temporalPropertIndex
    if (temporalPropertyIndex === undefined)
      temporalPropertyIndex = this.temporalPropertySize;

    this.temporal.splice(temporalPropertyIndex, 0, temporalProperty);
    this.temporalPropertySize += 1;
  }

  getTemporalProperty(temporalPropertyIndex) {
    return this.temporal[temporalPropertyIndex];
  }

  changeTemporalProperty(temporalPropertyIndex, newObject) {
    this.temporal = Object.assign(
      this.temporal[temporalPropertyIndex],
      newObject
    );
  }

  removeTemporalProperty(temporalPropertyIndex) {
    this.temporal.splice(temporalPropertyIndex, 1);
    this.temporalPropertySize -= 1;
  }

  changeInitialProperty(newProperty) {
    this.initial = Object.assign(this.initial, newProperty);
  }

}

class Circle extends Shape {

  constructor(name, type) {

    super(name, type);

    this.addTemporalProperty({'posX': 0, 'posY': 0, 'radius': 10, 'time': 0}, 0);

  }

}


class Line extends Shape {

  constructor(name, type) {

    super(name, type);

    this.addTemporalProperty({'headX': 10, 'headY': 10, 'tailX': 20, 'tailY' : 20, 'time': 0}, 0);
  }

}

class Triangle extends Shape {

  constructor(name, type) {

    super(name, type);

    this.addTemporalProperty({'X1': 40, 'Y1': 50, 'X2': 20, 'Y2' : 30, 'X3': 30, 'Y3' : 30, 'time': 0}, 0);
  }

}


function getShape(shapeName, shapeType) {
  if(shapeType === "circle") {
    return new Circle(shapeName, 'circle');
  } else if (shapeType === "line") {
    return new Line(shapeName, 'line');
  } else if(shapeType === "triangle") {
    return new Triangle(shapeName, 'triangle'); 
  }
}


export { getShape };
/*

Shape: add any type of shape: circle, line, polygon
signature: (shapeName, shapeType)


make shape an abstract class, 
and make circle class inherit all the functionalities from shape class
*/
