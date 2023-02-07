import { cube } from "./math.js";

function createComp() {
  const ele = document.createElement("div");
  ele.innerHTML = ["Hello World", "5 cubed is equaled to :", cube(5)].join(
    "\n\n"
  );
  return ele;
}

document.body.appendChild(createComp());
