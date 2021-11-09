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
