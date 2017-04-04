export default class WDM {

  constructor (playerId, options) {
    this.playerId = playerId
    this.options = options
  }

  loadPlayer () {
    return DM.player(document.getElementById(this.playerId), {
      video: "x4xswm7",
      width: "480",
      height: "270",
      params: {
          autoplay: true,
          mute: true
      }
    });
  }
}
