document.getElementById("export").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      // Get the active tab ID from the tabs array
      const activeTab = tabs[0];

      // Send the message with the tab information
      chrome.runtime.sendMessage({
        action: "extract_playlist",
        tabId: activeTab.id, // Pass the tabId
      });
    }
  });
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
