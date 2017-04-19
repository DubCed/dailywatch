export default class Eac {
  constructor (wdmPlayer) {
    this.wdmPlayer = wdmPlayer
    this.wdmPlayerContainer = this.wdmPlayer.parentNode

    this.initialHeight = this.wdmPlayerContainer.style['height']
    this.wdmPlayerContainer.style['position'] = 'relative'

    this.createDivTop()

    this.addListeners()
  }

  addListeners () {
    this.wdmPlayer.addEventListener('end', this.hidePlayer.bind(this))
    let btnExpand = document.getElementById('expand')
    let btnCollapse = document.getElementById('collapse')
    btnExpand.addEventListener('click', this.showPlayer.bind(this))
    btnCollapse.addEventListener('click', this.hidePlayer.bind(this))
  }

  removeListeners () {

  }

  showPlayer () {
    this.wdmPlayerContainer.style['height'] = this.initialHeight
    this.wdmPlayer.className = this.wdmPlayer.className.replace(' linearHidden', ' linearShow')
    this.wdmPlayer.className = this.wdmPlayer.className.replace(' forcedHidden', ' linearShow')
    if (this.wdmPlayer.paused) {
      this.wdmPlayer.play()
    }
  }

  hidePlayer (animated = true) {
    this.wdmPlayerContainer.style['height'] = 'auto'
    let className = animated ? ' linearHidden' : ' forcedHidden'
    if (this.wdmPlayer.className === '') {
      this.wdmPlayer.className = className
    } else {
      this.wdmPlayer.className = this.wdmPlayer.className.replace(' linearShow', className)
    }
    if (!this.wdmPlayer.paused) {
      this.wdmPlayer.pause()
    }
  }

  createDivTop () {
    let div = document.createElement('div')
    div.id = 'expand-collapse'
    div.style['position'] = 'absolute'
    div.style['top'] = '0px'
    div.style['left'] = '0px'
    div.style['z-index'] = '2147483647'
    div.style['width'] = '100%'
    div.style['height'] = '25px'
    div.style['min-height'] = '25px'

    let btnExpand = document.createElement('div')
    btnExpand.id = 'expand'
    btnExpand.style['background-color'] = 'green'
    btnExpand.style['width'] = '25px'
    btnExpand.style['height'] = '25px'
    btnExpand.style['display'] = 'inline-block'
    btnExpand.style['float'] = 'right'

    let btnCollapse = document.createElement('div')
    btnCollapse.id = 'collapse'
    btnCollapse.style['background-color'] = 'blue'
    btnCollapse.style['width'] = '25px'
    btnCollapse.style['height'] = '25px'
    btnCollapse.style['display'] = 'inline-block'
    btnCollapse.style['float'] = 'right'

    div.appendChild(btnExpand)
    div.appendChild(btnCollapse)

    this.wdmPlayerContainer.appendChild(div)
  }
}
