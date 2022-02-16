const $ = (selector) => document.querySelector(selector);

const store = {
  todos: [],
  doings: [],
  dones: [],
};

function getNextType(currentType) {
  const types = {
    ["todos"]: "doings",
    ["doings"]: "dones",
  };
  return types[currentType];
}

function getHTMLElementData($li) {
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

function makeTodosHtml() {
  const todosHtmlTemplate = store.todos
    .map((todo, index) => {
      return `
    <li data-todo-id="${index}"
    class="mb-3 border-4 border-solid border-stone-500 p-2 bg-yellow-200 shadow-md"
    >
    <span class="font-semibold">${todo}</span>
    <button
        class="btn-edit bg-gray-200 px-2 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500"
    >
        <i class="btn-edit fa-solid fa-pen"></i>
    </button>
    <button
        class="btn-next bg-gray-200 px-2 border-2 border-solid border-green-700 rounded-md hover:bg-green-500"
    >
        <i class="btn-next fa-solid fa-arrow-right"></i>
    </button>
    <button
        class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500"
        >
        <i class="btn-remove fa-solid fa-xmark"></i>
        </button>
    </li>
`;
    })
    .join("");
  return todosHtmlTemplate;
}

function makeDoingsHtml() {
  const doingsHtmlTemplate = store.doings
    .map((doing, index) => {
      return `
        <li data-doing-id="${index}"
        class="mb-3 border-4 border-solid border-stone-500 p-2 bg-green-300 shadow-md"
        >
        <span class="font-semibold">${doing}</span>
        <button
            class="btn-edit bg-gray-200 px-2 border-2 border-solid border-yellow-500 rounded-md hover:bg-yellow-500"
        >
            <i class="btn-edit fa-solid fa-pen"></i>
        </button>
        <button
            class="btn-next bg-gray-200 px-2 border-2 border-solid border-green-700 rounded-md hover:bg-green-500"
        >
            <i class="btn-next fa-solid fa-arrow-right"></i>
        </button>
        <button
            class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500"
            >
            <i class="btn-remove fa-solid fa-xmark"></i>
            </button>
        </li>
      `;
    })
    .join("");
  return doingsHtmlTemplate;
}

function makeDonesHtml() {
  const donesHtmlTemplate = store.dones
    .map((done, index) => {
      return `
        <li data-done-id="${index}"
            class="mb-3 border-4 border-solid border-stone-500 p-2 bg-pink-200 shadow-md"
        >
            <span class="font-semibold">${done}</span>
            <button
            class="btn-remove bg-gray-200 px-2 border-2 border-solid border-red-700 rounded-md hover:bg-red-500"
            >
            <i class="btn-remove fa-solid fa-xmark"></i>
            </button>
        </li>
      `;
    })
    .join("");
  return donesHtmlTemplate;
}

function render() {
  function renderCount() {
    $("#todo-count").innerHTML = `${store.todos.length} 개`;
    $("#doing-count").innerHTML = `${store.doings.length} 개`;
    $("#done-count").innerHTML = `${store.dones.length} 개`;
  }

  renderCount();
  $("#list-todos").innerHTML = makeTodosHtml();
  $("#list-doings").innerHTML = makeDoingsHtml();
  $("#list-dones").innerHTML = makeDonesHtml();
  return;
}

function editList($li) {
  const $span = $li.querySelector("span");
  const prevText = $span.textContent;
  const updatedText = prompt("할 일을 수정할까요?", prevText) || prevText;
  const { type, id } = getHTMLElementData($li);
  store[`${type}`][id] = updatedText;
  return render();
}

function moveList($li) {
  if (confirm("완료했나요?")) {
    const text = $li.querySelector("span").textContent;
    const { type, id } = getHTMLElementData($li);
    const nextType = getNextType(type);
    store[`${type}`].splice(id, 1);
    store[`${nextType}`].push(text);
    return render();
  }
  return;
}

function removeList($li) {
  if (confirm("삭제할까요?")) {
    const { type, id } = getHTMLElementData($li);
    store[`${type}`].splice(id, 1);
    return render();
  }
  return;
}

function listBtnsEventHandler(e) {
  const $li = e.target.closest("li");
  if (e.target.classList.contains("btn-edit")) editList($li);
  if (e.target.classList.contains("btn-next")) moveList($li);
  if (e.target.classList.contains("btn-remove")) removeList($li);
}

function addList() {
  const newTodo = $("#to-do-form-input").value;
  // 사용자 행동 예외처리
  if (newTodo === "") {
    return alert("할 일을 입력해 주세요.");
  }

  $("#to-do-form-input").value = "";
  store.todos.push(newTodo);
  return render();
}

function App() {
  $("#to-do-form").addEventListener("submit", (e) => e.preventDefault());

  $("#to-do-form-btn-add").addEventListener("click", addList);
  $("#to-do-form-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      return addList();
    }
  });

  $("#to-do-list").addEventListener("click", listBtnsEventHandler);
}

App();
