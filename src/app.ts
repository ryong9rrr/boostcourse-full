import { $ } from "./utils/dom";
import { todoTemplate, doingTemplate, doneTemplate } from "./template";
import Store from "./store";
import { TypeIds, Types } from "./types";

export default class App {
  private store: Store;

  constructor(store) {
    this.store = store;
  }

  private initEventListener(): void {
    $("#to-do-form").addEventListener("submit", (e) => e.preventDefault());

    $("#to-do-form-btn-add").addEventListener("click", this.addList.bind(this));
    $("#to-do-form-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        return this.addList();
      }
    });

    $("#to-do-list").addEventListener(
      "click",
      this.listBtnsEventHandler.bind(this)
    );
  }

  private listBtnsEventHandler(e: Event): void {
    const $li: HTMLElement = e.target.closest("li");
    if (e.target.classList.contains("btn-edit")) this.editList($li);
    if (e.target.classList.contains("btn-next")) this.moveList($li);
    if (e.target.classList.contains("btn-remove")) this.removeList($li);
  }

  private makeHtml(
    template: (string, number) => string,
    data: string[]
  ): string {
    const html: string[] = data.map(template);
    return html.join("");
  }

  private getHTMLElementData($li: HTMLElement): { type: Types; id: number } {
    const parseType = (dataset: TypeIds): Types => {
      const types = {
        ["todoId"]: "todos",
        ["doingId"]: "doings",
        ["doneId"]: "dones",
      };
      return types[dataset];
    };
    const dataSet: TypeIds = Object.keys($li.dataset)[0];
    const type: Types = parseType(dataSet);
    const id: number = Number($li.dataset[`${dataSet}`]);
    return { type, id };
  }

  private addList(): void {
    const newTodo: string = $("#to-do-form-input").value;
    // 사용자 행동 예외처리
    if (newTodo === "") {
      return alert("할 일을 입력해 주세요.");
    }

    $("#to-do-form-input").value = "";
    this.store.addItem(newTodo);
    return this.render();
  }

  removeList($li: HTMLElement): void {
    if (confirm("삭제할까요?")) {
      const { type, id } = this.getHTMLElementData($li);
      this.store.removeItem(type, id);
      return this.render();
    }
    return;
  }

  moveList($li: HTMLElement): void {
    if (confirm("완료했나요?")) {
      const text: string = $li.querySelector("span").textContent;
      const { type, id } = this.getHTMLElementData($li);
      this.store.moveItem(type, id, text);
      return this.render();
    }
    return;
  }

  editList($li: HTMLElement): void {
    const $span: HTMLElement = $li.querySelector("span");
    const prevText: string = $span.textContent;
    const updatedText: string =
      prompt("할 일을 수정할까요?", prevText) || prevText;
    const { type, id } = this.getHTMLElementData($li);
    this.store.editItem(type, id, updatedText);
    return this.render();
  }

  renderCount(): void {
    $("#todo-count").innerHTML = `${this.store.todosLength} 개`;
    $("#doing-count").innerHTML = `${this.store.doingsLength} 개`;
    $("#done-count").innerHTML = `${this.store.donesLength} 개`;
  }

  render(): void {
    this.store.setLocalStorage();
    this.renderCount();
    $("#list-todos").innerHTML = this.makeHtml(todoTemplate, this.store.todos);
    $("#list-doings").innerHTML = this.makeHtml(
      doingTemplate,
      this.store.doings
    );
    $("#list-dones").innerHTML = this.makeHtml(doneTemplate, this.store.dones);
  }

  run(): void {
    this.initEventListener();
    this.render();
  }
}
