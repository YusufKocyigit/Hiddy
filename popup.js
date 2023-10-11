const addKeywordButton = document.getElementById("addKeyword");
const keywordInput = document.getElementById("keywordInput");

addKeywordButton.addEventListener("click", function () {
  const keyword = keywordInput.value;
  chrome.runtime.sendMessage({ action: "addKeyword", keyword }, function (response) {
    keywordInput.value = "";
    alert(response.message);
  });
});
