export function isVisibleElement (elmnt, wanted = 'full') {
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
		partial.height = true;
	}

  if (wanted === 'full') {
    return total
  } else {
    return partial
  }
}
