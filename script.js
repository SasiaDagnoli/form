const details = document.querySelectorAll("details");

function toggleOpen() {
  if (this.open) {
    return;
  }

  for (const detail of details) {
    if (detail.open) {
      detail.removeAttribute("open");
    }
  }
}

details.forEach((detail) => detail.addEventListener("click", toggleOpen));

loadSVG();

async function loadSVG() {
  let response = await fetch("processbar.svg");
  let mySvgData = await response.text();
  document.querySelector(".processbar").innerHTML = mySvgData;
  document
    .querySelector(".firststep")
    .addEventListener("click", startAnimating);
}

function startAnimating() {
  console.log("start animating");
  document.querySelector("#Layer_3").style.fill = "#C6F6BF";
}
