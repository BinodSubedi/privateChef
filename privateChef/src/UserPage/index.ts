import { StatusCodes } from "http-status-codes";
import axiosConfig from "../axiosConfig";
import { loadContent } from "../Router";
import Header from "./Header";
import UploadSection from "./UploadSection";
import { blankFilterLayer } from "../modals/blankFilterLayer";
import loadingWheel from "../modals/loadingWheel";
import contentModal from "../modals/contentModal";

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
      // const filter = blankFilterLayer({
      //   element: contentModal(
      //     "sdad dasda sada dasda adsad  asdad asdad asdada"
      //   ),
      //   cancelCross: true,
      // });
      // document.body.removeChild(filter);

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

      const summarizeButton: HTMLButtonElement | null =
        document.querySelector("#summarize-button");

      summarizeButton?.addEventListener("click", async (e) => {
        e.preventDefault();

        let filter = blankFilterLayer({
          element: loadingWheel(),
          cancelCross: false,
        });

        const book = summarizeButton.getAttribute("data-file-name");

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

      // Share File
      // Copy link to clipboard and alert

      const shareButton: HTMLDivElement | null =
        document.querySelector("#share-button");

      shareButton?.addEventListener("click", async (e) => {
        e.preventDefault();

        const file_name = shareButton.getAttribute("data-file-name");

        try {
          const response = await axiosConfig.get(`/file/share/${file_name}`, {
            withCredentials: true,
          });

          if (response.status == 200) {
            document
              .querySelector(".card__settings")
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

      //Download File

      const downloadButton: HTMLDivElement | null =
        document.querySelector("#download-button");

      downloadButton?.addEventListener("click", async (e) => {
        e.preventDefault();

        const file_name = downloadButton.getAttribute("data-file-name");

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
            .querySelector(".card__settings")
            ?.classList.toggle("visible");
        }
      });
    },
    css: "./src/style/mainPage.css",
  };
};

export default UserPage;
