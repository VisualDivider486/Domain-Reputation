// Track visited domains per tab to avoid duplicate checks
const visitedDomains = new Map(); // tabId -> Set of domains

chrome.webNavigation.onCommitted.addListener(async (details) => {
  // Only main frame navigations
  if (details.frameId !== 0) return;

  // Only http/https
  if (!details.url.startsWith("http://") && !details.url.startsWith("https://")) return;

  let hostname;
  try {
    hostname = new URL(details.url).hostname;
  } catch {
    return;
  }

  // Skip empty or IP addresses (optional: you can remove IP skip if you want)
  if (!hostname || hostname === "newtab") return;

  // Check if we already scanned this domain in this tab session
  if (!visitedDomains.has(details.tabId)) {
    visitedDomains.set(details.tabId, new Set());
  }
  const tabDomains = visitedDomains.get(details.tabId);
  if (tabDomains.has(hostname)) return;
  tabDomains.add(hostname);

  // Get API key from storage
  const { vtApiKey } = await chrome.storage.sync.get("vtApiKey");
  if (!vtApiKey) {
    // No API key set — notify user via content script
    sendToTab(details.tabId, {
      type: "VT_RESULT",
      status: "no_key",
      domain: hostname
    });
    return;
  }

  // Call VirusTotal API
  try {
    const response = await fetch(
      `https://www.virustotal.com/api/v3/domains/${encodeURIComponent(hostname)}`,
      {
        headers: {
          "x-apikey": vtApiKey,
          "Accept": "application/json"
        }
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      sendToTab(details.tabId, {
        type: "VT_RESULT",
        status: "error",
        domain: hostname,
        error: errData?.error?.message || `HTTP ${response.status}`
      });
      return;
    }

    const data = await response.json();
    const stats = data?.data?.attributes?.last_analysis_stats || {};
    const totalVendors = Object.values(stats).reduce((a, b) => a + b, 0);
    const malicious = stats.malicious || 0;
    const suspicious = stats.suspicious || 0;
    const categories = data?.data?.attributes?.categories || {};
    const reputation = data?.data?.attributes?.reputation ?? null;
    const country = data?.data?.attributes?.country || null;
    const lastAnalysisDate = data?.data?.attributes?.last_analysis_date || null;

    // Determine overall verdict
    let verdict = "clean";
    if (malicious >= 3) verdict = "malicious";
    else if (malicious >= 1 || suspicious >= 3) verdict = "suspicious";
    else if (malicious === 0 && suspicious === 0 && totalVendors === 0) verdict = "unknown";

    sendToTab(details.tabId, {
      type: "VT_RESULT",
      status: "ok",
      domain: hostname,
      verdict,
      malicious,
      suspicious,
      totalVendors,
      reputation,
      country,
      lastAnalysisDate,
      categories: Object.values(categories).slice(0, 3)
    });

  } catch (err) {
    sendToTab(details.tabId, {
      type: "VT_RESULT",
      status: "error",
      domain: hostname,
      error: err.message
    });
  }
});

// Clean up tab tracking when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  visitedDomains.delete(tabId);
});

function sendToTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, message).catch(() => {
    // Tab may not be ready yet; retry once after short delay
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, message).catch(() => {});
    }, 800);
  });
}
