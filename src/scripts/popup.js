const sendMessageInCurrentTab = msg => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length) chrome.tabs.sendMessage(tabs[0].id, msg)
  })
}

const triggerSearch = () => {
  const searchQuery = document.getElementById('searchInput').value
  chrome.storage.local.set({ huntsmanSearchQuery: searchQuery })
  clearList()
  sendMessageInCurrentTab({ searchQuery })
}

const triggerClear = () => {
  chrome.storage.local.set({ huntsmanSearchQuery: null })
  const searchInput = document.getElementById('searchInput')
  searchInput.value = ''
  searchInput.focus()
  clearList()
  sendMessageInCurrentTab({ clear: true })
}

const showInfo = () => {
  if (!document.getElementById('infoPanel')) {
    const infoPanel = document.createElement('div')
    infoPanel.setAttribute('id', 'infoPanel')
    infoPanel.innerHTML = 'TODO: help and info'

    const closeBtn = document.createElement('button')
    closeBtn.setAttribute('id', 'closeInfoBtn')
    closeBtn.innerHTML = 'x'
    closeBtn.onclick = () => infoPanel.remove()

    infoPanel.appendChild(closeBtn)
    document.body.appendChild(infoPanel)
  }
}

const populateList = results => {
  if (results.length) {
    document.body.appendChild(createList(results))
  }
  setResultsCount(results.length)
}

const createList = results => {
  const list = document.createElement('div')
  list.setAttribute('id', 'resultsList')
  list.style.marginTop = '12px'
  list.style.maxHeight = '443px'
  list.style.overflow = 'auto'
  results.forEach(({ id, textContent }) => {
    const div = document.createElement('div')
    div.style.border = '2px solid red'
    div.style.borderRadius = '3px'
    div.style.height = '15px'
    div.style.margin = '10px auto'
    div.style.overflow = 'hidden'
    div.style.width = '300px'
    div.style.transition = 'width 400ms ease-in-out'
    div.style.cursor = 'pointer'
    div.innerHTML = textContent
    div.title = textContent
    list.appendChild(div)

    addListeners(div, id)
  })
  return list
}

const addListeners = (element, hoveredElementId) => {
  element.onmouseover = () => {
    sendMessageInCurrentTab({ hoveredElementId })
    element.style.width = '457px'
  }

  element.onmouseout = () => {
    sendMessageInCurrentTab({ hoveredElementId: null })
    element.style.width = '300px'
  }

  element.ondblclick = () => {
    sendMessageInCurrentTab({ elementToScrollIntoView: hoveredElementId })
  }
}

const setResultsCount = n => {
  let text = ''
  if (n === 1) {
    text = '1 result found'
  } else if (n > 1) {
    text = `${n} results found`
  }
  document.querySelector('#resultsCount').innerHTML = text
}

const clearList = () => {
  const list = document.getElementById('resultsList')
  if (list) list.remove()
  setResultsCount(0)
}

document.getElementById('searchBtn').onclick = triggerSearch
document.getElementById('clearBtn').onclick = triggerClear
document.getElementById('infoBtn').onclick = showInfo
document.getElementById('searchInput').onkeyup = e => {
  if (e.key === 'Enter') triggerSearch(e)
}

window.onload = () => {
  chrome.storage.local.get([ 'huntsmanSearchQuery' ], ({ huntsmanSearchQuery }) => {
    if (huntsmanSearchQuery) {
      document.getElementById('searchInput').value = huntsmanSearchQuery
      triggerSearch(huntsmanSearchQuery)
    }
  })
}

chrome.runtime.onMessage.addListener(populateList)
