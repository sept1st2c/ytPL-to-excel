chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extract_playlist") {
    const tabId = message.tabId; // Use the tabId passed from the popup

    if (tabId) {
      // Now we can execute the script on the tab using the passed tabId
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["contentScript.js"],
      });
    } else {
      console.error("Tab ID is not available.");
    }
  }
});
