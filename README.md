# 네이버 부스트코스 풀스택

## 📖 목차

1. aboutme
2. todo-list

---

## #2 todo-list

### #1. 디렉토리 구조

<img src="./img/구조.png" />

### #2. 개발환경세팅

- pom.xml

  ```
       <properties>
          <!-- web.xml 파일을 삭제해도 eclipse에서 오류가 발생하지 않는다. -->
          <failOnMissingWebXml>false</failOnMissingWebXml>
    </properties>
  	<dependency>
  		<groupId>mysql</groupId>
  		<artifactId>mysql-connector-java</artifactId>
  		<version>5.1.45</version>
  	</dependency>

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


  ```

### #3. jst 버전 업그레이드

- web.xml 수정

```
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"       xmlns="http://xmlns.jcp.org/xml/ns/javaee"            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" id="WebApp_ID" version="3.1">

    <display-name>Archetype Created Web Application</display-name>

    <welcome-file-list>

        <welcome-file>index.html</welcome-file>

        <welcome-file>index.jsp</welcome-file>

    </welcome-file-list>

    </web-app>

```

- org.elclipse.wst.common.project.facet.core.xml<br /> jst 👉 3.1 로 변경

- pom/xml 에 플러그인 추가

```

<plugins>

    <plugin>

        <groupId>org.apache.maven.plugins</groupId>

        <artifactId>maven-compiler-plugin</artifactId>

        <version>3.1</version>

        <configuration>

            <source>1.8</source>

            <target>1.8</target>

        </configuration>

    </plugin>

</plugins>

```
