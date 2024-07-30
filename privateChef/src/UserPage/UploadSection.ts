const UploadSection = () => {
  const state = history.state;
  return state == null || state.files == undefined
    ? `
      <div class="uploadContainer">
        <div class="uploadSection" style="background-image:url('./icons/file.png')">
        </div>
        <h1>Drop Here</h1>
      </div>
    `
    : `<h2>Dropped</h2>`;
};

export default UploadSection;
