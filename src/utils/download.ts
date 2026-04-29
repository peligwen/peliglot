/**
 * Trigger a JSON file download in the browser.
 *
 * Builds a Blob from `data`, creates an object URL, clicks a hidden anchor
 * to initiate the download, then immediately revokes the URL to release memory.
 */
export function downloadJsonFile(filename: string, data: unknown): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}
