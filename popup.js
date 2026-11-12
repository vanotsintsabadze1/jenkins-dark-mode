const radios = document.querySelectorAll('input[name="mode"]');

chrome.storage.sync.get({ mode: "dark" }, ({ mode }) => {
  for (const r of radios) r.checked = r.value === mode;
});

for (const r of radios) {
  r.addEventListener("change", () => {
    if (r.checked) chrome.storage.sync.set({ mode: r.value });
  });
}
