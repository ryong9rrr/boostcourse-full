// utils
const $ = (selector: string): HTMLElement => {
  const htmlElement = document.querySelector(selector);
  if (!htmlElement) {
    throw new Error("해당하는 컴포넌트를 찾을 수 없어요.");
  }
  return htmlElement as HTMLElement;
};

type Work = {
  readonly id: string;
  readonly category: "todo" | "doing" | "done";
  readonly text: string;
  readonly createdAt: number;
  readonly updatedAt: number;
};

type Template = (data: Work) => string;

//template
const todoTemplate: Template = (data: Work): string => `
  <li data-todo-id="${data.id}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-yellow-200 shadow-md">
    <span class="font-semibold">${data.text}</span>
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

const doingTemplate: Template = (data: Work): string => `
  <li data-doing-id="${data.id}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-green-300 shadow-md">
    <span class="font-semibold">${data.text}</span>
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

const doneTemplate: Template = (data: Work): string => `
  <li data-done-id="${data.id}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-pink-200 shadow-md">
    <span class="font-semibold">${data.text}</span>
    <button class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500">
      <i class="btn-remove fa-solid fa-xmark"></i>
    </button>
  </li>
`;

type HTTP_REQUEST_HEADERS = {
  [key: string]: string;
};

type HTTP_REQUEST = {
  readonly method: "POST" | "PUT" | "DELETE";
  readonly headers?: HTTP_REQUEST_HEADERS;
  readonly body?: string;
};

const HTTP_METHOD = {
  POST(text: string): HTTP_REQUEST {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
  },

  PUT(text: string | null = null): HTTP_REQUEST {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
  },

  DELETE(): HTTP_REQUEST {
    return {
      method: "DELETE",
    };
  },
};

// api
class Api {
  private BASE_URL: string;

  constructor() {
    this.BASE_URL = "http://localhost:3000";
  }

  protected async getRequest<AjaxResponse>(
    url: string,
    option?: HTTP_REQUEST
  ): Promise<AjaxResponse> {
    try {
      const response = await fetch(url, option);
      if (!response.ok) {
        const message = "서버 요청에 에러가 발생했어요.";
        console.error(response);
        throw new Error(message);
      }
      return (await response.json()) as AjaxResponse;
    } catch (e) {
      console.error(e);
      throw new Error(
        "현재 서버가 동작하고 있지 않거나 다른 문제가 있는 것 같아요."
      );
    }
  }

  async getItems(): Promise<Work[]> {
    const res = await this.getRequest<Work[]>(`${this.BASE_URL}/items`);
    return await res;
  }

  async createItem(text: string): Promise<Work> {
    const res = await this.getRequest<Work>(
      `${this.BASE_URL}/items`,
      HTTP_METHOD.POST(text)
    );
    return await res;
  }

  async editItem(text: string, id: string): Promise<Work> {
    const res = await this.getRequest<Work>(
      `${this.BASE_URL}/items/${id}`,
      HTTP_METHOD.PUT(text)
    );
    return await res;
  }

  async moveItem(category: "todo" | "doing", id: string): Promise<Work> {
    const res = await this.getRequest<Work>(
      `${this.BASE_URL}/items/${category}/${id}`,
      HTTP_METHOD.PUT()
    );
    return await res;
  }

  async deleteItem(
    category: "todo" | "doing" | "done",
    id: string
  ): Promise<void> {
    await this.getRequest<Work>(
      `${this.BASE_URL}/items/${category}/${id}`,
      HTTP_METHOD.DELETE()
    );
  }
}

type Store = {
  todos: Work[];
  doings: Work[];
  dones: Work[];
};

class App {
  private store: null | Store;
  private api: Api;
  constructor() {
    this.store = null;
    this.api = new Api();
  }

  private listBtnsEventHandler(e: any) {
    const $li = e.target.closest("li");
    if (e.target.classList.contains("btn-edit")) this.editList($li);
    if (e.target.classList.contains("btn-next")) this.moveList($li);
    if (e.target.classList.contains("btn-remove")) this.removeList($li);
  }

  private initEventListener() {
    $("#to-do-form").addEventListener("submit", (e: any) => e.preventDefault());

    $("#to-do-form-btn-add").addEventListener("click", this.addList.bind(this));
    $("#to-do-form-input").addEventListener("keydown", (e: any) => {
      if (e.key === "Enter") {
        return this.addList();
      }
    });

    $("#to-do-list").addEventListener(
      "click",
      this.listBtnsEventHandler.bind(this)
    );
  }

  private setData(datas: Work[]): Store {
    const store: Store = {
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
      } else {
        throw new Error("잘못된 이름의 카테고리가 있어요!");
      }
    }
    return store;
  }

  // template: function, data: array
  private makeHtml(template: Template, datas: Work[]): string {
    const htmlList = datas.map((data) => template(data));
    return htmlList.join("");
  }

  private getHTMLElementData($li: HTMLElement) {
    const parseType = (dataset) => {
      if (
        !(dataset === "todoId" || dataset === "doingId" || dataset === "doneId")
      ) {
        throw new Error("리스트의 데이터셋이 올바르지 않아요.");
      }
      const types = {
        ["todoId"]: "todo",
        ["doingId"]: "doing",
        ["doneId"]: "done",
      };
      return types[dataset];
    };
    const dataSet = Object.keys($li.dataset)[0];
    const type = parseType(dataSet);
    const id = $li.dataset[`${dataSet}`] as string;
    return { type, id };
  }

  private async addList() {
    const newTodo = (<HTMLInputElement>$("#to-do-form-input")).value;
    if (newTodo === "") {
      return alert("할 일을 입력해 주세요.");
    }
    (<HTMLInputElement>$("#to-do-form-input")).value = "";
    await this.api.createItem(newTodo);
    return this.render();
  }

  private async removeList($li: HTMLElement) {
    const { type, id } = this.getHTMLElementData($li);
    if (confirm("삭제할까요?")) {
      await this.api.deleteItem(type, id);
      return this.render();
    }
    return;
  }

  private async moveList($li: HTMLElement) {
    const { type, id } = this.getHTMLElementData($li);
    if (confirm("완료했나요?")) {
      await this.api.moveItem(type, id);
      return this.render();
    }
    return;
  }

  private async editList($li: HTMLElement) {
    const $span: HTMLElement | null = $li.querySelector("span");
    if (!$span) {
      throw new Error("리스트에 span 태그가 없어요.");
    }
    const prevText = $span.textContent;
    if (!prevText) {
      throw new Error("textContent 속성을 찾지 못했어요.");
    }
    const updatedText = prompt("할 일을 수정할까요?", prevText) || prevText;
    const { type, id } = this.getHTMLElementData($li);
    await this.api.editItem(updatedText, id);
    return this.render();
  }

  private renderCount() {
    if (!this.store) {
      throw new Error("store를 구성하는 로직에 문제가 있어요.");
    }
    $("#todo-count").innerHTML = `${this.store.todos.length} 개`;
    $("#doing-count").innerHTML = `${this.store.doings.length} 개`;
    $("#done-count").innerHTML = `${this.store.dones.length} 개`;
  }

  private async render() {
    const fetchData = await this.api.getItems();
    this.store = this.setData(fetchData);

    this.renderCount();
    $("#list-todos").innerHTML = this.makeHtml(todoTemplate, this.store.todos);
    $("#list-doings").innerHTML = this.makeHtml(
      doingTemplate,
      this.store.doings
    );
    $("#list-dones").innerHTML = this.makeHtml(doneTemplate, this.store.dones);
  }

  async run() {
    try {
      if (!this.store) {
        const fetchData = await this.api.getItems();
        this.store = this.setData(fetchData);
      }
      this.initEventListener();
      this.render();
    } catch (e) {
      console.error(e);
      return alert((<Error>e).message);
    }
  }
}

const app = new App();
app.run();
