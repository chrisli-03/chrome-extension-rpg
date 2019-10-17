window.addEventListener('load', function () {
  chrome.storage.sync.get(['stat', 'inventory'], function(result) {
    let tokenType, cost

    const calculateTypeAndCost = function() {
      let totalStat = -10
      for (const stat in result.stat) {
        totalStat += result.stat[stat]
      }
      switch (Math.floor(totalStat / 100)) {
        case 0:
        case 1:
        case 2:
          cost = totalStat * (Math.ceil(totalStat / 100) * 2)
          tokenType = 1000
          document.querySelector('#cost').innerText = `${cost} Slime Tokens`
          break
        default:
          document.querySelector('#cost').innerText = 'Unknown Token'
      }
    }

    calculateTypeAndCost()

    for (const stat in result.stat) {
      document.querySelector(`#${stat}_val`).innerText = result.stat[stat]
    }

    Array.prototype.forEach.call(document.querySelectorAll('.train'), function(elem) {
      elem.addEventListener('click', function(e) {
        if (!result.inventory[tokenType] || result.inventory[tokenType] < cost) {
          const error = document.querySelector('#error')
          error.innerText = 'Not Enough Token'
          error.classList.remove('hidden')
          return
        }
        const trainStat = e.target.dataset.stat
        result.inventory[tokenType] -= cost
        if (result.inventory[tokenType] === 0) delete result.inventory[tokenType]
        result.stat[trainStat] += 1
        document.querySelector(`#${trainStat}_val`).innerText = result.stat[trainStat]
        calculateTypeAndCost()
        chrome.storage.sync.set({ stat: result.stat })
        chrome.storage.sync.set({ inventory: result.inventory })
      })
    })
  })
})