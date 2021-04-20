# 네이버 부스트코스 풀스택

1. aboutme
2. todo-list

---

# #2 todo-list

## 📖 목차

- #1. 디렉토리 구조<br />
  #1.1. javaWAS
- #2. 개발환경세팅<br />
  #2.1. maven 프로젝트 생성
- #3. jst 버전 업그레이드
- #4. mysql
- #5. DTO (Data Transfer Object)
- #6. DAO (Data Access Object)
- #7. SELECT TODOS, DOINGS, DONES
- #8. JSP LifeCycle
- #9. JSP LifeCycle을 이용한 동작설계
- #Error

---

### #1. 디렉토리 구조

<img src="./readmeImg/구조.png" />

#### #1.1 javaWAS 구조

<img src="./readmeImg/javaWAS.png" />

### #2. 개발환경세팅

# 📖 목차

- JAVA WAS
- 디렉토리 구조
- 개발환경세팅

---

# 1. JAVA WAS

![](https://images.velog.io/images/ryong9rrr/post/9cb5fb92-d1d0-4a02-bf57-759dae70cf3d/javaWAS.png)

# 2. 디렉토리 구조

![](https://images.velog.io/images/ryong9rrr/post/d79b42ed-8960-47f6-843c-5b1702425da1/%EA%B5%AC%EC%A1%B0.png)

# 3. 개발환경세팅

## maven project

File - new - maven - Filter에서 `org.apache.maven.archetypes` 에서 선택한다.

### groupId, artifactId 네이밍

#### groupId

- groupId는 당신의 프로젝트를 모든 프로젝트 사이에서 고유하게 식별하게 해 주는 것이다.

- 따라서, groupId에는 네이밍 스키마를 적용하도록 한다.

  - groupId는 package 명명 규칙을 따르도록 한다.
  - 즉, 최소한 당신이 컨트롤하는 도메인 네임이어야 한다.
  - 하위 그룹은 얼마든지 추가할 수 있다.
  - 예: `org.apache.maven` , `org.apache.commons`

- 프로젝트 구조를 사용하면 잘 구분되는 groupId를 만들 수 있다.

  - 현재 프로젝트가 다중 모듈 프로젝트라면, 부모 groupId에 현재 프로젝트의 식별자를 추가하는 방식.

  - 예: `org.apache.maven` , `org.apache.maven.plugins` , `org.apache.maven.reporting`

#### artifactId

- artifactId는 버전 정보를 생략한 `jar`파일의 이름이다.

  - 이름은 원하는 것으로 아무거나 정해도 괜찮다.
  - 단, 소문자로만 작성할 것.
  - 단, 특수문자는 사용하지 않는다.

- 만약 써드 파티 `jar` 파일이라면, 할당된 이름을 사용해야 한다.

  - 예: `maven` , `commons-math`

### pom.xml

maven을 사용하는 가장 큰 이유. 필요한 라이브러리를 편리하게 추가 할 수 있다. 추가한 후에는 꼭 maven update를 한다. (art + F5)

### jst 버전 업그레이드

jstl 이나 EL 구문을 사용하고, servlet을 제대로 동작시키기 위해서는
Dynamic web module의 버전이 2.4 이상이어야 한다. 버전이 낮다면 업그레이드를 해줘야함.

1. **pom.xml** 에 아래와 같이 필요한 라이브러리를 추가한다.

```
  <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <version>3.1</version>
      <configuration>
        <source>1.8</source>
        <target>1.8</target>
      </configuration>
  </plugin>

  <properties>
    <!-- web.xml 파일을 삭제해도 eclipse에서 오류가 발생하지 않는다. -->
    <failOnMissingWebXml>false</failOnMissingWebXml>
  </properties>

  <!-- json 라이브러리 databind jackson-core, jackson-annotaion에 의존성이 있다. -->
  <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.4</version>
  </dependency>

  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
  </dependency>

  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
  </dependency>

  <!-- mysql과 같은 version으로 -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
  </dependency>

```

2. `<failOnMissingWebXml>false</failOnMissingWebXml>` 을 추가함으로 `web.xml`은 삭제해도 괜찮다.
   추가하지 않는다면 **web.xml**의 코드를 아래와 같이 변경한다.
   **web.xml**
   ```
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" version="3.1">
     <display-name>Archetype Created Web Application</display-name>
   </web-app>
   ```
3. `org.elclipse.wst.common.project.facet.core.xml`
   jst 👉 3.1 로 변경

4. maven update 후 이클립스 재시작

### #4. mysql

1. 데이터베이스 생성

   `CREATE DATABASE study_db default CHARACTER SET UTF8;`

2. 유저생성

   `CREATE USER todo_user@localhost identified by 'todo';`

3. 유저에게 권한 부여

   `GRANT ALL PRIVILEGES ON todo_db.* TO todo_user@localhost;`

4. `flush privileges;`
5. `exit`
6. 확인 `mysql -h127.0.0.1 -utodo_user -p`

- database를 쓰겠다

  `use 데이터베이스이름;`

  ex) `use todo_db;`

- 테이블을 보겠다

  `show tables;`

- table 생성

  `CREATE TABLE todo ( id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR(255) NOT NULL, name VARCHAR(100) NOT NULL, sequence INT(1) NOT NULL, type VARCHAR(20) DEFAULT 'TODO', regdate DATETIME DEFAULT NOW(), PRIMARY KEY (id) );`

- table 보기

  `desc 테이블이름;`

- 데이터 하나 넣어주기

  `INSERT into todo (title, name, sequence) values ("java공부", "상윤", "1");`

- id가 100인 데이터 삭제
  `DELETE FROM todo where id=100;`

- id가 1인 데이터 "DOING" 으로 "type" 업데이트

  `UPDATE todo SET type = "DOING" WHERE id = 1;`

- 데이터 확인, 추가, 삭제

  `SELECT * FROM todo;`

  <table>
  <th>id</th>
  <th>title</th>
  <th>name</th>
  <th>sequence</th>
  <th>type</th>
  <th>regdate</th>
  <tr>
  	<td>1</td>
  	<td>java공부</td>
  	<td>상윤</td>
  	<td>1</td>
  	<td>TODO</td>
  	<td>2021-04-11 00:55:50</td>
  </tr>
  </table>

  - id 값은 NOT NULL 이지만 AUTO_INCREMENT 로 인해 자동으로 추가됨.

  - test

        `INSERT into todo (id,title, name, sequence) values (100, "test", "상윤", "3");`

      <table>
    <th>id</th>
    <th>title</th>
    <th>name</th>
    <th>sequence</th>
    <th>type</th>
    <th>regdate</th>
    <tr>
    	<td>1</td>
    	<td>java공부</td>
    	<td>상윤</td>
    	<td>1</td>
    	<td>TODO</td>
    	<td>2021-04-11 00:55:50</td>
    </tr>
    <tr>
    	<td>100</td>
    	<td>test</td>
    	<td>상윤</td>
    	<td>3</td>
    	<td>TODO</td>
    	<td>2021-04-11 01:04:35</td>
    </tr>
    </table>

- `DELETE FROM todo where id=100;`

  삭제하고 SELECT 로 확인해보면 삭제된 것을 알 수 있음.
  <table>
  <th>id</th>
  <th>title</th>
  <th>name</th>
  <th>sequence</th>
  <th>type</th>
  <th>regdate</th>
  <tr>
  	<td>1</td>
  	<td>java공부</td>
  	<td>상윤</td>
  	<td>1</td>
  	<td>TODO</td>
  	<td>2021-04-11 00:55:50</td>
  </tr>
  </table>

### #5. DTO (Data Transfer Object)

- DTO 란?

  데이터베이스의 자료를 자바에서 쓸 수 있도록 전환해주는 클래스를 정의한다.

### #6. DAO (Data Access Object)

- DAO 란?

  데이터베이스의 CRUD를 모듈화 한 것

- mysql(ver 8.0.23)과 연동 시

  - dburl = "jdbc:mysql://localhost:3306/데이터베이스이름?useSSL=false"

  - `Class.forName("com.mysql.cj.jdbc.Driver");`

### #7. SELECT TODOS, DOINGS, DONES

나중에 table 지웠다가 다시만들어야함(배열이 커져버림), 또 나중에 쿼리문에 ORDER BY 로 오름차순 해줄 것.

- 앞으로 해야할 것

  - 할 일 등록 : INSERT 로 table 추가하는 쿼리
  - TODO - DOING - DONE : UPDATE로 table 상태 바꾸는 쿼리
  - 삭제 : DONE 상태가 되면 삭제할 수 있는 버튼이 생기고, 테이블을 삭제하는 쿼리를 만들자.

### #8. JSP LifeCycle

```
<%
	System.out.println("_jspService()");
%>

<%!
public void jspInit() {
	System.out.println("jspInit()!");
}

public void jspDestroy() {
	System.out.println("jspDestroy()");
}
%>
```

- 클라이언트에 처음 접속

  - init - service 순으로 동작

- 새로고침

  - service만 동작

- dom 변경 시
  - destory - init - service 순으로 동작

### #9. MVC 로 생각해보기

1. todoweb/main 에 접속한다.
2. controller MainServlet은 db에 있는 data들을 가져와서
3. view인 main.jsp 에 넘겨주고 main.jsp는 data들을 이용해 DOM을 생성한다.
4. db에 있는 data들을 가져올 때, TodoDto, TodoDao를 이용한 model이 있어야한다.
5. 할 일 추가 버튼을 누르면 단순히 페이지가 이동한다.
6. form에 값 들을 모두 담고 제출을 누르면 newTodoServlet으로 값 들이 전송되고 mainServlet으로 리다이렉트 된다. (동기적이므로 dom제어는 필요 없을 듯)
7. 옮기기 버튼을 누르면 updateServlet이 해당 dom의 id를 인자로 받아서 상태를 update 시키고 그 결과를 json으로 만든다.
8. 옮기기 버튼을 눌러서 7의 결과가 잘 전송이 되면 클릭한 dom을 js로 없애고 결과인 json 데이터를 이용해서 dom을 생성한다.

---

# #Error

- `Before start of result set` : rs.next() 안했을 때

- **한글깨짐방지**

  ```
  //request
  request.setCharacterEncoding("UTF-8");
  //response
  response.setContentType("text/html; charset=UTF-8");
  ```
