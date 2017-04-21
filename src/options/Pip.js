import {addClassName, addOrRemoveClassName, debounce, isVisibleElement, removeClassName} from '../Utils'

export default class Pip {
  constructor (wdmPlayer, config) {
    this.width = config.width
    this.height = config.height
    this.initWidth = wdmPlayer.getAttribute('width')
    this.initHeight = wdmPlayer.getAttribute('height')
    this.position = config.position
    this.margin = config.margin || 10
    this.effectDuration = 1

    this.wdmPlayer = wdmPlayer
    this.wdmPlayerContainer = this.wdmPlayer.parentNode

    this.playerHasBeenViewed = false
    this.dataLoaded = false
    this.reduced = false

    this.addListeners()
    this.addStyle()
  }

  defineLoadingState () {
    const isVisible = isVisibleElement(this.wdmPlayerContainer)
    if (!!isVisible.height) {
      this.playerHasBeenViewed = isVisible.height
      this.wdmPlayer.play()
    }
  }

  addListeners () {
    this.wdmPlayer.addEventListener('apiready', this.onDMApiReady.bind(this))
    document.addEventListener('scroll', debounce(this.onScroll.bind(this), 100))
    this.wdmPlayer.addEventListener('end', this.stop.bind(this))
  }

  removeListeners () {
    this.wdmPlayer.removeEventListener('apiready', this.onDMApiReady.bind(this))
    document.removeEventListener('scroll', this.onScroll.bind(this))
    this.wdmPlayer.removeEventListener('end', this.stop.bind(this))
  }

  onDMApiReady () {
    this.dataLoaded = true
    this.defineLoadingState()
  }

  addStyle () {
    const style = document.createElement('style')
    style.innerHTML += `i.wdm-btn-close {
      z-index: 2147483647;
      position: absolute;
      top: 9px;
      left: 9px;
      width: 25px;
      height: 25px;
      cursor: pointer;
      color: #ffffff;
    }`
    style.innerHTML += `div.insider {
      z-index: 2147483647;
    }`
    style.innerHTML += `.pip {
      z-index: 2147483647;
      position: fixed;
      ${this.definePosition()}
      width: ${this.width}px;
      height: ${this.height}px;
    }`
    style.innerHTML += `.dmp_Dock {
      display: none;
    }`
    this.wdmPlayer.parentElement.parentElement.appendChild(style)
  }

  reducePlayer () {
    if (!this.reduced) {
      this.reduced = true
      const finalSize = {w: this.width, h: this.height}
      const delta = this.calculateTranslation(this.wdmPlayer, finalSize, 'reduce')
      this.addPoster()
      this.translate(this.wdmPlayer, delta, finalSize)
      this.addCloseBtn()
      this.addEscapEvent()
    }
  }

  maximizePlayer () {
    if (this.reduced) {
      this.reduced = false
      const finalSize = {w: this.initWidth, h: this.initHeight}
      const delta = this.calculateTranslation(this.wdmPlayer, finalSize, 'maximize')
      this.removeCloseBtn()
      this.removeEscapeEvent()
      this.translate(this.wdmPlayer, delta, finalSize)
      this.removePoster()
    }
  }

  addPoster () {
    // const posterStyle = this.wdmPlayer.getElementsByClassName('dmp_Poster')[0].getAttribute('style')
    // console.log(this.wdmPlayer.getElementsByClassName('dmp_Poster'))
  }

  removePoster () {

  }

  calculateTranslation (element, finalSize, effect) {
    const coordinates = element.getBoundingClientRect()
    const toCoordinates = element.parentElement.parentElement.getBoundingClientRect()
    const res = this.position.split('-')
    const verticalScrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    const horizontalScrollBarWidth = window.innerHeight - document.documentElement.clientHeight
    const delta = {}

    res.forEach((val, number, key) => {
      if (['bottom', 'top'].indexOf(val) !== -1) {
        delta.y = effect === 'reduce'
          ? val === 'top'
            ? coordinates.bottom - this.margin - finalSize.w - horizontalScrollBarWidth
            : document.documentElement.clientHeight - coordinates.top - this.margin - finalSize.h
          : val === 'bottom'
            ? toCoordinates.top - coordinates.top
            : toCoordinates.bottom - coordinates.bottom
      }
      if (['right', 'left'].indexOf(val) !== -1) {
        delta.x = effect === 'reduce'
          ? val === 'left'
            ? coordinates.right - this.margin - finalSize.h - verticalScrollBarWidth
            : document.documentElement.clientWidth - coordinates.left - this.margin - finalSize.w
          : val === 'right'
            ? toCoordinates.left - coordinates.left
            : toCoordinates.right - coordinates.right
      }
    })

    return delta
  }

  translate (element, delta, finalSize) {
    element.style.transform = `translateX(${delta.x}px) translateY(${delta.y}px)`
    element.style.transition = `all ${this.effectDuration}s ease-in-out`
    element.width = `${finalSize.w}px`
    element.height = `${finalSize.h}px`
    element.style.zIndex = '2147483647'
    setTimeout(() => {
      element.style = ''
      if (element === this.wdmPlayer) {
        addOrRemoveClassName(this.wdmPlayer.parentElement, 'pip')
      }
    }, this.effectDuration * 1000)
  }

  onScroll () {
    if (!!this.dataLoaded) {
      const isVisible = isVisibleElement(this.wdmPlayer)
      if (!this.playerHasBeenViewed && isVisible.height) {
        this.wdmPlayer.play()
      }
      if (this.playerHasBeenViewed) {
        if (isVisible.height) {
          console.log('reinit')
          this.stop()
        } else if (!this.wdmPlayer.paused) {
          console.log('reduce')
          this.reducePlayer()
        }
      } else {
        this.playerHasBeenViewed = isVisible.height
      }
    }

    return true
  }

  addEscapEvent () {
    document.addEventListener('keyup', this.closeMiniPlayer.bind(this))
  }

  removeEscapeEvent () {
    document.removeEventListener('keyup', () => {})
  }

  addCloseBtn () {
    const btn = document.createElement('i')
    btn.setAttribute('class', 'fa fa-close fa-lg wdm-btn-close')
    btn.addEventListener('click', this.closeMiniPlayer.bind(this))
    this.wdmPlayer.parentElement.appendChild(btn)
  }

  removeCloseBtn () {
    const btn = this.wdmPlayer.parentElement.getElementsByClassName('wdm-btn-close')
    if (!!btn[0]) {
      this.wdmPlayer.parentElement.removeChild(btn[0])
    }
    document.removeEventListener('keyup', () => {})
  }

  closeMiniPlayer (event) {
    if (!event.keyCode || event.keyCode === 27) {
      if (!this.wdmPlayer.paused) {
        this.wdmPlayer.pause()
      }
      this.stop()
    }
  }

  stop () {
    this.maximizePlayer()
    this.removeEscapeEvent()
  }

  definePosition () {
    const res = this.position.split('-')
    const margin = this.margin || 10

    let elevation = `bottom: ${this.margin}px; `
    let amplitude = `right: ${this.margin}px; `

    res.forEach((val, number, key) => {
      if (['bottom', 'top'].indexOf(val) !== -1) {
        elevation = `${val}:${this.margin}px; `
      }
      if (['right', 'left'].indexOf(val) !== -1) {
        amplitude = `${val}:${this.margin}px; `
      }
    })

    return elevation + amplitude
  }
}
