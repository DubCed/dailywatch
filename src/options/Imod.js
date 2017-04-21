export default class Imod {
  constructor (wdmPlayer, config) {
    this.width = config.width
    this.height = config.height
    this.apiType = config.apiType
    this.apiId = config.apiId

    this.wdmPlayer = wdmPlayer
    this.wdmPlayerContainer = this.wdmPlayer.parentNode
    this.wdmMagicEffect = this.wdmPlayerContainer.parentNode

    this.immersiveModeDivId = 'wdm-immersivemode'
    this.videoListDivId = 'wdm-video-list'
    this.wdmPlayerContainer.style.position = 'relative'

    this.getContentsFromPlaylist()

    this.wdmPlayer.addEventListener('start', this.open.bind(this))
    this.wdmPlayer.addEventListener('video_end', this.next.bind(this))
  }

  getContentsFromPlaylist () {
    fetch(`https://api.dailymotion.com/${this.apiType}/${this.apiId}/videos?fields=id,title,thumbnail_60_url`).then((request) => {
      return request.text()
    }).then((response) => {
      const playlist = JSON.parse(response)
      this.createContentList(playlist)
    })
  }

  createContentList (playlist) {
    this.playlist = playlist
    this.contentList = playlist.list
    this.contentIdList = playlist.list.map(({id}) => { return id })
  }

  createImmersiveModeDiv () {
    let immersiveModeDiv = document.createElement('div')
    immersiveModeDiv.id = this.immersiveModeDivId
    immersiveModeDiv.style = `background: black; width: 100%; height: 100%; position: fixed; top: 0; left: 0; opacity: 0.9; z-index: 5; display: block; `

    immersiveModeDiv.addEventListener('click', this.close.bind(this))
    document.addEventListener('keyup', this.handleKeyBinding.bind(this))

    this.wdmMagicEffect.insertBefore(immersiveModeDiv, this.wdmPlayerContainer)
  }

  open () {
    this.wdmPlayer.removeEventListener('start', this.open.bind(this))
    this.displayImmersiveMode()
  }

  displayImmersiveMode () {
    let divImmersiveMode = document.getElementById(this.immersiveModeDivId)
    let videoListDiv = document.getElementById(this.videoListDivId)
    if (!divImmersiveMode) {
      this.createImmersiveModeDiv()
      this.createVideoList()
    } else if (divImmersiveMode.style.display === 'none') {
      divImmersiveMode.style.display = 'block'
      videoListDiv.style.display = 'block'

      divImmersiveMode.addEventListener('click', this.close.bind(this))
      document.addEventListener('keyup', this.handleKeyBinding.bind(this))
    }
    this.wdmPlayer.style = this.defineStyle()
  }

  hideImmersiveMode () {
    let divImmersiveMode = document.getElementById(this.immersiveModeDivId)
    let videoListDiv = document.getElementById(this.videoListDivId)

    divImmersiveMode.removeEventListener('click', this.close.bind(this))
    document.removeEventListener('keyup', this.handleKeyBinding.bind(this))

    if (divImmersiveMode.style.display === 'block') {
      divImmersiveMode.style.display = 'none'
      videoListDiv.style.display = 'none'
    }
    this.wdmPlayer.style = ''
  }

  handleKeyBinding (e) {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  close () {
    console.log('close')
    this.hideImmersiveMode()
    this.wdmPlayer.removeEventListener('video_end', this.next.bind(this))
  }

  createVideoList () {
    let videoListDiv = document.createElement('div')
    videoListDiv.id = this.videoListDivId
    videoListDiv.style.position = 'fixed'
    videoListDiv.style.top = `${window.innerHeight/2 + this.height/2}px`
    videoListDiv.style.right = `${(window.innerWidth-this.width)/2}px`
    videoListDiv.style['z-index'] = 2147483647
    videoListDiv.style.background = 'black'
    videoListDiv.style.width = this.width+'px'
    videoListDiv.style.height = '100px'

    this.contentList.forEach((content) => {
      let videoDiv = document.createElement('div')
      videoDiv.id = content.id
      videoDiv.style.display = 'inline-block'
      videoDiv.style.float = 'left'
      videoDiv.class = 'wdmContentReco'

      let imgElmt = document.createElement('img')
      imgElmt.src = content.thumbnail_60_url

      let titleElement = document.createElement('p')
      titleElement.textContent = content.title

      videoDiv.appendChild(imgElmt)
      videoDiv.appendChild(titleElement)

      videoDiv.addEventListener('click', () => {
        this.wdmPlayer.load(videoDiv.id)
        this.wdmPlayer.video = videoDiv.id
      })

      videoListDiv.appendChild(videoDiv)
    })

    this.wdmPlayerContainer.appendChild(videoListDiv)
  }

  next () {
    const currentIndex = this.contentIdList.indexOf(this.wdmPlayer.video)
    let nextVideo = null
    if (currentIndex >= 0) {
      if (this.contentIdList[currentIndex+1] !== undefined) {
        nextVideo = this.contentIdList[currentIndex+1]
      }
    } else {
      console.log('first one', this.contentIdList[0])
      nextVideo = this.contentIdList[0]
    }
    if (nextVideo) {
      this.wdmPlayer.load(nextVideo)
      this.wdmPlayer.video = nextVideo
    } else {
      this.close()
    }
  }

  defineStyle () {
    return `width: ${this.width}px; height: ${this.height}px; position: fixed; bottom: ${(window.innerHeight-this.height)/2}px; right: ${(window.innerWidth-this.width)/2}px; z-index: 2147483647;`
  }
}
