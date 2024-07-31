import { StatusCodes } from "http-status-codes";
import axiosConfig from "../axiosConfig";
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

      uploadContainer?.addEventListener("drop", async (e) => {
        e.preventDefault();

        //Upload Image first, if success pushState new Files Data
        //Also alert for now
        //else no change

        try {
          const formData = new FormData();
          formData.append("file", e.dataTransfer!.files[0]);
          const response = await axiosConfig.put("/file/upload", formData, {
            withCredentials: true,
          });
          if (response.status == 201) {
            alert("Upload Success🚀🚀🚀");
            const gettingFiles = await axiosConfig.get("/file/getAllFiles", {
              withCredentials: true,
            });

            if (gettingFiles.status == StatusCodes.OK) {
              console.log(gettingFiles.data);
              history.pushState({ files: gettingFiles.data.data }, "", "/home");
              // load new content of the page without refreshing
              loadContent(window.location.pathname);
            }
          }
        } catch (err) {
          alert("Something went wrong");
        }
      });

      const allBlurDots = document.querySelectorAll(".card__dots");

      allBlurDots.forEach((el) => {
        el.addEventListener("click", () => {
          const id = el.classList[1].split("-")[1];

          const settings: HTMLDivElement | null = document.querySelector(
            `.settings-${id}`
          );

          settings?.classList.toggle("visible");
        });
      });

      const allAskBtns = document.querySelectorAll("#ask-button");

      allAskBtns.forEach((el) => {
        el.addEventListener("click", () => {
          const fileName = el.getAttribute("data-file-name");

          const fileSpecifier: HTMLInputElement | null =
            document.querySelector("#fileSpecifier");

          fileSpecifier!.value = fileName!;

          //hide settings after clicking ask

          const id = el.classList[0].split("-")[1];

          const settings: HTMLDivElement | null = document.querySelector(
            `.settings-${id}`
          );

          settings?.classList.toggle("visible");
        });
      });
    },
    css: "./src/style/mainPage.css",
  };
};

export default UserPage;
