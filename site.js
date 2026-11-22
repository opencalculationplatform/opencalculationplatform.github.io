// Download buttons point to the latest release's page; once GitHub says which files it has,
// they point straight to the Windows setup and the Android APK, with the version.
(function () {
  var repo = "opencalculationplatform/ocp";
  var buttons = document.querySelectorAll("[data-download]");
  if (!buttons.length || !window.fetch) return;
  fetch("https://api.github.com/repos/" + repo + "/releases/latest")
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (release) {
      if (!release || !release.assets) return;
      var patterns = { windows: /Setup-.*\.exe$/i, android: /\.apk$/i, zip: /win-x64\.zip$/i };
      buttons.forEach(function (button) {
        var asset = release.assets.find(function (a) { return patterns[button.dataset.download].test(a.name); });
        if (asset) button.href = asset.browser_download_url;
      });
      document.querySelectorAll("[data-version]").forEach(function (el) {
        el.textContent = release.tag_name;
      });
    })
    .catch(function () { /* the buttons keep pointing to the release page */ });
})();
