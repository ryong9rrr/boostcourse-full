// utils
const $ = (selector) => document.querySelector(selector);

//template

const todoTemplate = (text, idx) => `
  <li data-todo-id="${idx}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-yellow-200 shadow-md">
    <span class="font-semibold">${text}</span>
    <button class="btn-edit bg-gray-200 px-2 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500">
      <i class="btn-edit fa-solid fa-pen"></i>
    </button>
    <button class="btn-next bg-gray-200 px-2 border-2 border-solid border-green-700 rounded-md hover:bg-green-500">
      <i class="btn-next fa-solid fa-arrow-right"></i>
    </button>
    <button class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500">
      <i class="btn-remove fa-solid fa-xmark"></i>
    </button>
  </li>`;

const doingTemplate = (text, idx) => `
  <li data-doing-id="${idx}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-green-300 shadow-md">
    <span class="font-semibold">${text}</span>
    <button class="btn-edit bg-gray-200 px-2 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500">
      <i class="btn-edit fa-solid fa-pen"></i>
    </button>
    <button class="btn-next bg-gray-200 px-2 border-2 border-solid border-green-700 rounded-md hover:bg-green-500">
      <i class="btn-next fa-solid fa-arrow-right"></i>
    </button>
    <button class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500">
      <i class="btn-remove fa-solid fa-xmark"></i>
    </button>
  </li>`;

const doneTemplate = (text, idx) => `
  <li data-done-id="${idx}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-pink-200 shadow-md">
    <span class="font-semibold">${text}</span>
    <button class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500">
      <i class="btn-remove fa-solid fa-xmark"></i>
    </button>
  </li>
`;

class Store {
  #items;
  constructor() {
    this.#items = {
      todos: [],
      doings: [],
      dones: [],
    };
    const prevData = this.getLocalStorage();
    if (prevData) {
      for (const key in prevData) {
        prevData[key].forEach((v) => this.#items[key].push(v));
      }
    }
  }

  #getNextType(currentType) {
    const types = {
      ["todos"]: "doings",
      ["doings"]: "dones",
    };
    return types[currentType];
  }

  get items() {
    return this.#items;
  }

  get todos() {
    return this.#items.todos;
  }

  get doings() {
    return this.#items.doings;
  }

  get dones() {
    return this.#items.dones;
  }

  get todosLength() {
    return this.#items.todos.length;
  }

  get doingsLength() {
    return this.#items.doings.length;
  }

  get donesLength() {
    return this.#items.dones.length;
  }

  addItem(newItem) {
    this.#items.todos.push(newItem);
  }

  removeItem(type, targetId) {
    this.#items[`${type}`].splice(targetId, 1);
  }

  moveItem(type, targetId, text) {
    this.#items[`${type}`].splice(targetId, 1);
    this.#items[`${this.#getNextType(type)}`].push(text);
  }

  editItem(type, targetId, updatedText) {
    this.#items[`${type}`][targetId] = updatedText;
  }

  setLocalStorage() {
    localStorage.setItem("data", JSON.stringify(this.#items));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem("data"));
  }
}

class App {
  constructor(store) {
    this.store = store;
  }

  #listBtnsEventHandler(e) {
    const $li = e.target.closest("li");
    if (e.target.classList.contains("btn-edit")) this.#editList($li);
    if (e.target.classList.contains("btn-next")) this.#moveList($li);
    if (e.target.classList.contains("btn-remove")) this.#removeList($li);
  }

  #initEventListener() {
    $("#to-do-form").addEventListener("submit", (e) => e.preventDefault());

    $("#to-do-form-btn-add").addEventListener(
      "click",
      this.#addList.bind(this)
    );
    $("#to-do-form-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        return this.#addList();
      }
    });

    $("#to-do-list").addEventListener(
      "click",
      this.#listBtnsEventHandler.bind(this)
    );
  }

  // template: function, data: array
  #makeHtml(template, data) {
    const html = data.map(template);
    return html.join("");
  }

  #getHTMLElementData($li) {
    const parseType = (dataset) => {
      const types = {
        ["todoId"]: "todos",
        ["doingId"]: "doings",
        ["doneId"]: "dones",
      };
      return types[dataset];
    };
    const dataSet = Object.keys($li.dataset)[0];
    const type = parseType(dataSet);
    const id = Number($li.dataset[`${dataSet}`]);
    return { type, id };
  }

  #addList() {
    const newTodo = $("#to-do-form-input").value;
    // 사용자 행동 예외처리
    if (newTodo === "") {
      return alert("할 일을 입력해 주세요.");
    }

    $("#to-do-form-input").value = "";
    this.store.addItem(newTodo);
    return this.#render();
  }

  #removeList($li) {
    if (confirm("삭제할까요?")) {
      const { type, id } = this.#getHTMLElementData($li);
      this.store.removeItem(type, id);
      return this.#render();
    }
    return;
  }

  #moveList($li) {
    if (confirm("완료했나요?")) {
      const text = $li.querySelector("span").textContent;
      const { type, id } = this.#getHTMLElementData($li);
      this.store.moveItem(type, id, text);
      return this.#render();
    }
    return;
  }

  #editList($li) {
    const $span = $li.querySelector("span");
    const prevText = $span.textContent;
    const updatedText = prompt("할 일을 수정할까요?", prevText) || prevText;
    const { type, id } = this.#getHTMLElementData($li);
    this.store.editItem(type, id, updatedText);
    return this.#render();
  }

  #renderCount() {
    $("#todo-count").innerHTML = `${this.store.todosLength} 개`;
    $("#doing-count").innerHTML = `${this.store.doingsLength} 개`;
    $("#done-count").innerHTML = `${this.store.donesLength} 개`;
  }

  #render() {
    this.store.setLocalStorage();
    this.#renderCount();
    $("#list-todos").innerHTML = this.#makeHtml(todoTemplate, this.store.todos);
    $("#list-doings").innerHTML = this.#makeHtml(
      doingTemplate,
      this.store.doings
    );
    $("#list-dones").innerHTML = this.#makeHtml(doneTemplate, this.store.dones);
  }

  run() {
    this.#initEventListener();
    this.#render();
  }
}

const store = new Store();
const app = new App(store);
app.run();
