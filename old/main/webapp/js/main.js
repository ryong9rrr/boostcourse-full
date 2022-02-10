const todos = document.querySelector(".todos");
const doings = document.querySelector(".doings");
const dones = document.querySelector(".dones");

function clickedBtn(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      displayData(this);
    }
  };
  xhttp.open("GET", "./todo/" + id, true);
  xhttp.send();
}

function displayData(xhttp) {
  var res = JSON.parse(xhttp.responseText);
  console.log(res);

  const li = document.createElement("li");

  if (res.type == "DOING") {
    todos.removeChild(document.getElementById(res.id).parentElement);
    li.innerHTML = `
			<h3>${res.title}</h3>
			<span>등록날짜 : ${res.datetime}, ${res.name}, 우선순위 ${res.sequence}</span>
			<button id=${res.id} onclick=\"clickedBtn(${res.id})\">></button>
		`;
    doings.appendChild(li);
    console.log("success");
  } else if (res.type == "DONE") {
    doings.removeChild(document.getElementById(res.id).parentElement);
    li.innerHTML = `
			<h3>${res.title}</h3>
			<span>등록날짜 : ${res.datetime}, ${res.name}, 우선순위 ${res.sequence}</span>
			<button id=${res.id} onclick=\"delBtn(${res.id})\">X</button>
		`;
    dones.appendChild(li);
    console.log("success");
  }
}

function delBtn(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      dones.removeChild(document.getElementById(id).parentElement);
      console.log(`${id}가 삭제되었습니다.`);
    }
  };
  xhttp.open("POST", "./todo/" + id, true);
  xhttp.send();
}
