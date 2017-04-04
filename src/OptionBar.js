class OptionBar {

  constructor () {
    this.listenerMap = []
  }

  displayControls (parentElement, magicEffect, callbacks) {
    const container = document.createElement('div')
    container.className = 'optionBar'

    if (!!magicEffect.expandCollapse) {
      this.manageExpandCollapse(container, callbacks.expandCollapse)
    }

    parentElement.appendChild(container)
  }

  // -- EXPAND / COLLAPSE buttons management
  manageExpandCollapse (parentElement, callbacks) {
    this.addExpandButton(parentElement, callbacks.expand)
    this.addCollapseButton(parentElement, callbacks.collapse)
    // this.hideElement(parentElement.getElementsByClassName('expand')[0])
  }

  addExpandButton (parentElement, callback) {
    const i = document.createElement('i')
    i.className = 'fa fa-expand expand icon'
    this.addCallbackOnClick(i, callback)
    parentElement.appendChild(i)
  }

  addCollapseButton (parentElement, callback) {
    const i = document.createElement('i')
    i.className = 'fa fa-compress compress icon'
    this.addCallbackOnClick(i, callback)
    parentElement.appendChild(i)
  }

  // -- Internal functions
  addCallbackOnClick(element, callback) {
    if (typeof callback === 'function') {
      this.listenerMap.push({element: element, event: 'click', callback: callback})
      element.addEventListener('click', callback)
    }
  }

  showElement (element) {
    this.delClass(element, 'hidden')
  }

  hideElement (element) {
    this.addClass(element, 'hidden')
  }

  getElementByClass (className) {
    document.getElementsByClassName(className)[0]
  }

  addClass (element, className) {
    element.className += ' ' + className
  }

  delClass (element, className) {
    element.className = element.className.replace(' ' + className, '')
  }

  destroy () {
    this.listnerMap.forEach((item) => item.element.removeEventListener(item.event, item.callback))
  }
}

let optionBar = new OptionBar();

export default optionBar;
