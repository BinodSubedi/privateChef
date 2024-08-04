export const pdfContainer = (blob: Blob) => {
  const url = URL.createObjectURL(blob);

  return `
    <iframe class="pdfContainer" src="${url}" style="height:36rem;width:36rem">
    </iframe>
    `;
};
