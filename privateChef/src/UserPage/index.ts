import { StatusCodes } from "http-status-codes";
import axiosConfig from "../axiosConfig";
import { loadContent } from "../Router";
import Header from "./Header";
import UploadSection from "./UploadSection";
import { blankFilterLayer } from "../modals/blankFilterLayer";
import loadingWheel from "../modals/loadingWheel";
import contentModal from "../modals/contentModal";
import { pdfContainer } from "../modals/pdfContainer";

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

      // Submit Questions From Here

      document
        .querySelector("#submit-button")
        ?.addEventListener("click", async (e) => {
          e.preventDefault();

          const filter = blankFilterLayer({
            element: loadingWheel(),
            cancelCross: false,
          });

          const questionBox: HTMLInputElement | null =
            document.querySelector("#questionBox");

          const book: HTMLInputElement | null =
            document.querySelector("#fileSpecifier");

          if (!history.state || !history.state.files) {
            document.body.removeChild(filter);
            alert("There are no Files to be Searched through");
            return;
          }

          if (questionBox?.value == "" && book?.value == "") {
            document.body.removeChild(filter);

            alert("First fillup the fields properly");
            return;
          }

          if (questionBox?.value != "" && book?.value == "") {
            try {
              const resp = await axiosConfig.post(
                "/question/overallQuestion",
                {
                  question: questionBox?.value,
                },
                {
                  withCredentials: true,
                }
              );

              blankFilterLayer({
                element: contentModal(resp.data.data),
                cancelCross: true,
              });
              return;
            } catch (err) {
              console.log(err);
              alert("Something went wrong💣💣");
            } finally {
              document.body.removeChild(filter);
            }
          } else if (questionBox?.value !== "" && book?.value != "") {
            try {
              const resp = await axiosConfig.post(
                "/question/bookSpecificQuestion",
                {
                  question: questionBox?.value,
                  book: book?.value,
                },
                {
                  withCredentials: true,
                }
              );

              blankFilterLayer({
                element: contentModal(resp.data.data),
                cancelCross: true,
              });
              return;
            } catch (err) {
              alert("Something went wrong💣💣");
            } finally {
              document.body.removeChild(filter);
            }
          }
        });

      // Summary of Book

      const allSummarizeButton = document.querySelectorAll("#summarize-button");

      allSummarizeButton.forEach((el) => {
        el?.addEventListener("click", async (e) => {
          e.preventDefault();

          let filter = blankFilterLayer({
            element: loadingWheel(),
            cancelCross: false,
          });

          document
            .querySelector(`.settings-${el.getAttribute("data-id")}`)
            ?.classList.toggle("visible");

          const book = el.getAttribute("data-file-name");

          try {
            const resp = await axiosConfig.get(`/question/summary/${book}`, {
              withCredentials: true,
            });

            document.body.removeChild(filter);

            filter = blankFilterLayer({
              element: contentModal(resp.data.data),
              cancelCross: true,
            });
          } catch (err) {
            document.body.removeChild(filter);

            alert("Something went wrong");
          }
        });
      });

      // Share File
      // Copy link to clipboard and alert

      const allShareButtons = document.querySelectorAll("#share-button");

      allShareButtons.forEach((el) => {
        el?.addEventListener("click", async (e) => {
          e.preventDefault();

          const file_name = el.getAttribute("data-file-name");

          try {
            const response = await axiosConfig.get(`/file/share/${file_name}`, {
              withCredentials: true,
            });

            if (response.status == 200) {
              document
                .querySelector(`.settings-${el.getAttribute("data-id")}`)
                ?.classList.toggle("visible");

              navigator.clipboard.writeText(response.data.url);

              alert("Link Copied to the clipboard");
            } else {
              alert("Something went wrong");
            }
          } catch (err) {
            alert("Something went wrong");
          }
        });
      });

      //Download File

      const allDownloadButtons = document.querySelectorAll("#download-button");

      allDownloadButtons.forEach((el) => {
        el?.addEventListener("click", async (e) => {
          e.preventDefault();

          const file_name = el.getAttribute("data-file-name");

          try {
            const response = await axiosConfig.get(
              `/file/download/${file_name}`,
              {
                withCredentials: true,
                responseType: "blob",
              }
            );

            if (response.status == 200) {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = url;
              console.log(response.data);
              a.download = file_name!; // Set the downloaded file name
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            } else {
              alert("Something went wrong");
            }
          } catch (err) {
            alert("Something went wrong");
          } finally {
            // Hide the card options
            document
              .querySelector(`.settings-${el.getAttribute("data-id")}`)
              ?.classList.toggle("visible");
          }
        });
      });

      // Quick View

      const allQuickViewButtons =
        document.querySelectorAll("#quickView-button");

      allQuickViewButtons.forEach((el) => {
        el?.addEventListener("click", async (e) => {
          e.preventDefault();

          const file_name = el.getAttribute("data-file-name");

          try {
            const response = await axiosConfig.get(
              `/file/download/${file_name}`,
              {
                withCredentials: true,
                responseType: "blob",
              }
            );

            if (response.status == 200) {
              const blob = new Blob([response.data], {
                type: "application/pdf",
              });

              blankFilterLayer({
                element: pdfContainer(blob),
                cancelCross: true,
              });
            } else {
              alert("Something went wrong");
            }
          } catch (err) {
            alert("Something went wrong");
          } finally {
            // Hide the card options

            document
              .querySelector(`.settings-${el.getAttribute("data-id")}`)
              ?.classList.toggle("visible");
          }
        });
      });

      // Upload File

      const uploadInput: HTMLInputElement | null =
        document.querySelector("#upload-input");
      uploadInput?.addEventListener("change", async (e: any) => {
        e.preventDefault();
        console.log(e.target!.files[0]);

        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
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

      // Log-Out

      document.querySelector(".profile")?.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector(".profile-options")?.classList.toggle("visible");
      });

      document
        .querySelector("#logout")
        ?.addEventListener("click", async (e) => {
          e.preventDefault();

          try {
            const response = await axiosConfig.get("/user/logout", {
              withCredentials: true,
            });

            if (response.status == 200) {
              history.pushState("", "", "/setup");
              loadContent(window.location.pathname);
            } else {
              alert("Something went wrong");
            }
          } catch (err) {
            alert("Something went wrong");
          }
        });
    },
    css: "./src/style/mainPage.css",
  };
};

export default UserPage;
