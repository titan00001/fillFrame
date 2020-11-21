function visualize(canvasId, initialProperty, temporalProperty) {

    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.beginPath();

    ctx.arc(temporalProperty['posX'], temporalProperty['posY'],
    initialProperty['radius'], 0, Math.PI * 2);

    ctx.stroke();
    ctx.closePath();

}



function animate(initialState, currentState, startTime, endTime, timeInterval, callback) {

    let time = startTime;

    for(let prop in currentState) {

        if(typeof currentState[prop] === 'function'){

            let property = prop.substring(4);
            // console.log(currentState);
            currentState[property] = currentState[prop](time);
        }

    }
    // console.log(time, currentState.posX)
    visualize('preview', initialState, currentState);

    if(time < endTime) {

        window.requestAnimationFrame(() => {
            animate(initialState, currentState, time + timeInterval, endTime, timeInterval, callback);
        });
    }

    else {
        // console.log("hello");
        // return new Promise(() => { 
        //         console.log("ok");
        //         callback();
        //     }, () => {console.log("not ok")
        // });
        // console.log(time, currentState);
        return callback();
         
    }

    // console.log(time, currentState);
    // return new Promise((resolve, reject) => reject(time));
    // return time;

}

// complete function implementation
// do animation of canvas


// async function visualizeAnimation(data, i = 1) {


//         const timeInterval = 1/20;
//         // console.log(data.temporal[i-1]['time'], data.temporal[i]['time']);

//         await animate(data.initial, data.temporal[i-1], data.temporal[i-1].time, data.temporal[i].time, timeInterval)
            
//         .then(() => { 
//             console.log("ye", + i); 
//             i++;
            
//             if(i < data.temporal.length){
//                 visualizeAnimation(data, i);
//             }

//             else
//                 console.log("ok done");
            
//             }).catch(() => {
//                 console.log("waiting");
//         });     

//     return;
// }

async function visualizeAnimation(data, i = 1) {

    const timeInterval = 1/20;

    console.log(data.temporal[i-1]);

    animate(data.initial, data.temporal[i-1], data.temporal[i-1].time, data.temporal[i].time, timeInterval, () => {
        // console.log(`${i} done`);
        i++;
        if(i < data.temporal.length) {
            
            visualizeAnimation(data, i);
        }

        else
            console.log("done");
    }) 
    
    return;
    // animate(data.initial, data.temporal[i-1], data.temporal[i-1].time, data.temporal[i].time, timeInterval);

}

export {visualize, visualizeAnimation};

// problem1 :
// while using time segment wise rendering two blocks were called at same instant
//  the motive was to call frame1 and
// associated path, then after it is completed, call frame2
// sol1: use promise failed, 
// sol2: use of callback passed

// problem2:
// object state is changed after clicking preview,
// pass the duplicate copy of data, preview might remain functional