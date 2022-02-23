import { DOMSelector } from "../types";

export const $: DOMSelector = (selector) => document.querySelector(selector);
