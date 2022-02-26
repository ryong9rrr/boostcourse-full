import { HTTP_REQUEST, Work } from "../types";
import HTTP_METHOD from "./httpMethod";

// api
class Api {
  private BASE_URL: string;

  constructor() {
    this.BASE_URL = "http://localhost:3000";
  }

  protected async getRequest<AjaxResponse>(
    url: string,
    option?: HTTP_REQUEST
  ): Promise<AjaxResponse> {
    try {
      const response = await fetch(url, option);
      if (response && !response.ok) {
        const message = "서버 요청에 에러가 발생했어요.";
        console.error(response);
        throw new Error(message);
      }
      if (option?.method === "DELETE") {
        return (await response) as unknown as AjaxResponse;
      }
      return (await response.json()) as AjaxResponse;
    } catch (e) {
      console.error(e);
      throw new Error(
        "현재 서버가 동작하고 있지 않거나 다른 문제가 있는 것 같아요."
      );
    }
  }

  async getItems(): Promise<Work[]> {
    const res = await this.getRequest<Work[]>(`${this.BASE_URL}/items`);
    return await res;
  }

  async createItem(text: string): Promise<Work> {
    const res = await this.getRequest<Work>(
      `${this.BASE_URL}/items`,
      HTTP_METHOD.POST(text)
    );
    return await res;
  }

  async editItem(text: string, id: string): Promise<Work> {
    const res = await this.getRequest<Work>(
      `${this.BASE_URL}/items/${id}`,
      HTTP_METHOD.PUT(text)
    );
    return await res;
  }

  async moveItem<T>(category: T, id: string): Promise<Work> {
    const res = await this.getRequest<Work>(
      `${this.BASE_URL}/items/${category}/${id}`,
      HTTP_METHOD.PUT()
    );
    return await res;
  }

  async deleteItem(
    category: "todo" | "doing" | "done",
    id: string
  ): Promise<void> {
    const res = await this.getRequest<Work>(
      `${this.BASE_URL}/items/${category}/${id}`,
      HTTP_METHOD.DELETE()
    );
  }
}

export default Api;
