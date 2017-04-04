import OptionBar from './OptionBar'

export default class WDM {

  constructor (playerId, mainContainerId, { options, magicEffect }) {
    this.playerContainer = document.getElementById(playerId)
    this.mainContainer = document.getElementById(mainContainerId)

    this.dmOptions = options
    this.wdmOptions = magicEffect;

    this.callbacks = {
      expandCollapse: {
        expand: this.showPlayer.bind(this),
        collapse: this.hidePlayer.bind(this)
      }
    }
  }

  loadPlayer () {
    this.dmPlayer = DM.player(this.playerContainer, this.dmOptions)

    this.addListeners()
    OptionBar.displayControls(this.mainContainer, this.wdmOptions, this.callbacks)
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
    OptionBar.destroy()
  }
}
