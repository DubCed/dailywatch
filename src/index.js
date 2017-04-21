// https://developer.dailymotion.com/tools/apiexplorer#/video/info

import Player from './Player'
import {getRandClassName} from './Utils'
import {getJsonOptions} from './fakeWdmApi'

export default class Main {

  constructor () {
    this.playerList = {}
    this.wdmPlayerConfigList = {}
  }

  init () {
    const divs = document.getElementsByClassName('dailymotion-magicEffect')

    for (let element of divs) {
      this.initPlayer(element)
    }
  }

  initPlayer (element) {
    const newName = getRandClassName()
    element.setAttribute('class', newName)

    const container = this.getContainer(element)
    const videoId = this.getVideoId(container)
    const dataPlacement = this.getDataPlacement(container)
    const options = this.getOptions()
    let wdmPlayerConfig = this.getWdmPlayerConfig(dataPlacement)

    const player = new Player(container, wdmPlayerConfig)

    player.init(videoId, options)

    if (!!this.playerList[dataPlacement]) {
      this.playerList[dataPlacement].push({ className: newName, player })
    } else {
      this.playerList[dataPlacement] = [{ className: newName, player }]
    }
  }

  getContainer (element) {
    this.addInsiderDiv(element)

    return element.getElementsByClassName('insider')[0]
  }

  getWdmPlayerConfig (dataPlacement) {
    if (!this.wdmPlayerConfigList[dataPlacement]) {
      this.wdmPlayerConfigList[dataPlacement] = getJsonOptions(dataPlacement)
    }

    return this.wdmPlayerConfigList[dataPlacement]
  }

  addInsiderDiv (divElement) {
    const insiderDiv = document.createElement('div')

    insiderDiv.setAttribute('class', 'insider')
    divElement.appendChild(insiderDiv)
  }

  getVideoId (container) {
    return container.parentElement.getAttribute('data-id')
  }

  getDataPlacement (container) {
    return container.parentElement.getAttribute('data-placement')
  }

  getOptions () {
    return {
      autoplay: false,
      mute: true
    }
  }
}

const main = new Main()
main.init()
