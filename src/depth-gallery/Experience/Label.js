class Label {
  constructor(gallery, container = null) {
    this.gallery = gallery
    this.container = container

    this.overlayElement = null
    this.leftIndexElement = null
    this.wordElement = null
    this.categoryElement = null
    this.descriptionElement = null
    this.chipElement = null
    this.activePlaneIndex = -1
  }

  setContainer(container) {
    this.container = container
  }

  createElement() {
    const element = document.createElement('section')
    element.className = 'plane-label-overlay'
    element.innerHTML = `
      <div class="plane-label-glass plane-label-overlay__left">
        <p class="plane-label-overlay__index"></p>
        <p class="plane-label-card__word"><span class="plane-label-card__word-text"></span></p>
        <span class="plane-label-overlay__chip"></span>
      </div>
      <article class="plane-label-glass plane-label-card plane-label-overlay__right">
        <p class="plane-label-card__category"><span class="plane-label-card__category-text"></span></p>
        <p class="plane-label-card__description"></p>
      </article>
    `

    return {
      element,
      leftIndexElement: element.querySelector('.plane-label-overlay__index'),
      wordElement: element.querySelector('.plane-label-card__word-text'),
      categoryElement: element.querySelector('.plane-label-card__category-text'),
      descriptionElement: element.querySelector('.plane-label-card__description'),
      chipElement: element.querySelector('.plane-label-overlay__chip'),
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
      chipElement,
    } = this.createElement()

    this.overlayElement = element
    this.leftIndexElement = leftIndexElement
    this.wordElement = wordElement
    this.categoryElement = categoryElement
    this.descriptionElement = descriptionElement
    this.chipElement = chipElement
    this.overlayElement.style.opacity = '0'

    const mountTarget = this.container || document.body
    mountTarget.append(this.overlayElement)
  }

  normalizeHexColor(rawColor) {
    const fallbackColor = '#0b5f7e'
    if (typeof rawColor !== 'string') return fallbackColor

    let hexColor = rawColor.trim()
    if (!hexColor) return fallbackColor
    if (!hexColor.startsWith('#')) {
      hexColor = `#${hexColor}`
    }

    if (/^#[0-9a-fA-F]{3}$/.test(hexColor)) {
      const shortHex = hexColor.slice(1)
      hexColor = `#${shortHex
        .split('')
        .map((character) => `${character}${character}`)
        .join('')}`
    }

    if (!/^#[0-9a-fA-F]{6}$/.test(hexColor)) return fallbackColor
    return hexColor.toLowerCase()
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
    const accentColor = this.normalizeHexColor(plane.userData.accentColor)

    const textColor = labelData.color || '#F8FAF9'
    const highlightColor = labelData.highlight || '#5CBF2A'

    this.leftIndexElement.textContent = String(planeIndex + 1).padStart(2, '0')
    this.wordElement.textContent = labelData.word || 'Product'
    this.categoryElement.textContent = labelData.category || 'Industrial'
    this.descriptionElement.textContent = labelData.description || ''
    this.chipElement.style.backgroundColor = accentColor
    this.overlayElement.style.setProperty('--label-text', textColor)
    this.overlayElement.style.setProperty('--label-highlight', highlightColor)
    this.overlayElement.dataset.tone = textColor.toLowerCase() === '#0b5f7e' ? 'light' : 'dark'

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
    this.chipElement = null
    this.activePlaneIndex = -1
  }
}

export { Label }
