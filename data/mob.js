const mob = (function() {
  const rtn = {}
  const mobData = {
    green_slime: {
      name: 'Green Slime',
      atk: 1, def: 0, spd: 0
    },
    blue_slime: {
      name: 'Blue Slime',
      atk: 3, def: 1, spd: 2
    },
    giant_slime: {
      name: 'Giant Slime',
      atk: 5, def: 15, spd: 3
    },
    slime_king: {
      name: 'Slime King',
      atk: 100, def: 100, spd: 100
    }
  }

  rtn.getMob = function (id) {
    return mobData[id]
  }

  return rtn
})()