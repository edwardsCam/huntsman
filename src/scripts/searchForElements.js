chrome.storage.local.get(['_HUNTSMAN_searchQuery'], ({ _HUNTSMAN_searchQuery }) => {
  clear()
  const searchQuery = sanitize(_HUNTSMAN_searchQuery)
  if (searchQuery) {
    document.querySelectorAll(searchQuery).forEach(drawOutline)
  }
})

function clear() {
  document.querySelectorAll('[huntsman-target]').forEach(el => el.remove())
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
  outline.setAttribute('huntsman-target', '')
  outline.style.position = 'absolute'
  outline.style.border = '2px solid red'
  outline.style.background = 'none'
  outline.style.top = `${rect.top}px`
  outline.style.left = `${rect.left}px`
  outline.style.width = `${rect.width}px`
  outline.style.height = `${rect.height}px`
  return outline
}

function sanitize(unsafeStr) {
  // TODO do we need to sanitize input to querySelectorAll?
  // something like "h1 > div" is a valid css selector, we don't want to escape &gt
  return unsafeStr
  // return unsafeStr
  //   .replace(/&/g, '&amp;')
  //   .replace(/</g, '&lt;')
  //   .replace(/>/g, '&gt;')
}
