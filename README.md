<div align="center">

<img src="icons/icon128.png" width="80" height="80" alt="Extension icon"/>

# 🛡️ Domain Reputation Check

**A Chrome extension that shows VirusTotal threat intelligence every time you visit a new domain.**

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/)
[![VirusTotal API](https://img.shields.io/badge/Powered%20by-VirusTotal-394EFF?style=flat-square)](https://www.virustotal.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Free Tier](https://img.shields.io/badge/API-Free%20tier%20supported-success?style=flat-square)]()

</div>

---

## What it does

Every time you navigate to a **new domain**, a sleek overlay appears in the top-right corner of your browser for **5 seconds**, showing you:

- ✅ **Verdict** — Clean, Suspicious, Malicious, or Unrated
- 🔢 **Score** — e.g. `12/76 vendors flagged as malicious`
- 📊 **Extra info** — reputation score, country, content categories
- ⏱️ **Auto-dismisses** after 5 seconds, or click ✕ to close early

The extension only checks each domain **once per tab session** — no spam, no slowdowns.

---

## Screenshots

| Clean | Suspicious | Malicious |
|-------|-----------|-----------|
| ![Clean](https://via.placeholder.com/280x120/0d1f14/52e07c?text=0%2F89+%E2%9C%93+CLEAN) | ![Suspicious](https://via.placeholder.com/280x120/1e1500/ffcc00?text=2%2F80+%E2%9A%A0+SUSPICIOUS) | ![Malicious](https://via.placeholder.com/280x120/1a0505/ff4d4d?text=12%2F76+%E2%9C%95+MALICIOUS) |

---

## Installation

### Option A — Load unpacked (Developer Mode)

> No store account needed. Works immediately.

1. **Download** this repo — click `Code` → `Download ZIP` and unzip it
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **"Load unpacked"** and select the unzipped folder
5. The extension icon (🛡) will appear in your toolbar

### Option B — Microsoft Edge Add-ons Store

Chrome extensions work on Edge with zero changes. The Edge store is **free to publish** — no developer fee required.

---

## Setup — Get your VirusTotal API key

1. Go to [virustotal.com](https://www.virustotal.com) and create a free account
2. Click your profile → **API Key**
3. Click the 🛡 extension icon in Chrome → paste your key → **Save**

> **Free tier limits:** 4 lookups/minute · 500 lookups/day — plenty for personal use.

---

## How it works

```
User visits new domain
        │
        ▼
background.js (service worker)
  ├─ Checks if domain was already scanned this tab session
  ├─ Reads API key from chrome.storage.sync
  ├─ Calls VirusTotal API v3 → /domains/{hostname}
  └─ Sends result to content script via chrome.runtime.sendMessage
        │
        ▼
content.js (injected into every page)
  └─ Injects styled overlay into the DOM
       ├─ Green  → 0 malicious detections
       ├─ Yellow → 1–2 malicious or 3+ suspicious
       ├─ Red    → 3+ malicious detections
       └─ Gray   → no data / unrated domain
```

---

## File structure

```
domain-reputation-extension/
├── manifest.json       # Extension config (Manifest V3)
├── background.js       # Service worker — API calls & domain tracking
├── content.js          # Injects the overlay UI into web pages
├── popup.html          # Settings page (API key input)
├── popup.js            # Saves/loads API key via chrome.storage.sync
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Permissions explained

| Permission | Why it's needed |
|---|---|
| `webNavigation` | Detect when the user navigates to a new domain |
| `storage` | Save your VirusTotal API key securely |
| `tabs` | Send messages between the service worker and the active tab |
| `host_permissions: <all_urls>` | Allow the content script to inject the overlay on any site |
| `https://www.virustotal.com/*` | Make API calls to VirusTotal |

No browsing history is stored. No data is sent anywhere except VirusTotal's public API.

---

## Privacy

- Your API key is stored locally in `chrome.storage.sync` (synced to your Google account, not shared with anyone else)
- Domain names are sent to VirusTotal's API to retrieve public threat data — the same data available on their website
- No analytics, no tracking, no ads

---

## Publishing to the Chrome Web Store

If you want to publish this publicly:

1. Pay the one-time **$5 developer registration fee** at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Prepare a 128×128 icon, at least one screenshot (1280×800), and a privacy policy
3. Zip the extension folder and upload it
4. Fill in the store listing and submit for review (usually a few days)

Alternatively, publish for **free** on the [Microsoft Edge Add-ons Store](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview).

---

## Contributing

Pull requests are welcome! Some ideas for improvements:

- [ ] Add an options page with a whitelist/allowlist for trusted domains
- [ ] Cache recent results to reduce API calls
- [ ] Show results for IP addresses, not just hostnames
- [ ] Add support for other threat intel APIs (e.g. URLhaus, AbuseIPDB)
- [ ] Dark/light theme toggle for the overlay

---

## License

MIT — do whatever you want with it.

---

<div align="center">
  <sub>Built with ❤️ using the <a href="https://developers.virustotal.com/reference/overview">VirusTotal Public API v3</a></sub>
</div>
