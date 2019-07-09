const searchAndHighlight = query => {
  clear()
  const sanitizedQuery = sanitize(query)
  if (sanitizedQuery) {
    document.querySelectorAll(sanitizedQuery).forEach(drawOutline)
  }
}

const clear = () => document.querySelectorAll('[huntsman-target]').forEach(el => el.remove())

const drawOutline = element => {
  document.body.appendChild(
    createOutline(
      element.getBoundingClientRect()
    )
  )
}

const createOutline = rect => {
  const outline = document.createElement('div')
  outline.setAttribute('huntsman-target', '')
  outline.style.position = 'absolute'
  outline.style.border = '2px solid red'
  outline.style.overflow = 'hidden'
  outline.style.background = 'none'
  outline.style.top = `${rect.top}px`
  outline.style.left = `${rect.left}px`
  outline.style.width = `${rect.width}px`
  outline.style.height = `${rect.height}px`
  return outline
}

// TODO do we need to sanitize input to querySelectorAll?
// something like "h1 > div" is a valid css selector, we don't want to escape &gt
const sanitize = unsafeStr => unsafeStr
// unsafeStr
//   .replace(/&/g, '&amp;')
//   .replace(/</g, '&lt;')
//   .replace(/>/g, '&gt;')

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.searchQuery) {
    searchAndHighlight(request.searchQuery)
  } else if (request.clear) {
    clear()
  }
})
