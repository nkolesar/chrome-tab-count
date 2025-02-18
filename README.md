# Tab Counter Extension

## Overview
This Chrome extension counts the number of open tabs and windows, displaying the count on the extension's badge. It helps users manage their browsing sessions by providing a quick overview of their tab usage.

## Demo
![Extension demo showing 11 tabs in 2 windows](images/demo.png)

The screenshot above demonstrates the extension in action. The badge shows "11_2", indicating 11 open tabs across 2 windows. The badge color is orange-yellow, showing that the number of tabs is in the "warning" zone between 10-20 tabs. As you open more tabs, the badge color will gradually shift from yellow to red, providing a visual indicator of your tab usage.


## How It Works
The extension listens for tab and window events in Chrome. It updates the badge text with the current number of open tabs and windows. The badge color changes based on the number of tabs:
- Green for up to 10 tabs
- Yellow to red gradient for 11 to 20 tabs
- Red for more than 20 tabs

## Installation
1. Clone the repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory where the repository is cloned.

## Contributing
Feel free to open a pull request for any enhancements or bug fixes. 
Ensure that your code passes all tests by running `pnpm test` before submitting.

## License
This project is licensed under the MIT License - see the LICENSE file for details. 