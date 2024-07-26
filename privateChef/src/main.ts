import { loadContent } from "./Router";

loadContent(window.location.pathname);

window.onpopstate = () => {
  loadContent(window.location.pathname);
};
