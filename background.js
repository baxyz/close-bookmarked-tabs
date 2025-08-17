import { closeBookmarkedTabs, invalidateCache, hasBookmarkedTabs } from './utils/bookmarks.js';
import { MENU_ITEM_ID, createContextMenuItem, updateMenuState } from './utils/menu.js';

// Initialize context menu and check initial state
async function initialize() {
  await createContextMenuItem();
  await checkMenuState();
}

// Check initial state
async function checkMenuState() {
  const hasBookmarks = await hasBookmarkedTabs();
  await updateMenuState(hasBookmarks);
}

// Start initialization
initialize();

// Listen for tab updates to check menu state
['onUpdated', 'onRemoved', 'onCreated'].forEach(event => {
  browser.tabs[event].addListener(checkMenuState);
});

// Listen for bookmark changes
['onCreated', 'onRemoved', 'onChanged', 'onMoved'].forEach(event => {
  browser.bookmarks[event].addListener(() => {
    invalidateCache();
    checkMenuState();
  });
});

// Listen for menu click
browser.menus.onClicked.addListener((info, tab) => {
  console.log("Menu clicked:", info.menuItemId);
  if (info.menuItemId === MENU_ITEM_ID) {
    closeBookmarkedTabs();
  }
});
