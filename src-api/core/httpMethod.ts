import { HTTP_REQUEST } from "../types";

const HTTP_METHOD = {
  POST(text: string): HTTP_REQUEST {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
  },

  PUT(text: string | null = null): HTTP_REQUEST {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
  },

  DELETE(): HTTP_REQUEST {
    return {
      method: "DELETE",
    };
  },
};

export default HTTP_METHOD;
