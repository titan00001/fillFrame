import { getShape } from "./geometry.js";

class object {
  constructor() {
    this.objectList = [];
    this.objectCount = 0;
    // this.temporalCount = 0;

    this.observer = new objectObserver();


  }

  addObject(name = "Shape" + this.objectCount, type = "") {
    // below written codes are solely for the purpose of testing
    this.objectList.push(getShape(name, type));
    // this.objectList.push(new Circle('Circle2', 'circle', 25));
    // this.objectList.push(new Circle('Circle3', 'circle', 30))
    this.objectCount++;
  }


  getInitialData() {
    let initialData = [];

    for (let i = 0; i < this.objectCount; i++) {
      initialData.push(this.objectList[i].initial);
    }

    return initialData;
  }

  getTemporalCount() {
    if(this.objectCount === 0)
        return 0;
    return this.objectList[0].temporal.length;
  }

  getTemporalDataById(id) {
    let instantData = [];

    for (let i = 0; i < this.objectCount; i++) {
      instantData.push(this.objectList[i].getTemporalProperty(id));
    }

    return instantData;
  }

  removeTemporalDataById(id) {
    // remove the specific index from temporal data
    for (let i = 0; i < this.objectCount; i++) {
      this.objectList[i].removeTemporalProperty(id);
    }
  }

  addTemporalData(id, instantProperty) {
    // add the temporal data at given index in temporal Array deep copy

    const instantPropertyCopy = JSON.parse(JSON.stringify(instantProperty));
    for (let i = 0; i < this.objectCount; i++) {
      // console.log(instantProperty);
      this.objectList[i].addTemporalProperty(
        instantPropertyCopy[i],
        id
      );
    }
  }

  onUpdate(retainedProperty) {
    this.observer.notifyAll(retainedProperty);
    // console.log(retainedProperty);
  }

  changeTimeById(id, newTime) {
    // set newTime for all object member for temporal index = id except for index = 0

    if (id === 0 && newTime !== 0) {
      console.log("1st frame can only have 0 as time");
      return;
    }

    for (let i = 0; i < this.objectCount; i++) {
      this.objectList[i]["temporal"][id]["time"] = Number(newTime);
    }
    console.log("updated time");
  }

  getClone() {
    let clonedObject = JSON.parse(JSON.stringify(this.objectList));
    return clonedObject;
  }

}

class pathObject {

  // get temporal data
  // get total object count
  // get time of temporal data

  constructor(objectList) {
    this.objectList = objectList;
    console.log(objectList);
  }

  getTemporalArrayById(index) {
    if(this.getObjectCount() === 0)
      return [];

    let temporalArray = [];
    for(let i = 0; i < this.getObjectCount(); i++) {
      temporalArray.push(this.objectList[i]['temporal'][index]);
    }
    return temporalArray;
  }

  getObjectCount() {
    if(this.objectList === null)
      return 0;
    return this.objectList.length;
  }

  getTimeById(index) {
    if(this.getObjectCount() === 0)
      return 0;
    return this.objectList[0]['temporal'][index]['time'];
  }

  getTemporalLength() {
    if(this.getObjectCount() === 0)
      return 0;

    return this.objectList[0]['temporal'].length;
  }

  getInitialData() {
    let initialData = [];

    for (let i = 0; i < this.getObjectCount(); i++) {
      initialData.push(this.objectList[i].initial);
    }

    return initialData;
  }


}

var objectSingleton = (function () {
  var instance;

  function createInstance() {
    var obj = new object();
    return obj;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

class objectObserver {
  constructor() {
    this.subscriberList = [];
  }

  subscribe(newObserver) {
    this.subscriberList.push(newObserver);
    console.log("subscribed..!");
  }

  removeSubscription(requestingObserver) {
    this.subscriberList.filter((observer) => {
      return requestingObserver != observer;
    });
  }

  notifyAll(retainedProperty) {
    for (let observer of this.subscriberList) {
      observer.notify(retainedProperty);
    }
  }
}


export { objectSingleton, pathObject };
