# fillFrame

**Make movie out of frames.**



# Use cases

- Insert frame, delete unwanted frame.
- Edit properties of object, ie, its location, colour, geometry etc.
- On clicking preview mode, users shall experience their own still-frames coming to life.


> Input from user:
postion of object, size of object, time



# Architecture

> user parameter ->   parser ->  engine argument <br>
input parameter ->  engine -> animation loop <br>
animation loop -> visualizer ->  display on canvas



# Project Milestones

- [x] phase 1: editing, visualizing single test object
- [x] phase 2: multiple circle object, with radius as temporal property
    - [x] create class of circle
    - [x] move objectProperty into its own class
    - [x] move frame component into objectProperty class, frames will be display of object's temporal properties
    - [x] move design Canvas into objectProperty as view component of selected frames
- phase 3: add option of line, rectangle
  - [x] Add other shapes
  - [x] refactor visualizer to draw different shapes
  - [ ] make hide/show functionality
  - [x] make delete/restore functionality
  - [x] save the selected object after each update
  - highlight the selected object on design canvas
  - select the object using mouse over design canvas


---
**phase 2**
- [x] create a class of circle, with functionality
- [x] create class of frameset and object designPane
  - [x] frameset: time, object property, selectedFrame
  - [x] behaviour: selectFrame, add frame, remove frame 
  - [x] designPane: object Property, selected object
  - [x] behaviour: edit object property
- [x] refactor visualize : 
  - [x] add for many objects drawing, 
  - [x] adjust frame for depicting multiple objects
---

# Thoughts on React.js
- React.js is a framework to enforce modular programmimg either by OOP or functional
- Developers can create anything using html, css and js, so why facebook was interested in creating react?
- React.js abstracts DOM from developer and serves its own virtual DOM as ReactDOM
- It forces the developer to design a component around the functionalities rather than components.
- React.js enforces modular coding philosophy, provides abstraction layer on DOM, and on block of html elements with behaviour and styling as a component.
- Babel compiler helps in translating typescript or JSX code into JS code.



<!-- ## Problems
  -->

# Specifications for phase 2:
- [x] Design Canvas shows selected frame
- [x] Design canvas helps in selection of object in object property window.
- [x] Frameset shows all temporal data
- [x] Add Frames after selected frame
- [x] remove selected frame
- [x] add circles in superObject using add object in menu
- [x] animate the preview
- [x] object property window displays all temporal property of selected frame
- [x] object Property window helps in editing the property of object
- [x] OOP pattern: separate object and component

# Specs for phase 3:
1. [ ] Add trapezium shape
     1. [ ] Add coordinates
     2. [ ] Remove coordinates
     3. [ ] Edit coordinates
2. [x] Add line
     1. [x] Add line class in geometry
     2. [x] make getShape function to delegate instatiation based on factory pattern
     3. [x] Make shape class as abstract class
     4. [x] Refactored circle class
3. [x] Add visualization for line
   1. [x] Refactor visualize function for drawing multiple shapes
   2. [x] Add function to visualize line
   3. [x] Added getInitialData in pathObject class to get shape type
4. [ ] Show the object/ hide the object across all frame
5. [x] Delete the object across all the frames
6. [ ] Add different path to choose from: linear, radial, exponential, logarithmic
7. [ ] Add rotation functionality by engine.



# Bugs
1. [x] Selected object reverts back to point the first object in Initial property container, on **updating Temporal property** and **changing frame count**.
2. Selected object reverts back to point the first object in Initial property container, on **addition of shapes**.
3. [x] Design pane **calling both** initial and temporal component, whereas temporal property component is strictly child of initial property component.
4. **Not showing alert** to user on window.
5. Temporal property container **falls behind** the design canvas on resizing of window.
6. [x] On deleting a lone object, initial Data Pane does not get updated.
7. On deletion of a lone object in presence of multiple frame, selected frame changes its value to unknown.(Needs to be debugged)