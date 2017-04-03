const playerId = 'player'
const playerObject = document.getElementById(playerId)

const player = loadPlayer()

function loadPlayer () {
  return DM.player(playerObject, {
    video: "x4xswm7",
    width: "480",
    height: "270",
    params: {
        autoplay: true,
        mute: true
    }
  });
}

function hidePlayer () {
  console.log('Video finsih')
  playerObject.style.visibility = 'hidden'
}

document.addEventListener('end', hidePlayer)
