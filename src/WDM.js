import OptionBar from './OptionBar'

export default class WDM {

  constructor (playerId, mainContainerId, { options, magicEffect }) {
    this.playerContainer = document.getElementById(playerId)
    this.mainContainer = document.getElementById(mainContainerId)

    this.dmOptions = options
    this.wdmOptions = magicEffect

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

  isVisibleElement () {
    let displayedScreen = { xMin: window.pageXOffset, xMax: window.pageXOffset + window.innerWidth, yMin: window.pageYOffset, yMax: window.pageYOffset + window.innerHeight }
    let elmtPos = { xMin: this.dmPlayer.offsetLeft, xMax: this.dmPlayer.offsetLeft + this.dmPlayer.offsetWidth, yMin: this.dmPlayer.offsetTop, yMax: this.dmPlayer.offsetTop + this.dmPlayer.offsetHeight }

    if ((displayedScreen.yMin < elmtPos.yMin && displayedScreen.yMax > elmtPos.yMax) && (displayedScreen.xMin < elmtPos.xMin && displayedScreen.xMax > elmtPos.xMax)) {
      this.dmPlayer.play()
    } else {
      this.dmPlayer.pause()
    }
  }

  addListeners () {
    if (!!this.wdmOptions.expandCollapse) {
      this.dmPlayer.addEventListener('end', this.hidePlayer.bind(this))
    }
    if (!!this.wdmOptions.playOnArea) {
      // when the video is loaded, set the video on pause while the user is not seeing it on his screen
      this.dmPlayer.addEventListener('loadedmetadata', () => {
        this.dmPlayer.pause()
        this.isVisibleElement()
      })
      document.addEventListener('scroll', this.isVisibleElement.bind(this))
    }
  }

  removeListeners () {
    this.dmPlayer.removeEventListener('end', this.hidePlayer.bind(this))
    document.removeEventListener('scroll', this.isVisibleElement.bind(this))
    this.dmPlayer.removeEventListener('loadedmetadata', () => {})
  }

  destroy () {
    this.removeListeners()
    this.dmPlayer = null
    OptionBar.destroy()
  }
}
