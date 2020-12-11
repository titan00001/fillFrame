import { frameSetSingleton } from "../scripts/UIcomponents/frameset.js";
// import {data2} from './engineTest.js';
import { objectSingleton, pathObject } from "../scripts/objectProperties.js";
import { getPath } from '../scripts/engine.js';
import { visualizeAnimation } from '../scripts/visualiser.js';


let superObject = objectSingleton.getInstance();

// superObject.addObject();

// console.log(superObject.getTemporalDataById(0));

// {'posX': posX, 'posY': posY, 'time': time}

// let instantProperty1 = [{'posX': 40, 'posY': 45, 'time': 2},
//     {'posX': 120, 'posY': 125, 'time': 2},
//     {'posX': 70, 'posY': 100, 'time': 2}
// ];
// superObject.addTemporalData(1, instantProperty1);

// let instantProperty2 = [{'posX': 50, 'posY': 45, 'time': 4},
//     {'posX': 100, 'posY': 125, 'time': 4},
//     {'posX': 80, 'posY': 100, 'time': 4}
// ];
// superObject.addTemporalData(2, instantProperty2);

// superObject.removeTemporalDataById(0);

let frames = frameSetSingleton.getInstance(superObject);

// frames.addFrame();
// frames.addFrame();
// frames.addFrame();

superObject.observer.subscribe(frames);

// frames.display();

// test: changing the parameter of passed object modifies the origignal object-> true
// work-around: create the deep copy of object to separate the changes when modifying

const addFrame = document.querySelector("#addFrame");
addFrame.addEventListener("click", () => {
  console.log(superObject);
});

const addCircle = document.querySelector("#addCircle");
addCircle.addEventListener("click", () => {
  if (superObject.getTemporalCount() < 2) {
    console.log("added circle");
    superObject.addObject("Circle1", 'circle');
    superObject.onUpdate();
  } else {
    console.log("Cannot add object in more than 1 slide.");
  }
});

const addLine = document.querySelector("#addLine");
addLine.addEventListener("click", () => {
  if (superObject.getTemporalCount() < 2) {
    console.log("added line");
    superObject.addObject("Line1", 'line');
    superObject.onUpdate();
  } else {
    console.log("Cannot add object in more than 1 slide.");
  }
});

const addTriangle = document.querySelector("#addTriangle");
addTriangle.addEventListener("click", () => {
  if (superObject.getTemporalCount() < 2) {
    console.log("added Triangle");
    superObject.addObject("Triangle1", 'triangle');
    superObject.onUpdate();
  } else {
    console.log("Cannot add object in more than 1 slide.");
  }
});

const getPreviewBtn = document.querySelector("#getPreview");
getPreviewBtn.addEventListener('click', () => {
  
  const clonedSuperObject = superObject.getClone();

  for(let i = 0; i < superObject.objectCount; i++) {
    clonedSuperObject[i]['temporal'] = getPath(clonedSuperObject[i]['temporal']);
  }

  // console.log(getTemporalDataById(clonedSuperObject, clonedSuperObject.length, 0));
  const pathObject1 = new pathObject(clonedSuperObject);
  console.log(pathObject1.getInitialData());

  visualizeAnimation(pathObject1);


});

// line test
// const lineState1 = {'headX': 20, 'headY': 30, 'tailX': 40, 'tailY': 50, 'time': 0 };
// const lineState2 = {'headX': 60, 'headY': 70, 'tailX': 80, 'tailY': 90, 'time': 3 };

console.log("Todo List");
console.log("build hide and remove object functionality");
console.log("change object class to keep track of shapes added into it");
console.log("add functions to make multiple shapes");
console.log(
  "add option to change the position of object using mouse: designCanvas, object updation"
);

// Test: singleton function
// let object1 = frameSetSingleton.getInstance(superObject);
// let object2 = frameSetSingleton.getInstance(superObject);

// console.log(object1 === object2);
