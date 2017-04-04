import WDM from './WDM'

const mainContainerId = 'wdmc'
const playerId = 'player'
const options = {
  video: "x4xswm7",
  width: "480",
  height: "270",
  params: {
      autoplay: true,
      mute: true
  }
}

const wdm = new WDM(playerId, options)

wdm.loadPlayer()


function hidePlayer () {
  document.getElementById(playerId).className += ' hidden';
}

function showPlayer () {
  document.getElementById(playerId).className = document.getElementById(playerId).className.replace(' hidden', '');
}

document.addEventListener('end', hidePlayer)
