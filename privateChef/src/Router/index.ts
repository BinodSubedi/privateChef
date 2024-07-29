import HomePage from "../HomePage";
import LoginSignup from "../LoginSignup";
import UserPage from "../UserPage";

const routes: Map<string, any> = new Map();
routes.set("/", HomePage());
routes.set("/setup", LoginSignup());
routes.set("/home", UserPage());

export const navigate = (event: MouseEvent, path: string) => {
  event.preventDefault();
  window.history.pushState({}, "", path);
  loadContent(path);
};

// Function to load content based on the path
export const loadContent = (path: string) => {
  const page = routes.get(path);
  if (page) {
    const content = page.content;
    document.getElementById("app")!.innerHTML = content;
    document.querySelector("#page-style")!.setAttribute("href", page.css);
    page.eventInitializer();
  } else {
    document.getElementById("app")!.innerHTML =
      "<h1>404 Not Found</h1><p>Page not found.</p>";
  }
};
