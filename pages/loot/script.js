window.addEventListener('load', function () {
  chrome.storage.sync.get(['stat', 'mob'], function(result) {
    const character = result.stat
    const mobType = mob.getMob(result.mob.id)
    const fightingTime = (new Date()).getTime() - result.mob.timestamp
    document.querySelector('#mob').innerText = mobType.name
    document.querySelector('#time').innerText = fightingTime

    const mobsKilled = calculateLoot(character, mobType, fightingTime)
    document.querySelector('#count').innerText = mobsKilled

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
  const dmgPerHit = attacker.atk - target.def
  let duration = timeBetweenAtk * targetHP / (dmgPerHit)
  return duration
}
