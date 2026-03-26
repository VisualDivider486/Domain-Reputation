// Inject styles once
(function injectStyles() {
  if (document.getElementById("vt-rep-styles")) return;
  const style = document.createElement("style");
  style.id = "vt-rep-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

    #vt-overlay {
      all: initial;
      position: fixed;
      top: 18px;
      right: 18px;
      z-index: 2147483647;
      width: 310px;
      font-family: 'IBM Plex Sans', sans-serif;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 1.5px 4px rgba(0,0,0,0.18);
      animation: vt-slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
      transition: opacity 0.4s ease, transform 0.4s ease;
    }

    #vt-overlay.vt-hiding {
      opacity: 0;
      transform: translateX(20px);
    }

    @keyframes vt-slide-in {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    #vt-overlay .vt-header {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 11px 14px 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    #vt-overlay .vt-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    #vt-overlay .vt-header-title {
      flex: 1;
    }

    #vt-overlay .vt-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 18px; height: 18px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 4px;
      opacity: 0.55;
      transition: opacity 0.15s;
      font-size: 14px;
      line-height: 1;
    }
    #vt-overlay .vt-close:hover { opacity: 1; }

    #vt-overlay .vt-body {
      padding: 10px 14px 13px;
    }

    #vt-overlay .vt-domain {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 12.5px;
      font-weight: 600;
      margin-bottom: 9px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    #vt-overlay .vt-score-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    #vt-overlay .vt-score-big {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 26px;
      font-weight: 600;
      line-height: 1;
    }

    #vt-overlay .vt-score-label {
      font-size: 11px;
      line-height: 1.4;
      opacity: 0.7;
    }

    #vt-overlay .vt-bar-wrap {
      height: 5px;
      border-radius: 3px;
      margin-bottom: 9px;
      overflow: hidden;
      background: rgba(255,255,255,0.12);
    }

    #vt-overlay .vt-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }

    #vt-overlay .vt-meta {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    #vt-overlay .vt-tag {
      font-size: 10px;
      font-weight: 500;
      padding: 2px 7px;
      border-radius: 20px;
      opacity: 0.85;
      letter-spacing: 0.02em;
    }

    #vt-overlay .vt-timer-bar {
      height: 3px;
      border-radius: 0 0 10px 10px;
      animation: vt-timer 5s linear forwards;
      transform-origin: left;
    }

    @keyframes vt-timer {
      from { transform: scaleX(1); }
      to   { transform: scaleX(0); }
    }

    /* Verdict themes */
    #vt-overlay.vt-clean    { background: #0d1f14; color: #d4f5d8; }
    #vt-overlay.vt-clean    .vt-header { background: #0a3318; color: #52e07c; }
    #vt-overlay.vt-clean    .vt-dot { background: #52e07c; box-shadow: 0 0 6px #52e07c; }
    #vt-overlay.vt-clean    .vt-score-big { color: #52e07c; }
    #vt-overlay.vt-clean    .vt-bar-fill { background: #52e07c; }
    #vt-overlay.vt-clean    .vt-timer-bar { background: #52e07c; }
    #vt-overlay.vt-clean    .vt-tag { background: rgba(82,224,124,0.15); color: #52e07c; }
    #vt-overlay.vt-clean    .vt-close { color: #d4f5d8; }

    #vt-overlay.vt-suspicious { background: #1e1500; color: #fff3cc; }
    #vt-overlay.vt-suspicious .vt-header { background: #3a2800; color: #ffcc00; }
    #vt-overlay.vt-suspicious .vt-dot { background: #ffcc00; box-shadow: 0 0 6px #ffcc00; }
    #vt-overlay.vt-suspicious .vt-score-big { color: #ffcc00; }
    #vt-overlay.vt-suspicious .vt-bar-fill { background: #ffcc00; }
    #vt-overlay.vt-suspicious .vt-timer-bar { background: #ffcc00; }
    #vt-overlay.vt-suspicious .vt-tag { background: rgba(255,204,0,0.15); color: #ffcc00; }
    #vt-overlay.vt-suspicious .vt-close { color: #fff3cc; }

    #vt-overlay.vt-malicious { background: #1a0505; color: #ffd6d6; }
    #vt-overlay.vt-malicious .vt-header { background: #3b0a0a; color: #ff4d4d; }
    #vt-overlay.vt-malicious .vt-dot { background: #ff4d4d; box-shadow: 0 0 8px #ff4d4d; }
    #vt-overlay.vt-malicious .vt-score-big { color: #ff4d4d; }
    #vt-overlay.vt-malicious .vt-bar-fill { background: #ff4d4d; }
    #vt-overlay.vt-malicious .vt-timer-bar { background: #ff4d4d; }
    #vt-overlay.vt-malicious .vt-tag { background: rgba(255,77,77,0.15); color: #ff4d4d; }
    #vt-overlay.vt-malicious .vt-close { color: #ffd6d6; }

    #vt-overlay.vt-unknown { background: #111520; color: #c8d0e8; }
    #vt-overlay.vt-unknown .vt-header { background: #1b2035; color: #7a8dbf; }
    #vt-overlay.vt-unknown .vt-dot { background: #7a8dbf; }
    #vt-overlay.vt-unknown .vt-score-big { color: #7a8dbf; }
    #vt-overlay.vt-unknown .vt-bar-fill { background: #7a8dbf; }
    #vt-overlay.vt-unknown .vt-timer-bar { background: #7a8dbf; }
    #vt-overlay.vt-unknown .vt-tag { background: rgba(122,141,191,0.15); color: #7a8dbf; }
    #vt-overlay.vt-unknown .vt-close { color: #c8d0e8; }

    #vt-overlay.vt-error, #vt-overlay.vt-no_key {
      background: #151515; color: #ccc;
    }
    #vt-overlay.vt-error .vt-header, #vt-overlay.vt-no_key .vt-header {
      background: #222; color: #888;
    }
    #vt-overlay.vt-error .vt-dot, #vt-overlay.vt-no_key .vt-dot { background: #888; }
    #vt-overlay.vt-error .vt-timer-bar, #vt-overlay.vt-no_key .vt-timer-bar { background: #555; }
    #vt-overlay.vt-error .vt-close, #vt-overlay.vt-no_key .vt-close { color: #ccc; }
  `;
  document.documentElement.appendChild(style);
})();

// Listen for messages from background
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== "VT_RESULT") return;
  showOverlay(msg);
});

let dismissTimer = null;
let currentOverlay = null;

function showOverlay(data) {
  // Remove existing overlay
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
  if (dismissTimer) clearTimeout(dismissTimer);

  const { status, domain, verdict, malicious, suspicious, totalVendors, reputation, country, categories, error } = data;

  // Determine display theme
  let theme = status === "ok" ? verdict : status;
  let headerText = "DOMAIN REPUTATION";
  let scoreHTML = "";
  let metaHTML = "";

  if (status === "ok") {
    const verdictLabels = {
      clean: "✓ CLEAN",
      suspicious: "⚠ SUSPICIOUS",
      malicious: "✕ MALICIOUS",
      unknown: "? UNRATED"
    };
    headerText = verdictLabels[verdict] || "REPUTATION CHECK";

    const pct = totalVendors > 0 ? Math.round((malicious / totalVendors) * 100) : 0;
    scoreHTML = `
      <div class="vt-score-row">
        <div class="vt-score-big">${malicious}/${totalVendors}</div>
        <div class="vt-score-label">vendors flagged<br>as malicious</div>
      </div>
      <div class="vt-bar-wrap">
        <div class="vt-bar-fill" style="width:${Math.max(pct, malicious > 0 ? 3 : 0)}%"></div>
      </div>
    `;

    const tags = [];
    if (suspicious > 0) tags.push(`${suspicious} suspicious`);
    if (reputation !== null) tags.push(`rep: ${reputation > 0 ? '+' : ''}${reputation}`);
    if (country) tags.push(country);
    if (categories && categories.length) tags.push(...categories.slice(0, 2));

    metaHTML = tags.map(t => `<span class="vt-tag">${escapeHtml(t)}</span>`).join("");

  } else if (status === "no_key") {
    headerText = "⚙ SETUP REQUIRED";
    scoreHTML = `<div style="font-size:12px;opacity:0.75;line-height:1.5">No API key configured.<br>Click the extension icon to add your VirusTotal API key.</div>`;
  } else {
    headerText = "⚠ LOOKUP FAILED";
    scoreHTML = `<div style="font-size:12px;opacity:0.75;line-height:1.5">${escapeHtml(error || "Unknown error")}</div>`;
  }

  const overlay = document.createElement("div");
  overlay.id = "vt-overlay";
  overlay.className = `vt-${theme}`;
  overlay.innerHTML = `
    <div class="vt-header">
      <div class="vt-dot"></div>
      <div class="vt-header-title">${headerText}</div>
      <button class="vt-close" title="Dismiss">✕</button>
    </div>
    <div class="vt-body">
      <div class="vt-domain" title="${escapeHtml(domain)}">${escapeHtml(domain)}</div>
      ${scoreHTML}
      ${metaHTML ? `<div class="vt-meta">${metaHTML}</div>` : ""}
    </div>
    <div class="vt-timer-bar"></div>
  `;

  document.documentElement.appendChild(overlay);
  currentOverlay = overlay;

  // Close button
  overlay.querySelector(".vt-close").addEventListener("click", () => {
    dismissOverlay(overlay);
  });

  // Auto-dismiss after 5 seconds
  dismissTimer = setTimeout(() => {
    dismissOverlay(overlay);
  }, 5000);
}

function dismissOverlay(overlay) {
  overlay.classList.add("vt-hiding");
  setTimeout(() => {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    if (currentOverlay === overlay) currentOverlay = null;
  }, 400);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
