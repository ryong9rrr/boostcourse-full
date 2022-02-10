<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>나의 해야할 일들</title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
  </head>
  <body>
    <div class="app">
      <header class="main-header">
        <h1>나의 해야할 일들</h1>
        <div class="btn-todoForm">
          <a href="todoForm">새로운 TODO 등록</a>
        </div>
      </header>
      <section class="main-section">
        <article class="main-article">
          <h2>TODO</h2>
          <ul class="todos">
            <c:forEach var="data" items="${data}">
              <c:if test="${data.type == 'TODO'}">
                <li>
                  <h3>${data.title}</h3>
                  <span
                    >등록날짜 : ${data.datetime}, ${data.name}, 우선순위
                    ${data.sequence}</span
                  >
                  <button id="${data.id}" onclick="clickedBtn(${data.id})">
                    >
                  </button>
                </li>
              </c:if>
            </c:forEach>
          </ul>
        </article>
        <article class="main-article">
          <h2>DOING</h2>
          <ul class="doings">
            <c:forEach var="data" items="${data}">
              <c:if test="${data.type == 'DOING'}">
                <li>
                  <h3>${data.title}</h3>
                  <span
                    >등록날짜 : ${data.datetime}, ${data.name}, 우선순위
                    ${data.sequence}</span
                  >
                  <button id="${data.id}" onclick="clickedBtn(${data.id})">
                    >
                  </button>
                </li>
              </c:if>
            </c:forEach>
          </ul>
        </article>
        <article class="main-article">
          <h2>DONE</h2>
          <ul class="dones">
            <c:forEach var="data" items="${data}">
              <c:if test="${data.type == 'DONE'}">
                <li>
                  <h3>${data.title}</h3>
                  <span
                    >등록날짜 : ${data.datetime}, ${data.name}, 우선순위
                    ${data.sequence}</span
                  >
                  <button id="${data.id}" onclick="delBtn(${data.id})">
                    X
                  </button>
                </li>
              </c:if>
            </c:forEach>
          </ul>
        </article>
      </section>
    </div>
  </body>
  <script src="./js/main.js"></script>
</html>
