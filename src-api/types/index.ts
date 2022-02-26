export type Category = "todo" | "doing" | "done";

export type ListDataSet = "todoId" | "doingId" | "doneId";

export type Work = {
  readonly id: string;
  readonly category: "todo" | "doing" | "done";
  readonly text: string;
  readonly createdAt: number;
  readonly updatedAt: number;
};

export type Template = (data: Work) => string;

export type HTTP_REQUEST_HEADERS = {
  [key: string]: string;
};

export type HTTP_REQUEST = {
  readonly method: "POST" | "PUT" | "DELETE";
  readonly headers?: HTTP_REQUEST_HEADERS;
  readonly body?: string;
};

export type Store = {
  todos: Work[];
  doings: Work[];
  dones: Work[];
};
