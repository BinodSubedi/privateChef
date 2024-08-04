import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import { loadContent, navigate } from "../Router";
import axiosConfig from "../axiosConfig";

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
    eventInitializer: async () => {
      //Push-Login check

      try {
        const response = await axiosConfig.get("/user/pushLogin", {
          withCredentials: true,
        });

        if (response.status == 200) {
          const gettingFiles = await axiosConfig.get("/file/getAllFiles", {
            withCredentials: true,
          });

          if (gettingFiles.status == 200) {
            console.log(gettingFiles.data);
            history.pushState({ files: gettingFiles.data.data }, "", "/home");
            // load new content of the page without refreshing
            loadContent(window.location.pathname);
          }
        }
      } catch (err) {}

      const join: HTMLDivElement | null = document.querySelector("#join-us");
      join!.addEventListener("click", (e: MouseEvent) => {
        navigate(e, "/setup");
      });
    },
    css: "./src/style/homePage.css",
  };
};

export default HomePage;
