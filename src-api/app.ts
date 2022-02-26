import Api from "./core/api";
import { doingTemplate, doneTemplate, todoTemplate } from "./templates";
import { Category, Store, Template, Work } from "./types";
import { $ } from "./utils";

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

  private getHTMLElementData<T>($li: HTMLElement): { type: T; id: string } {
    const parseType = (dataset: "todoId" | "doingId" | "doneId"): string => {
      if (
        !(dataset === "todoId" || dataset === "doingId" || dataset === "doneId")
      ) {
        throw new Error("리스트의 데이터셋이 올바르지 않아요.");
      }

      const types: { [key: string]: Category } = {
        ["todoId"]: "todo",
        ["doingId"]: "doing",
        ["doneId"]: "done",
      };
      return types[dataset];
    };
    const dataSet = Object.keys($li.dataset)[0];
    const type = parseType(
      dataSet as "todoId" | "doingId" | "doneId"
    ) as unknown as T;
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
    const { type, id } = this.getHTMLElementData<"todo" | "doing" | "done">(
      $li
    );
    if (confirm("삭제할까요?")) {
      await this.api.deleteItem(type, id);
      return this.render();
    }
    return;
  }

  private async moveList($li: HTMLElement) {
    const { type, id } = this.getHTMLElementData<"todo" | "doing">($li);
    if (confirm("완료했나요?")) {
      await this.api.moveItem<"todo" | "doing">(type, id);
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

export default App;
