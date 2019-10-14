const item = (function() {
  const rtn = {}
  const itemData = {
    0: {
      name: 'Slime'
    },
    1000: {
      name: 'Slime Token'
    }
  }

  rtn.getItem = function (id) {
    return itemData[id]
  }

  return rtn
})()