import {isVisibleElement} from '../Utils'

export default class Pip {
  constructor (wdmPlayer, config) {
    this.width = config.width
    this.height = config.height
    this.position = config.position
    this.margin = config.margin

    this.wdmPlayer = wdmPlayer
    this.wdmPlayerContainer = this.wdmPlayer.parentNode

    this.playerHasBeenViewed = false
    this.dataLoaded = false

    this.addListeners()
  }

  defineLoadingState () {
    const isVisible = isVisibleElement(this.wdmPlayerContainer)
    if (isVisible.height) {
      this.playerHasBeenViewed = isVisible.height
      this.wdmPlayer.play()
    }
  }

  addListeners () {
    this.wdmPlayer.addEventListener('apiready', this.onDMApiReady.bind(this))
    document.addEventListener('scroll', this.onScroll.bind(this))
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

  onScroll () {
    if (this.dataLoaded) {
      const isVisible = isVisibleElement(this.wdmPlayerContainer)
      if (!this.playerHasBeenViewed && isVisible.height) {
        this.wdmPlayer.play()
      }
      if (this.playerHasBeenViewed) {
        if (isVisible.height) {
          this.stop()
        } else if (!this.wdmPlayer.paused) {
          // this.addCloseBtn()
          this.addEscapEvent()

          const style = this.defineStyle()
          this.wdmPlayer.style = style
        }
      } else {
        this.playerHasBeenViewed = isVisible.height
      }
    }
  }

  addEscapEvent () {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        if (!this.wdmPlayer.paused) {
          this.wdmPlayer.pause()
        }
        this.stop()
      }
    })
  }

  removeEscapeEvent () {
    document.removeEventListener('keyup', () => {})
  }

  addCloseBtn () {
    if (!document.getElementById('wdm-close-btn')) {
      let btn = document.createElement('div')
      btn.id = 'wdm-close-btn'
      btn.style['background-color'] = 'red'
      btn.style['z-index'] = '2147483647'
      btn.style['width'] = '25px'
      btn.style['height'] = '25px'
      btn.style['position'] = 'absolute'
      btn.style['top'] = '2px'
      btn.style['right'] = '2px'
      // let playerDiv = document.getElementById('player')
      //playerDiv.appendChild(btn)
    }
  }

  stop () {
    this.wdmPlayer.style = ''
    this.removeEscapeEvent()
  }

  defineStyle () {
    let style = 'position: fixed; z-index: 2147483647; '
    style += this.definePosition()

    if (this.width) {
      style += `width: ${this.width}; `
    }
    if (this.height) {
      style += `height: ${this.height}; `
    }
    return style
  }

  definePosition () {
    let res = this.position.split('-')
    const margin = this.margin || '10px'

    let elevation = `bottom: ${this.margin}; `
    let amplitude = `right: ${this.margin}; `

    res.forEach((val, number, key) => {
      if (['bottom', 'top'].indexOf(val) !== -1) {
        elevation = `${val}:${this.margin}; `
      }
      if (['right', 'left'].indexOf(val) !== -1) {
        amplitude = `${val}:${this.margin}; `
      }
    })
    let property = elevation + amplitude
    return property
  }
}
