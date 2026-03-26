const apiKeyInput = document.getElementById("apiKey");
const saveBtn = document.getElementById("saveBtn");
const statusMsg = document.getElementById("statusMsg");
const toggleVis = document.getElementById("toggleVis");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");

// Load saved key
chrome.storage.sync.get("vtApiKey", ({ vtApiKey }) => {
  if (vtApiKey) {
    apiKeyInput.value = vtApiKey;
    setActive(true);
  }
});

// Toggle visibility
toggleVis.addEventListener("click", () => {
  apiKeyInput.type = apiKeyInput.type === "password" ? "text" : "password";
});

// Save key
saveBtn.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    showStatus("Please enter an API key.", false);
    return;
  }
  chrome.storage.sync.set({ vtApiKey: key }, () => {
    showStatus("API key saved!", true);
    setActive(true);
  });
});

function showStatus(msg, ok) {
  statusMsg.textContent = msg;
  statusMsg.className = "status " + (ok ? "ok" : "err");
  setTimeout(() => {
    statusMsg.textContent = "";
    statusMsg.className = "status";
  }, 3000);
}

function setActive(active) {
  statusDot.className = "status-dot" + (active ? " active" : "");
  statusText.textContent = active ? "API key configured — ready" : "No API key configured";
}
