<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>할일 등록</title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
  </head>
  <body>
      <div class="app">
        <form method="POST" action="todoForm" class="todoForm">
            <h1>할일 등록</h1>
            <section>
                <article>
                    <h2><label for="what-todo">어떤일인가요?</label></h2>
                    <input
                        id="what-todo"
                        name="what-todo"
                        type="text"
                        maxlength="24"
                        placeholder="js 공부하기(24자 까지)"
                        required
                    />
                </article>
                <article>
                    <h2><label for="who-todo">누가 할일인가요?</label></h2>
                    <input
                        id="who-todo"
                        name="who-todo"
                        type="text"
                        placeholder="용상윤"
                        required
                    />
                </article>
                <article>
                    <h2>우선순위를 선택하세요</label></h2>
                    <input id="rank1-todo" name="rank-todo" type="radio" value="1" required />
                    <label for="rank1-todo">1순위</label>
                    <input id="rank2-todo" name="rank-todo" type="radio" value="2" />
                    <label for="rank2-todo">2순위</label>
                    <input id="rank3-todo" name="rank-todo" type="radio" value="3" />
                    <label for="rank3-todo">3순위</label>
                </article>
            </section>
            <footer>
                <div class="btn-pre">
                    <a href="main">&lt 이전</a>
                </div>
                <div class="btn-form">
                    <input type="submit" value="제출" />
                    <input type="reset" value="내용지우기" />
                </div>
            </footer>
        </form>
      </div>
  </body>
</html>
    