const triggerSearch = e => {
  const searchQuery = document.getElementById('searchInput').value.replace(/\"/g, '\\"')
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { searchQuery })
  })
}

document.getElementById('searchBtn').onclick = triggerSearch
document.getElementById('clearBtn').onclick = e => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { clear: true })
  })
}
document.getElementById('searchInput').onkeyup = e => {
  if (e.key === 'Enter') {
    triggerSearch(e)
  }
}
