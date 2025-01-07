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
