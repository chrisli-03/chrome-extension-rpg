function createNewCharacter() {
  const newCharacter = {
    atk: 1,
    def: 1,
    spd: 1
  }
  chrome.storage.sync.set({ stat: newCharacter }, function() {
    message('Settings saved')
    for (const stat in newCharacter) {
      document.querySelector(`#${stat}`).innerText = newCharacter[stat]
    }
  })
}

window.addEventListener('load', function () {
  chrome.storage.sync.get(['stat', 'mob'], function(result) {
    if (!result.stat) {
      createNewCharacter()
    } else {
      for (const stat in result.stat) {
        document.querySelector(`#${stat}`).innerText = result.stat[stat]
      }
    }

    if (result.mob) {
      document.querySelector('#mob').innerText = `Fighting ${mob.getMob(result.mob.id).name}`
      document.querySelector('#loot').classList.toggle('hidden')
    } else {
      document.querySelector('#mob').innerText = 'Idle'
    }
  })
})