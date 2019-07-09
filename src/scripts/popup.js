const clickHandler = e => {
  const value = document.getElementById('searchInput').value.replace(/\"/g, '\\"')
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, value)
  })
}

document.getElementById('searchBtn').onclick = clickHandler
document.getElementById('searchInput').onkeyup = e => {
  if (e.key === 'Enter') {
    clickHandler(e)
  }
}
