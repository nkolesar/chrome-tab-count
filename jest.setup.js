// Mock Chrome API
global.chrome = {
  windows: {
    getAll: jest.fn(),
    onCreated: { addListener: jest.fn() },
    onRemoved: { addListener: jest.fn() }
  },
  tabs: {
    query: jest.fn(),
    onCreated: { addListener: jest.fn() },
    onRemoved: { addListener: jest.fn() },
    onDetached: { addListener: jest.fn() },
    onAttached: { addListener: jest.fn() }
  },
  action: {
    setBadgeText: jest.fn(),
    setBadgeBackgroundColor: jest.fn(),
    setBadgeTextColor: jest.fn()
  },
  runtime: {
    onStartup: { addListener: jest.fn() },
    onInstalled: { addListener: jest.fn() }
  }
}; 