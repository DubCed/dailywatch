//import WDM from './WDM'
import Player from './Player'

/*const options = {
  options: {
    video: "x4xswm7",
    width: "480",
    height: "270",
    params: {
        autoplay: true,
        mute: true
    },
  },
  magicEffect: {
    expandCollapse: false,
    playOnArea: false,
    unMuteOnOver: false,
    autoExpandOnArea: false,
    activePIP: false,
    activeImmersiveMode: false
  }
}*/

/*const query = window.location.search.substring(1)
const vars = query.split("=")
switch (vars[1]) {
  case '1':
    options.magicEffect.expandCollapse = true
    break;

  case '2':
    options.magicEffect.playOnArea = true
    break;

  case '3':
    options.magicEffect.unMuteOnOver = true
    break;

  case '4':
    options.magicEffect.autoExpandOnArea = true
    break;

  case '5':
    options.magicEffect.activePIP = true
    break;

  case '6':
    options.magicEffect.activeImmersiveMode = true
    break;
}
console.log(options)*/

var divs = document.getElementsByClassName('dailymotion-magicEffect');
const player = new Player(divs[0])
const videoId = 'x5h921v'
const options = {
  autoplay: true,
  mute: true
}
player.init(videoId, options)

// wdm.loadPlayer()
