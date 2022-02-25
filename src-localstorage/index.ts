import App from "./app";
import Store from "./store";

const store: Store = new Store();
const app: App = new App(store);

window.addEventListener("DOMContentLoaded", () => app.run());
