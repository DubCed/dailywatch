export default class Imod {
  constructor (wdmPlayer, config) {
    this.width = config.width
    this.height = config.height

    this.wdmPlayer = wdmPlayer
    this.wdmPlayerContainer = this.wdmPlayer.parentNode

    this.immersiveModeDivId = 'wdm-immersivemode'
    this.hoverPlayerDivId = 'wdm-hover-player'
    this.wdmPlayerContainer.style.position = 'relative'

    // this.addListeners()
    this.createDivPlayer()
  }

  addListeners () {
    /*this.wdmPlayerContainer.addEventListener('click', this.test.bind(this))
    this.wdmPlayerContainer.addEventListener('contextmenu', this.test.bind(this))
    this.wdmPlayerContainer.addEventListener('dblclick', this.test.bind(this))
    this.wdmPlayerContainer.addEventListener('mousedown', this.test.bind(this))*/
  }

  removeListeners () {

  }

  createDivPlayer () {
    let divPlayer = document.createElement('div')
    divPlayer.id = this.hoverPlayerDivId
    divPlayer.style = 'height: ' + this.wdmPlayer.height + 'px; width: ' + this.wdmPlayer.width + 'px; position: absolute; top: 0; left: 0;'
    this.wdmPlayerContainer.appendChild(divPlayer)
    divPlayer.addEventListener('click', this.open.bind(this))
  }

  open () {
    let immersiveModeDiv = document.createElement('div')
    immersiveModeDiv.id = this.immersiveModeDivId
    immersiveModeDiv.style = 'background: black; width: 100%; height: 100%; position: fixed; top: 0; left: 0; opacity: 0.9; z-index: 5; '
    // this.wdmPlayerContainer.insertBefore(immersiveModeDiv, this.wdmPlayerContainer)
    document.body.appendChild(immersiveModeDiv)
    this.wdmPlayer.style = this.defineStyle()
    console.log(this.wdmPlayer.style)
    this.wdmPlayer.setMuted(false)
    // immersiveModeDiv.addEventListener('click', this.closeImmersiveMode.bind(this))
    let divPlayer = document.getElementById(this.hoverPlayerDivId)
    divPlayer.style.display = 'none'
  }

  defineStyle () {
    let style = ''
    style = `width: ${this.width}px; height: ${this.height}px; position: fixed; bottom: ${(window.innerHeight-this.height)/2}px; right: ${(window.innerWidth-this.width)/2}px; `
    console.log('define style', style)
    return style
  }
}
