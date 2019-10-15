window.addEventListener('load', function () {
  chrome.storage.sync.get(['inventory'], function(result) {
    if (result.inventory && Object.keys(result.inventory).length > 0) {
      document.querySelector('#inventory').innerText =
        Object.keys(result.inventory).map(itemID => `${item.getItem(itemID).name} x${result.inventory[itemID]}`).join('\n')
    }
  })
})