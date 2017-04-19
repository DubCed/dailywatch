import {isVisibleElement} from '../Utils'

export default class Eos {
  constructor (wdmPlayer) {
    this.wdmPlayer = wdmPlayer
    this.wdmPlayerContainer = this.wdmPlayer.parentNode
    this.initialHeight = this.wdmPlayerContainer.style['height']

    let isVisible = isVisibleElement(this.wdmPlayer, 'partial')
    if (!isVisible.height) {
      this.hidePlayer(false)
    }

    this.addListeners()

    document.removeEventListener('scroll', () => {})
  }

  addListeners () {
    this.wdmPlayer.addEventListener('apiready', this.onDMApiReady.bind(this))
    document.addEventListener('scroll', this.onScroll.bind(this))
    this.wdmPlayer.addEventListener('end', this.onEnded.bind(this))
  }

  removeListeners () {

  }

  hidePlayer (animated = true) {
    this.wdmPlayerContainer.style['height'] = 'auto'
    let className = animated ? ' linearHidden' : ' forcedHidden'
    if (this.wdmPlayer.className === '') {
      this.wdmPlayer.className = className
    } else {
      this.wdmPlayer.className = this.wdmPlayer.className.replace(' linearShow', className)
    }
  }

  onEnded () {
    console.log('on ended')
    this.hidePlayer()
    document.removeEventListener('scroll', () => {})
  }

  showPlayer () {
    this.wdmPlayerContainer.style['height'] = this.initialHeight
    this.wdmPlayer.className = this.wdmPlayer.className.replace(' linearHidden', ' linearShow')
    this.wdmPlayer.className = this.wdmPlayer.className.replace(' forcedHidden', ' linearShow')
    if (this.wdmPlayer.paused) {
      this.wdmPlayer.play()
    }
  }

  onDMApiReady () {
    let isVisible = isVisibleElement(this.wdmPlayer, 'partial')
    if (isVisible.height) {
      this.wdmPlayer.play()
    }
  }

  onScroll () {
    let visible = isVisibleElement(this.wdmPlayer, 'partial')
    if (visible.height) {
      this.showPlayer()
    }
  }
}
