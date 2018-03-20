function statBonus (stat) {
  return Math.floor((stat - 10) / 2)
}

export const mutations = {
  updateStat (state, val) {
    state.stats = { ...state.stats, ...val }
  },
  updateBonus (state, val) {
    let key = Object.keys(val)[0]
    let value = val[key]
    let bonus = { [key]: statBonus(value) }
    state.statBonuses = { ...state.statBonuses, ...bonus }
  },
  updateSaveProf (state, val) {
    state.savingThrowProf = { ...state.savingThrowProf, ...val }
  },
  updateSkillProf (state, val) {
    state.skillProfs = { ...state.skillProfs, ...val }
  }
}
