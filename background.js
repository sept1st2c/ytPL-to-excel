chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extract_playlist") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"],
    });
  }
});
