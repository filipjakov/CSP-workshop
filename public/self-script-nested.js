console.log("I am a script that loads additional script");

const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js";

document.querySelector("body").appendChild(script);
