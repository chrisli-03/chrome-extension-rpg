window.addEventListener('load', function () {
  Array.prototype.forEach.call(document.querySelectorAll('#enemy_list .link'), function(n) {
    n.addEventListener('click', function(e) {
      chrome.storage.sync.set({ mob: { id: e.target.dataset.mob, timestamp: (new Date()).getTime() } }, function() {
        window.location.href = "../../../popup.html"
      })
    });
  })
})