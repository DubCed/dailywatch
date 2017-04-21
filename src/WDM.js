import Pip from './options/Pip'
import Umoh from './options/Umoh'
import Stp from './options/Stp'
import Eac from './options/Eac'
import Eos from './options/Eos'
import Imod from './options/Imod'

export default class WDM {

  constructor (playerDiv, dmPlayerConfig, wdmPlayerConfig) {
    this.playerDivReplacement = playerDiv
    this.dmPlayerConfig = dmPlayerConfig
    this.wdmPlayerConfig = wdmPlayerConfig

    this.loadPlayer()
  }

  loadPlayer () {
    this.dmPlayer = DM.player(this.playerDivReplacement, this.dmPlayerConfig)
    this.initWdmPlayer()
  }

  initWdmPlayer () {
    if (this.wdmPlayerConfig.style.hasOwnProperty('pip') && this.wdmPlayerConfig.style.pip.active) {
      let pip = new Pip(this.dmPlayer, this.wdmPlayerConfig.style.pip)
    }
    if (this.wdmPlayerConfig.style.hasOwnProperty('umoh') && this.wdmPlayerConfig.style.umoh.active) {
      let umoh = new Umoh(this.dmPlayer)
    }
    if (this.wdmPlayerConfig.style.hasOwnProperty('stp') && this.wdmPlayerConfig.style.stp.active) {
      let stp = new Stp(this.dmPlayer)
    }
    if (this.wdmPlayerConfig.style.hasOwnProperty('eac') && this.wdmPlayerConfig.style.eac.active) {
      let eac = new Eac(this.dmPlayer)
    }
    if (this.wdmPlayerConfig.style.hasOwnProperty('eos') && this.wdmPlayerConfig.style.eos.active) {
      let eos = new Eos(this.dmPlayer)
    }
    if (this.wdmPlayerConfig.style.hasOwnProperty('imod') && this.wdmPlayerConfig.style.imod.active) {
      let imod = new Imod(this.dmPlayer, this.wdmPlayerConfig.style.imod)
    }
  }

  destroy () {
    this.dmPlayer = null
  }
}
