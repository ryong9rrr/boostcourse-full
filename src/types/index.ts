export type Template = (string, number) => string;

export type DOMSelector = (string) => HTMLElement;

export type TypeIds = "todoId" | "doingId" | "doneId";
export type PrevTypes = "todos" | "doings";
export type NextTypes = "doings" | "dones";
export type Types = "todos" | "doings" | "dones";

export type Items = {
  todos: string[];
  doings: string[];
  dones: string[];
};

export type ItemStore = {
  items: Items;
  todos: string[];
  doings: string[];
  dones: string[];
  todosLength: number;
  doingsLength: number;
  donesLength: number;
  addItem: (newItem: string) => void;
  removeItem: (type: Types, targetId: number) => void;
  moveItem: (type: PrevTypes, targetId: number, text: string) => void;
  editItem: (type: Types, targetId: number, updatedText: string) => void;
  setLocalStorage: () => void;
  getLocalStorage: () => string;
};
