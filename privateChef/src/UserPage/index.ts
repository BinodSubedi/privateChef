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
        console.log(e.dataTransfer?.files);
      });
    },
    css: "./src/style/mainPage.css",
  };
};

export default UserPage;
