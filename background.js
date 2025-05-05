// Function to update the badge with the number of tabs
function updateTabCount() {
  // Get all windows
  chrome.windows.getAll({ windowTypes: ['normal'] }, function(windows) {
    const windowCount = windows.length;
    
    // Get all tabs
    chrome.tabs.query({}, function(tabs) {
      const tabCount = tabs.length;
      // Format badge text as "windows-tabs"
      const badgeText = `${tabCount}_${windowCount}`;
      
      // Make sure badge text is set
      chrome.action.setBadgeText({ text: badgeText });

      // Set desired color gradient
      let tabs_green = 5   // maximum tab count for 100% green color
      let tabs_yellow = 10 // central tab count of the yellow range (where green-yellow gradient is replaced by yellow-red gradient)
      let tabs_red = 20    // minimum tab count for 100% red 

      // Set badge background color based on tab count
      let badgeColor;
      if (tabCount > tabs_red) {
        badgeColor = '#FF0000'; // Red for > 20 tabs
      } else if (tabCount > tabs_yellow) {
        // Calculate color gradient from yellow to red
        const percentage = (tabCount - tabs_yellow) / (tabs_red - tabs_yellow); // find how far into the yellow-red range the current tab count is
        const r = Math.floor(255); // Red stays at 255
        const g = Math.floor(170 * (1 - percentage)); // Green decreases from 170 to 0
        badgeColor = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}00`;
      } else {
        // Calculate color gradient from green to yellow
        const percentage = Math.max(0, (tabCount - tabs_green) / tabs_green);
        const r = Math.floor(255 * percentage); // Red increases from 0 to 255
        const g = 170; // Green stays constant
        badgeColor = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}00`;
      }
      chrome.action.setBadgeBackgroundColor({ color: badgeColor });
      // Set text color to white (optional, as it's white by default)
      chrome.action.setBadgeTextColor && chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
    });
  });
}

// Listen for tab events
chrome.tabs.onCreated.addListener(updateTabCount);
chrome.tabs.onRemoved.addListener(updateTabCount);
chrome.tabs.onDetached.addListener(updateTabCount);
chrome.tabs.onAttached.addListener(updateTabCount);

// Listen for window events
chrome.windows.onCreated.addListener(updateTabCount);
chrome.windows.onRemoved.addListener(updateTabCount);

// Update count when the extension is installed or Chrome is started
chrome.runtime.onStartup.addListener(updateTabCount);
chrome.runtime.onInstalled.addListener(updateTabCount);

// Call updateTabCount immediately when the service worker starts
updateTabCount(); 
