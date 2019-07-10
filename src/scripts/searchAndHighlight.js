const searchAndHighlight = fullQuery => {
  clear()
  const sanitizedQuery = sanitize(fullQuery)
  if (sanitizedQuery) {
    const terms = sanitizedQuery.split(',').map(str => str.trim())
    terms.forEach(query => {
      document.querySelectorAll(query).forEach(element => {
        drawOutline(element, query, 'green', 'rgba(0, 255, 255, 0.7)')
      })
    })
  }
}

const clear = () => document.querySelectorAll('[huntsman-target]').forEach(el => el.remove())

const drawOutline = (element, query, color, hoverColor) => {
  const outline = createOutline(element.getBoundingClientRect(), color)
  const outlineLabel = createOutlineLabel(query, color)
  outline.appendChild(outlineLabel)
  document.body.appendChild(outline)

  outline.onmouseover = () => {
    outline.style.borderColor = hoverColor
    outlineLabel.style.background = hoverColor
  }
  outline.onmouseout = () => {
    outline.style.borderColor = color
    outlineLabel.style.background = color
  }
}

const createOutline = (rect, color) => {
  const el = document.createElement('div')
  el.setAttribute('huntsman-target', '')
  el.style.position = 'absolute'
  el.style.top = `${rect.top}px`
  el.style.left = `${rect.left}px`
  el.style.width = `${rect.width}px`
  el.style.height = `${rect.height}px`
  el.style.border = `2px solid ${color}`
  el.style.overflow = 'hidden'
  el.style.background = 'none'
  el.style.zIndex = 999
  el.style.transition = 'border-color 100ms'
  return el
}

const createOutlineLabel = (label, color) => {
  const el = document.createElement('div')
  el.innerHTML = label
  el.style.position = 'absolute'
  el.style.left = 0
  el.style.background = color
  el.style.fontSize = '10px'
  el.style.fontFamily = 'monospace'
  el.style.padding = '0 2px 3px 0'
  el.style.transition = 'background 100ms'
  return el
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
