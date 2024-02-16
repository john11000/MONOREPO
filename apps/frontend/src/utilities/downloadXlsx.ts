/**
 * Creates an anchor element `<a></a>` with
 * the base64 xlsx source and a filename with the
 * HTML5 `download` attribute then clicks on it.
 * @param  {string} xlsx
 * @return {void}
 */
export function downloadXLSX(xlsx: string, fileName: string) {
  const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${xlsx}`;
  const downloadLink = document.createElement("a");

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
