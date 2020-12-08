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
  - Add other shapes
  - refactor visualizer to draw different shapes
  - make hide/show functionality
  - make delete/restore functionality
  - save the selected object after each update
  - highlight the selected object on design canvas
  - select the object using mouse over design canvas


---
**phase 2**
- [x] create a class of circle, with functionality
- create class of frameset and object designPane
  - [x] frameset: time, object property, selectedFrame
  - [x] behaviour: selectFrame, add frame, remove frame 
  - [x] designPane: object Property, selected object
  - [x] behaviour: edit object property
- refactor visualize : 
  - add for many objects drawing, 
  - adjust frame for depicting multiple objects
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
- OOP pattern: separate object and component

# Specs for phase 3:





# Bugs
1. Selected object reverts back to point the first object in Initial property container, on **updating Temporal property** and **changing frame count**.
2. Selected object reverts back to point the first object in Initial property container, on **addition of shapes**.
3. Design pane **calling both** initial and temporal component, whereas temporal property component is strictly child of initial property component.
4. **Not showing alert** to user on window.
5. Temporal property container **falls behind** the design canvas on resizing of window.