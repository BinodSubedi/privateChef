interface File {
  id: number;
  user_id: number;
  file_name: string;
  file_type: string;
}

const pdfCard = (name: string, id: number) => {
  return `
  <div class="cardContainer">
  <div class="cardContainer__image" style="background-image:url('./icons/pdf.svg')">
  <div class="card__dots dots-${id}" style="background-image:url('./icons/three_dots_black.svg')">
  </div>
  <div class="card__settings settings-${id}">
  <div id="download-button" data-file-name="${name}" data-id="${id}">
   <p >Download</p>
  </div>
  <div id="share-button" data-file-name="${name}" data-id="${id}">
  <p >Share</p>
  </div>
  <div id="quickView-button" data-file-name="${name}" data-id="${id}">
  <p >Quick View</p>
  </div>
  <div id="summarize-button" data-file-name="${name}" data-id="${id}">
  <p >Summarize</p>
  </div>
  <div id="ask-button" class="ask-${id}" data-file-name="${name}" data-id="${id}">
  <p >Ask</p>
  </div>
   </div>
  </div>
  <h3>${name}</h3>
  </div>
  `;
};

const UploadSection = () => {
  const state = history.state;
  return state == null || state.files == undefined || state.files.length == 0
    ? `
      <div class="uploadContainer">
        <div class="uploadSection" style="background-image:url('./icons/file.png')">
        </div>
        <h1>Drop Here</h1>
      </div>
    `
    : `<div class="uploadedContainer">
    <div class="upload-button" style="position:absolute;background-image:url('./icons/add-button.svg')">
    <input type="file" id="upload-input" />
    </div>
    
    ${state.files
      .map((el: File) => {
        return pdfCard(el.file_name, el.id);
      })
      .join("")}
        <div/>
        `;
};

export default UploadSection;
