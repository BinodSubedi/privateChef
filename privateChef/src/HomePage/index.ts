import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import { navigate } from "../Router";

const HomePage = () => {
  return {
    content: `
      <header class="header">
      ${Header()}
      </header>
      <main class="main__container">
      ${Home()}
      ${Features()}
      </main>
      <footer class="footer">
      ${Footer()}
      </footer>
  `,
    eventIntializer: () => {
      const join: HTMLDivElement | null = document.querySelector("#join-us");
      join!.addEventListener("click", (e: MouseEvent) => {
        navigate(e, "/setup");
      });
    },
    css: "./src/style/homePage.css",
  };
};

export default HomePage;
