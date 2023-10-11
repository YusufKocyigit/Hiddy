console.log("Popup Script Loaded");

const addKeywordButton = document.getElementById("addKeyword");
const keywordInput = document.getElementById("keywordInput");

addKeywordButton.addEventListener("click", function () {
  const keyword = keywordInput.value;
  console.log("Adding keyword: " + keyword);
  chrome.runtime.sendMessage({ action: "addKeyword", keyword }, function (response) {
    keywordInput.value = "";
    alert(response.message);
    console.log("Received response: " + response.message);
  });
});
