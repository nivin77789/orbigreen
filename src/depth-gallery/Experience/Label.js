class Label {
  constructor(gallery, container = null) {
    this.gallery = gallery
    this.container = container

    this.overlayElement = null
    this.leftIndexElement = null
    this.wordElement = null
    this.categoryElement = null
    this.descriptionElement = null
    this.activePlaneIndex = -1
  }

  setContainer(container) {
    this.container = container
  }

  createElement() {
    const element = document.createElement('section')
    element.className = 'plane-label-overlay'
    element.innerHTML = `
      <div class="plane-label-overlay__left">
        <p class="plane-label-overlay__index"></p>
        <p class="plane-label-card__word"><span class="plane-label-card__word-text"></span></p>
      </div>
      <div class="plane-label-overlay__right">
        <p class="plane-label-card__category"></p>
        <p class="plane-label-card__description"></p>
      </div>
    `

    return {
      element,
      leftIndexElement: element.querySelector('.plane-label-overlay__index'),
      wordElement: element.querySelector('.plane-label-card__word-text'),
      categoryElement: element.querySelector('.plane-label-card__category'),
      descriptionElement: element.querySelector('.plane-label-card__description'),
    }
  }

  init() {
    if (this.overlayElement) return

    const {
      element,
      leftIndexElement,
      wordElement,
      categoryElement,
      descriptionElement,
    } = this.createElement()

    this.overlayElement = element
    this.leftIndexElement = leftIndexElement
    this.wordElement = wordElement
    this.categoryElement = categoryElement
    this.descriptionElement = descriptionElement
    this.overlayElement.style.opacity = '0'

    const mountTarget = this.container || document.body
    mountTarget.append(this.overlayElement)
  }

  getTargetPlaneIndex(cameraZ) {
    const blendData = this.gallery.getPlaneBlendData(cameraZ)
    if (!blendData) return -1
    return blendData.blend >= 0.5 ? blendData.nextPlaneIndex : blendData.currentPlaneIndex
  }

  applyPlaneContent(planeIndex) {
    const plane = this.gallery.planes[planeIndex]
    if (!plane || this.activePlaneIndex === planeIndex) return

    const labelData = plane.userData.label || {}

    this.leftIndexElement.textContent = String(planeIndex + 1).padStart(2, '0')
    this.wordElement.textContent = labelData.word || 'Product'
    this.categoryElement.textContent = labelData.category || 'Industrial'
    this.descriptionElement.textContent = labelData.description || ''
    this.overlayElement.style.setProperty('--label-text', '#ffffff')
    this.overlayElement.style.setProperty('--label-highlight', '#ffffff')

    this.activePlaneIndex = planeIndex
  }

  resize() {}

  update(camera = null) {
    if (!camera || !this.overlayElement) return

    const targetPlaneIndex = this.getTargetPlaneIndex(camera.position.z)
    if (targetPlaneIndex < 0) {
      this.overlayElement.style.opacity = '0'
      return
    }

    this.applyPlaneContent(targetPlaneIndex)
    this.overlayElement.style.opacity = '1'
  }

  render() {}

  dispose() {
    this.overlayElement?.remove()
    this.overlayElement = null
    this.leftIndexElement = null
    this.wordElement = null
    this.categoryElement = null
    this.descriptionElement = null
    this.activePlaneIndex = -1
  }
}

export { Label }
