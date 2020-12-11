import { visualizeMulti } from "../visualiser.js";
import { designPane } from "./designPane.js";

class frameSet {
  constructor(superObject, parentNode = "#frameset", selectedFrame = 0, selectedObject = 0) {
    this.superObject = superObject;
    this.selectedFrameId = selectedFrame;
    this.parentNode = parentNode;

    this.frameCount = superObject.getTemporalCount();
    this.selectedObject = selectedObject;

    this.designPane = new designPane(
      this.displayCurrentFrame(),
      this.selectedFrameId
    );
    // this.designPane.displayCanvas();

    // test
    // this.addFrame();
    // this.addFrame();

    this.display();
  }

  addFrame(id) {
    // adds frame after the selectedFrame

    // let id = this.selectedFrameId;
    let currentTemporalData = this.superObject.getTemporalDataById(id); // expects an array of json properties
    this.superObject.addTemporalData(id, currentTemporalData); // push the value of array into corresponding objects temporalData Array
  }

  removeFrame(id) {
    // removes the selectedFrame
    if (this.frameCount === 1) {
      console.log("Cannot delete only frame");
      return;
    }
    // let id = this.selectedFrameId;
    this.superObject.removeTemporalDataById(id);
  }

  display() {
    const frameContainer = document.querySelector(this.parentNode);

    // remove all child
    // console.log(this.parentNode);
    while (frameContainer && frameContainer.firstChild) {
      frameContainer.removeChild(frameContainer.firstChild);
    }

    let initialData = this.superObject.getInitialData();

    this.frameCount = this.superObject.getTemporalCount();

    // console.log(this.frameCount);

    for (let i = 0; i < this.frameCount; i++) {
      // const frame = makeFrame(i, this.parentNode);
      // frame.addEventListener('click', (e) => {
      //     this.setSelect(e.target.id);
      //     // console.log(e.target.id);

      // });

      this.makeFrameCard(i);

      // console.log(this.superObject.getTemporalDataById(i));
      // this.superObject.getTemporalDataById(i).forEach((property, index) => {
      //   // console.log(property, index, i);
      //   visualize(i, initialData[index], property, false);
      // });

      visualizeMulti(i, initialData, this.superObject.getTemporalDataById(i));
    }
    // for bug 6:
    if(this.frameCount > 0) {
      this.setSelect(this.selectedFrameId);
    } else {
      // for bug 7: change selected frame to 0 before dissolving all frames
      this.selectedFrameId = 0;
      this.designPane.update(this.displayCurrentFrame(), this.selectedFrameId, 0);
    }
  }

  displayCurrentFrame() {
    const initialData = this.superObject.getInitialData();

    // console.log(this.superObject.getTemporalDataById(i));

    const temporalData = this.superObject.getTemporalDataById(
      this.selectedFrameId
    );

    // console.log(temporalData);
    return { initial: initialData, current: temporalData };
  }

  setSelect(newSelect) {

    const prevFrame = document.getElementById(this.selectedFrameId);
    if(prevFrame !== null) {
        prevFrame.classList.remove('frame-selected');
    }

    const currentFrame = document.getElementById(newSelect);
    if(currentFrame !== null) {
      this.selectedFrameId = newSelect;
      console.log(this.selectedFrameId, this.selectedObject);
      currentFrame.classList.add('class','frame-selected');
      this.designPane.update(this.displayCurrentFrame(), this.selectedFrameId, this.selectedObject);
    }
    
  }

  notify(retainedProperty) {
    // console.log(retainedProperty);
    // this.setSelect(this.selectedFrameId, retainedProperty);
    if(retainedProperty !== undefined && retainedProperty["currentObject"] !== undefined){
      this.selectedObject = retainedProperty["currentObject"];
      // console.log(this.selectedObject);
    } else {
      this.selectedObject = 0;
    }

    this.display();
  }

  makeFrameCard(id) {
    const frameCard = document.createElement("div");
    frameCard.setAttribute("class", "frame-card");

    const frame = makeFrame(id);
    frame.addEventListener("click", (e) => {
      this.setSelect(e.target.id);
    });

    const frameController = document.createElement("div");
    frameController.setAttribute("class", "frame-controller");

    const addBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    const timeInput = document.createElement("input");
    timeInput.setAttribute("type", "text");
    // timeInput.setAttribute('maxlength', 1); 
    // above code only permits single digit time

    addBtn.textContent = "Add";
    removeBtn.textContent = "Remove";
    timeInput.value = this.superObject.getTemporalDataById(id)[0]["time"];

    addBtn.addEventListener("click", () => {
      console.log("add: " + id);
      this.addFrame(id);
      this.display();
    });

    removeBtn.addEventListener("click", () => {
      console.log("remove: " + id);
      this.removeFrame(id);
      this.display();
    });

    timeInput.addEventListener("focusout", () => {
      console.log(timeInput.value);
      this.superObject.changeTimeById(id, timeInput.value);
      this.display();
    });

    frameController.appendChild(addBtn);
    frameController.appendChild(timeInput);
    frameController.appendChild(removeBtn);

    frameCard.appendChild(frame);
    frameCard.appendChild(frameController);

    document.querySelector(this.parentNode).appendChild(frameCard);

    // return frame;
  }
}

function makeFrame(id) {
  // console.log("debug: makeFrame")
  const frame = document.createElement("canvas");
  frame.setAttribute("class", "frame");
  frame.setAttribute("id", id);

  // document.querySelector(parentNode).appendChild(frame);

  return frame;
}

var frameSetSingleton = (function (superObject, parentNode = "#frameset") {
  var instance;

  function createInstance(superObject, parentNode) {
    var object = new frameSet(superObject, parentNode);
    console.log("created frame");
    return object;
  }

  return {
    getInstance: function (superObject, parentNode) {
      if (!instance) {
        instance = createInstance(superObject, parentNode);
      }
      console.log("get frame");
      return instance;
    },
  };
})();

export { frameSetSingleton };

/*

frameSet is a component on design pane that depicts temporal data of objects
It visualises the temporal data in the form of frame.

Input: 1. A superObject containing the collection(array) of the objects.
    2. parentNode considering the location of component in the browser.
Output: Manages Effect on superObject

Side Effects:
1. Manages temporal data column on all the objects in superObjects
2. Selects and Display the position and visual property of objects in superObjects
3. Highlights the selectedFrameId frame
4. Displays the selectedFrameId state of objects in design Canvas
5. Display control buttons to add, remove frame
*/
