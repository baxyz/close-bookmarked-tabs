import { closeBookmarkedTabs, invalidateCache, hasBookmarkedTabs } from './utils/bookmarks.js';

// Create context menu item under "Close Multiple Tabs"
browser.menus.create({
  id: "close-bookmarked-tabs",
  title: browser.i18n.getMessage("closeBookmarkedTabs"),
  contexts: ["tab"],
  icons: {
    "16": "icons/icon-16.png"
  },
  enabled: false
});

// Update menu item state based on bookmarked tabs
async function updateMenuState() {
  const hasBookmarks = await hasBookmarkedTabs();
  browser.menus.update("close-bookmarked-tabs", {
    enabled: hasBookmarks
  });
  browser.menus.refresh();
}

// Listen for tab updates to check menu state
browser.tabs.onUpdated.addListener(updateMenuState);
browser.tabs.onRemoved.addListener(updateMenuState);
browser.tabs.onCreated.addListener(updateMenuState);

// Listen for bookmark changes
browser.bookmarks.onCreated.addListener(() => {
  invalidateCache();
  updateMenuState();
});
browser.bookmarks.onRemoved.addListener(() => {
  invalidateCache();
  updateMenuState();
});
browser.bookmarks.onChanged.addListener(() => {
  invalidateCache();
  updateMenuState();
});
browser.bookmarks.onMoved.addListener(() => {
  invalidateCache();
  updateMenuState();
});

// Listen for menu click
browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "close-bookmarked-tabs") {
    closeBookmarkedTabs();
  }
});

console.log("Close Bookmarked Tabs extension loaded.");
console.log("Context menu item created:", a);
