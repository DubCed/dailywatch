export default class WDM {
  immersiveModeDivId = 'immersiveMode'
  divPlayerId = 'divPlayer'

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
    // OptionBar.displayControls(this.mainContainer, this.wdmOptions, this.callbacks)
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
    this.dmPlayer.toggleMuted()
  }

  onScrollAutoExpand () {
    if (this.isVisibleElement()) {
      this.showPlayer()
    } else {
      this.hidePlayer()
    }
  }

  onScrollActivePIP () {
    if (this.pipPlayerHasBeenViewed) {
      if (!this.isVisibleElement()) {
        this.dmPlayer.style = 'position: fixed; bottom: 10px; right: 10px;'
      }
      if (this.isVisibleElement(this.mainContainer)) {
        this.stopPIP()
      }
    } else {
      this.pipPlayerHasBeenViewed = this.isVisibleElement()
    }
  }

  stopPIP () {
    this.pipPlayerHasBeenViewed = false
    this.dmPlayer.style = ''
  }

  createDivPlayer () {
    let divPlayer = document.createElement('div')
    divPlayer.id = this.divPlayerId
    divPlayer.style = 'height: ' + this.dmPlayer.height + 'px; width: ' + this.dmPlayer.width + 'px; position: absolute; top: 0; left: 0;'
    this.mainContainer.appendChild(divPlayer)
    divPlayer.addEventListener('click', this.openImmersiveMode.bind(this))
  }

  openImmersiveMode () {
    let immersiveModeDiv = document.createElement('div')
    immersiveModeDiv.id = this.immersiveModeDivId
    immersiveModeDiv.style = 'background: black; width: 100%; height: 100%; position: fixed; top: 0; left: 0; opacity: 0.9;'
    document.body.insertBefore(immersiveModeDiv, this.mainContainer)
    this.dmPlayer.style = 'position: fixed; bottom: ' + (window.innerHeight-this.dmPlayer.offsetHeight) / 2 + 'px; right: ' + (window.innerWidth-this.dmPlayer.offsetWidth) / 2 + 'px;'
    this.dmPlayer.setMuted(false)
    immersiveModeDiv.addEventListener('click', this.closeImmersiveMode.bind(this))
    let divPlayer = document.getElementById(this.divPlayerId)
    divPlayer.style.display = 'none'
  }

  closeImmersiveMode () {
    this.dmPlayer.style = ''
    const immersiveModeDiv = document.getElementById(this.immersiveModeDivId)
    immersiveModeDiv.parentNode.removeChild(immersiveModeDiv)
    this.dmPlayer.setMuted(true)
    let divPlayer = document.getElementById(this.divPlayerId)
    divPlayer.style.display = 'block'
  }

  addListeners () {
    if (!!this.wdmOptions.expandCollapse) {
      this.mainContainer.style.height = 'auto'
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
    if (!!this.wdmOptions.unMuteOnOver) {
      this.dmPlayer.addEventListener('mouseover', this.toggleMute.bind(this))
      this.dmPlayer.addEventListener('mouseout', this.toggleMute.bind(this))
    }
    if (!!this.wdmOptions.activeImmersiveMode) {
      this.mainContainer.style.position = 'relative'
      this.createDivPlayer()
      this.dmPlayer.addEventListener('click', this.openImmersiveMode.bind(this))
      document.addEventListener('keyup', (e) => {
        if (document.getElementById(this.immersiveModeDivId)) {
          if (e.keyCode === 27) { this.closeImmersiveMode() }
        }
      })
      this.dmPlayer.addEventListener('end', this.closeImmersiveMode.bind(this))
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
    this.mainContainer.removeEventListener('click', this.openImmersiveMode.bind(this))
    document.removeEventListener('keyup', () => {})
    const immersiveModeDiv = document.getElementById(this.immersiveModeDivId)
    if (immersiveModeDiv) {
      immersiveModeDiv.removeEventListener('click', this.closeImmersiveMode.bind(this))
    }
    this.dmPlayer.removeEventListener('end', this.closeImmersiveMode.bind(this))
    const divPlayer = document.getElementById(this.divPlayerId)
    if (divPlayer) {
      divPlayer.addEventListener('click', this.openImmersiveMode.bind(this))
    }
  }

  destroy () {
    this.removeListeners()
    this.dmPlayer = null
  }
}
