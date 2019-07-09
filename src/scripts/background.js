chrome.omnibox.onInputEntered.addListener(text => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length) {
      chrome.tabs.sendMessage(tabs[0].id, text)
    }
  })
})
