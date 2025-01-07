const videos = document.querySelectorAll("ytd-playlist-video-renderer");

const playlistData = Array.from(videos).map((video) => {
  const titleElement = video.querySelector("#video-title");
  const title = titleElement ? titleElement.innerText.trim() : "No title";

  const url = titleElement ? titleElement.href : "No URL";

  const durationElement = video.querySelector(".badge-shape-wiz__text");
  const duration = durationElement
    ? durationElement.innerText.trim()
    : "No duration";

  const channelNameElement = video.querySelector(
    ".yt-simple-endpoint.style-scope.yt-formatted-string"
  );
  const channelName = channelNameElement
    ? channelNameElement.innerText.trim()
    : "No channel name";

  const dateElement = video.querySelector(
    "span.style-scope.yt-formatted-string"
  );
  const dateUploaded = dateElement
    ? dateElement.innerText.trim()
    : "No date uploaded";

  const viewsElement = video.querySelector(
    "span.style-scope.yt-formatted-string"
  );
  const views = viewsElement ? viewsElement.innerText.trim() : "No views";

  return {
    title,
    url,
    duration,
    channelName,
    dateUploaded,
    views,
  };
});

chrome.runtime.sendMessage({ action: "playlist_data", data: playlistData });

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

exportToExcel(playlistData);
