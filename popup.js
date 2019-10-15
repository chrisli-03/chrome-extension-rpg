function createNewCharacter() {
  const newCharacter = {
    hp: 10,
    atk: 1,
    def: 0,
    spd: 0
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
      document.querySelector('#loot').classList.remove('hidden')
      document.querySelector('#map').classList.add('hidden')
      document.querySelector('#training').classList.add('hidden')
    } else {
      document.querySelector('#mob').innerText = 'Idle'
    }
  })
})