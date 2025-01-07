document.getElementById("export").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "extract_playlist" });
  //service worker jo background.js h usko message bhej rha ye ig.
});

// Listener for playlist data
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "playlist_data") {
    const playlistData = message.data;
    exportToExcel(playlistData); // Export to Excel
  }
});

function exportToExcel(data) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Playlist");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "YouTube_Playlist.xlsx";
  link.click();
}
