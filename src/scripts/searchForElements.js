chrome.storage.local.get(['hunterSearchQuery'], ({ hunterSearchQuery }) => {
  clear()
  document.querySelectorAll(sanitize(hunterSearchQuery)).forEach(drawOutline)
})

function clear() {
  document.querySelectorAll('[hunter-target]').forEach(el => el.remove())
}

function drawOutline(element) {
  document.body.appendChild(
    createOutline(
      element.getBoundingClientRect()
    )
  )
}

function createOutline(rect) {
  const outline = document.createElement('div')
  outline.setAttribute('hunter-target', '')
  outline.style.position = 'absolute'
  outline.style.border = '2px solid red'
  outline.style.zIndex = 9999
  outline.style.top = `${rect.top}px`
  outline.style.left = `${rect.left}px`
  outline.style.width = `${rect.width}px`
  outline.style.height = `${rect.height}px`
  return outline
}

function sanitize(unsafeStr) {
  return unsafeStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
