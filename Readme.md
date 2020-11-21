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
- phase 2: mutliple circle object, with radius as temporal property
    - create class of circle
    - move objectProperty into its own class
    - move frame component into objectProperty class, frames will be display of object's temporal properties
    - move designCanvas into objectProperty as view component of selected frames
- phase 3: add option of line, rectangle


---
**phase 2**
- [x] create a class of circle, with functionality
- create class of frameset and object designPane
  - frameset: time, object property, selectedFrame
  - behaviour: selectFrame, add frame, remove frame 
  - designPane: object Property, selected object
  - behaviour: edit object property
---

# Thoughts on React.js
- React.js is a framework to enforce modular programmimg either by OOP or functional
- Developers can create anything using html, css and js, so why facebook was interested in creating react?
- React.js abstracts DOM from developer and serves its own virtual DOM as ReactDOM
- It forces the developer to design a component around the functionalities rather than components.
- React.js enforces modular coding philosophy, provides abstraction layer on DOM, and on block of html elements with behaviour and styling as a component.
- Babel compiler helps in translating typescript or JSX code into JS code.

---

<!-- ## Problems
  -->