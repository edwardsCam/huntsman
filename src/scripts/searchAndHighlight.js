let searchResults = []
let id = 0

const searchAndHighlight = (fullQuery, redrawList = true) => {
  clear()
  const sanitizedQuery = sanitize(fullQuery)
  if (sanitizedQuery) {
    const terms = sanitizedQuery.split(',').map(str => str.trim())
    searchResults = []
    id = 0
    terms.forEach(query => {
      document.querySelectorAll(query).forEach(element => {
        drawOutline(element, query)
      })
    })

    if (redrawList) {
      chrome.runtime.sendMessage(searchResults.map(({ id, textContent }) => ({ id, textContent })))
    }
  }
}

const drawOutline = (element, query) => {
  const outline = createOutline(element.getBoundingClientRect())
  const outlineLabel = createOutlineLabel(query)
  const info = {
    id: id++,
    element,
    textContent: getTitle(element),
    outline,
    outlineLabel,
  }
  searchResults.push(info)
  outline.appendChild(outlineLabel)
  document.body.appendChild(outline)

  outline.onmouseover = () => hover(info)
  outline.onmouseout = () => unhover(info)
}

const getTitle = element => element.textContent || element.getAttribute('aria-label') || element.id || element.getAttribute('class') || element.getAttribute('data-qa')

const createOutline = rect => {
  const el = document.createElement('div')
  el.setAttribute('huntsman-target', '')
  el.style.position = 'absolute'
  el.style.top = `${rect.top}px`
  el.style.left = `${rect.left}px`
  el.style.width = `${rect.width}px`
  el.style.height = `${rect.height}px`
  el.style.border = `2px solid green`
  el.style.overflow = 'hidden'
  el.style.background = 'none'
  el.style.zIndex = 9999
  el.style.transition = 'border-color 100ms'
  return el
}

const createOutlineLabel = label => {
  const el = document.createElement('div')
  el.innerHTML = label
  el.style.position = 'absolute'
  el.style.left = 0
  el.style.background = 'green'
  el.style.fontSize = '10px'
  el.style.fontFamily = 'monospace'
  el.style.padding = '0 2px 3px 0'
  el.style.transition = 'background 100ms'
  el.style.color = 'black'
  return el
}

// TODO do we need to sanitize input to querySelectorAll?
// something like "h1 > div" is a valid css selector, we don't want to escape &gt
const sanitize = unsafeStr => unsafeStr
// unsafeStr
//   .replace(/&/g, '&amp;')
//   .replace(/</g, '&lt;')
//   .replace(/>/g, '&gt;')

const clear = () => document.querySelectorAll('[huntsman-target]').forEach(el => el.remove())

const hover = ({ outline, outlineLabel }) => {
  const color = 'rgba(0, 255, 255, 0.7)'
  outline.style.borderColor = color
  outlineLabel.style.background = color
}

const unhover = ({ outline, outlineLabel }) => {
  const color = 'green'
  outline.style.borderColor = color
  outlineLabel.style.background = color
}

const unhoverAll = () => searchResults.forEach(unhover)

const getResult = _id_ => searchResults.find(({ id }) => id === _id_)

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.searchQuery) {
    searchAndHighlight(msg.searchQuery)
  } else if (msg.clear) {
    clear()
  } else if (msg.hoveredElementId != null) {
    hover(getResult(msg.hoveredElementId))
  } else if (msg.hoveredElementId === null) {
    unhoverAll()
  } else if (msg.elementToScrollIntoView !== null) {
    getResult(msg.elementToScrollIntoView).element.scrollIntoView({
      behavior: 'smooth'
    })
  }
})
