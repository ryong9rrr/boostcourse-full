import App from "./src/app";
import Store from "./src/store";

const store = new Store();
const app = new App(store);

window.addEventListener("DOMContentLoaded", () => app.run());
