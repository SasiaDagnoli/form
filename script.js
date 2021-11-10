//open/close checkbox dropdowns
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

//display next section
document.querySelector(".firststep").addEventListener("click", showSecond);

function showSecond() {
  document.querySelector("#first-form").classList.add("hidden");

  document.querySelector("#second-form").classList.remove("hidden");
  document.querySelector("#Layer_3").style.fill = "#C6F6BF";

  document.querySelector(".secondstep").addEventListener("click", showThird);
}

function showThird() {
  document.querySelector("#second-form").classList.add("hidden");

  document.querySelector("#third-form").classList.remove("hidden");
  document.querySelector("#Layer_5").style.fill = "#C6F6BF";

  document.querySelector(".done").addEventListener("click", beforePost);
}

loadSVG();

async function loadSVG() {
  let response = await fetch("processbar.svg");
  let mySvgData = await response.text();
  document.querySelector(".processbar").innerHTML = mySvgData;
}

function beforePost() {
  console.log("Before post");
  const form = document.querySelector("form");
  form.setAttribute("novalidate", true);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      const data = {
        firstname: form.elements.firstname.value,
        lastname: form.elements.lastname.value,
        gamertag: form.elements.gamertag.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        strengths: form.elements.strengths.value,
        typesofgames: form.elements.types.value,
        games: form.elements.games.value,
        skills: form.elements.improvements.value,
      };
      post(data);
    } else {
      form.reportValidity();
    }
  });
}

function post(data) {
  const postData = JSON.stringify(data);
  fetch("https://ezoneform-3ec4.restdb.io/rest/form", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "618bd2f5fc71545b0f5e067a",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  formDone();
}

function formDone() {
  document.querySelector("#third-form").classList.add("hidden");
  /* document.querySelector(".done-filling-out").classList.remove("hidden"); */
  document.querySelector(".header").innerHTML = "Thank you for signing up!";
  document.querySelector(".headerp").innerHTML =
    "We will now start personalizing your feed.";
  document.querySelector(".processbar").classList.add("hidden");
}
