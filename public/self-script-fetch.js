const domain = "https://79e9-93-136-227-146.ngrok-free.app";
const endpoint = "api/hello";

fetch(`${domain}/${endpoint}`)
  .then((r) => r.json())
  .then(console.log);
