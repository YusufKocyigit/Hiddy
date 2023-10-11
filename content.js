console.log("Content Script Loaded");

chrome.storage.sync.get({ keywords: [] }, function (result) {
  const keywords = result.keywords;
  const headings = document.querySelectorAll("h3"); // Select all h3 elements

  for (const heading of headings) {
    const headingText = heading.textContent;

    for (const keyword of keywords) {
      if (headingText.includes(keyword)) {
        heading.style.backgroundColor = "red";
        console.log("Highlighted heading: " + headingText);
      }
    }
  }
});
