import OptionBar from './OptionBar'

export default class WDM {

  constructor (playerId, mainContainerId, { options, magicEffect }) {
    this.playerContainer = document.getElementById(playerId)
    this.mainContainer = document.getElementById(mainContainerId)

    this.dmOptions = options
    this.wdmOptions = magicEffect

    this.pipPlayerHasBeenViewed = false

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

  hidePlayer (animated = true) {
    let className = animated ? ' linearHidden' : ' forcedHidden'
    if (this.dmPlayer.className === '') {
      this.dmPlayer.className = className
    } else {
      this.dmPlayer.className = this.dmPlayer.className.replace(' linearShow', className)
    }
  }

  showPlayer () {
    this.dmPlayer.className = this.dmPlayer.className.replace(' linearHidden', ' linearShow')
    this.dmPlayer.className = this.dmPlayer.className.replace(' forcedHidden', ' linearShow')
    if (this.dmPlayer.paused) {
      this.dmPlayer.play()
    }
  }

  isVisibleElement (elmnt = this.dmPlayer) {
    let displayedScreen = { xMin: window.pageXOffset, xMax: window.pageXOffset + window.innerWidth, yMin: window.pageYOffset, yMax: window.pageYOffset + window.innerHeight }
    let elmtPos = { xMin: elmnt.offsetLeft, xMax: elmnt.offsetLeft + elmnt.offsetWidth, yMin: elmnt.offsetTop, yMax: elmnt.offsetTop + elmnt.offsetHeight }

    if ((displayedScreen.yMin < elmtPos.yMin && displayedScreen.yMax > elmtPos.yMax) && (displayedScreen.xMin < elmtPos.xMin && displayedScreen.xMax > elmtPos.xMax)) {
      return true
    } else {
      return false
    }
  }

  onLoadedMetadata () {
    this.dmPlayer.pause()
    this.onScroll()
  }

  onScroll () {
    this.doesThePlayerHaveToPlay()
  }

  doesThePlayerHaveToPlay () {
    if (this.isVisibleElement()) {
      this.dmPlayer.play()
    } else {
      this.dmPlayer.pause()
    }
  }

  toggleMute () {
    console.log(this.dmPlayer.muted, this.dmPlayer.volume)
    this.dmPlayer.setMuted(!this.dmPlayer.muted)
  }

  onScrollAutoExpand () {
    if (this.isVisibleElement()) {
      this.showPlayer()
    } else {
      this.hidePlayer()
    }
  }

  onScrollActivePIP () {
    if (!this.pipPlayerHasBeenViewed) {
      this.pipPlayerHasBeenViewed = this.isVisibleElement()
    }
    if (this.pipPlayerHasBeenViewed && !this.isVisibleElement()) {
      this.dmPlayer.style = 'position: fixed; bottom: 10px; right: 10px;'
    }
    if (this.isVisibleElement(this.mainContainer)) {
      this.stopPIP()
    }
  }

  stopPIP () {
    this.pipPlayerHasBeenViewed = false
    this.dmPlayer.style = ''
  }

  addListeners () {
    if (!!this.wdmOptions.expandCollapse) {
      this.dmPlayer.addEventListener('end', this.hidePlayer.bind(this))
    }
    if (!!this.wdmOptions.autoExpandOnArea) {
      if (!this.isVisibleElement()) {
        this.hidePlayer(false)
      }
      document.addEventListener('scroll', this.onScrollAutoExpand.bind(this))
      this.dmPlayer.addEventListener('end', this.hidePlayer.bind(this))
    }
    if (!!this.wdmOptions.playOnArea || !!this.wdmOptions.activePIP) {
      // when the video is loaded, set the video on pause while the user is not seeing it on his screen
      this.dmPlayer.addEventListener('loadedmetadata', this.onLoadedMetadata.bind(this))
      document.addEventListener('scroll', this.onScroll.bind(this))
    }
    if (!!this.wdmOptions.activePIP) {
      document.addEventListener('scroll', this.onScrollActivePIP.bind(this))
      this.dmPlayer.addEventListener('end', this.stopPIP.bind(this))
    }
    //if (this.dmOptions.params.mute && !!this.wdmOptions.unMuteOnOver) {
    if (!!this.wdmOptions.unMuteOnOver) {
      this.dmPlayer.addEventListener('mouseover', this.toggleMute.bind(this))
      this.dmPlayer.addEventListener('mouseout', this.toggleMute.bind(this))
    }
  }

  removeListeners () {
    this.dmPlayer.removeEventListener('end', this.hidePlayer.bind(this))
    this.dmPlayer.removeEventListener('loadedmetadata', this.onLoadedMetadata.bind(this))
    document.removeEventListener('scroll', this.onScroll.bind(this))
    this.dmPlayer.removeEventListener('mouseover', this.toggleMute.bind(this))
    this.dmPlayer.removeEventListener('mouseout', this.toggleMute.bind(this))
    document.addEventListener('scroll', this.onScrollAutoExpand.bind(this))
    document.removeEventListener('scroll', this.onScrollActivePIP.bind(this))
    this.dmPlayer.removeEventListener('end', this.stopPIP.bind(this))
  }

  destroy () {
    this.removeListeners()
    this.dmPlayer = null
    OptionBar.destroy()
  }
}
