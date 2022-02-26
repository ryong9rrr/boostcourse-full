// utils
export const $ = (selector: string): HTMLElement => {
  const htmlElement = document.querySelector(selector);
  if (!htmlElement) {
    throw new Error("해당하는 컴포넌트를 찾을 수 없어요.");
  }
  return htmlElement as HTMLElement;
};
