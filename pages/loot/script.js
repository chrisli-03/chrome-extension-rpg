window.addEventListener('load', function () {
  chrome.storage.sync.get(['stat', 'mob', 'inventory'], function(result) {
    const character = result.stat
    const mobType = mob.getMob(result.mob.id)
    const fightingTime = (new Date()).getTime() - result.mob.timestamp
    document.querySelector('#mob').innerText = mobType.name
    document.querySelector('#time').innerText = fightingTime

    const mobsKilled = calculateLoot(character, mobType, fightingTime)
    document.querySelector('#count').innerText = mobsKilled
    const loots = new Map()
    for (let i = 0; i < mobsKilled; i++) {
      mobType.drop.forEach(item => {
        const roll = Math.floor(Math.random() * 10001);
        if (roll <= item.chance) {
          if (!loots.has(item.id)) loots.set(item.id, 1)
          else loots.set(item.id, loots.get(item.id) + 1)
        }
      })
    }
    const temp = []
    loots.forEach((value, key) => {
      temp.push(`${item.getItem(key).name} x${value}`)
    })
    document.querySelector('#loot').innerText = temp.join('\n')
    if (!result.inventory) {
      const obj = {}
      loots.forEach((value, key) => {
        obj[key] = value
      })
      chrome.storage.sync.set({ inventory: obj })
    } else {
      loots.forEach((value, key) => {
        if (!result.inventory[key]) result.inventory[key] = value
        else result.inventory[key] = result.inventory[key] + value
        chrome.storage.sync.set({ inventory: result.inventory })
      })
    }

    chrome.storage.sync.remove('mob')
  })
})

function calculateLoot(character, mob, fightingTime) {
  const mobSurviveTime = fightDuration(character, mob)
  const characterSurviveTime = fightDuration(mob, character)
  if (mobSurviveTime > characterSurviveTime) {
    document.querySelector('#survivalTime').innerText = 'Not strong enough to kill'
    return []
  }
  document.querySelector('#survivalTime').innerText = `${mobSurviveTime} ms per kill`
  return Math.floor(fightingTime / mobSurviveTime)
}

function fightDuration(attacker, target) {
  let targetHP = target.hp
  const timeBetweenAtk = 1000 * (0.999 ** attacker.spd)
  const dmgPerHit = Math.max(attacker.atk - target.def, 1)
  return timeBetweenAtk * (Math.ceil(targetHP / dmgPerHit) - 1) + 1000 // 1000 is mob spawn time
}
