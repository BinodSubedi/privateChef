const UploadSection = (data?: string[]) => {
  return data == undefined
    ? `
    <div class="uploadContainer">
    <div class="uploadSection" style="background-image:url('./icons/file.png')">
    </div>
    <h1>Drop Here</h1>
    </div>
    `
    : ``;
};

export default UploadSection;
