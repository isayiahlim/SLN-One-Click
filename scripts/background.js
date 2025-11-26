// Listen for the alarm to fire
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm fired:", alarm.name);

  // 1. Get all bookmarks from storage
  chrome.storage.sync.get(['bookmarks'], (result) => {
    const bookmarks = result.bookmarks || [];

    // 2. Find the bookmark that matches the alarm name
    // (We used the bookmark name as the alarm name in popup.js)
    const matchedBookmark = bookmarks.find(b => b.name === alarm.name);

    if (matchedBookmark && matchedBookmark.url) {
      // 3. Open the tab
      chrome.tabs.create({ url: matchedBookmark.url });
      
      // Optional: If you want it to recur every day, you would re-schedule it here.
      // For now, this is a one-time alarm.
    } else {
      console.log("No bookmark found for this alarm.");
    }
  });
});