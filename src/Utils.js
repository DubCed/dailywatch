export function isVisibleElement (elmnt, wanted = 'full', visibilityPercent = 60) {
  let parentElmnt = elmnt.offsetParent

  let displayedScreen = {
    xMin: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    xMax: window.pageXOffset + window.innerWidth || document.documentElement.scrollLeft + document.documentElement.clientWidth || document.body.scrollLeft + document.body.clientWidth,
    yMin: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
    yMax: window.pageYOffset + window.innerHeight || document.documentElement.scrollTop + document.documentElement.clientHeight || document.body.scrollTop + document.body.clientHeight
  }
  let elmtPos = {
    xMin: elmnt.offsetLeft,
    yMin: elmnt.offsetTop
  }

  while (parentElmnt) {
    elmtPos.xMin += parentElmnt.offsetLeft
    elmtPos.yMin += parentElmnt.offsetTop
    parentElmnt = parentElmnt.offsetParent
  }

  elmtPos.xMax = elmtPos.xMin + elmnt.offsetWidth
  elmtPos.yMax = elmtPos.yMin + elmnt.offsetHeight

  let total = { height: false, width: false }
  let partial = { height: false, width: false }

  if (displayedScreen.xMin <= elmtPos.xMin && displayedScreen.xMax >= elmtPos.xMax) {
		total.width = true;
    partial.width = true;
	} else if (!(displayedScreen.xMax < elmtPos.xMin || displayedScreen.xMin > elmtPos.xMax)) {
		partial.width = true;
	}
	if (displayedScreen.yMin <= elmtPos.yMin && displayedScreen.yMax >= elmtPos.yMax) {
		total.height = true;
    partial.height = true;
	} else if (!(displayedScreen.yMax < elmtPos.yMin || displayedScreen.yMin > elmtPos.yMax)) {
    let hiddenPercent = 0
    const visibility1 = displayedScreen.yMin - elmtPos.yMin
    const visibility2 = elmtPos.yMax - displayedScreen.yMax
    if (visibility1 > 0) {
      hiddenPercent = visibility1 / elmnt.height
    }
    if (visibility2 > 0) {
      hiddenPercent = visibility2 / elmnt.height
    }
    if (100 - (hiddenPercent*100) > visibilityPercent) {
      partial.height = true;
    }
	}

  if (wanted === 'full') {
    return total
  } else {
    return partial
  }
}

export function getRandClassName () {
  return 'wdm-' + Math.random().toString(36).substr(2, 5)
}

export function debounce (func, wait, immediate) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}

export function addClassName (element, className) {
  // element.setAttribute('class', `${element.getAttribute('class')} ${className}`)
  element.classList.add(className)
}

export function removeClassName (element, className) {
  // element.setAttribute('class', element.getAttribute('class').replace(` ${className}`, ''))
  element.classList.remove(className)
}

export function addOrRemoveClassName (element, className) {
  if (element.classList.contains(className)) {
    removeClassName(element, className)
  } else {
    addClassName(element, className)
  }
}
