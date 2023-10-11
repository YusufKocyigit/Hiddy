console.log("Content Script Loaded");

chrome.storage.sync.get({ keywords: [] }, function (result) {
  const keywords = result.keywords;
  const headings = document.querySelectorAll("h3"); // Select all h3 elements

  for (const heading of headings) {
    const headingText = heading.textContent;
    const titleText = headingText.toLowerCase();

    for (const keyword of keywords) {
      if (titleText.includes(keyword)) {
        // Find the nearest common ancestor and hide it by setting display to "none"
        let parentElement = heading;
        for (let i = 0; i < 7; i++) {
          if (parentElement.parentElement) {
            parentElement = parentElement.parentElement;
          } else {
            break; // Reached the top of the DOM tree
          }
        }
        if (parentElement) {
          parentElement.style.display = "none";
          console.log("Hidden post with heading: " + headingText);
        }
      }
    }
  }
});
