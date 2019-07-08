document.getElementById('searchBtn').onclick = e => {
  const value = document.getElementById('searchInput').value.replace(/\"/g, '\\"')

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const { id } = tabs[0]
    const code = `chrome.storage.local.set({ hunterSearchQuery: "${value}" })`
    chrome.tabs.executeScript(id, { code }, () => {
      chrome.tabs.executeScript(id, { file: 'src/scripts/searchForElements.js' })
    })
  })
}
