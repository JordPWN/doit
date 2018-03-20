export const actions = {
  updateStat (context, val) {
    context.commit('updateStat', val)
    context.commit('updateBonus', val)
  },
  updateSaveProf (context, val) {
    context.commit('updateSaveProf', val)
  },
  updateSkillProf (context, val) {
    context.commit('updateSkillProf', val)
  }
}
