export default class Player {
  constructor (container) {
    this.container = container
    this.dmPlayer = null
  }

  initPlayer (videoId, optionParams) {
    // Load a new player in the designated container
    var playerDiv = document.createElement('div')
    playerDiv.style['background-color'] = 'black'
    this.container.appendChild(playerDiv);
    this.dmPlayer = DM.player(playerDiv, {
      'width': '100%',
      'height': '100%',
      'video': videoId,
      'params': optionParams
    })
  }

  init (videoId, optionParams) {
    this.loadAsync(videoId, optionParams)
  }

  play (videoId, optionParams) {
    if (!this.dmPlayer) {
      this.init(videoId, optionParams)
    } else {
      // Switch to requested video
      this.dmPlayer.init(videoId, optionParams)
    }
  };


  remove () {
   if (this.dmPlayer) {
     // dom.remove(this.dmPlayer);
     this.dmPlayer = null
   }
  };

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
