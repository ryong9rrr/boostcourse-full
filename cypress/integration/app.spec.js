const TEST_URL = "http://127.0.0.1:5500/index.html";

function addItem(text) {
  cy.get("#to-do-form-input").type(`${text}{enter}`);
}

function checkCount(type, count) {
  cy.get(`#${type}-count`).should("have.text", `${count} 개`);
  cy.get(`#list-${type}s li span`).should("have.length", count);
}

describe("투 두 앱 테스트", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it("확인버튼 클릭으로 todo 추가", () => {
    const item = "자바스크립트 공부하기";
    cy.get("#to-do-form-input").type(`${item}`);
    cy.get("#to-do-form-btn-add").click();
    cy.get("#list-todos li span")
      .should("have.length", 1)
      .first()
      .should("have.text", item);

    checkCount("todo", 1);
  });

  it("엔터키로 todo 2개 추가", () => {
    const item1 = "자바스크립트 공부하기";
    const item2 = "테스트 코드 작성하기";
    addItem(item1);
    addItem(item2);
    cy.get("#list-todos li span").first().should("have.text", item1);
    cy.get("#list-todos li span").last().should("have.text", item2);
    checkCount("todo", 2);
  });

  it("빈 값을 입력하면 alert창이 떠야 한다.", () => {
    addItem("");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("할 일을 입력해 주세요.");
    });
  });

  it("할 일 수정하기", () => {
    const prevItem = "자바 스프링 공부하기";
    const updatedItem = "NodeJS 서버 만들기";
    addItem(prevItem);
    cy.get("#list-todos li span").first().should("have.text", prevItem);
    cy.window().then(($win) => {
      cy.stub($win, "prompt").returns(updatedItem);
      cy.get("#list-todos li .btn-edit").first().click();
    });
    cy.get("#list-todos li span").first().should("have.text", updatedItem);
  });

  it("todo 2개 추가하고 마지막 삭제", () => {
    const item1 = "자바스크립트 공부하기";
    const item2 = "테스트 코드 작성하기";
    addItem(item1);
    addItem(item2);
    cy.get("#list-todos li .btn-remove").last().click();
    checkCount("todo", 1);
  });

  it("todo 2개 추가하고 맨 위 아이템을 doing으로 이동", () => {
    const item1 = "자바스크립트 공부하기";
    const item2 = "테스트 코드 작성하기";
    addItem(item1);
    addItem(item2);
    cy.get("#list-todos li .btn-next").first().click();

    cy.get("#list-todos li span").first().should("have.text", item2);
    cy.get("#list-doings li span").first().should("have.text", item1);
    checkCount("todo", 1);
    checkCount("doing", 1);
  });

  it("todo 3개 추가하고 맨 위 2개 아이템을 doing으로 이동, doing에서 맨 위 1개 아이템을 done으로 이동", () => {
    const item1 = "자바스크립트 공부하기";
    const item2 = "테스트 코드 작성하기";
    const item3 = "알고리즘 공부하기";
    addItem(item1);
    addItem(item2);
    addItem(item3);
    cy.get("#list-todos li .btn-next").first().click();
    cy.get("#list-todos li .btn-next").first().click();
    cy.get("#list-doings li .btn-next").first().click();

    cy.get("#list-todos li span").first().should("have.text", item3);
    cy.get("#list-doings li span").first().should("have.text", item2);
    cy.get("#list-dones li span").first().should("have.text", item1);
    checkCount("todo", 1);
    checkCount("doing", 1);
    checkCount("done", 1);
  });

  it("todo 3개 추가하고 맨 위 2개 아이템을 doing으로 이동, doing에서 맨 위 1개 아이템을 done으로 이동 후 모두 삭제하기", () => {
    const item1 = "자바스크립트 공부하기";
    const item2 = "테스트 코드 작성하기";
    const item3 = "알고리즘 공부하기";
    addItem(item1);
    addItem(item2);
    addItem(item3);
    cy.get("#list-todos li .btn-next").first().click();
    cy.get("#list-todos li .btn-next").first().click();
    cy.get("#list-doings li .btn-next").first().click();

    checkCount("todo", 1);
    checkCount("doing", 1);
    checkCount("done", 1);

    cy.get("#list-todos li .btn-remove").first().click();
    cy.get("#list-doings li .btn-remove").first().click();
    cy.get("#list-dones li .btn-remove").first().click();

    checkCount("todo", 0);
    checkCount("doing", 0);
    checkCount("done", 0);
  });

  it("새로고침해도 데이터가 그대로 남아있는지 검사", () => {
    const items = [
      "자바스크립트 공부하기",
      "테스트 코드 작성하기",
      "알고리즘 공부하기",
      "HTTP 공부하기",
      "리액트 공부하기",
      "책 읽기",
      "프로젝트 하기",
      "강의 듣기",
    ];

    for (const item of items) {
      addItem(item);
    }
    checkCount("todo", items.length);

    for (let i = 0; i < 6; i++) {
      cy.get("#list-todos li .btn-next").first().click();
    }
    for (let i = 0; i < 4; i++) {
      cy.get("#list-doings li .btn-next").first().click();
    }
    checkCount("todo", 2);
    checkCount("doing", 2);
    checkCount("done", 4);

    cy.get("#list-todos li .btn-remove").first().click();
    cy.get("#list-doings li .btn-remove").first().click();
    cy.get("#list-dones li .btn-remove").first().click();

    cy.reload();

    checkCount("todo", 1);
    checkCount("doing", 1);
    checkCount("done", 3);
  });
});
