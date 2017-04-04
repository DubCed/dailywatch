export default class WDM {

  constructor (playerId, mainContainerId, { options, magicEffect }) {
    this.playerContainer = document.getElementById(playerId)
    this.mainContainer = document.getElementById(mainContainerId)

    this.dmOptions = options
    this.wdmOptions = magicEffect;
  }

  loadPlayer () {
    this.dmPlayer = DM.player(this.playerContainer, this.dmOptions)

    this.addListeners()
  }

  hidePlayer () {
    this.dmPlayer.className += ' linearHidden'
    if (!this.dmPlayer.paused) {
      this.dmPlayer.pause()
    }
  }

  showPlayer () {
    this.dmPlayer.className = this.dmPlayer.className.replace(' linearHidden', '')
    if (this.dmPlayer.paused) {
      this.dmPlayer.play()
    }
  }

  addListeners () {
    if (!!this.wdmOptions.expandCollapse) {
      this.dmPlayer.addEventListener('end', this.hidePlayer.bind(this))
    }
  }

  removeListeners () {
    this.dmPlayer.removeEventListener('end', this.hidePlayer.bind(this))
  }

  destroy () {
    this.removeListeners()
    this.dmPlayer = null
  }
}
