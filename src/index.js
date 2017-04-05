import WDM from './WDM'

const mainContainerId = 'wdmc'
const playerId = 'player'

const options = {
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
    expandCollapse: true,
    playOnArea: true,
    unMuteOnOver: true
  }
}

const wdm = new WDM(playerId, mainContainerId, options)

wdm.loadPlayer()
