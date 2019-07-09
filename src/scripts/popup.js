const clickHandler = e => {
  const value = document.getElementById('searchInput').value.replace(/\"/g, '\\"')

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const { id } = tabs[0]
    const code = `chrome.storage.local.set({ _HUNTSMAN_searchQuery: "${value}" })`
    chrome.tabs.executeScript(id, { code }, () => {
      chrome.tabs.executeScript(id, { file: 'src/scripts/searchForElements.js' })
    })
  })
}

document.getElementById('searchBtn').onclick = clickHandler
document.getElementById('searchInput').onkeyup = e => {
  if (e.key === 'Enter') {
    clickHandler(e)
  }
}
