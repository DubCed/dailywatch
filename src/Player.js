import WDM from './WDM'

export default class Player {
  constructor (container, wdmPlayerConfig) {
    this.container = container
    this.wdmPlayerConfig = wdmPlayerConfig
  }

  initPlayer (videoId, optionParams) {
    // Load a new player in the designated container
    const playerDiv = document.createElement('div')
    playerDiv.style['background-color'] = 'black'
    this.container.appendChild(playerDiv)

    const playerConfig = {
      width: "480",
      height: "270",
      video: videoId,
      params: optionParams
    }

    // creation of WDM player
    new WDM(playerDiv, playerConfig, this.wdmPlayerConfig)
  }

  init (videoId, optionParams) {
    this.loadAsync(videoId, optionParams)
  }

  loadAsync (videoId, optionParams) {
    if (!('DM' in window)) {
      // Load script only 1 time regardless of multiple loadAsync executions
      window.dmAsyncInit = () => {
        window.dmAsynInit = null
        console.log('------------------> 2')
        this.initPlayer(videoId, optionParams)
      }
      (function() {
        var e = document.createElement('script')
        e.async = true
        e.src = 'http://api.dmcdn.net/all.js'
        /** @type {HTMLElement} */
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(e, s)
        console.log('------------------> 1')
      })()
    } else {
      this.initPlayer(videoId, optionParams)
    }
  };
}
