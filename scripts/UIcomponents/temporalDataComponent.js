/*
change the visulazation of design canvas on changing the temporal
property
*/

import { objectSingleton } from "../objectProperties.js";
const object1 = objectSingleton.getInstance();


class temporalDataComponent {
  constructor(temporalDataList, currentObjectSelected) {
    this.temporalDataList = temporalDataList;
    this.currentObjectSelected = currentObjectSelected;

    console.log(this.temporalDataList);
  }

  update(temporalDataList, selectedObjectId) {
    this.temporalDataList = temporalDataList;
    this.changeSelection(selectedObjectId);
    console.log(selectedObjectId);
    this.display();
  }

  changeSelection(currentObjectSelected) {
    this.currentObjectSelected = currentObjectSelected;
    // console.log(this.temporalDataList);
    // this.display();
  }

  display() {
    const temporalPropertyContainer = document.querySelector("#temporal");

    // remove all child
    while (temporalPropertyContainer.firstChild) {
      temporalPropertyContainer.removeChild(
        temporalPropertyContainer.firstChild
      );
    }

    // set name of div
    const name = document.createElement('p');
    name.textContent = "Temporal Data";
    temporalPropertyContainer.appendChild(name);

    let temporalData = this.temporalDataList[this.currentObjectSelected];

    for (let item in temporalData) {
      if (item !== "time")
        this.itemDisplay(item, temporalData[item], "temporal");
    }
  }

  itemDisplay(name, value, parentNodeId) {
    const parentNode = document.getElementById(parentNodeId);

    const container = document.createElement("div");
    container.setAttribute("class", "property-item");
    container.setAttribute("div", name);

    const label = document.createElement("label");
    label.textContent = name;

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = value;

    input.addEventListener("focusout", () => {
      // console.log(input.value, e.key, name, parentNode.id);

      // console.log(this.currentObjectSelected);

      this.temporalDataList[this.currentObjectSelected][name] = Number(
        input.value
      );

      // this.temporalDataList[this.currentObjectSelected][name] = Number(
      //   input.value + e.key
      // );

      console.log(input.value, this.currentObjectSelected);

      object1.onUpdate({"currentObject" : this.currentObjectSelected});
      
    });

    container.appendChild(label);
    container.appendChild(input);

    parentNode.appendChild(container);
  }
}

export { temporalDataComponent };

/*

problem: display is updated, but selected state is lost
solution: 1. pass relevant state on update


problem: display is updated on each keypress event
solution: change keypress event with focusout event
*/
