chrome.storage.sync.get({ keywords: [] }, function (result) {
    const keywords = result.keywords;
    const postTitles = document.querySelectorAll(".title");
  
    for (const postTitle of postTitles) {
      for (const keyword of keywords) {
        if (postTitle.textContent.includes(keyword)) {
          postTitle.closest(".thing").style.display = "none";
        }
      }
    }
  });
  