console.log("Content Script Loaded");

chrome.storage.sync.get({ keywords: [] }, function (result) {
  const keywords = result.keywords;

  // Function to check and highlight keywords in an h3 element
  function checkAndHighlight(heading) {
    const headingText = heading.textContent;
    const titleText = headingText.toLowerCase();
    
    for (const keyword of keywords) {
      if (titleText.includes(keyword)) {
        let parentElement = heading;
        for (let i = 0; i < 5; i++) {
          if (parentElement.parentElement) {
            parentElement = parentElement.parentElement;
          } else {
            break;
          }
        }
        
        if (parentElement) {
          parentElement.style.backgroundColor = "red";
          // parentElement.style.display = "none";
          console.log("Hidden post with heading: " + headingText);
        }
      }
    }
  }

  // Create a MutationObserver to observe changes in the DOM
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Check for new h3 elements in added nodes
        for (const addedNode of mutation.addedNodes) {
          if (addedNode instanceof HTMLElement) {
            const headings = addedNode.querySelectorAll("h3");
            for (const heading of headings) {
              checkAndHighlight(heading);
            }
          }
        }
      }
    }
  });

  // Start observing changes in the DOM, including subtree and childList
  observer.observe(document.body, { childList: true, subtree: true });
});
