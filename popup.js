document.getElementById("export").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "extract_playlist" });
});
