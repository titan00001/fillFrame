// import {data} from '../testData/engineTest.js'
import { getPath } from './engine.js';
import {Circle} from './geometry.js'
import {visualize, visualizeAnimation} from './visualiser.js';
// for testing purpose


var data = new Circle('Circle1', 'circle', 40);
var selectedFrame = 0;

const shapeButton = document.querySelector("#addShape");

shapeButton.addEventListener('click', () => {
    console.log("Circle");
    // make circle object here
});

const addFrameBtn = document.querySelector("#addFrame");
addFrameBtn.addEventListener('click', addTemporalProperty);

const previewBtn = document.querySelector("#getPreview");
previewBtn.addEventListener('click', () => { 

    // returns cloned data from the engine
    
    let clonedData = data.clone();
    const temporalData = getPath(clonedData.temporal);
    clonedData.temporal = temporalData;
    

    // console.log(data);
    console.log(clonedData);

    visualizeAnimation(clonedData);
})


// object properties
// show permanent properties

function showInitialData() {

    const initialPropertyContainer = document.querySelector('#initial');

    for (let element in data.initial) {
        // console.log(element, data.initial[element]);
        objectProperty(element, data.initial[element], initialPropertyContainer);
    }
}

// show temporal properties

function showTemporalData(currentFrame) {

    const temporalPropertyContainer = document.querySelector('#temporal');
    
    // remove all child
    while(temporalPropertyContainer.firstChild){
        temporalPropertyContainer.removeChild(temporalPropertyContainer.firstChild);
    }

    // add updated element
    for (let element in data.temporal[currentFrame]) {
        // console.log(element, data.initial[element]);
        objectProperty(element, data.temporal[currentFrame][element], temporalPropertyContainer);
    }
}

// initialization
showInitialData();
showTemporalData(selectedFrame);

data.temporal.forEach((element, pos) => {
    // console.log(element, pos);
    makeFrame(element, pos);
    visualize(pos, data.initial, data.temporal[pos])
});

displayOnDesignCanvas(selectedFrame);


// preview
function addTemporalProperty() {
    
    const size = data.temporal.length;
    const lastTemporalProperty = Object.assign({}, data.temporal[size-1]);
    data.temporal.push(lastTemporalProperty);
    // data.addTemporalProperty();

    makeFrame(lastTemporalProperty, size);
    visualize(size, data.initial, lastTemporalProperty);
}


function makeFrame(properties, id) {

    const frame = document.createElement('canvas');
    frame.setAttribute('class', 'frame');
    frame.setAttribute('id', id);

    frame.addEventListener('click', (e) => {
        selectFrame(e.target.id);
        // console.log(e.target.id);
        
    });

    document.querySelector("#frameset").appendChild(frame);

}

function objectProperty(name, value, parentNode) {

    const container = document.createElement('div');
    container.setAttribute('class', 'property-item');
    container.setAttribute('div', name);

    const label = document.createElement('label');
    label.textContent = name;

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = value;

    input.addEventListener('keypress', (e) => {
        // console.log(input.value, e.key, name, parentNode.id);
        changePropertyValue(data[parentNode.id][selectedFrame], name, input.value + e.key);
        displayOnDesignCanvas(selectedFrame);
        visualize(selectedFrame, data.initial, data.temporal[selectedFrame]);
    })

    container.appendChild(label);
    container.appendChild(input);

    parentNode.appendChild(container);

} 

function changePropertyValue(collection, key, value) {
    collection[key] = Number(value);
    console.log(collection);
}


function selectFrame(id) {
    
    selectedFrame = id;
    console.log(selectedFrame);
    showTemporalData(id);
    displayOnDesignCanvas(id);
}


function displayOnDesignCanvas(currentFrameId) {
    // visualize(currentFrameId, data.initial, data.temporal[currentFrameId]);
    visualize("design-canvas", data.initial, data.temporal[currentFrameId]);
}

// problem : on changing temporal data, 
// effect of preview : next frame would not show object transition
// debug statement: on changing temporal data, the new value was updated to be object property as string
// solution: typecast value of object property to integer(Number)

// to do:
// 1. reflect selcted canvas on frameset
// 2. add or remove canvas by pressing right click on canvas
// 3. add circle class with clone method
// 4. keep radius as temporal property.

// 5. add multiple object
// 6. mouse selection of object