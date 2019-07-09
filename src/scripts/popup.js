const inCurrentTab = callback => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length) callback(tabs[0].id)
  })
}

const triggerSearch = () => {
  const searchQuery = document.getElementById('searchInput').value
  chrome.storage.local.set({ huntsmanSearchQuery: searchQuery })

  inCurrentTab(tabId => {
    chrome.tabs.sendMessage(tabId, { searchQuery })
  })
}

const triggerClear = () => {
  chrome.storage.local.set({ huntsmanSearchQuery: null })
  const searchInput = document.getElementById('searchInput')
  searchInput.value = ''
  searchInput.focus()

  inCurrentTab(tabId => {
    chrome.tabs.sendMessage(tabId, { clear: true })
  })
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
    }
  })
}
