import {isVisibleElement} from '../Utils'

export default class Stp {
  constructor (wdmPlayer, config) {
    this.wdmPlayer = wdmPlayer
    this.dataLoaded = false
    this.contentAlreadyStreamed = false

    this.visibilityPercent = config.visibilityPercent

    this.addListeners()
  }

  addListeners () {
    this.wdmPlayer.addEventListener('apiready', this.onDMApiReady.bind(this))
    document.addEventListener('scroll', this.onScroll.bind(this))
    this.wdmPlayer.addEventListener('end', this.onContentEnded.bind(this))
  }

  removeListeners () {
    this.wdmPlayer.removeEventListener('apiready', this.onDMApiReady.bind(this))
    document.removeEventListener('scroll', this.onScroll.bind(this))
    this.wdmPlayer.removeEventListener('end', this.onContentEnded.bind(this))
  }

  onDMApiReady () {
    this.dataLoaded = true
    this.defineLoadingState()
  }

  defineLoadingState () {
    const isVisible = isVisibleElement(this.wdmPlayer, 'partial', this.visibilityPercent)
    if (isVisible.height) {
      this.wdmPlayer.play()
    }
  }

  onScroll () {
    if (this.dataLoaded && !this.contentAlreadyStreamed) {
      const isVisible = isVisibleElement(this.wdmPlayer, 'partial', this.visibilityPercent)
      if (isVisible.height) {
        this.wdmPlayer.play()
      } else {
        this.wdmPlayer.pause()
      }
    }
  }

  onContentEnded () {
    this.contentAlreadyStreamed = true
  }
}
