interface File {
  id: number;
  user_id: number;
  file_name: string;
  file_type: string;
}

const pdfCard = (name: string) => {
  return `
  <div class="cardContainer">
  <div class="cardContainer__image" style="background-image:url('./icons/pdf.svg')">
  <div class="card__settings" style="background-image:url('./icons/three_dots.svg')">
  </div>
  </div>
  <h2>${name}</h2>
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
    : `<div class="uploadedContainer">${state.files
        .map((el: File) => {
          return pdfCard(el.file_name);
        })
        .join("")}
        <div/>
        `;
};

export default UploadSection;
