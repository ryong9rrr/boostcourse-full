/*
로컬 스토리지를 사용하는 로직
import App from "./src-localstorage/app";
import Store from "./src-localstorage/store";
*/

const store: Store = new Store();
const app: App = new App(store);

window.addEventListener("DOMContentLoaded", () => app.run());
