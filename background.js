console.log("Background Script Loaded");

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ keywords: [] }, function () {
    console.log("Keywords initialized.");
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "addKeyword") {
    console.log("Received request to add keyword: " + request.keyword);
    chrome.storage.sync.get({ keywords: [] }, function (result) {
      const keywords = result.keywords;
      keywords.push(request.keyword);
      chrome.storage.sync.set({ keywords: keywords }, function () {
        sendResponse({ message: "Keyword added." });
        console.log("Keyword added: " + request.keyword);
      });
    });
  }
});
