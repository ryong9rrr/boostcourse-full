import { Template } from "../types";

export const todoTemplate: Template = (text, idx) => `
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
  </li>
`;

export const doingTemplate: Template = (text, idx) => `
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
  </li>
`;

export const doneTemplate: Template = (text, idx) => `
  <li data-done-id="${idx}" class="mb-3 border-4 border-solid border-stone-500 p-2 bg-pink-200 shadow-md">
    <span class="font-semibold">${text}</span>
    <button class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500">
      <i class="btn-remove fa-solid fa-xmark"></i>
    </button>
  </li>
`;
