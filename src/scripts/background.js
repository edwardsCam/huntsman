chrome.omnibox.onInputEntered.addListener(searchQuery => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length) {
      chrome.tabs.sendMessage(tabs[0].id, { searchQuery })
    }
  })
})
