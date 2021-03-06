
class Circle {

    constructor(name, type, radius = 0){
        
        this.initial = {
            'name': name,
            'type': type,
            'radius': radius
        }

        this.temporal = [];
        this.addTemporalProperty(0, 0, 0, 0);
        this.addTemporalProperty(20, 20, 2, 1);
        this.temporalPropertySize = 1;
    }

    clone() {

        let clonedCircle = JSON.parse(JSON.stringify(this));
        return clonedCircle;
    }

    addTemporalProperty(posX, posY, time, temporalPropertyIndex = undefined) {
        // add after temporalPropertIndex
        if(temporalPropertyIndex === undefined)
            temporalPropertyIndex = this.temporalPropertySize;

        this.temporal.splice(temporalPropertyIndex, 0, {'posX': posX, 'posY': posY, 'time': time});
        this.temporalPropertySize += 1;
    }

    changeTemporalProperty(temporalPropertyIndex, newObject){

        this.temporal = Object.assign(this.temporal[temporalPropertyIndex], newObject);
    }

    removeTemporalProperty(temporalPropertyIndex) {

        this.temporal.splice(temporalPropertyIndex, 1);
        this.temporalPropertySize -= 1;
    }

    changeInitialProperty(newProperty) {

        this.initial = Object.assign(this.initial, newProperty);
    }

}

export {Circle};