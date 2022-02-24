// utils
const $ = (selector) => document.querySelector(selector);

//template
const todoTemplate = (text, id) => `
  <li data-todo-id="${id}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-yellow-200 shadow-md">
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

const doingTemplate = (text, id) => `
  <li data-doing-id="${id}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-green-300 shadow-md">
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

const doneTemplate = (text, id) => `
  <li data-done-id="${id}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-pink-200 shadow-md">
    <span class="font-semibold">${text}</span>
    <button class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500">
      <i class="btn-remove fa-solid fa-xmark"></i>
    </button>
  </li>
`;

const HTTP_METHOD = {
  POST(text) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
  },

  PUT(text = null) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
  },

  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

// api
class Api {
  constructor() {
    this.BASE_URL = "http://localhost:3000";
  }

  async getRequest(url, option) {
    try {
      const response = await fetch(url, option);
      if (!response.ok) {
        const message = "서버 요청에 에러가 발생했어요.";
        console.error(response);
        throw new Error(message);
      }
      return await response;
    } catch (e) {
      console.error(e);
      throw new Error(
        "현재 서버가 동작하고 있지 않거나 다른 문제가 있는 것 같아요."
      );
    }
  }

  async getItems() {
    const res = await this.getRequest(`${this.BASE_URL}/items`);
    return await res.json();
  }

  async createItem(text) {
    const res = await this.getRequest(
      `${this.BASE_URL}/items`,
      HTTP_METHOD.POST(text)
    );
    return await res.json();
  }

  async editItem(text, id) {
    const res = await this.getRequest(
      `${this.BASE_URL}/items/${id}`,
      HTTP_METHOD.PUT(text)
    );
    return await res.json();
  }

  async moveItem(category, id) {
    const res = await this.getRequest(
      `${this.BASE_URL}/items/${category}/${id}`,
      HTTP_METHOD.PUT()
    );
    return await res.json();
  }

  async deleteItem(category, id) {
    const res = await this.getRequest(
      `${this.BASE_URL}/items/${category}/${id}`,
      HTTP_METHOD.DELETE()
    );
    return await res;
  }
}

class App {
  constructor() {
    this.store = null;
    this.api = new Api();
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

  #setData(datas) {
    const store = {
      todos: [],
      doings: [],
      dones: [],
    };
    for (const item of datas) {
      const categ = item.category;
      if (categ === "todo") {
        store.todos.push(item);
      } else if (categ === "doing") {
        store.doings.push(item);
      } else if (categ === "done") {
        store.dones.push(item);
      }
    }
    return store;
  }

  // template: function, data: array
  #makeHtml(template, datas) {
    const html = datas.map((data) => template(data.text, data.id));
    return html.join("");
  }

  #getHTMLElementData($li) {
    const parseType = (dataset) => {
      const types = {
        ["todoId"]: "todo",
        ["doingId"]: "doing",
        ["doneId"]: "done",
      };
      return types[dataset];
    };
    const dataSet = Object.keys($li.dataset)[0];
    const type = parseType(dataSet);
    const id = $li.dataset[`${dataSet}`];
    return { type, id };
  }

  async #addList() {
    const newTodo = $("#to-do-form-input").value;
    if (newTodo === "") {
      return alert("할 일을 입력해 주세요.");
    }
    $("#to-do-form-input").value = "";
    await this.api.createItem(newTodo);
    return this.#render();
  }

  async #removeList($li) {
    const { type, id } = this.#getHTMLElementData($li);
    if (confirm("삭제할까요?")) {
      await this.api.deleteItem(type, id);
      return this.#render();
    }
    return;
  }

  async #moveList($li) {
    const { type, id } = this.#getHTMLElementData($li);
    if (confirm("완료했나요?")) {
      await this.api.moveItem(type, id);
      return this.#render();
    }
    return;
  }

  async #editList($li) {
    const $span = $li.querySelector("span");
    const prevText = $span.textContent;
    const updatedText = prompt("할 일을 수정할까요?", prevText) || prevText;
    const { _, id } = this.#getHTMLElementData($li);
    await this.api.editItem(updatedText, id);
    return this.#render();
  }

  #renderCount() {
    $("#todo-count").innerHTML = `${this.store.todos.length} 개`;
    $("#doing-count").innerHTML = `${this.store.doings.length} 개`;
    $("#done-count").innerHTML = `${this.store.dones.length} 개`;
  }

  async #render() {
    const fetchData = await this.api.getItems();
    this.store = this.#setData(fetchData);

    this.#renderCount();
    $("#list-todos").innerHTML = this.#makeHtml(todoTemplate, this.store.todos);
    $("#list-doings").innerHTML = this.#makeHtml(
      doingTemplate,
      this.store.doings
    );
    $("#list-dones").innerHTML = this.#makeHtml(doneTemplate, this.store.dones);
  }

  async run() {
    try {
      if (!this.store) {
        const fetchData = await this.api.getItems();
        this.store = this.#setData(fetchData);
      }
      this.#initEventListener();
      this.#render();
    } catch (e) {
      console.error(e);
      return alert(e.message);
    }
  }
}

const app = new App();
app.run();
