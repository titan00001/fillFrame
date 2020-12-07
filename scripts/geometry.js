class Circle {
  constructor(name, type) {
    this.initial = {
      name: name,
      type: type,
      
    };

    this.temporal = [];
    this.addTemporalProperty(0, 0, 10, 0, 0);
    this.temporalPropertySize = 1;
  }

  clone() {
    let clonedCircle = JSON.parse(JSON.stringify(this));
    return clonedCircle;
  }

  addTemporalProperty(posX, posY, radius, time, temporalPropertyIndex = undefined) {
    // add after temporalPropertIndex
    if (temporalPropertyIndex === undefined)
      temporalPropertyIndex = this.temporalPropertySize;

    this.temporal.splice(temporalPropertyIndex, 0, {
      posX: posX,
      posY: posY,
      time: time,
      radius: radius
    });
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

export { Circle };

/*


*/
