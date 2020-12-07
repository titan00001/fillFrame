function visualize(canvasId, initialProperty, temporalProperty, redraw = true) {
  var c = document.getElementById(canvasId);
  var ctx = c.getContext("2d");

  if (redraw) ctx.clearRect(0, 0, c.width, c.height);

  ctx.beginPath();

  ctx.arc(
    temporalProperty["posX"],
    temporalProperty["posY"],
    temporalProperty["radius"],
    0,
    Math.PI * 2
  );

  ctx.stroke();
  ctx.closePath();
}

function visualizeMulti(canvasId, initialPropertyArray, temporalPropertyArray) {
  var c = document.getElementById(canvasId);
  var ctx = c.getContext("2d");

  ctx.clearRect(0, 0, c.width, c.height);

  temporalPropertyArray.forEach((temporalProperty, index) => {
    ctx.beginPath();

    ctx.arc(
      temporalProperty["posX"],
      temporalProperty["posY"],
      temporalProperty["radius"],
      0,
      Math.PI * 2
    );

    ctx.stroke();
    ctx.closePath();
  });

  return c;
}

function animate(
  initialState,
  currentStateArray,
  startTime,
  endTime,
  timeInterval,
  callback
) {
  let time = startTime;

  for(let currentState of currentStateArray) {
    for (let prop in currentState) {
      if (typeof currentState[prop] === "function") {
        let property = prop.substring(4);
        // console.log(currentState);
        currentState[property] = currentState[prop](time);
      }
    }
  }
  // console.log(time, currentStateArray);
  // visualize("preview", initialState, currentState);
  visualizeMulti("preview", initialState, currentStateArray);

  if (time < endTime) {
    window.requestAnimationFrame(() => {
      animate(
        initialState,
        currentStateArray,
        time + timeInterval,
        endTime,
        timeInterval,
        callback
      );
    });
  } else {
    // console.log(time, currentState);
    return callback();
  }

  // console.log(time, currentState);
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
  const timeInterval = 1 / 20;

  // console.log(data.initial,
  //   data.getTemporalArrayById(i-1),
  //   data.getTimeById(i - 1),
  //   data.getTimeById(i));

  animate(
    data.initial,
    data.getTemporalArrayById(i-1),
    data.getTimeById(i - 1),
    data.getTimeById(i),
    timeInterval,
    () => {
      // console.log(`${i} done`);
      i++;
      if (i < data.getTemporalLength()) {
        visualizeAnimation(data, i);
      } else console.log("done");
    }
  );

  return;
  // animate(data.initial, data.temporal[i-1], data.temporal[i-1].time, data.temporal[i].time, timeInterval);
}

export { visualize, visualizeAnimation, visualizeMulti };

// problem1 :
// while using time segment wise rendering two blocks were called at same instant
//  the motive was to call frame1 and
// associated path, then after it is completed, call frame2
// sol1: use promise failed,
// sol2: use of callback passed

// problem2:
// object state is changed after clicking preview,
// pass the duplicate copy of data, preview might remain functional
