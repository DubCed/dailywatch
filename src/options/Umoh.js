export default class Umoh {
  constructor (wdmPlayer, ...others) {
    this.wdmPlayer = wdmPlayer
    this.addListeners()
  }

  addListeners () {
    this.wdmPlayer.addEventListener('apiready', this.onDMApiReady.bind(this))
    this.wdmPlayer.addEventListener('mouseover', this.toggleMute.bind(this))
    this.wdmPlayer.addEventListener('mouseout', this.toggleMute.bind(this))
  }

  removeListeners () {
    this.wdmPlayer.removeEventListener('apiready', this.onDMApiReady.bind(this))
    this.wdmPlayer.removeEventListener('mouseover', this.toggleMute.bind(this))
    this.wdmPlayer.removeEventListener('mouseout', this.toggleMute.bind(this))
  }

  onDMApiReady () {
    this.wdmPlayer.play()
  }

  toggleMute () {
    this.wdmPlayer.toggleMuted()
  }
}
