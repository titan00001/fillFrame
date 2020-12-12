import { visualizeMulti } from "../visualiser.js";
import { initialDataComponent } from "./initialDataComponents.js";
// import { temporalDataComponent } from "./temporalDataComponent.js";

/*
display list of objects as table: object, visibility, delete
on selection of item on table: design pane will show data of selected, else it will show the data of first object

add the functionality of editing the property of the object by keypress event
separate function for initial ad temporal data

*/

class designPane {
  // initial, current temporal data of object listed in superobject
  constructor(displayData, currentSelected, selectedObject) {
    this.currentSelected = currentSelected;
    this.selectedObject = selectedObject;
    this.initialDataPane = new initialDataComponent(
      displayData["initial"],
      displayData["current"]
    );
    // this.temporalDataPane = new temporalDataComponent(
    //   displayData["current"],
    //   currentSelected
    // );
    this.update(displayData, currentSelected);
  }

  displayCanvas() {
    // console.log(property, index, i);
    visualizeMulti("design-canvas", this.initialData, this.temporalData, this.selectedObject);
    // console.log(this.selectedObject);
    // onclick on canvas: select nearest object
  }

  displayInitialDataPane() {
    this.initialDataPane.display();
  }

  displayTemporalDataPane() {
    // this.temporalDataPane.update(this.temporalData);
  }

  displayNavBar() {
    // const addCircle = document.querySelector
  }

  update(displayData, currentSelected, newSelectedObject) {
    this.initialData = displayData["initial"];
    this.temporalData = displayData["current"];
    this.currentSelected = currentSelected;
    this.selectedObject = newSelectedObject;
    // console.log(this.selectedObject);
    // this.initialDataComponent.update(this.initialData);
    // this.temporalDataPane.update(this.temporalData);
    this.initialDataPane.update(this.initialData, this.temporalData, this.selectedObject);

    this.displayCanvas();
    // this.displayInitialDataPane();
    // this.displayTemporalDataPane();
  }
}

export { designPane };
