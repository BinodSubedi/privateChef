import { loadContent } from "../Router";
import Header from "./Header";
import UploadSection from "./UploadSection";

const UserPage = () => {
  return {
    content: `
  <header>
    ${Header()}
  </header>
    <main>
    ${UploadSection()}
    </main>
    `,
    eventInitializer: () => {
      const uploadContainer: HTMLDivElement | null =
        document.querySelector(".uploadContainer");

      uploadContainer?.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      uploadContainer?.addEventListener("drop", (e) => {
        e.preventDefault();
        history.pushState({ files: "value" }, "", "/home");
        // load new content of the page without refreshing
        loadContent(window.location.pathname);
        console.log(e.dataTransfer?.files);
      });
    },
    css: "./src/style/mainPage.css",
  };
};

export default UserPage;
