// Load stored keywords and display them in the list
function displayKeywords() {
    chrome.storage.sync.get({ keywords: [] }, function (result) {
      const keywords = result.keywords;
      const keywordList = document.getElementById("keywordList");
      keywordList.innerHTML = ''; // Clear the list before updating
  
      if (keywords.length > 0) {
        keywords.forEach(function (keyword, index) {
          const listItem = document.createElement("li");
          listItem.textContent = keyword;
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", function () {
            // Remove the keyword from the list and update storage
            keywords.splice(index, 1);
            chrome.storage.sync.set({ keywords: keywords }, function () {
              displayKeywords(); // Refresh the displayed list
            });
          });
          listItem.appendChild(deleteButton);
          keywordList.appendChild(listItem);
        });
      } else {
        keywordList.innerHTML = "No keywords added.";
      }
    });
  }
  
  displayKeywords(); // Initial display
  
  const addKeywordButton = document.getElementById("addKeyword");
  const keywordInput = document.getElementById("keywordInput");
  
  addKeywordButton.addEventListener("click", function () {
    const keyword = keywordInput.value.trim(); // Trim leading and trailing whitespace
    if (keyword) {
      // Check for duplicates before adding
      chrome.storage.sync.get({ keywords: [] }, function (result) {
        const existingKeywords = result.keywords;
        if (!existingKeywords.includes(keyword)) {
          existingKeywords.push(keyword);
          chrome.storage.sync.set({ keywords: existingKeywords }, function () {
            keywordInput.value = "";
            console.log("Keyword added.");
            displayKeywords(); // Refresh the displayed list after adding a keyword
          });
        } else {
            console.log("Keyword is already in the list.");
        }
      });
    } else {
        console.log("Please enter a valid keyword.");
    }
  });
  