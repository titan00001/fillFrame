import { objectSingleton } from "../objectProperties.js";
// import { frameSetSingleton } from "./frameset.js";

import { temporalDataComponent } from "./temporalDataComponent.js";

/*

    hide or show: visualize

    2. whwnver there is a change in superObject, all the registered
    components will be called.

*/

class initialDataComponent {
  constructor(initialDataList, temporalDataList) {
    this.initialDataList = initialDataList;

    this.visible = [];
    this.removed = [];
    this.selectedObjectId = 0;

    for (let i = 0; i < this.initialDataList.length; i++) {
      this.visible.push(true);
      this.removed.push(false);
    }

    // console.log(this.initialDataList);

    this.temporalComponent = new temporalDataComponent(
      temporalDataList,
      this.selectedObjectId
    );
  }

  update(initialDataList, temporalDataList) {
    this.initialDataList = initialDataList;
    this.temporalDataList = temporalDataList;
    this.selectedObjectId = 0;

    this.temporalComponent.update(this.temporalDataList);
    this.display();
  }

  display() {
    const initialPropertyContainer = document.querySelector("#initial");

    // remove all child
    while (initialPropertyContainer.firstChild) {
      initialPropertyContainer.removeChild(initialPropertyContainer.firstChild);
    }

    // set name of div
    const name = document.createElement('p');
    name.textContent = "Initial Data";
    initialPropertyContainer.appendChild(name);

    for (let i = 0; i < this.initialDataList.length; i++) {
      // console.log(this.initialDataList[i]);
      this.itemDisplay(
        i,
        this.initialDataList[i],
        this.visible[i],
        this.removed[i],
        "initial"
      );
    }
  }

  itemDisplay(itemId, item, isVisible, isDeleted, parentNodeId) {
    const parentNode = document.getElementById(parentNodeId);

    const container = document.createElement("div");
    container.setAttribute("class", "property-item");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = item.name;

    const visibleBtn = document.createElement("button");
    visibleBtn.textContent = isVisible ? "Hide" : "Show";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = isDeleted ? "Restore" : "Delete";

    const selectBtn = document.createElement("button");
    selectBtn.textContent =
      this.selectedObjectId === itemId ? "Selected" : "Select";

    input.addEventListener("focusout", () => {
      // console.log(itemId, input.value + e.key, name, parentNode.id);
      this.initialDataList[itemId].name = input.value;
    });

    visibleBtn.addEventListener("click", () => {
      this.visible[itemId] = !isVisible;
      this.display();
    });

    removeBtn.addEventListener("click", () => {
      this.removed[itemId] = !isDeleted;

      this.display();
    });

    selectBtn.addEventListener("click", () => {
      this.selectedObjectId = itemId;
      this.display();

      console.log(itemId + ": selectedObjectId");
      this.temporalComponent.changeSelection(itemId);
    });

    // container.appendChild(label);
    container.appendChild(input);
    container.appendChild(visibleBtn);
    container.appendChild(removeBtn);
    container.appendChild(selectBtn);

    parentNode.appendChild(container);
  }
}

export { initialDataComponent };

/*

    compiler flagging undefined has no properties when invoking
    frameSingleton.getInstance()

    Reason: frameset.js already imports designPane, which in turns imports
    initialDataComponents before initialization of frameSet.
    This creates fedback situation where the invoked object is calling 
    it parent object for initialization.

    Solution:
    1. eliminate the dependency of object invocation.
    2. invoke the frameset object after frameset is create.

*/
