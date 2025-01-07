document.getElementById("export").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "extract_playlist" });
  //service worker jo background.js h usko message bhej rha ye ig.
});
