const $ = (selector) => document.querySelector(selector);

const store = {
  todos: [],
  doings: [],
  dones: [],
};

function render() {
  function renderCount() {
    $("#todo-count").innerHTML = `${store.todos.length} 개`;
    $("#doing-count").innerHTML = `${store.doings.length} 개`;
    $("#done-count").innerHTML = `${store.dones.length} 개`;
  }

  const todosHtml = store.todos
    .map((todo, index) => {
      const template = `
        <li data-todo-id="${index}"
        class="mb-3 border-4 border-solid border-stone-500 p-2 bg-green-300 shadow-md"
        >
        <span class="font-semibold">${todo}</span>
        <button
            class="btn-edit bg-gray-200 px-2 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500"
        >
            <i class="fa-solid fa-pen"></i>
        </button>
        <button
            class="btn-next bg-gray-200 px-2 border-2 border-solid border-green-700 rounded-md hover:bg-green-500"
        >
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button
            class="btn-next bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500"
            >
            <i class="fa-solid fa-xmark"></i>
            </button>
        </li>
      `;
      return template;
    })
    .join("");

  const doingsHtml = store.doings
    .map((doing, index) => {
      const template = `
        <li data-doing-id="${index}"
        class="mb-3 border-4 border-solid border-stone-500 p-2 bg-green-300 shadow-md"
        >
        <span class="font-semibold">${doing}</span>
        <button
            class="btn-edit bg-gray-200 px-2 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500"
        >
            <i class="fa-solid fa-pen"></i>
        </button>
        <button
            class="btn-next bg-gray-200 px-2 border-2 border-solid border-green-700 rounded-md hover:bg-green-500"
        >
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button
            class="btn-next bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500"
            >
            <i class="fa-solid fa-xmark"></i>
            </button>
        </li>
      `;
      return template;
    })
    .join("");

  const donesHtml = store.dones
    .map((done, index) => {
      const template = `
        <li data-done-id="${index}"
            class="mb-3 border-4 border-solid border-stone-500 p-2 bg-blue-300 shadow-md"
        >
            <span class="font-semibold">${done}</span>
            <button
            class="btn-next bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500"
            >
            <i class="fa-solid fa-xmark"></i>
            </button>
        </li>
      `;
      return template;
    })
    .join("");

  renderCount();
  $("#list-todo").innerHTML = todosHtml;
  $("#list-doing").innerHTML = doingsHtml;
  $("#list-done").innerHTML = donesHtml;
}

function addList(e) {
  const newTodo = $("#form-input").value;
  $("#form-input").value = "";

  store.todos.push(newTodo);
  render();
}

$("#form-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    return addList(e);
  }
});
