# Jenkins Dark Mode

A browser extension (Chrome, Edge, Brave, any Chromium browser) that puts the Jenkins web UI in dark mode.

## Install

1. Open `chrome://extensions` (or `edge://extensions`).
2. Turn on **Developer mode**.
3. Click **Load unpacked** and pick this `jenkins-dark-mode` folder.
4. Reload your Jenkins tab.

## Use

Click the toolbar icon to pick **Always dark**, **Follow system**, or **Off**. The change applies to open Jenkins tabs right away.

## How it works

- `content.js` runs on every http/https page but only switches the theme on when the page is Jenkins (Jenkins puts `data-rooturl` on `<head>` and `id="jenkins"` on `<body>`). Other sites are left alone.
- `dark.css` is fully scoped to `html.jdm-dark`. It overrides the CSS variables modern Jenkins (2.3xx+) uses, then adds fallback rules for older layouts, the console log, CodeMirror/Ace editors, and the classic Pipeline stage view.
- The extension makes no network requests and stores only your chosen mode.

## Tweaking colors

Edit the `--jdm-*` palette at the top of `dark.css`, then click the reload icon for the extension on `chrome://extensions`.
