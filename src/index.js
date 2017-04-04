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
    expandCollapse: true
  }
}

const wdm = new WDM(playerId, mainContainerId, options)

wdm.loadPlayer()

document.getElementsByClassName('expand')[0].addEventListener('click', function() {
  wdm.showPlayer()
  this.className += ' hidden'
  document.getElementsByClassName('compress')[0].className = document.getElementsByClassName('compress')[0].className.replace(' hidden', '')
})

document.getElementsByClassName('compress')[0].addEventListener('click', function() {
  wdm.hidePlayer()
  this.className += ' hidden'
  document.getElementsByClassName('expand')[0].className = document.getElementsByClassName('expand')[0].className.replace(' hidden', '')
})
