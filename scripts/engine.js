// import {data} from "../testData/engineTest.js";

// makes path for smoother transitioning of temporal state
function singlePropertyTransition(initial, final, property) {

    // initial, final -> data[temporal]['stateN']['desired property']
    
    let x1 = initial[property], x2 = final[property], t1 = initial['time'], t2 = final['time'];

    // return { 
    //     path : (t) => { return (x1 + ((x1 - x2) / (t1 - t2)) * t); }
    // };

    return (t) => { return (x1 + ((x1 - x2) / (t1 - t2)) * (t - t1)); }
    

}


function nPropertyTransition(initial, final){

    for(let key in initial) {

        if(key === 'time') continue;

        initial['path' + key] = singlePropertyTransition(initial, final, key);
 
    }

    return initial;

}

function getPath(temporalPropertyArray) {

    
    const size = temporalPropertyArray.length;

    for(let i = 1; i < size; i++) {
        
        temporalPropertyArray[i-1] = nPropertyTransition(temporalPropertyArray[i-1], temporalPropertyArray[i]);

    }

    return temporalPropertyArray;

}

export {getPath};

// console.log(getPath(data.temporal)[0]['pathposX'](1))

// const makeXpath = (t) => { return makePath(data['temporal'][0], data['temporal'][1], 'posX') }

// const makeYpath = (t) => { return makePath(data['temporal'][0], data['temporal'][1], 'posY') }


// to run a function from other function

// test env:

// const canvas = document.getElementById('design-board');

// var ctx = canvas.getContext('2d');


// ctx.fillStyle = "#F1F1F1";
// ctx.fillRect(0, 0, 150, 75);
