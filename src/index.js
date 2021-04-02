import _ from "lodash";
console.log("lodash", _)

import printMe from "./print.js";
import "./index.css";
// import "./base.scss"

import Icon from "./assets/img/1.png";

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}

function component() {
  const element = document.createElement("div");
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  printMe();

  console.log("><><><><>")

  return element;
}

document.body.appendChild(component());
