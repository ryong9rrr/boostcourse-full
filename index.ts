import App from "./src/app";
import Store from "./src/store";

const store: Store = new Store();
const app: App = new App(store);

window.addEventListener("DOMContentLoaded", () => app.run());
