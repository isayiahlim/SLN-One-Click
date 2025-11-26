document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('printBtn');
  const openButton = document.getElementById('openBtn');
  const outputDiv = document.getElementById('output');

  button.addEventListener('click', async () => {
    try {
      // Query the currently active tab in the current window
      // The 'activeTab' permission in manifest.json allows this access
      const [tab] = await chrome.tabs.query({ 
        active: true, 
        currentWindow: true 
      });

      if (tab && tab.url) {
        // 1. Print to the popup UI
        outputDiv.textContent = tab.url;
        outputDiv.style.display = 'block';

        // 2. Print to the console (Right-click popup > Inspect > Console to view)
        console.log("Captured URL:", tab.url);
      } else {
        outputDiv.textContent = "Unable to get URL. (Restricted browser page?)";
        outputDiv.style.display = 'block';
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
      outputDiv.textContent = "Error: " + error.message;
      outputDiv.style.display = 'block';
    }
  });

  // New logic to open a tab
  openButton.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://www.google.com' });
  });
});