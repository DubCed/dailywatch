import Player from './Player'

const divs = document.getElementsByClassName('dailymotion-magicEffect')
const container = divs[0].getElementsByClassName('insider')[0]
console.log(container)
const player = new Player(container)
const videoId = container.parentElement.getAttribute('data-id')
const options = {
  autoplay: false,
  mute: true
}
player.init(videoId, options)
