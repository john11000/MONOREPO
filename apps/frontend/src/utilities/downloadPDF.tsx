/**
 * Creates an anchor element `<a></a>` with
 * the base64 pdf source and a filename with the
 * HTML5 `download` attribute then clicks on it.
 * @param  {string} pdf
 * @return {void}
 */
export function downloadPDF(pdf: string, fileName: string) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
