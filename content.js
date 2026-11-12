// Jenkins Dark Mode – content script.
// The stylesheet is injected on every page but every rule is scoped to
// html.jdm-dark, so it does nothing until this script confirms the page is
// Jenkins and the user has dark mode enabled.

(() => {
  const CLASS = "jdm-dark";
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  let mode = "dark"; // "dark" | "auto" | "off"
  let isJenkins = false;

  // Jenkins puts data-rooturl on <head> and id="jenkins" on <body>.
  function detectJenkins() {
    return Boolean(
      (document.head && document.head.hasAttribute("data-rooturl")) ||
        (document.body && document.body.id === "jenkins")
    );
  }

  function apply() {
    const wantDark = mode === "dark" || (mode === "auto" && systemDark.matches);
    root.classList.toggle(CLASS, isJenkins && wantDark);
  }

  // Detect as soon as <head> exists so the page never flashes white.
  function waitForJenkins() {
    if (detectJenkins()) {
      isJenkins = true;
      apply();
      return;
    }
    const obs = new MutationObserver(() => {
      if (detectJenkins()) {
        isJenkins = true;
        apply();
        obs.disconnect();
      } else if (document.body) {
        // <body> exists and nothing matched: not Jenkins.
        obs.disconnect();
      }
    });
    obs.observe(root, { childList: true, subtree: true, attributes: true });
    document.addEventListener("DOMContentLoaded", () => obs.disconnect(), { once: true });
  }

  chrome.storage.sync.get({ mode: "dark" }, (s) => {
    mode = s.mode;
    apply();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.mode) {
      mode = changes.mode.newValue;
      apply();
    }
  });

  systemDark.addEventListener("change", apply);
  waitForJenkins();
})();
