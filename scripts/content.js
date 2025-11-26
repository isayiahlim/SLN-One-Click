document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const timeInput = document.getElementById('timeInput');
  const saveBtn = document.getElementById('saveBtn');
  const urlList = document.getElementById('urlList');
  const printBtn = document.getElementById('printBtn');
  const outputDiv = document.getElementById('output');

  loadBookmarks();

  saveBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const time = timeInput.value; // Format is "HH:MM"

    if (!name) {
      alert("Please enter a name first.");
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        saveBookmark(name, tab.url, time);
        nameInput.value = '';
        timeInput.value = '';
      } else {
        alert("Cannot access current tab URL.");
      }
    } catch (error) {
      console.error(error);
    }
  });

  printBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if(tab) {
      outputDiv.textContent = "Current: " + tab.url;
      outputDiv.style.display = 'block';
    }
  });

  function saveBookmark(name, url, timeString) {
    chrome.storage.sync.get(['bookmarks'], (result) => {
      const bookmarks = result.bookmarks || [];
      
      // If a time was provided, we need to schedule it
      if (timeString) {
        scheduleAlarm(name, timeString);
      }

      bookmarks.push({ name, url, time: timeString });
      
      chrome.storage.sync.set({ bookmarks: bookmarks }, () => {
        loadBookmarks();
      });
    });
  }

  function scheduleAlarm(name, timeString) {
    // 1. Parse the HH:MM string
    const [hours, minutes] = timeString.split(':');
    const now = new Date();
    const scheduledTime = new Date();

    scheduledTime.setHours(hours);
    scheduledTime.setMinutes(minutes);
    scheduledTime.setSeconds(0);

    // 2. If the time has already passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    // 3. Create the alarm using the bookmark name as the ID
    // Note: In a real app, you'd want a unique ID instead of just the name
    chrome.alarms.create(name, {
      when: scheduledTime.getTime()
    });
    
    console.log(`Alarm '${name}' set for ${scheduledTime.toString()}`);
  }

  function loadBookmarks() {
    chrome.storage.sync.get(['bookmarks'], (result) => {
      const bookmarks = result.bookmarks || [];
      urlList.innerHTML = '';

      if (bookmarks.length === 0) {
        urlList.innerHTML = '<div style="color:#777; font-size:12px;">No saved pages yet.</div>';
        return;
      }

      bookmarks.forEach((bookmark, index) => {
        const item = document.createElement('div');
        item.className = 'url-item';
        
        // Wrapper for text info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'url-info';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'url-name';
        nameSpan.textContent = bookmark.name;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'url-time';
        timeSpan.textContent = bookmark.time ? `Opens at ${bookmark.time}` : 'Manual only';

        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(timeSpan);

        const delBtn = document.createElement('span');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '✕';
        delBtn.title = "Remove";
        delBtn.onclick = (e) => {
          e.stopPropagation();
          deleteBookmark(index, bookmark.name);
        };

        item.addEventListener('click', () => {
          chrome.tabs.create({ url: bookmark.url });
        });

        item.appendChild(infoDiv);
        item.appendChild(delBtn);
        urlList.appendChild(item);
      });
    });
  }

  function deleteBookmark(index, name) {
    chrome.storage.sync.get(['bookmarks'], (result) => {
      const bookmarks = result.bookmarks || [];
      bookmarks.splice(index, 1);
      
      // Also clear the alarm if it exists
      chrome.alarms.clear(name);

      chrome.storage.sync.set({ bookmarks: bookmarks }, () => {
        loadBookmarks();
      });
    });
  }
});
