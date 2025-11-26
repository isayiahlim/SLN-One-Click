document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const saveBtn = document.getElementById('saveBtn');
  const urlList = document.getElementById('urlList');
  
  // Optional debug elements from previous version
  const printBtn = document.getElementById('printBtn');
  const outputDiv = document.getElementById('output');

  // 1. Load saved URLs on startup
  loadBookmarks();

  // 2. Save Current Page Button
  saveBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter a name first.");
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        saveBookmark(name, tab.url);
        nameInput.value = ''; // Clear input
      } else {
        alert("Cannot access current tab URL.");
      }
    } catch (error) {
      console.error(error);
    }
  });

  // 3. Print Button (Legacy Debug feature)
  printBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if(tab) {
      outputDiv.textContent = "Current: " + tab.url;
      outputDiv.style.display = 'block';
    }
  });

  // --- Helper Functions ---

  function saveBookmark(name, url) {
    // Get existing bookmarks first
    chrome.storage.sync.get(['bookmarks'], (result) => {
      const bookmarks = result.bookmarks || [];
      bookmarks.push({ name, url });
      
      // Save back to storage
      chrome.storage.sync.set({ bookmarks: bookmarks }, () => {
        loadBookmarks(); // Refresh UI
      });
    });
  }

  function loadBookmarks() {
    chrome.storage.sync.get(['bookmarks'], (result) => {
      const bookmarks = result.bookmarks || [];
      urlList.innerHTML = ''; // Clear current list

      if (bookmarks.length === 0) {
        urlList.innerHTML = '<div style="color:#777; font-size:12px;">No saved pages yet.</div>';
        return;
      }

      bookmarks.forEach((bookmark, index) => {
        const item = document.createElement('div');
        item.className = 'url-item';
        
        // Name Text
        const nameSpan = document.createElement('span');
        nameSpan.className = 'url-name';
        nameSpan.textContent = bookmark.name;
        
        // Delete "X"
        const delBtn = document.createElement('span');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '✕';
        delBtn.title = "Remove";
        delBtn.onclick = (e) => {
          e.stopPropagation(); // Prevent opening the link when deleting
          deleteBookmark(index);
        };

        // Click to Open
        item.addEventListener('click', () => {
          chrome.tabs.create({ url: bookmark.url });
        });

        item.appendChild(nameSpan);
        item.appendChild(delBtn);
        urlList.appendChild(item);
      });
    });
  }

  function deleteBookmark(index) {
    chrome.storage.sync.get(['bookmarks'], (result) => {
      const bookmarks = result.bookmarks || [];
      bookmarks.splice(index, 1); // Remove item at index
      chrome.storage.sync.set({ bookmarks: bookmarks }, () => {
        loadBookmarks(); // Refresh UI
      });
    });
  }
});