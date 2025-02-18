// Get updateTabCount function from background.js
const { updateTabCount } = require('./background.js');

describe('Tab Counter Extension', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    chrome.windows.getAll.mockImplementation((options, callback) => {
      callback([{ id: 1 }, { id: 2 }]); // Mock 2 windows
    });
    
    chrome.tabs.query.mockImplementation((options, callback) => {
      callback([{ id: 1 }, { id: 2 }, { id: 3 }]); // Mock 3 tabs
    });
  });

  test('updateTabCount sets correct badge text', () => {
    updateTabCount();
    
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith({
      text: '3_2' // 3 tabs, 2 windows
    });
  });

  test('badge color should be green for 3 tabs', () => {
    updateTabCount();
    
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: '#00aa00'
    });
  });

  test('event listeners are registered', () => {
    // Re-require background.js to trigger the event listener registration
    jest.isolateModules(() => {
      require('./background.js');
    });
    
    expect(chrome.tabs.onCreated.addListener).toHaveBeenCalled();
    expect(chrome.tabs.onRemoved.addListener).toHaveBeenCalled();
    expect(chrome.tabs.onDetached.addListener).toHaveBeenCalled();
    expect(chrome.tabs.onAttached.addListener).toHaveBeenCalled();
    expect(chrome.windows.onCreated.addListener).toHaveBeenCalled();
    expect(chrome.windows.onRemoved.addListener).toHaveBeenCalled();
    expect(chrome.runtime.onStartup.addListener).toHaveBeenCalled();
    expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalled();
  });
  
  test('badge color should be red for 21 tabs', () => {
    // Mock 21 tabs
    chrome.tabs.query.mockImplementation((options, callback) => {
      callback(Array(21).fill({ id: 1 }));
    });
    
    updateTabCount();
    
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: '#FF0000'
    });
  });

  test('badge color should be yellow-red gradient for 11 tabs', () => {
    // Mock 11 tabs
    chrome.tabs.query.mockImplementation((options, callback) => {
      callback(Array(11).fill({ id: 1 }));
    });
    
    updateTabCount();
    
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: '#ff9900' // 10% between yellow and red
    });
  });

  test('badge color should be orange-red gradient for 16 tabs', () => {
    // Mock 16 tabs
    chrome.tabs.query.mockImplementation((options, callback) => {
      callback(Array(16).fill({ id: 1 }));
    });
    
    updateTabCount();
    
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
      color: '#ff4400' // 60% between yellow and red
    });
  });
}); 

