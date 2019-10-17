const mob = (function() {
  const rtn = {}
  const mobData = {
    green_slime: {
      name: 'Green Slime',
      hp: 5, atk: 1, def: 0, spd: 0,
      drop: [{ id: 0, chance: 9500 }, { id: 1000, chance: 10 }]
    },
    blue_slime: {
      name: 'Blue Slime',
      hp: 10, atk: 3, def: 1, spd: 2,
      drop: [{ id: 0, chance: 9500 },  { id: 1000, chance: 20 }]
    },
    giant_slime: {
      name: 'Giant Slime',
      hp: 50, atk: 5, def: 15, spd: 3,
      drop: [{ id: 0, chance: 9500 }, { id: 0, chance: 9500 }, { id: 1000, chance: 50 }]
    },
    slime_king: {
      name: 'Slime King',
      hp: 1000, atk: 100, def: 100, spd: 100,
      drop: [{ id: 0, chance: 9500 }, { id: 0, chance: 9500 },{ id: 0, chance: 9500 }, { id: 1000, chance: 10000 }, { id: 1000, chance: 6666 }, { id: 1000, chance: 3333 }]
    }
  }

  rtn.getMob = function (id) {
    return mobData[id]
  }

  return rtn
})()